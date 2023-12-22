function createCalculator() {
  return {
    display: document.querySelector('.display'),
    btnClear: document.querySelector('.btn-clear'),

    init() {
      this.buttonClick();
      this.keyPress();
    },

    calculate() {
      let calc = this.display.value;

        calc = eval(calc);
        this.display.value = calc;
    },

    clearDisplay() {
      this.display.value = 0;
    },

    delete() {
      const value = this.display.value;

      if (value.length === 0) {
        this.display.value = 0;
      } else if (value == 0) {
        return;
      } else {
        const lastChar = value[value.length - 1];
        if (value.length === 1) {
          if (lastChar != 0) {
            this.display.value = 0;
          }
        } else {
          this.display.value = value.slice(0, -1);
        }
      }
    },

    keyPress() {
      this.display.addEventListener('keydown', event => {
        const keyPressed = event.key;
        const value = this.display.value;

        if (keyPressed == 'Backspace') {
          event.preventDefault();
          if (value == 0) {
            return;
          } else {
            const lastChar = value[value.length - 1];
            if (value.length === 1) {
              if (lastChar != 0) {
                this.display.value = 0;
              }
            } else {
              this.display.value = value.slice(0, -1);
            }
          }
        }

        if (/[0-9]/.test(keyPressed)) {
          if (this.display.value == 0) {
            this.display.value = keyPressed.slice(0, -1);
          }
        }

        if (!/[0-9().+*/-]/.test(keyPressed)) {
          event.preventDefault();
        }

        if (keyPressed === 'Enter' || keyPressed === '=') {
          this.calculate();
        }

        if (value.includes('/') || value.includes('*') ||
        value.includes('+') || value.includes('-')) {
          if (keyPressed === '/' || keyPressed === '*' ||
          keyPressed === '+' || keyPressed === '-') {
            const lastOperator = value.slice(-1);
            if (lastOperator === keyPressed) {
              event.preventDefault();
            }
          }
        }

        if (this.display.value.includes('.')) {
          if (keyPressed === '.') {
            event.preventDefault();
          }
        }
      })
    },

    buttonClick() {
      let lastOperator;
      document.addEventListener('click', event => {
        const element = event.target;
        const value = this.display.value;

        if (element.classList.contains('btn-num')) {
          if (this.display.value == 0) {
            return this.display.value = element.innerText;
          }
          this.displayButton(element.innerText);
        }

        if (element.classList.contains('btn-clear')) {
          this.clearDisplay();
        }

        if (element.classList.contains('btn-del')) {
          this.delete()
        }

        if (element.classList.contains('btn-eq')) {
          this.calculate();
        }

        if (element.classList.contains('btn-dot')) {
          if (value.includes('.')) {
            return;
          } else { 
            this.displayButton(element.innerText);
          }
        }

        if (element.classList.contains('btn-espc')) {
          if (value.endsWith(lastOperator)) {
            return;
          } else {
            lastOperator = element.innerText;
            this.displayButton(element.innerText);
          }
        }
      });
    },

    displayButton(value) {
        this.display.value += value;
    },
  };
}

const calculator = createCalculator();
calculator.init();