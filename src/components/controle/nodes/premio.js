import {
    defineNode,
    NumberInterface,
    SelectInterface,
    NodeInterface,
    IntegerInterface,
    TextareaInputInterface,
    TextInputInterface
  } from "baklavajs";
  
  export const Premio = defineNode({
    type: "Premio",
    title: "Premiação",
    inputs: {
        PontosLabel: () => new NodeInterface("Pontos necessários:", ""),
        Pontos: () => new IntegerInterface("Pontos", 0, 0, 10000),
        PremiosLabel: () => new NodeInterface("Premios:", ""),
        Premios: () => new TextareaInputInterface("Premios", ""),
    }
  });
  