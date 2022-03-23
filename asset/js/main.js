let grid = document.getElementById("grid");

let btn = document.getElementById("bottone");

let array = [];

let arrayBombe = [];

let attempts = [];

console.log (attempts)

let difficoltà = 0;

btn.addEventListener ('click', function (){
    let difficoltà = document.getElementById("difficulty").value;

    let container = document.getElementById("grid");

    container.classList.add("d-block")

    container.classList.remove("d-none")

    generatoreBox(difficoltà)
})

function generatoreBox (difficoltà) {
    let numeroBox = 0;

    let boxWidth = 0;

    let bombsNumber = 16;
    
    if (difficoltà == 1) {
        numeroBox = 100;
        boxWidth = 10;
    } else if (difficoltà == 2) {
        numeroBox = 81;
        boxWidth = 9;
    } else {
        numeroBox = 49;
        boxWidth = 7;
    }

    
    for (i=1; i <= numeroBox; i++) {
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
            const sideLength = `calc (100% / ${boxWidth})`
            box.style.width = sideLength;
            box.style.height = sideLength;
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
        
            box.addEventListener("click", handleCellClick)
        }
    }


function shuffle (array) {
    array.sort ( () => ( Math.random () - 0.5 ))
}

function endGame () {
    let maxAttempts = (numeroBox - bombsNumber);

    const squares = document.querySelectorAll (".box");
    
    for (let i = 1, squaresNum = squares.length; i <= squaresNum; i++) {
        const square = squares [i - 1];
        
        if (arrayBombe.includes(i)) {
            square.classList.add ("bg-red");
        }
        square.removeEventListener ("click", handleCellClick)
    }

    const risultato = document.getElementById("result-message")

    let message = `${attempts.length}`

    if (attempts.length < maxAttempts) {
        let message = `Peccato, hai perso dopo aver azzeccato ${attempts.length} tentativi.`
    }

    risultato.innerHTML = `${message}`
}

function handleCellClick (event) {
    let maxAttempts = (numeroBox - bombsNumber);

    const clickedNumber = parseInt(this.innerText);
    if (arrayBombe.includes(clickedNumber)){
        endGame()
    } else if (!attempts.includes(clickedNumber)){
        this.classList.add("bg-blue")
        attempts.push(clickedNumber);
        this.removeEventListener ("click", handleCellClick);

        if (attempts.length === maxAttempts) {
            endGame ()
        }
    }
}


