<template>
  <div id="controle-eventos">
    <button @click="enviar_dados" class="btn btn-warning" id="controle-eventos-btn-enviar">Enviar dados</button>
    <baklava-editor :view-model="baklava"></baklava-editor>
  </div>
</template>

<style>
  #controle-eventos {
    width: 100%;
    height: 100%;
    position: relative;
  }

  #controle-eventos-btn-enviar {
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

import { Evento } from "./nodes/evento.js";

export default defineComponent({
  name: "controle_eventos",
  components: {
    "baklava-editor": EditorComponent
  },
  data() {
    return {
      servidor: inject('servidor'),
      usuario: inject('usuario')
    };
  },
  methods: {
    async enviar_dados() {
      if (confirm("Tem certeza que deseja enviar esses dados?")) {
        const nodes = this.baklava.displayedGraph.nodes;
        const eventos = nodes.map(node => ({
          titulo: node.inputs.Titulo._value,
          subtitulo: node.inputs.SubTitulo._value,
          organizador: node.inputs.Organizador._value,
          local: node.inputs.Local._value,
          dia: node.inputs.Dia._value,
          mes: node.inputs.Mes._value,
          horario_inicio: node.inputs.HorarioInicio._value,
          horario_termino: node.inputs.HorarioTermino._value,
          informacoes_adicionais: node.inputs.InformacoesAdicionais._value,
          pontuacao: node.inputs.Pontuacao._value,
          desafio: node.inputs.Desafio._value
        }));

        const data = {
          "eventos": eventos,
          "matricula": this.usuario.dados.matricula,
          "token": this.usuario.token
        };

        try {
          const response = await fetch(this.servidor + "/cadastro/evento", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          const responseData = await response.json();
          if (responseData.status === "OK") {
            this.$notify({ type: "success", title: "Eventos enviados com sucesso" });
          } else {
            this.$notify({ type: "error", title: "Erro ao cadastrar os eventos, verifique os dados e tente novamente." });
          }
        } catch (error) {
          console.error(error);
          this.$notify({ type: "error", title: "Erro ao cadastrar os eventos, verifique os dados e tente novamente." });
        }
      }
    }
  },
  setup() {
    const servidor = inject('servidor');
    const usuario = inject('usuario');
    const baklava = useBaklava();
    const engine = new DependencyEngine(baklava.editor);

    // Função assíncrona para buscar eventos
    const fetchEventos = async () => {
      const response = await fetch(servidor + '/admin_eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matricula: usuario.dados.matricula,
          token: usuario.token
        })
      });

      const eventos = await response.json();
      console.log(eventos);
      return eventos.eventos;
    };

    // Chame a função assíncrona para buscar e carregar os eventos
    fetchEventos().then(eventos => {
      eventos.forEach((evento, i) => {

        const node = new Evento();
        baklava.displayedGraph.addNode(node);
        node.position.x = 300 + i * 500; // Posicionamento dinâmico
        node.position.y = 140;
        node.inputs.Codigo.name = "Código: " + evento.codigo;
        node.inputs.Titulo.value = evento.titulo;
        node.inputs.SubTitulo.value = evento.subtitulo;
        node.inputs.Organizador.value = evento.organizador;
        node.inputs.Local.value = evento.local;
        node.inputs.Dia.value = evento.dia;
        node.inputs.Mes.value = evento.mes_value;
        node.inputs.HorarioInicio.value = evento.horario_inicio;
        node.inputs.HorarioTermino.value = evento.horario_termino;
        node.inputs.InformacoesAdicionais.value = evento.informacoes_adicionais;
        node.inputs.Pontuacao.value = evento.pontuacao;
        node.inputs.Desafio.value = evento.desafio;
        baklava.displayedGraph.addConnection(node.outputs.result);
      });
    });

    baklava.editor.registerNodeType(Evento); // Registrar o tipo de nó

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
