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
    this.saveStateToClient();
  }

  /**
   * Vide l'entrée de la calculatrice.
   */
  clearInput() {
    this._input = "";
    this.saveStateToClient();
  }

  reverseTheSign() {
    if (this._input.charAt(0) == "-") {
      this._input = this._input.slice(1);
    } else {
      this._input = "-" + this._input;
    }
    this.saveStateToClient();
  }

  eval() {
    try {
      this._input = eval(this._input);
      this.saveStateToClient();
    }
    catch (err) {
      alert("Erreur!\n" + err);
    }
  }

  getMem() {
    if (this._memory == null) {
      return ("");
    } else {
      return this._memory;
    }
  }

  setMem() {
    let onlyNumRegEx = /^-?\d+(\.\d+)?$/;
    if (this._input == "") {
      throw new Error("Impossible d'enregistrer la valeur en mémoire : Champ vide")
    }
    if (onlyNumRegEx.test(this._input) == false) {
      throw new Error("Impossible d'enregistrer la valeur en mémoire : Valeur non numérique")
    }
    this._memory = this._input;
    this.saveStateToClient();
  }

  resMem() {
    this._memory = null;
    this.saveStateToClient();
  }

  saveStateToClient() {
    let state = {
      input: this._input,
      memory: this._memory,
      editableButtons: {}
    };

    for (let key in this._editableButtons) {
      state.editableButtons[key] = this._editableButtons[key].getValue();
    }

    localStorage.setItem("calcState", JSON.stringify(state));
  }

  retrieveStateFromClient() {
    if (localStorage.getItem("calcState") != null) {
      let state = JSON.parse(localStorage.getItem("calcState"));

      if (state.input != null) {
        this._input = state.input;
      }
      if (state.memory != null) {
        this._memory = state.memory;
      }

      if (state.editableButtons != null) {
        for (let key in state.editableButtons) {
          this._editableButtons[key].setValue(state.editableButtons[key]);
        }
      }

    }
  }

  stateSaveToServer() {
    let state = {
      editableButtons: {},
      memory: this._memory
    }
    for (let key in this._editableButtons) {
      state.editableButtons[key] = this._editableButtons[key].getValue();
    }

    fetch("api/save-calculator-state.php", {
      method: "POST",
      body: "state=" + JSON.stringify(state),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then((resObj) => {
        if (!resObj.ok) { console.log('Erreur HTTP : ' + resObj.status); }
      })
      .catch((err) => console.error(err));

  }

  async retrieveStateFromServer() {
    try {
      let resObj = await fetch("api/get-calculator-state.php");
      if (!resObj.ok) { console.log('Erreur HTTP : ' + resObj.status); }
      let state = await resObj.json();
      if (state.memory != null) {
        this._memory = state.memory;
      }

      if (state.editableButtons != null) {
        for (let key in state.editableButtons) {
          this._editableButtons[key].setValue(state.editableButtons[key]);
        }
      }
    }
    catch (err) {
      console.error(err);
    }
  }
}
