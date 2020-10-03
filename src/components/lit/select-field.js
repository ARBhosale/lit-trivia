import { html, css } from 'lit-element';
import { TextField } from './text-field';
import  './game-option';
export class SelectField extends TextField {
    constructor() {
        super();
        this.options = this.options || [];
    }

    static get properties() {
        return {
            options: { type: Array, attribute: true, },
        }
    }

    static get styles() {
        return css`
        ${TextField.styles}
        .text-field-container {
            align-items: baseline;
        }
        .fade2 {
            -webkit-animation: fade 1.2s;
            animation: fade 1.2s;
        }
        `;
    }

    get listValues() {
        return this.value.length > 2
            ? this.options.filter(option => option.text.indexOf(this.value) >= 0)
            : this.options;
    }

    confirmEdit() {
        let selectedOption = this.listValues.find(option => option.text == this.value);
        if (selectedOption) {
            this.dispatchEvent(new CustomEvent('selection', {
                detail: { message: selectedOption },
                bubbles: true,
                composed: true
            }));
            super.confirmEdit();
        } else {
            this.cancelEdit();
            if (this.value === '') {
                this.value = this.listValues.length > 0 ? this.listValues[0].text : '';
            }
        }
    }

    selectOption(option) {
        this.value = option.text;
        this.confirmEdit();
    }

    renderOptions() {
        return html`
        <div class="fade fade2">
            ${this.listValues.map(option =>
            html`<game-option text="${option.text}" @click="${() => { this.selectOption(option); }}"></game-option>
                `)}
        </div>
        `;
    }

    renderSelectField() {
        return html`
        ${this.label != undefined ? html`<div><game-message class="fade" text="${this.label}"/></div>` : ''}
        <div class="text-field-container fade">
        <div>
            ${this.renderInputField()}
            ${this.renderOptions()}
        </div>
        <div>
            ${this.renderActionButtons()}
        </div>
        </div>
        `;
    }

    render() {
        return html`${this.isEditing ? this.renderSelectField() : this.renderTextFieldPreview()}`;
    }
}

customElements.define('select-field', SelectField);