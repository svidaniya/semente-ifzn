<template>
  <div id="controle-desafios">
    <button class="btn btn-warning" @click="enviar_dados" id="controle-desafios-btn-enviar">Enviar dados</button>
    <controle-editor :view-model="baklava"></controle-editor>
  </div>
</template>

<style>
  #controle-desafios {
    width: 100%;
    height: 100%;
    position: relative;
  }

  #controle-desafios-btn-enviar {
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

import { Desafio } from "./nodes/desafio.js"; // Importa o node Desafio

export default defineComponent({
  name: "controle_desafios",
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
        const desafios = nodes.map(node => ({
          codigo: /\d/.test(node.title) ? node.title.split(": ")[1] : null,
          numero: node.inputs.Numero._value,
          recompensa: node.inputs.Recompensa._value,
          texto: node.inputs.Texto._value,
          imagem: node.inputs.Imagem._value,
          descricao: node.inputs.Descricao._value,
          resposta: node.inputs.Resposta._value,
          dia_disponibilidade: node.inputs.DiaDisponibilidade._value,
          mes_disponibilidade: node.inputs.MesDiponibilidade._value,
          horario_disponibilidade: node.inputs.HoraDisponibilidade._value,
          horario_expiracao: node.inputs.HorarioExpiracao._value,
          desbloqueia_capitulo: node.inputs.DesbloqueiaCapitulo._value,
          capitulo_recomendado: node.inputs.CapituloRecomendado._value
        }));
        
        const data = {
          desafios: desafios,
          matricula: this.usuario.dados.matricula,
          token: this.usuario.token
        };

        try {
          const response = await fetch(this.servidor + "/cadastro/desafio", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          const responseData = await response.json();
          if (responseData.status === "OK") {
            this.$notify({ type: "success", title: "Desafios enviados com sucesso" });
          } else {
            this.$notify({ type: "error", title: "Erro ao cadastrar os desafios, verifique os dados e tente novamente." });
          }
        } catch (error) {
          console.error(error);
          this.$notify({ type: "error", title: "Erro ao cadastrar os desafios, verifique os dados e tente novamente." });
        }
      }
    }
  },
  setup() {
    const servidor = inject('servidor');
    const usuario = inject('usuario');
    console.log(usuario);
    const baklava = useBaklava();
    const engine = new DependencyEngine(baklava.editor);

    const fetchDesafios = async () => {
      const response = await fetch(servidor + '/desafios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matricula: usuario.dados.matricula,
          token: usuario.token
        })
      });

      const desafios = await response.json();
      return desafios.desafios;
    };

    fetchDesafios().then(desafios => {
      desafios.forEach((desafio, i) => {
        const node = new Desafio();
        node.title = "Desafio: " + desafio.numero;
        baklava.displayedGraph.addNode(node);
        node.position.x = 300 + i * 500; // ou calcule uma posição dinâmica
        node.position.y = 140; // Ajuste a posição para evitar sobreposição

        node.inputs.Numero.value = desafio.numero_value;
        node.inputs.Recompensa.value = desafio.recompensa;
        node.inputs.Texto.value = desafio.texto;
        node.inputs.Imagem.value = desafio.imagem;
        node.inputs.Descricao.value = desafio.descricao;
        node.inputs.Resposta.value = desafio.resposta;
        node.inputs.DiaDisponibilidade.value = desafio.disponibilidade.dia;
        node.inputs.MesDiponibilidade.value = desafio.disponibilidade.mes_value;
        node.inputs.HoraDisponibilidade.value = desafio.disponibilidade.horario;
        node.inputs.HorarioExpiracao.value = desafio.horario_expiracao;
        node.inputs.DesbloqueiaCapitulo.value = desafio.desbloqueia_capitulo;
        node.inputs.CapituloRecomendado.value = desafio.capitulo_recomendado;
      });
    });

    baklava.editor.registerNodeType(Desafio); // Registre o tipo de nó Desafio

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
