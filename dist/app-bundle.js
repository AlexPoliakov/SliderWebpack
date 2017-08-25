webpackJsonp([0],{

/***/ "../style/src.css":
/*!************************!*\
  !*** ../style/src.css ***!
  \************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./binder_comp.js":
/*!************************************!*\
  !*** ./binder_comp.js + 2 modules ***!
  \************************************/
/*! exports provided:  */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is an entry point */
/*! ModuleConcatenation bailout: Cannot concat with ../style/src.css (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./slider.js


class Slider {
    constructor(options) {
        this._elem = options.elem;
        this._elemCapture = this._elemCapture.bind(this);
        this._zeroingOut = this._zeroingOut.bind(this);
        this._moveAt = this._moveAt.bind(this);
        this._dragstart = this._dragstart.bind(this);
        this._elem.addEventListener(`mousedown`, this._elemCapture);
        this.setValue = this.setValue.bind(this);

        this._thumb = this._elem.querySelector(`.slider__thumb`);
        this._slider = this._elem.querySelector(`.slider`);
        this._html = document.documentElement;
    }

    _elemCapture(event) {
        this._target = event.target;
        this._event = event;

        this._target.addEventListener(`dragstart`, this._dragstart);

        if(!this._target.classList.contains(`slider__thumb`)) return;

        this._slider.addEventListener(`mousemove`, this._moveAt);
        this._html.addEventListener(`mouseup`, this._zeroingOut);

        this._coordsThumb = this._getCoords(this._target);
        this._shiftX = this._event.pageX - this._coordsThumb.left;
    }

    _moveAt(event) {
        this._event = event;
        this._target = event.target;

        if(!this._target.classList.contains(`slider`)) return;

        this._sliderCoords = this._getCoords(this._slider);
        this._leftThumb = this._event.pageX - this._sliderCoords.left - this._shiftX;

        if (this._leftThumb < 0) this._leftThumb = 0;

        this._rightThumb = this._slider.offsetWidth - this._thumb.offsetWidth;

        if (this._leftThumb > this._rightThumb) {
            this._leftThumb = this._rightThumb;
        }

        this.setValue(this._leftThumb);
    }

    setValue(value) {
        this._thumb.style.left = `${value}px`;
        this.numeric = Math.round(value  / (this._slider.offsetWidth - this._thumb.offsetWidth) * 100);

        this.valueSlider = new CustomEvent(`setting`, {
            bubbles: true,
            detail: {
                value: this.numeric,
            }
        });

        this._slider.dispatchEvent(this.valueSlider);
    }

    _zeroingOut() {
        this._slider.removeEventListener(`mousemove`, this._moveAt);
        this._html.removeEventListener(`mouseup`, this._zeroingOut);
    }

    _dragstart() {
        event.preventDefault();
    }

    _getCoords(elem) {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            bottom: box.bottom + pageYOffset,
            left: box.left + pageXOffset,
            right: box.right + pageXOffset
        };

    }
}


// CONCATENATED MODULE: ./num_slider.js


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

        if(!isFinite(String.fromCharCode(event.keyCode))) {
            event.preventDefault();
        }else {
            this.elem.addEventListener(`input`, this.checkValue);
        }
    }

    checkValue() {
       if (this.elem.value > 100) this.elem.value = 100;
       this.setThumb(this.elem.value);
    }

    setThumb(num) {
        this.length = (num   * this.slider.offsetWidth) / 100 - this.thumb.offsetWidth / 2;
        if (this.length < 0) this.length = 0;

        this.eventInput = new CustomEvent(`setlength`, {
            bubbles: true,
            detail: {
                length: `${this.length}px`
            }
        });

        this.elem.dispatchEvent(this.eventInput);
    }
}


// EXTERNAL MODULE: ../style/src.css
var src = __webpack_require__("../style/src.css");
var src_default = /*#__PURE__*/__webpack_require__.n(src);

// CONCATENATED MODULE: ./binder_comp.js






class binder_comp_BinderComponent {
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

new binder_comp_BinderComponent({elem: document.querySelector(`.box_slider`)});


/***/ })

},["./binder_comp.js"]);