'use strict';

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

export {Slider};