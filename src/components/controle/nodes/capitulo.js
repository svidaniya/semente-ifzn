import {
    defineNode,
    NumberInterface,
    SelectInterface,
    NodeInterface,
    IntegerInterface,
    TextareaInputInterface,
    TextInputInterface,
    CheckboxInterface
  } from "baklavajs";
  
  export const Capitulo = defineNode({
    type: "Capitulo",
    title: "Capitulo",
    inputs: {
       NumeroLabel: () => new NodeInterface("Número:", ""),
       Numer: () => new IntegerInterface("Número:", 1, 1, 25),
       TituloLabel: () => new NodeInterface("Título:", ""),
       Titulo: () => new TextInputInterface("Título:",""),
       ArquivoLabel: () => new NodeInterface("URL DO ARQUIVO (GOOGLE DRIVE):", ""),
       Arquivo: () => new TextInputInterface("Arquivo:", ""),
       IconeLabel: () => new NodeInterface("Icone:", ""),
       Icone: () => new SelectInterface("Icone","logo2.svg",[{text:"Logo da semente",value:"logo2.svg"},{text:"Controle",value:"controle.png"},{text:"Trofeu",value:"trofeu.svg"}]),
        Desbloqueado: () => new CheckboxInterface("Desbloqueado",false),
      }
  });
  