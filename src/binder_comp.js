`use strict`;
import Slider from './slider.js';
import NumericInput from './num_slider.js'
import '../style/src.css';

export class BinderComponent {
    constructor(option) {
        this.elem = option.elem;
        this.sliderElem = this.elem.querySelector(`.slider`);
        this.thumbElem = this.elem.querySelector(`.slider__thumb`);

        this.sliderComponent = new Slider({elem: this.elem});
        this.numComponent = new NumericInput({elem: this.elem.querySelector(`.slider_show`)});

        this.setValueInInput = this.setValueInInput.bind(this);
        this.setThumb = this.setThumb.bind(this);
        this.halfVolume = this.halfVolume.bind(this);

        this.elem.addEventListener(`setting`, this.setValueInInput);
        this.elem.addEventListener(`setlength`, this.setThumb);
        this.elem.addEventListener(`click`, this.halfVolume);
    }

    setValueInInput(event) {
        this.elem.querySelector(`.slider_show`).value = event.detail.value;
    }

    setThumb(event) {
        this.elem.querySelector(`.slider__thumb`).style.left = event.detail.length;
    }

    halfVolume(event) {
        this.target = event.target;
        if (!this.target.classList.contains(`slider_but`)) return;
        this.sliderComponent.setValue((this.sliderElem.offsetWidth - this.thumbElem.offsetWidth) / 2);
    }

}

new BinderComponent({elem: document.querySelector(`.box_slider`)});
