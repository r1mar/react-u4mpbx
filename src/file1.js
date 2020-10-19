import brain from "brain.js";

let network = new brain.NeuralNetwork();

let training = {
  input: {
    "Mönchen Gladbach": 1,
    "Wolfsburg": 1,
    "1. FC Köln": 0,
    "SGE": 0
  },
  output: {
    "Unentschieden": 1
  }
};