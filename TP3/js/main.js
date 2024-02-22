// Invocation du mode strict
// (Pour plus infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode)
"use strict";

// ### Initialisation du modèle ###
// (à partir du contenu des boutons éditables)
const editableBtnsInfos = {
  libre1: "%",
  libre2: "",
  libre3: "",
  libre4: "",
  libre5: "",
  libre6: "",
};
let calculator = new Calculator(editableBtnsInfos);
calculator.retrieveStateFromClient();

/* (La vue est initialisée dans le fichier "view.js"
    et accessible via la constante "view") */

// ### Initialisation de l'affichage des boutons éditables ###
for (let key of Object.keys(calculator._editableButtons)) {
  // La clé de l'objet correspond à un ID de bouton dans la page
  let btnElt = document.getElementById(key);
  // Si le bouton existe bien, on met à jour sa valeur affichée
  if (btnElt) {
    btnElt.value = calculator._editableButtons[key].getValue();
  }
}

// ### Initialisation des listeners ###
// - Gestion de la saisie au clavier
view.calcInput.addEventListener("keyup", (evt) => {
  // Informe le modèle du changement
  calculator.setInput(evt.target.value);
  // (La vue n'a pas besoin d'être mis à jour ici)
});

// - Gestion du bouton CE
// (qui vide la champ de la calculatrice)
view.ceBtn.addEventListener("click", function () {
  // Informe le modèle du changement
  calculator.clearInput();
  // Mise à jour de l'affichage
  view.calcInput.value = calculator.getInput();
});

view.backSpaceBtn.addEventListener("click", function () {
  // Informe le modèle du changement
  calculator.setInput(calculator.getInput().slice(0, -1));
  // Mise à jour de l'affichage
  view.calcInput.value = calculator.getInput();
});

let classicClickListener = function (evt) {
  // Informe le modèle du changement
  calculator.addToInput(evt.target.value);
  // Mise à jour de l'affichage
  view.calcInput.value = calculator.getInput();
};

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("bouton_simple")) {
    classicClickListener(evt);
  }
});

view.invertBtn.addEventListener("click", function () {
  // Informe le modèle du changement
  calculator.reverseSign();
  // Mise à jour de l'affichage
  view.calcInput.value = calculator.getInput();
});

view.equalBtn.addEventListener("click", function () {
  // Informe le modèle du changement
  try {
    let result = eval(view.calcInput.value);
    calculator.setInput(result);
  } catch (e) {
    alert("Erreur dans l'expression");
  }
  // Mise à jour de l'affichage
  view.calcInput.value = calculator.getInput();
});

// ### Initialisation des boutons de la mémoire ##
view.memoryRecallBtn.addEventListener("click", function () {
  calculator.recallMemory();
  view.calcInput.value = calculator.getInput();
  calculator.saveStateToClient();
});

view.memorySave.addEventListener("click", function () {

  try {
    let result = eval(view.calcInput.value);
    calculator.setMemory();
    calculator.saveStateToClient();
  } catch (e) {
    alert("Erreur dans l'expression");
  }
});

view.memoryClearBtn.addEventListener("click", function () {
  calculator.clearMemory();
  calculator.clearInput();
  view.calcInput.value = calculator.getInput();
  calculator.saveStateToClient();
});

for (let btn of view.libreBtn) {
  btn.addEventListener("click", function () {
    if(!view.editCheck.checked){
      btn.type = 'button';
      calculator.setInput(calculator.getInput() + this.value);
      view.calcInput.value = calculator.getInput();
    } else{
      btn.type = 'text';
      
      btn.addEventListener('input', function(){
        calculator._editableButtons[btn.id].setValue(btn.value);
        calculator.saveStateToClient();
      });
      
      btn.addEventListener('blur', function(){
        btn.type = 'button';
        btn.value = calculator._editableButtons[btn.id].getValue();
        calculator.saveStateToClient();
      });
    }
  });

  
}