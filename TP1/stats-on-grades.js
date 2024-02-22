const grades = [];

console.log(grades)
document.querySelector("#addGradeBtn")?.addEventListener("click", () => {
    let guess = parseFloat(prompt("Rentrer la note :"));
    while (guess < 0 & guess > 20){
        guess = parseFloat(prompt("La note n'est pas valide :"));
    }
    grades.push(guess);
    console.log(grades);
    document.querySelector("ul").innerHTML += "<li>" + guess + "</li>";
});
