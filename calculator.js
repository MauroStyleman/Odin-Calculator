function calculator() {
    let previousText = document.querySelector('.previous');
    let currentText = document.querySelector('.current');
    const numberBtns = document.querySelectorAll('.num')
    const operationBtns = document.querySelectorAll('.operation');
    const deleteBtn = document.querySelector('.delete');
    const clearBtn = document.querySelector('.clear');
    const equalBtn = document.querySelector('.equals');
    const decimalBtn = document.querySelector('.decimal');

    let current = "";
    let previous = "";
    let operation = "";
    window.addEventListener("keydown", handleKeyPress);
    deleteBtn.addEventListener("click", handleDelete);
    equalBtn.addEventListener('click', () => {
        if (current !== "" || previous !== "") {
            calculate()
            previous = "";
        }
    });
    clearBtn.addEventListener('click', clear)
    decimalBtn.addEventListener('click', addDecimal)

    function showNumber() {
        numberBtns.forEach(btn => {
            btn.addEventListener('click', (e) => (
                handleNumber(e.target.textContent)
            ));
        });
    }

    function handleNumber(number) {
        if (current.length < 15) {
            current += number;
            currentText.textContent = current;
        }
    }

    function showOperation() {
        operationBtns.forEach(btn => {
            btn.addEventListener('click', (e) => (
                handleOperation(e.target.textContent)
            ));
        });
    }

    function handleOperation(operator) {
        operation = operator;
        previous = current;
        previousText.textContent = previous + " " + operator;
        current = "";
        currentText.textContent = current;
    }

    function clear() {
        previous = "";
        current = "";
        previousText.textContent = previous;
        currentText.textContent = current;
    }

    function calculate() {
        previous = Number(previous);
        current = Number(current);

        if (operation === "+") {
            previous += current;

        } else if (operation === "-") {
            previous -= current;

        } else if (operation === "*") {
            previous *= current;

        } else if (operation === "/") {
            if (current <= 0) {
                previous = "Error"
                currentText.textContent = previous
                operation = ""
                return;
            }
            previous /= current;

        }
        previousText.textContent = "";
        currentText.textContent = previous;
        current = previous;
    }

    function addDecimal() {
        if (!current.includes('.')) {
            current += '.';
            currentText.textContent = current;
        }
    }

    function handleDelete() {
        if (current !== "") {
            current = current.slice(0, -1);
            currentText.textContent = current;
            if (current === "") {
                currentText.textContent = "0";
            }
        }
        if (current === "" && previous !== "" && operation === "") {
            previous = previous.slice(0, -1);
            currentText.textContent = previous;
        }
    }

    function handleKeyPress(e) {
        e.preventDefault();
        if (e.key >= 0 && e.key <= 9) {
            handleNumber(e.key);
        }
        if (
            e.key === "Enter" ||
            (e.key === "=" && current !== "" && previous !== "")
        ) {
            calculate();
        }
        if (e.key === "+" || e.key === "-" || e.key === "/") {
            handleOperation(e.key);
        }
        if (e.key === "*") {
            handleOperation("*");
        }
        if (e.key === ".") {
            addDecimal();
        }
        if (e.key === "Backspace") {
            handleDelete();
        }
    }

    showNumber()
    showOperation();

}

calculator()
