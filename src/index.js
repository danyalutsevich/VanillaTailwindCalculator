import { calculate } from "./calculate.js"
import { getHistory, setHistory } from "./history.js"

const theme = document.getElementById("theme")
const equals = document.getElementById("equals")
const clean = document.getElementById("clean")
const sqrt = document.getElementById("sqrt")
const remove = document.getElementById("remove")
const input = document.getElementById("input")
const dot = document.getElementById("dot")
const historyList = document.getElementById("historyList")
const clearHistory = document.getElementById("clearHistory")
const hideHistory = document.getElementById("hideHistory")

let history = getHistory() || []
showHistory()

let isDotSet = false
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
        let numbers = input.value.split(/[-+*/^]/)
        if (input.value.length > 0 // input is not empty
            && numbers[numbers.length - 1] == 0 // last number is 0
            && !isDotSet // dot is not set
            && !input.value.slice(-1).match(/[+\-*/^]/)) { // last char is not operator
            input.value += "." + number.innerHTML
            return
        }
        input.value += number.innerHTML
    })
}

// set operator click handler
for (let operator of document.getElementsByClassName("operator")) {
    operator.addEventListener("click", () => {
        // if last char is operator, replace it with new operator
        if (input.value.slice(-1).match(/[+\-*/^]/) && operator.innerHTML.match(/[+\-*/^]/)) {
            input.value = input.value.slice(0, -1) + operator.innerHTML
        }
        else {
            input.value += operator.innerHTML
        }
        isDotSet = false
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
})

// set clear history click handler
clearHistory.addEventListener("click", () => {
    history = []
    setHistory([])
    showHistory()
})

// set hide history click handler
hideHistory.addEventListener("click", () => {
    historyList.classList.toggle("hidden")
    hideHistory.innerHTML = historyList.classList.contains("hidden") ? "keyboard_arrow_left" : "keyboard_arrow_right"
})

// set root click handler
sqrt.addEventListener("click", () => {
    let result = Math.sqrt(calculate(input.value))
    history.push(`√${input.value}=${result}`)
    input.value = result
    setHistory(history)
    showHistory()
})

// set remove click handler
remove.addEventListener("click", () => {
    if (input.value.slice(-1).match(/[.]/)) {
        isDotSet = false
    }
    input.value = input.value.slice(0, -1)
})

// set dot click handler
dot.addEventListener("click", () => {
    // if last char is operator, add 0 before dot
    if (input.value.slice(-1).match(/[+\-*/^]/) || input.value.slice(-1) === "") {
        input.value += "0."
        return
    }  // if last char is dot, do nothing
    else if (input.value.slice(-1).match(/[.]/)) {
        return
    } // if dot is already set, do nothing
    else if (isDotSet) {
        return
    }
    // else add dot
    input.value += "."
    isDotSet = true
})

// handler that allows only numbers and operators
function handleInput(event) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '^', '.'];
    const lastChar = input.value.slice(-1);

    if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
        return;
    }
    // if last char is operator, replace it with new operator
    if (lastChar.match(/[+\-*/^]/) && event.key.match(/[+\-*/^]/)) {
        input.value = input.value.slice(0, -1) + event.key;
    }
    else {
        input.value += event.key;
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
    else if (event.key >= 0 && event.key <= 9) {
        let numbers = input.value.split(/[-+*/^]/)
        if (input.value.length > 0 // input is not empty
            && numbers[numbers.length - 1] == 0 // last number is 0
            && !isDotSet // dot is not set
            && !input.value.slice(-1).match(/[+\-*/^]/)) { // last char is not operator
            input.value += "." + event.key
            return
        }
        input.value += event.key

    }
    else if (event.key === ".") {
        dot.dispatchEvent(new Event("click"))
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

