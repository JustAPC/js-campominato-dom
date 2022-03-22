let grid = document.getElementById("grid");

let btn = document.getElementById("bottone");

let array = [];

let arrayBombe = [];


let difficoltà = 0;

btn.addEventListener ('click', function (){
    let difficoltà = document.getElementById("difficulty").value;
    console.log (difficoltà) 

    let container = document.getElementById("grid");

    container.classList.add("d-block")

    container.classList.remove("d-none")

    generatoreBox(difficoltà)
})

function generatoreBox (difficoltà) {
    let numeroBox = 0;
    
    if (difficoltà == 1) {
        numeroBox = 100;
    } else if (difficoltà == 2) {
        numeroBox = 81;
    } else {
        numeroBox = 49;
    }
    
    for (i=1; i <=numeroBox + 1; i++) {
        array.push(i);
    }

    shuffle(array)
    console.log (array)

    while (arrayBombe.length < 16) {
        const randomNumber = Math.floor(Math.random() * numeroBox) + 1;
        if (!arrayBombe.includes(randomNumber)) {
            arrayBombe.push(randomNumber);
        }
    }
    console.log(`I numeri con le bombe sono ${arrayBombe}`)

    grid.innerHTML = ""

    for (let i = 1; i <= numeroBox; i++) {
        let box = document.createElement("div");
        box.classList.add("box","d-flex","text-center","align-items-center","justify-content-center", "fw-bold")
        grid.appendChild(box)
        box.innerHTML = array [i]

        if (difficoltà == 1) {
            box.classList.add("easy")
        } else if (difficoltà == 2) {
            box.classList.add("medium")
        } else {
            box.classList.add("hard")
        }
    
        box.addEventListener("click",
            function colorOnClick(){
            const clickedNumber = parseInt(this.innerText);
            if (arrayBombe.includes(clickedNumber)){
                this.classList.add("bg-red")
                content.removeEventListener("click", colorOnClick())
            } else{
                this.classList.add("bg-blue")
            }
        })
    }
}

function shuffle (array) {
    array.sort ( () => ( Math.random () - 0.5 ))
}
