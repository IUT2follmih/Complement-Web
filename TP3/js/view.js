/**
 * Objet constant représentant la vue.
 */
const view = {
  // Champ de la calculatrice
  calcInput: document.getElementById("zone_affichage"),

  // Bouton CE
  ceBtn: document.querySelector("input[value='CE']"),

  bkBtn: document.querySelector("input[title='Retour arrière (Backspace)']"),

  simpleBtns: document.querySelectorAll(".bouton_simple"),

  libreBtns: document.querySelectorAll(".bouton_libre"),

  revBtn: document.querySelector("input[title='Plus Minus']"),

  eqBtn: document.querySelector("input[value='=']"),
  
  msBtn: document.querySelector("input[value='MS']"),
  
  mrBtn: document.querySelector("input[value='MR']"),

  mcBtn: document.querySelector("input[value='MC']"),

  editCheck: document.querySelector("#editionCheckbox")
};