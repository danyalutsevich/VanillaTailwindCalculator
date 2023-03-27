import { calculate } from "./calculate.js"

const theme = document.getElementById("theme")
const equals = document.getElementById("equals")
const clean = document.getElementById("clean")
const root = document.getElementById("root")
const remove = document.getElementById("remove")
const input = document.getElementById("input")

// change theme and icon
document.getElementsByClassName("changeTheme")[0].addEventListener("click", function () {
    document.documentElement.classList.toggle("dark")
    if (document.documentElement.classList.contains("dark")) {
        theme.innerHTML = "light_mode"
    } else {
        theme.innerHTML = "dark_mode"
    }
})

// set number click handler
for (let number of document.getElementsByClassName("number")) {
    number.addEventListener("click", () => {
        input.value += number.innerHTML
    })
}

// set operator click handler
for (let operator of document.getElementsByClassName("operator")) {
    operator.addEventListener("click", () => {
        input.value += operator.innerHTML
    })
}

// set equals click handler
equals.addEventListener("click", () => {
    input.value = calculate(input.value)
})

// set clear click handler
clean.addEventListener("click", () => {
    input.value = ""
})

// set root click handler
root.addEventListener("click", () => {
    input.value = Math.sqrt(calculate(input.value))
})

// set remove click handler
remove.addEventListener("click", () => {
    input.value = input.value.slice(0, -1)
})

// handler that allows only numbers and operators
function handleInput(event) {
    const allowedChars = /[0-9=+\-*/^.]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!allowedChars.test(inputChar)) {
        event.preventDefault();
    }
    else {
        input.value += inputChar
    }
}

// set input keypress handler
document.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === "=") {
        input.value = calculate(input.value)
        input.value.replace("=", "")
    }
    else if (event.key === "c") {
        input.value = ""
    }
    else {
        handleInput(event)
    }
})



