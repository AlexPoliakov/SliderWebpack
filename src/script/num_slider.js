'use strict';

class NumericInput {
  constructor(options) {
    this.elem = options.elem;
    this.slider = document.querySelector(`.slider`);
    this.thumb = document.querySelector(`.slider__thumb`);

    this.checkValue = this.checkValue.bind(this);
    this.inputNum = this.inputNum.bind(this);
    this.setThumb = this.setThumb.bind(this);
    this.elem.addEventListener(`keypress`, this.inputNum);
  }

  inputNum(event) {
    this.target = event.target;

    if (!isFinite(String.fromCharCode(event.keyCode))) {
      event.preventDefault();
    } else {
      this.elem.addEventListener(`input`, this.checkValue);
    }
  }

  checkValue() {
    if (this.elem.value > 100) this.elem.value = 100;
    this.setThumb(this.elem.value);
  }

  setThumb(num) {
    this.length =
      num * this.slider.offsetWidth / 100 - this.thumb.offsetWidth / 2;
    if (this.length < 0) this.length = 0;

    this.eventInput = new CustomEvent(`setlength`, {
      bubbles: true,
      detail: {
        length: `${this.length}px`,
      },
    });

    this.elem.dispatchEvent(this.eventInput);
  }
}

export { NumericInput };
