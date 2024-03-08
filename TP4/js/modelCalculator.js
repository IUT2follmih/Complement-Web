/**
 * Classe Calculator.
 * (Modèle représentant la calculatrice)
 */
class Calculator {
  /**
   * Expression actuelle de la calculatrice.
   * @type {string}
   */
  _input;

  /**
   * Mémoire de la calculatrice.
   * @type {{string|null}}
   */
  _memory;

  /**
   * Objet littéral contenant les boutons éditables de la calculatrice.
   * (Clé = ID du bouton, Valeur = Objet EditableButton associé)
   * @type {Object}
   */
  _editableButtons;

  /**
   * Constructeur de la classe Calculator.
   * @param {Object} editableBtns : Informations sur les boutons éditables.
   */
  constructor(editableBtns) {
    this._input = "";
    this._memory = null;

    // Initialisation des boutons éditables
    // (avec un ID qui commence par "libre" suivi d'un chiffre)
    this._editableButtons = {};
    for (let key in editableBtns) {
      let btn = new EditableButton(key, editableBtns[key]);
      this._editableButtons[key] = btn;
    }
  }

  /**
   * Retourne l'expression actuelle de la calculatrice.
   * @returns {string}
   */
  getInput() {
    return this._input;
  }

  /**
   * Met à jour l'expression actuelle de la calculatrice.
   * @param {string} expr : Nouvelle expression
   */
  setInput(expr) {
    this._input = expr;
  }

  /**
   * Vide l'entrée de la calculatrice.
   */
  clearInput() {
    this._input = "";
  }

  addToInput(value) {
    this._input += value;
  }

  reverseSign() {
    if (this._input.startsWith("-")) {
      this._input = this._input.slice(1);
    } else {
      this._input = "-" + this._input;
    }
  }

  setMemory() {
    let onlyNumRegEx = /^-?\d+[\.\d+]+$/;

    if (this._input = "") {
      throw new Error("Impossible d'enregistrer");
    }
    if (onlyNumRegEx.test(this._input) == false) {
      throw new Error("Impossible d'enregistrer valeur non numérique");
    }
    this._memory = this._input;
  }

  recallMemory() {
    if (this._memory != null) {
      this._input += this._memory;
    }
  }

  clearMemory() {
    this._memory = null;
  }

  saveStateToClient() {
    if (this._memory != null) {
      localStorage.setItem("memoryContent", this._memory);
    } else {
      localStorage.setItem("memoryContent", "");
    }

    let obj = {};
    for (let btn in this._editableButtons) {
      obj[btn] = this._editableButtons[btn].getValue();
    }

    let chaineJSON = JSON.stringify(obj);
    localStorage.setItem("editableButtonsContent", chaineJSON);
  }

  retrieveStateFromClient() {
    let memoryL = localStorage.getItem("memoryContent");
    let editableBtnsL = localStorage.getItem("editableButtonsContent");

    if (memoryL != "") {
      this._memory = memoryL;
    }

    if (editableBtnsL) {
      let obj = JSON.parse(editableBtnsL);
      for (let key in obj) {
        let btn = new EditableButton(key, obj[key]);
        this._editableButtons[key] = btn;
      }
    }
  }
}
