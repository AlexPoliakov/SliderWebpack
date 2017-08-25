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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vc3R5bGUvc3JjLmNzcyIsIndlYnBhY2s6Ly8vLi9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbnVtX3NsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9iaW5kZXJfY29tcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsTUFBTTtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyRkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixZQUFZO0FBQ3ZDO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7Ozs7Ozs7O0FDMUNBOztBQUVlO0FBQ007QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkMsZ0JBQWdCO0FBQzNELDhDQUE4Qyw4Q0FBOEM7O0FBRTVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUNBQXFCLDRDQUE0QyIsImZpbGUiOiJhcHAtYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zdHlsZS9zcmMuY3NzXG4vLyBtb2R1bGUgaWQgPSAuLi9zdHlsZS9zcmMuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgU2xpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2VsZW0gPSBvcHRpb25zLmVsZW07XG4gICAgICAgIHRoaXMuX2VsZW1DYXB0dXJlID0gdGhpcy5fZWxlbUNhcHR1cmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5femVyb2luZ091dCA9IHRoaXMuX3plcm9pbmdPdXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fbW92ZUF0ID0gdGhpcy5fbW92ZUF0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2RyYWdzdGFydCA9IHRoaXMuX2RyYWdzdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9lbGVtLmFkZEV2ZW50TGlzdGVuZXIoYG1vdXNlZG93bmAsIHRoaXMuX2VsZW1DYXB0dXJlKTtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZSA9IHRoaXMuc2V0VmFsdWUuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLl90aHVtYiA9IHRoaXMuX2VsZW0ucXVlcnlTZWxlY3RvcihgLnNsaWRlcl9fdGh1bWJgKTtcbiAgICAgICAgdGhpcy5fc2xpZGVyID0gdGhpcy5fZWxlbS5xdWVyeVNlbGVjdG9yKGAuc2xpZGVyYCk7XG4gICAgICAgIHRoaXMuX2h0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgX2VsZW1DYXB0dXJlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3RhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdGhpcy5fZXZlbnQgPSBldmVudDtcblxuICAgICAgICB0aGlzLl90YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihgZHJhZ3N0YXJ0YCwgdGhpcy5fZHJhZ3N0YXJ0KTtcblxuICAgICAgICBpZighdGhpcy5fdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhgc2xpZGVyX190aHVtYmApKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoYG1vdXNlbW92ZWAsIHRoaXMuX21vdmVBdCk7XG4gICAgICAgIHRoaXMuX2h0bWwuYWRkRXZlbnRMaXN0ZW5lcihgbW91c2V1cGAsIHRoaXMuX3plcm9pbmdPdXQpO1xuXG4gICAgICAgIHRoaXMuX2Nvb3Jkc1RodW1iID0gdGhpcy5fZ2V0Q29vcmRzKHRoaXMuX3RhcmdldCk7XG4gICAgICAgIHRoaXMuX3NoaWZ0WCA9IHRoaXMuX2V2ZW50LnBhZ2VYIC0gdGhpcy5fY29vcmRzVGh1bWIubGVmdDtcbiAgICB9XG5cbiAgICBfbW92ZUF0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50ID0gZXZlbnQ7XG4gICAgICAgIHRoaXMuX3RhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgICBpZighdGhpcy5fdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhgc2xpZGVyYCkpIHJldHVybjtcblxuICAgICAgICB0aGlzLl9zbGlkZXJDb29yZHMgPSB0aGlzLl9nZXRDb29yZHModGhpcy5fc2xpZGVyKTtcbiAgICAgICAgdGhpcy5fbGVmdFRodW1iID0gdGhpcy5fZXZlbnQucGFnZVggLSB0aGlzLl9zbGlkZXJDb29yZHMubGVmdCAtIHRoaXMuX3NoaWZ0WDtcblxuICAgICAgICBpZiAodGhpcy5fbGVmdFRodW1iIDwgMCkgdGhpcy5fbGVmdFRodW1iID0gMDtcblxuICAgICAgICB0aGlzLl9yaWdodFRodW1iID0gdGhpcy5fc2xpZGVyLm9mZnNldFdpZHRoIC0gdGhpcy5fdGh1bWIub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xlZnRUaHVtYiA+IHRoaXMuX3JpZ2h0VGh1bWIpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZnRUaHVtYiA9IHRoaXMuX3JpZ2h0VGh1bWI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMuX2xlZnRUaHVtYik7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdGh1bWIuc3R5bGUubGVmdCA9IGAke3ZhbHVlfXB4YDtcbiAgICAgICAgdGhpcy5udW1lcmljID0gTWF0aC5yb3VuZCh2YWx1ZSAgLyAodGhpcy5fc2xpZGVyLm9mZnNldFdpZHRoIC0gdGhpcy5fdGh1bWIub2Zmc2V0V2lkdGgpICogMTAwKTtcblxuICAgICAgICB0aGlzLnZhbHVlU2xpZGVyID0gbmV3IEN1c3RvbUV2ZW50KGBzZXR0aW5nYCwge1xuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLm51bWVyaWMsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3NsaWRlci5kaXNwYXRjaEV2ZW50KHRoaXMudmFsdWVTbGlkZXIpO1xuICAgIH1cblxuICAgIF96ZXJvaW5nT3V0KCkge1xuICAgICAgICB0aGlzLl9zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihgbW91c2Vtb3ZlYCwgdGhpcy5fbW92ZUF0KTtcbiAgICAgICAgdGhpcy5faHRtbC5yZW1vdmVFdmVudExpc3RlbmVyKGBtb3VzZXVwYCwgdGhpcy5femVyb2luZ091dCk7XG4gICAgfVxuXG4gICAgX2RyYWdzdGFydCgpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBfZ2V0Q29vcmRzKGVsZW0pIHtcbiAgICAgICAgbGV0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogYm94LnRvcCArIHBhZ2VZT2Zmc2V0LFxuICAgICAgICAgICAgYm90dG9tOiBib3guYm90dG9tICsgcGFnZVlPZmZzZXQsXG4gICAgICAgICAgICBsZWZ0OiBib3gubGVmdCArIHBhZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgcmlnaHQ6IGJveC5yaWdodCArIHBhZ2VYT2Zmc2V0XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQge1NsaWRlcn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zbGlkZXIuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIE51bWVyaWNJbnB1dCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLmVsZW0gPSBvcHRpb25zLmVsZW07XG4gICAgICAgIHRoaXMuc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlcmApO1xuICAgICAgICB0aGlzLnRodW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlcl9fdGh1bWJgKTtcblxuICAgICAgICB0aGlzLmNoZWNrVmFsdWUgPSB0aGlzLmNoZWNrVmFsdWUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5pbnB1dE51bSA9IHRoaXMuaW5wdXROdW0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zZXRUaHVtYiA9IHRoaXMuc2V0VGh1bWIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbGVtLmFkZEV2ZW50TGlzdGVuZXIoYGtleXByZXNzYCwgdGhpcy5pbnB1dE51bSk7XG4gICAgfVxuXG4gICAgaW5wdXROdW0oZXZlbnQpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgaWYoIWlzRmluaXRlKFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQua2V5Q29kZSkpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcihgaW5wdXRgLCB0aGlzLmNoZWNrVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tWYWx1ZSgpIHtcbiAgICAgICBpZiAodGhpcy5lbGVtLnZhbHVlID4gMTAwKSB0aGlzLmVsZW0udmFsdWUgPSAxMDA7XG4gICAgICAgdGhpcy5zZXRUaHVtYih0aGlzLmVsZW0udmFsdWUpO1xuICAgIH1cblxuICAgIHNldFRodW1iKG51bSkge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IChudW0gICAqIHRoaXMuc2xpZGVyLm9mZnNldFdpZHRoKSAvIDEwMCAtIHRoaXMudGh1bWIub2Zmc2V0V2lkdGggLyAyO1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPCAwKSB0aGlzLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgdGhpcy5ldmVudElucHV0ID0gbmV3IEN1c3RvbUV2ZW50KGBzZXRsZW5ndGhgLCB7XG4gICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoOiBgJHt0aGlzLmxlbmd0aH1weGBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5lbGVtLmRpc3BhdGNoRXZlbnQodGhpcy5ldmVudElucHV0KTtcbiAgICB9XG59XG5cbmV4cG9ydCB7TnVtZXJpY0lucHV0fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL251bV9zbGlkZXIuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7U2xpZGVyfSBmcm9tICcuL3NsaWRlci5qcyc7XG5pbXBvcnQge051bWVyaWNJbnB1dH0gZnJvbSAnLi9udW1fc2xpZGVyLmpzJ1xuaW1wb3J0ICcuLi9zdHlsZS9zcmMuY3NzJztcblxuY2xhc3MgQmluZGVyQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb24pIHtcbiAgICAgICAgdGhpcy5lbGVtID0gb3B0aW9uLmVsZW07XG4gICAgICAgIHRoaXMuc2xpZGVyRWxlbSA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKGAuc2xpZGVyYCk7XG4gICAgICAgIHRoaXMudGh1bWJFbGVtID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZXJfX3RodW1iYCk7XG5cbiAgICAgICAgdGhpcy5zbGlkZXJDb21wb25lbnQgPSBuZXcgU2xpZGVyKHtlbGVtOiB0aGlzLmVsZW19KTtcbiAgICAgICAgdGhpcy5udW1Db21wb25lbnQgPSBuZXcgTnVtZXJpY0lucHV0KHtlbGVtOiB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcihgLnNsaWRlcl9zaG93YCl9KTtcblxuICAgICAgICB0aGlzLnNldFZhbHVlSW5JbnB1dCA9IHRoaXMuc2V0VmFsdWVJbklucHV0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0VGh1bWIgPSB0aGlzLnNldFRodW1iLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFsZlZvbHVtZSA9IHRoaXMuaGFsZlZvbHVtZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZWxlbS5hZGRFdmVudExpc3RlbmVyKGBzZXR0aW5nYCwgdGhpcy5zZXRWYWx1ZUluSW5wdXQpO1xuICAgICAgICB0aGlzLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcihgc2V0bGVuZ3RoYCwgdGhpcy5zZXRUaHVtYik7XG4gICAgICAgIHRoaXMuZWxlbS5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIHRoaXMuaGFsZlZvbHVtZSk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWVJbklucHV0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKGAuc2xpZGVyX3Nob3dgKS52YWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXRUaHVtYihldmVudCkge1xuICAgICAgICB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcihgLnNsaWRlcl9fdGh1bWJgKS5zdHlsZS5sZWZ0ID0gZXZlbnQuZGV0YWlsLmxlbmd0aDtcbiAgICB9XG5cbiAgICBoYWxmVm9sdW1lKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhgc2xpZGVyX2J1dGApKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2xpZGVyQ29tcG9uZW50LnNldFZhbHVlKCh0aGlzLnNsaWRlckVsZW0ub2Zmc2V0V2lkdGggLSB0aGlzLnRodW1iRWxlbS5vZmZzZXRXaWR0aCkgLyAyKTtcbiAgICB9XG5cbn1cblxubmV3IEJpbmRlckNvbXBvbmVudCh7ZWxlbTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmJveF9zbGlkZXJgKX0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9iaW5kZXJfY29tcC5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICJdLCJzb3VyY2VSb290IjoiIn0=