import { calculate } from "./calculate.js"
import { getHistory, setHistory } from "./history.js"

const theme = document.getElementById("theme")
const equals = document.getElementById("equals")
const clean = document.getElementById("clean")
const root = document.getElementById("root")
const remove = document.getElementById("remove")
const input = document.getElementById("input")
const historyList = document.getElementById("historyList")
let history = getHistory() || []
showHistory()
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
    let result = calculate(input.value)
    history.push(`${input.value}=${result}`)
    input.value = result
    setHistory(history)
    showHistory()
})

// set clear click handler
clean.addEventListener("click", () => {
    input.value = ""
    history = []
    setHistory([])
    showHistory()
})

// set root click handler
root.addEventListener("click", () => {
    let result = Math.sqrt(calculate(input.value))
    history.push(`√${input.value}=${result}`)
    input.value = result
    setHistory(history)
    showHistory()
})

// set remove click handler
remove.addEventListener("click", () => {
    input.value = input.value.slice(0, -1)
})

// handler that allows only numbers and operators
function handleInput(event) {
    const allowedChars = /[0-9=+\-*/^.]/;
    const inputChar = String.fromCharCode(event.charCode);
    const operators = ["+", "-", "*", "/", "^", "."]
    if (!allowedChars.test(inputChar)) {
        event.preventDefault();
    }
    else {
        if (operators.includes(inputChar) && operators.includes(input.value[input.value.length - 1])) {
            input.value = input.value.slice(0, -1) + inputChar
        }
        else {
            input.value += inputChar
        }
    }
}

// set input keypress handler
document.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === "=") {
        let result = calculate(input.value)
        history.push(`${input.value}=${result}`)
        input.value = result
        input.value.replace("=", "")
        setHistory(history)
        showHistory()
    }
    else if (event.key === "c") {
        input.value = ""
    }
    else {
        handleInput(event)
    }
})

function showHistory() {
    historyList.innerHTML = ""
    for (let item of history) {
        let li = document.createElement("li")
        li.innerHTML = item
        li.className = "m-3 rounded-lg p-2 dark:bg-gray-500 bg-gray-400"
        historyList.appendChild(li)
    }
}

