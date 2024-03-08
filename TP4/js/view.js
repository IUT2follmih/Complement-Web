/**
 * Objet constant représentant la vue.
 */
const view = {
  // Champ de la calculatrice
  calcInput: document.getElementById("zone_affichage"),

  // Bouton CE et BK
  ceBtn: document.querySelector("input[value='CE']"),
  backSpaceBtn: document.querySelector("input[value='←']"),
  invertBtn: document.querySelector("input[value='±']"),
  equalBtn: document.querySelector("input[value='=']"),

  // Boutons memory
  memoryRecallBtn: document.querySelector("input[value='MR']"),
  memoryClearBtn: document.querySelector("input[value='MC']"),
  memorySave: document.querySelector("input[value='MS']"),

  libreBtn: document.querySelectorAll(".bouton_libre"),
  editCheck: document.querySelector("#editionCheckbox")
};