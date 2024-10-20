import Desafio from "@/views/desafio.vue";
import Pontuacao from "@/views/pontuacao.vue";
import {
    defineNode,
    NumberInterface,
    SelectInterface,
    NodeInterface,
    TextareaInputInterface,
    TextInputInterface,
    IntegerInterface,
    ButtonInterface
  } from "baklavajs";

  export const Evento = defineNode({
    type: "Evento",
    title: "Evento",
    inputs: {
      Codigo : () => new NodeInterface("Código: ",""),
      TituloLabel : () => new NodeInterface("Título do evento: ",""),
      Titulo: () => new TextInputInterface("Título do evento",""),
      SubTituloLabel: () => new NodeInterface("Subtítulo do evento: ",""),
      SubTitulo: () => new TextInputInterface("Subtítulo do evento",""),
      OrganizadorLabel: () => new NodeInterface("Organizador do evento: ",""),
      Organizador: () => new TextInputInterface("Organizador do evento",""),
      LocalLabel: () => new NodeInterface("Local do evento: ",""),
      Local: () => new TextInputInterface("Local do evento",""),
      DiaLabel : () => new NodeInterface("Dia: ",""),
      Dia : () => new IntegerInterface("Dia",1,1,31),
      MesLabel : () => new NodeInterface("Mês: ",""),
      Mes : () => new SelectInterface("Mês", 1, [
        { text: "Janeiro", value: 1 },
        { text: "Fevereiro", value: 2 },
        { text: "Março", value: 3 },
        { text: "Abril", value: 4 },
        { text: "Maio", value: 5 },
        { text: "Junho", value: 6 },
        { text: "Julho", value: 7 },
        { text: "Agosto", value: 8 },
        { text: "Setembro", value: 9 },
        { text: "Outubro", value: 10 },
        { text: "Novembro", value: 11 },
        { text: "Dezembro", value: 12 }
    ]),
      HorarioInicioLabel: () => new NodeInterface("Horário de início: ",""),
      HorarioInicio: () => new TextInputInterface("Horário de início",""),
      HorarioTerminoLabel: () => new NodeInterface("Horário de término: ",""),
      HorarioTermino: () => new TextInputInterface("Horário de término",""),
      PontuacaoLabel: () => new NodeInterface("Pontuação por participação: ",""),
      Pontuacao: () => new IntegerInterface("Pontuação",0,0,9000),
      DesafioLabel: () => new NodeInterface("Desafio Código:: ",""),
      Desafio: () => new IntegerInterface("Desafio",0,1,9999999999),
      InformacoesAdicionaisLabel: () => new NodeInterface("Informações adicionais: ",""),
      InformacoesAdicionais: () => new TextareaInputInterface("Informações adicionais",""),
    }
  });
  