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
      this.display.value = '';
    },

    delete() {
      this.display.value = this.display.value.slice(0, -1);
    },

    keyPress() {
      this.display.addEventListener('keypress', event => {
        const keyPressed = event.key;

      if (!/[0-9().+*/-]/.test(keyPressed)) {
        event.preventDefault();
      }

      if (keyPressed === 'Enter' || keyPressed === '=') {
        this.calculate();
      }

      if (this.display.value.includes('/') || this.display.value.includes('*') ||
      this.display.value.includes('+') || this.display.value.includes('-') ||
      this.display.value.length === 0) {
        if (keyPressed === '/' || keyPressed === '*' ||
        keyPressed === '+' || keyPressed === '-') {
          event.preventDefault();
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
      document.addEventListener('click', event => {
        const element = event.target;

        if (element.classList.contains('btn-num')) {
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
          if (this.display.value.includes('.')) {
            return;
          } else { 
            this.displayButton(element.innerText);
          }
        }

        if (element.classList.contains('btn-espc')) {
          if (this.display.value.includes('/') || this.display.value.includes('*') ||
          this.display.value.includes('+') || this.display.value.includes('-') ||
          this.display.value.length === 0) {
            return;
          } else {
            this.displayButton(element.innerText);
          }
        }
      });
    },

    displayButton(value) {
        this.display.value += value;
    }
  };
}

const calculator = createCalculator();
calculator.init();