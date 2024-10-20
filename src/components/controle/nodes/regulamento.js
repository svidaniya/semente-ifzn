import {
    defineNode,
    NumberInterface,
    SelectInterface,
    NodeInterface,
    IntegerInterface,
    TextareaInputInterface,
    TextInputInterface
  } from "baklavajs";
  
  export const Regulamento = defineNode({
    type: "Regulamento",
    title: "Regulamento",
    inputs: {
        OrdemLabel: () => new NodeInterface("Ordem do regulamento: ",""),
        Ordem: () => new IntegerInterface("Ordem",1,1,200),
        TituloLabel: () => new NodeInterface("Título do regulamento: ",""),
        Titulo: () => new TextInputInterface("Título",""),
        TextoLabel: () => new NodeInterface("Texto do regulamento: ",""),
        Texto: () => new TextareaInputInterface("Texto",""),
        ImagemLabel: () => new NodeInterface("Imagem do regulamento: ",""),
        ImagemURL: () => new SelectInterface("Imagem","logo2.svg",[{text:"Logo da semente",value:"logo2.svg"},{text:"Controle",value:"controle.png"},{text:"Trofeu",value:"trofeu.svg"}]),
    },
  });
  

  