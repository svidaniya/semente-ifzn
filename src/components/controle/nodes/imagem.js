import {
    defineNode,
    NumberInterface,
    SelectInterface,
    NodeInterface,
    IntegerInterface,
    TextareaInputInterface,
    TextInputInterface,
  } from "baklavajs";
  
  export const Imagem = defineNode({
    type: "Imagem",
    title: "Imagem",
    inputs: {
        URLLabel : () => new NodeInterface("URL da imagem (GOOGLE DRIVE):", ""),
        URL: () => new TextInputInterface("URL",""),
        NomeLabel : () => new NodeInterface("Nome:", ""),
        Nome: () => new TextInputInterface("Nome",""),
    }
  });
  