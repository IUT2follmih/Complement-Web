// Invoquation du mode strict
// (Pour plus infos : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode)
"use strict";

/**
 * Classe Game
 * (Modèle du Jeu du Pendu)
 */
class Game {
  _gameInProgress = false;

  _wordToGuess;

  _usedLetters;

  _displayedWord;

  _nbErrorsAllowed = 0;

  _score = 0;

  /**
   * Lance une nouvelle partie (s'il n'y a pas déjà une partie en cours).
   */
  launchNewGame() {
    if(!this._gameInProgress){
      this._gameInProgress = true;
      this._wordToGuess = this.getNewWordObject().mot;
      console.log(this.getNewWordObject().nb_essais)
      this._nbErrorsAllowed = this.getNewWordObject;
      this._usedLetters = this._wordToGuess[0] + this._wordToGuess[this._wordToGuess.length - 1];
      this.updateWordToDisplay();
    } else {
      throw new Error("Une partie est déjà en cours");
    }
  }

  /**
   * Récupère un nouveau mot sous la forme d'un objet.
   * (Une 1ère version de cette méthode vous est fournie, mais vous devrez la modifier par la suite.)
   * @returns {object} Un objet contenant le mot et le nombre d'essais autorisés pour ce mot
   */
  getNewWordObject() {
    // Retourne (pour l'instant) le mot "ELEPHANT"
    return { mot: "ELEPHANT", nb_essais: 6 };

    // TODO Modifier en Partie 2 ...
  }

  /**
   * Met à jour le mot à afficher.
   * (Fonction fournie. À NE PAS MODIFIER.)
   */
  updateWordToDisplay() {
    this._displayedWord = this.generateWordToDisplay(
      this._usedLetters,
      this._wordToGuess
    );
  }

  /**
   * Retourne une chaine de caractères correspondant au mot dans lequel :
   * - les lettres non présentes dans lettersToDisplay sont remplacées par des "_"
   * - les lettres apparaissant dans lettersToDisplay apparaissent en clair
   * @param {string} lettersToDisplay : Lettres à afficher
   * @param {string} wordToGuess : Mot à trouver
   * @returns {string} Une chaine de la forme "E_E____T"
   */
  generateWordToDisplay(lettersToDisplay, wordToGuess) {
    let word ="";
    for(let i = 0; i < wordToGuess.length; i++){
      if(lettersToDisplay.includes(wordToGuess[i])){
        word += wordToGuess[i];
      } else {
        word += "_";
      }
    }
    return word;
  }

  /**
   * Joue une nouvelle lettre et retourne vrai si la partie est terminée.
   * @param {string} letter : La lettre jouée
   */
  playLetter(letter) {
    if(this._gameInProgress == true){
      if(this._usedLetters.includes(letter)) {
        console.log("La lettre a déjà été joué");
        throw new Error("La lettre a déjà été joué");
      } 

      this._usedLetters += letter;

      if(this._wordToGuess.includes(letter)){
        console.log("La lettre est dans le mot");
        this.updateWordToDisplay();
      } else {
        this._nbErrorsAllowed = this._nbErrorsAllowed - 1;
      }
    } else {
      throw new Error(`Aucune partie en cours`);
    }
  }

  /**
   * Sauvegarde l'état du jeu dans le LocalStorage.
   */
  saveState() {
    // TODO Compléter en Partie 3 ...
  }

  /**
   * Récupère l'état du jeu dans le LocalStorage
   * et met à jour le modèle à partir de celui-ci.
   */
  retrieveState() {
    // TODO Compléter en Partie 3 ...
  }
}
