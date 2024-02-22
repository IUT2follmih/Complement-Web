let randomIntegerInRange = (min = 0, max = 100) => {
    let randVal = Math.random();
    let tempVal = Math.floor(randVal * (max - min + 1));
    return tempVal + min;
};


let promptNumber = (msg) => {
    let guess = NaN;
    while (isNaN(guess)) {
        guess = parseInt(prompt(msg));
    }
    return guess;
};

let mysteryNumber = randomIntegerInRange();
let guess = promptNumber("Devinez le nombre mystère :")

while (guess != mysteryNumber) {
    if (guess < mysteryNumber) {
        guess = prompt("C'est plus ! Essayez encore :");
    } else {
        guess = prompt("C'est moins ! Essayez encore :");
    }
}

alert("Bravo, vous avez trouvé le nombre mystère !");