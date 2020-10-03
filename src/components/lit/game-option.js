import { LitElement, html, css } from 'lit-element';
import { constants } from '../../constants';
export class GameOption extends LitElement {
    static get properties() {
        return {
            text: { attribute: true }
        };
    }

    static get styles() {
        return css`
        .option-item {
            padding: 8px;
            background: #00800040;
            margin-top: 4px;
        }
        .option-item:hover {
            color: white;
            background: ${constants.ACTION_COLOR};
            border: solid 1px ${constants.BORDER_COLOR};
        }
        `;
    }

    render() {
        return this.text != undefined
            ? html`
                <div class="option-item">${this.text}</div>
            `
            : ``;
    }
}

customElements.define('game-option', GameOption);