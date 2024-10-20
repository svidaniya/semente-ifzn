<template>
    <div id="controle_imagens">
      <button @click="enviarDados" class="btn btn-warning" id="controle_imagens-btn-enviar">Enviar dados</button>
      <baklava-editor :view-model="baklava"></baklava-editor>
    </div>
  </template>
  
  <style>
    #controle_imagens {
      width: 100%;
      height: 100%;
      position: relative;
    }
  
    #controle_imagens-btn-enviar {
      position: absolute;
      z-index: 10;
      top: 10px;
      right: 10px;
    }
  </style>
  
  <script>
  import { defineComponent, inject } from "vue";
  import {
    EditorComponent,
    useBaklava,
    DependencyEngine,
    applyResult
  } from "baklavajs";
  
  import { Imagem } from "./nodes/imagem.js"; // Importa o nó de imagem
  
  export default defineComponent({
    name: "controle_imagens",
    components: {
      "baklava-editor": EditorComponent
    },
    data() {
      return {
        servidor: inject('servidor'),
        usuario: inject('usuario') // Incluí o usuário caso seja necessário
      };
    },
    methods: {
      async enviarDados() {
        if (confirm("Tem certeza que deseja enviar esses dados?")) {
          const nodes = this.baklava.displayedGraph.nodes; 
          const imagens = nodes.map(node => ({
            url: node.inputs.URL._value,
            nome: node.inputs.Nome._value,
          }));
  
          const data = {
            "imagens": imagens,
            "matricula": this.usuario.dados.matricula, // Supondo que precise de matricula
            "token": this.usuario.token // Supondo que precise de token
          };
  
          try {
            const response = await fetch(this.servidor + "/cadastro/imagens", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
  
            const responseData = await response.json();
            if (responseData.status === "OK") {
              this.$notify({ type: "success", title: "Imagens enviadas com sucesso" });
            } else {
              this.$notify({ type: "error", title: "Erro ao cadastrar as imagens, verifique os dados e tente novamente." });
            }
          } catch (error) {
            console.error(error);
            this.$notify({ type: "error", title: "Erro ao cadastrar as imagens, verifique os dados e tente novamente." });
          }
        }
      }
    },
    setup() {
      const servidor = inject('servidor');
      const baklava = useBaklava();
      const engine = new DependencyEngine(baklava.editor);
  
      // Função assíncrona para buscar imagens
      const fetchImagens = async () => {
        const response = await fetch(servidor + '/imagens');
        const imagens = await response.json();
        return imagens.imagens;
      };
  
      // Chame a função assíncrona para buscar e carregar as imagens
      fetchImagens().then(imagens => {
        imagens.forEach((imagem, i) => {
          const node = new Imagem();
          baklava.displayedGraph.addNode(node);
          node.position.x = 300 + i * 500; // Posicionamento dinâmico
          node.position.y = 140;
  
          node.inputs.URL.value = imagem.url;
          node.inputs.Nome.value = imagem.nome;

  
          baklava.displayedGraph.addConnection(node.outputs.result);
        });
      });
  
      baklava.editor.registerNodeType(Imagem); 
  
      const token = Symbol();
      engine.events.afterRun.subscribe(token, (result) => {
        engine.pause();
        applyResult(result, baklava.editor);
        engine.resume();
      });
  
      engine.start();
  
      return { baklava };
    }
  });
  </script>