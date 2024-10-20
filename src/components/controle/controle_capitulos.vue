<template>
    <div id="controle-capitulos">
      <button class="btn btn-warning" @click="enviar_dados" id="controle-capitulos-btn-enviar">Enviar dados</button>
      <controle-editor :view-model="baklava"></controle-editor>
    </div>
  </template>
  
  <style>
    #controle-capitulos {
      width: 100%;
      height: 100%;
      position: relative;
    }
  
    #controle-capitulos-btn-enviar {
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
  
  import { Capitulo } from "./nodes/capitulo.js"; // Importa o node Capitulo
  
  export default defineComponent({
    name: "controle_capitulos",
    components: {
      "controle-editor": EditorComponent
    },
    data() {
      return {
        servidor: inject('servidor'),
        usuario: inject('usuario'),
      };
    },
    methods: {
      async enviar_dados() {
        if (confirm("Tem certeza que deseja enviar esses dados?")) {
          const nodes = this.baklava.displayedGraph.nodes; 
          const capitulos = nodes.map(node => ({
            numero: node.inputs.Numer._value,
            titulo: node.inputs.Titulo._value,
            arquivo: node.inputs.Arquivo._value,
            icone: node.inputs.Icone._value,
            desbloqueado: node.inputs.Desbloqueado._value
          }));
          const data = {
            "capitulos": capitulos,
            "matricula": this.usuario.dados.matricula,
            "token": this.usuario.token
          };
          try {
            const response = await fetch(this.servidor + "/cadastro/capitulo", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
  
            const responseData = await response.json();
            if (responseData.status === "OK") {
              this.$notify({ type: "success", title: "Capítulos enviados com sucesso" });
            } else {
              this.$notify({ type: "error", title: "Erro ao cadastrar os capítulos, verifique os dados e tente novamente." });
            }
          } catch (error) {
            console.error(error);
            this.$notify({ type: "error", title: "Erro ao cadastrar os capítulos, verifique os dados e tente novamente." });
          }
        }
      }
    },
    setup() {
      const servidor = inject('servidor');
      const usuario = inject('usuario');
      const baklava = useBaklava();
      const engine = new DependencyEngine(baklava.editor);
  
      // Função assíncrona para buscar capítulos
      const fetchCapitulos = async () => {
        const response = await fetch(servidor + '/capitulos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            matricula: usuario.dados.matricula,
            token: usuario.token
          })
        });
  
        const data = await response.json();
        console.log(data)
        return data;
      };
  
      // Chame a função assíncrona para buscar capítulos
      fetchCapitulos().then(data => {
        const capitulos = data.capitulos;
        var imagens = [];
        data.imagens.forEach(imagem => {
            imagens.push({text: imagem.nome, value: imagem.value});
          })
        imagens.push({text:"Logo da semente",value:"logo2.svg"})
        imagens.push({text:"Controle",value:"controle.png"})
        imagens.push({text:"Trofeu",value:"trofeu.svg"})
        capitulos.forEach((capitulo, i) => {
          const node = new Capitulo();
          baklava.displayedGraph.addNode(node);
          node.position.x = 300 + i * 500; // ou calcule uma posição dinâmica
          node.position.y = 140; // Ajuste a posição para evitar sobreposição
  
          node.inputs.Numer.value = capitulo.numero;
          node.inputs.Titulo.value = capitulo.titulo;
          node.inputs.Arquivo.value = capitulo.arquivo;
          node.inputs.Icone.value = capitulo.icone;
          node.inputs.Icone = new SelectInterface("Icone",capitulo.icone,imagens);
          node.inputs.Desbloqueado.value = capitulo.desbloqueado;

          baklava.displayedGraph.addConnection(node.outputs.result); // Certifique-se de que isso faz sentido no seu contexto
        });
      });
  
      baklava.editor.registerNodeType(Capitulo); // Registre o tipo de nó Capitulo
  
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
  