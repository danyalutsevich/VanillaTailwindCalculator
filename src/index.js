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
    history = []
    setHistory([])
    showHistory()
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
    if(input.value.slice(-1).match(/[.]/)) {
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

// set plusminus click handler
plusminus.addEventListener("click", () => {
    input.value = -calculate(input.value)
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

