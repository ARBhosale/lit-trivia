import { LitElement, html, css } from 'lit-element';
import { constants } from '../../constants';
import './game-message';
import './game-button';

export class TextField extends LitElement {

    constructor() {
        super();
        this.placeholder = this.placeholder || '';
        this.disabled = this.disabled != undefined;
        this.isEditing = true;
        this.value = '';
        this.previousValue = '';
    }

    static get properties() {
        return {
            placeholder: { attribute: true },
            disabled: { attribute: true },
            label: { attribute: true },
            isEditing: { type: Boolean },
            value: { type: String },
            previousValue: { type: String },
        }
    }

    static get styles() {
        return css`
        .text-field-container {
            display: flex;
            align-items: center;
            margin-left: auto;
            margin-right: auto;
            width: fit-content;
        }
        input {
            border-style: solid;
            border-radius: 4px;
            outline-color: ${constants.BORDER_COLOR};
            text-align: center;
            font-size: 16px;
        }
        input:focus {
            outline-color: ${constants.FOCUS_COLOR};
        }
        game-button {
            margin: 8px;
        }
        ${constants.FADE_ANIMATION}
        `;
    }

    toggleEditing() {
        this.isEditing = !this.isEditing;
    }

    confirmEdit() {
        if (this.value == '') {
            return;
        }
        this.previousValue = this.value;
        this.isEditing = false;
        this.dispatchEvent(new CustomEvent('input', {
            detail: { message: this.value },
            bubbles: true,
            composed: true
        }));
    }

    cancelEdit() {
        if (this.previousValue != '') {
            this.isEditing = false;
            this.value = this.previousValue;
        }
    }

    setValue($event) {
        $event.stopPropagation();
        this.value = $event.target.value;
    }

    renderInputField() {
        return html`
        <input 
                type="text"
                placeholder="${this.placeholder}"
                value="${this.value}"
                @input="${this.setValue}"
                @keyup="${($event) => { $event.keyCode === 13 && this.confirmEdit(); $event.keyCode === 27 && this.cancelEdit(); }}"
            ></input>`;
    }

    renderActionButtons() {
        return html`
        <game-button @click="${this.confirmEdit}" value="ok"></game-button>
        <game-button @click="${this.cancelEdit}" value="cancel"></game-button>`;
    }

    renderTextField() {
        return html`
        ${this.label != undefined ? html`<div><game-message class="fade" text="${this.label}"/></div>` : ''}
        <div class="text-field-container fade">
            ${this.renderInputField()}
        </div>
        <div style="margin-top: 16px;" >${this.renderActionButtons()}</div>
        `;
    }

    renderTextFieldPreview() {
        return html`
        <div class="text-field-container fade">
            <game-message class="fade" text="${this.value}" @click="${this.toggleEditing}" />
        </div>
        `;
    }

    render() {
        return html`${this.isEditing ? this.renderTextField() : this.renderTextFieldPreview()}`;
    }
}

customElements.define('text-field', TextField);