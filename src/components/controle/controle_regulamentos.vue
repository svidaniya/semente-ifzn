<template>
    <div id="controle-regulamentos">
      <button class="btn btn-warning" @click="enviar_dados" id="controle-regulamentos-btn-enviar">Enviar dados</button>
      <baklava-editor :view-model="baklava"></baklava-editor>
    </div>
  </template>
  
  <style>
    #controle-regulamentos {
      width: 100%;
      height: 100%;
      position: relative;
    }
  
    #controle-regulamentos-btn-enviar {
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
    applyResult,
    SelectInterface
  } from "baklavajs";
  import { Regulamento } from "./nodes/regulamento.js"; // Importa o node Regulamento
  
  export default defineComponent({
    name: "controle_regulamentos",
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
      async enviar_dados() {
        if (confirm("Tem certeza que deseja enviar esses dados?")) {
          const nodes = this.baklava.displayedGraph.nodes;
          const regulamentos = nodes.map(node => ({
            ordem: node.inputs.Ordem._value,
            titulo: node.inputs.Titulo._value,
            texto: node.inputs.Texto._value,
            imagem_url: node.inputs.ImagemURL._value
          }));
  
          const data = {
            "regulamentos": regulamentos,
            "matricula": this.usuario.dados.matricula, // Supondo que precise de matricula
            "token": this.usuario.token // Supondo que precise de token
          };
  
          try {
            const response = await fetch(this.servidor + "/cadastro/regulamento", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
  
            const responseData = await response.json();
            if (responseData.status === "OK") {
              this.$notify({ type: "success", title: "Regulamentos enviados com sucesso" });
            } else {
              this.$notify({ type: "error", title: "Erro ao cadastrar os regulamentos, verifique os dados e tente novamente." });
            }
          } catch (error) {
            console.error(error);
            this.$notify({ type: "error", title: "Erro ao cadastrar os regulamentos, verifique os dados e tente novamente." });
          }
        }
      }
    },
    setup() {
      const servidor = inject('servidor');
      const baklava = useBaklava();
      const engine = new DependencyEngine(baklava.editor);
  
      // Função assíncrona para buscar regulamentos
      const fetchRegulamentos = async () => {
        const response = await fetch(servidor + '/regulamentos');
        const data = await response.json();
        return data;
      };
  
      // Chame a função assíncrona para buscar e carregar os regulamentos
      fetchRegulamentos().then(data => {
        var regulamentos = data.regulamentos;
        var imagens = [];
        data.imagens.forEach(imagem => {
            imagens.push({text: imagem.nome, value: imagem.value});
          })
        imagens.push({text:"Logo da semente",value:"logo2.svg"})
        imagens.push({text:"Controle",value:"controle.png"})
        imagens.push({text:"Trofeu",value:"trofeu.svg"})
        regulamentos.forEach((regulamento, i) => {
          const node = new Regulamento();
          baklava.displayedGraph.addNode(node);
          node.position.x = 300 + i * 500; // Posicionamento dinâmico
          node.position.y = 140;
  
          node.inputs.Ordem.value = regulamento.ordem;
          node.inputs.Titulo.value = regulamento.titulo;
          node.inputs.Texto.value = regulamento.texto;
          node.inputs.ImagemURL.value = regulamento.imagem_url;
          node.inputs.ImagemURL = new SelectInterface("Imagem",regulamento.imagem_url,imagens);
  
          baklava.displayedGraph.addConnection(node.outputs.result);
        });
      });
  
      baklava.editor.registerNodeType(Regulamento); // Registrar o tipo de nó Regulamento
  
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
  