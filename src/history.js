

export function setHistory(value) {
    try {
        localStorage.setItem("history", JSON.stringify(value));
    }
    catch (e) {
        console.log(e);
    }

}

export function getHistory() {
    try {

        return JSON.parse(localStorage.getItem("history"));
    }
    catch (e) {
        console.log(e);
        return [];
    }

}
