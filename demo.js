import { LitElement, html, css } from "lit-element";

import "./mv-pagination.js";

export class MvPaginationDemo extends LitElement {
  static get properties() {
    return {
      page: { type: Number, reflect: true, attribute: false },
      "max-buttons": { type: Number, reflect: true, attribute: false },
      type: { String: Number, reflect: true, attribute: false },
      justify: { type: String, reflect: true, attribute: false },
      updateValue: { type: Boolean, reflect: true, attribute: false },
      hue: { type: Number, attribute: false, reflect: false },
      saturation: { type: Number, attribute: false, reflect: false },
      lightness: { type: Number, attribute: false, reflect: false }
    };
  }

  static get styles() {
    return css`
			:host {
        font-family: Arial;
				font-size: 18px;
      }

      @keyframes flash {
        0% {
          background-color: white;
        }
        100% {
          background-color: chartreuse;
        }
      }

      .pagination-demo-container {
        width: 960px;
        display: flex;
        flex-direction: column;
        padding: 10px 10px 20px 10px;
        border: 1px solid #BFBFBF;
        background-color: white;
        box-shadow: 10px 10px 5px #aaaaaa;
        margin: auto;
      }

      .value-container {        
        font-size: 24px;
        margin: 20px auto;
      }

      .page-value {
        padding: 10px;
        background-color: chartreuse;
      }

      .page-value.updated {
        animation: flash 0.5s ease-in;
      }

      .parameters-container {
        margin: 20px auto;
      }

      .parameters-container select {
        font-size: 18px;
      }
      
      .slidecontainer {
        width: 50%;
      }
      
      .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 15px;
        border-radius: 5px;
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
      }
      
      .slider:hover {
        opacity: 1;
      }
      
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #4CAF50;
        cursor: pointer;
      }
      
      .slider::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #4CAF50;
        cursor: pointer;
      }
    `;
  }

  constructor() {
    super();
    this.page = 1;
    this.pages = 50;
    this["max-buttons"] = 5;
    this.type = "button";
    this.justify = "center";
    this.types = [
      { value: "button", label: "Button" },
      { value: "text", label: "Text" },
      { value: "none", label: "None" }
    ];
    this.justifyPositions = [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" }
    ];
    this.buttonsShown = [
      { value: 3, label: "3" },
      { value: 5, label: "5" },
      { value: 7, label: "7" },
      { value: 9, label: "9" }
    ];
    this.updateValue = false;
    this.hue = 196;
    this.saturation = 100;
    this.lightness = 38;
  }

  render() {
    const valueClass = this.updateValue ? " updated" : "";
    const color = `--mv-button-circle-background-color: hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%);`;
    return html`
      <div class="pagination-demo-container">
        <div class="value-container">
          Current page: <span class="page-value${valueClass}">
            ${this.page}
          </span>
        </div>
        <mv-pagination
          .page="${this.page}"
          .pages="${this.pages}"
          .type="${this.type}"
          .justify="${this.justify}"
          .max-buttons="${this["max-buttons"]}"
          @change-page="${this.handlePageChange}"
          style="${color}"
        ></mv-pagination>
        <div class="parameters-container">
          <label for="type">Type: </label>
          <select
            name="type"
            value="${this.type}"
            @change="${this.handleTypeChange}"
          >
          ${this.types.map(
            type => html`
            <option
              value="${type.value}"
              ?selected="${this.type === type.value}"
            >
              ${type.label}
            </option>
          `
          )}
          </select>
          <label for="type">Justify: </label>
          <select
            name="justify"
            value="${this.justify}"
            @change="${this.handleJustifyChange}"
          >
          ${this.justifyPositions.map(
            justify => html`
            <option
              value="${justify.value}"
              ?selected="${this.justify === justify.value}"
            >
              ${justify.label}
            </option>
          `
          )}
          </select>
          ${this.type === "button"
            ? html`
            <label for="type">Max Buttons: </label>
            <select
              name="max-buttons"
              value="${this["max-buttons"]}"
              @change="${this.handleButtonsCountChange}"
            >
            ${this.buttonsShown.map(
              buttonCount => html`
              <option
                value="${buttonCount.value}"
                ?selected="${this["max-buttons"] === buttonCount.value}"
              >
                ${buttonCount.label}
              </option>
            `
            )}
            </select>
          `
            : html``}          
        </div>
        <h3>Customize theme with HSL colors</h3>
        Hue: ${this.hue}
        <div class="slidecontainer">
          <input type="range" min="1" max="360" value="${this.hue}" class="slider" @input="${this.changeHue}">
        </div>
        Saturation: ${this.saturation}%
        <div class="slidecontainer">
          <input type="range" min="1" max="100" value="${this.saturation}" class="slider" @input="${this.changeSaturation}">
        </div>
        Lightness: ${this.lightness}%
        <div class="slidecontainer">
          <input type="range" min="1" max="100" value="${this.lightness}" class="slider" @input="${this.changeLightness}">
        </div>
      </div>
    `;
  }

  handlePageChange(event) {
    const { detail: { page } } = event;
    const that = this;
    this.page = parseInt(page, 10);
    this.updateValue = true;
    setTimeout(() => {
      that.updateValue = false;
    }, 500);
  }

  handleTypeChange(event) {
    const { path: [{ value }] } = event;
    this.type = value;
  }

  handleJustifyChange(event) {
    const { path: [{ value }] } = event;
    this.justify = value;
  }

  handleButtonsCountChange(event) {
    const { path: [{ value }] } = event;
    this["max-buttons"] = value;
  }

  changeHue = event => {
    this.hue = event.currentTarget.value;
  };

  changeSaturation = event => {
    this.saturation = event.currentTarget.value;
  };

  changeLightness = event => {
    this.lightness = event.currentTarget.value;
  };
}

customElements.define("mv-pagination-demo", MvPaginationDemo);
