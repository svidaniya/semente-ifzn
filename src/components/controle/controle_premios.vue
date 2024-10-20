<template>
  <div id="controle-premios">
    <button @click="enviar_dados" class="btn btn-warning" id="controle-premios-btn-enviar">Enviar dados</button>
    <baklava-editor :view-model="baklava"></baklava-editor>
  </div>
</template>

<style>
  #controle-premios {
    width: 100%;
    height: 100%;
    position: relative;
  }

  #controle-premios-btn-enviar {
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

import { Premio } from "./nodes/premio.js";

export default defineComponent({
  name: "controle_premios",
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
        const premios = nodes.map(node => ({
          pontos: node.inputs.Pontos._value,
          premios: node.inputs.Premios._value
        }));

        const data = {
          "premios": premios,
          "matricula": this.usuario.dados.matricula, // Supondo que precise de matricula
          "token": this.usuario.token // Supondo que precise de token
        };

        try {
          const response = await fetch(this.servidor + "/cadastro/premio", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          const responseData = await response.json();
          if (responseData.status === "OK") {
            this.$notify({ type: "success", title: "Prêmios enviados com sucesso" });
          } else {
            this.$notify({ type: "error", title: "Erro ao cadastrar os prêmios, verifique os dados e tente novamente." });
          }
        } catch (error) {
          console.error(error);
          this.$notify({ type: "error", title: "Erro ao cadastrar os prêmios, verifique os dados e tente novamente." });
        }
      }
    }
  },
  setup() {
    const servidor = inject('servidor');
    const baklava = useBaklava();
    const engine = new DependencyEngine(baklava.editor);

    // Função assíncrona para buscar prêmios
    const fetchPremios = async () => {
      const response = await fetch(servidor + '/premios');
      const premios = await response.json();
      return premios.premios;
    };

    // Chame a função assíncrona para buscar e carregar os prêmios
    fetchPremios().then(premios => {
      premios.forEach((premio, i) => {
        const node = new Premio();
        baklava.displayedGraph.addNode(node);
        node.position.x = 300 + i * 500; // Posicionamento dinâmico
        node.position.y = 140;

        node.inputs.Pontos.value = premio.pontos;
        node.inputs.Premios.value = premio.premios;

        baklava.displayedGraph.addConnection(node.outputs.result);
      });
    });

    baklava.editor.registerNodeType(Premio); // Registrar o tipo de nó

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
