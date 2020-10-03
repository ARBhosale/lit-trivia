import { LitElement, html, css } from 'lit-element';
import { constants } from '../../constants';

export class GameButton extends LitElement {
    constructor() {
        super();
    }
    static get styles() {
        return css`
            button {
                border: none;
                border-radius: 4px;
                padding: 12px 18px;
                font-size: 16px;
                text-transform: uppercase;
                cursor: pointer;
                color: white;
                background-color: ${constants.ACTION_COLOR};
                box-shadow: 0 0 4px #999;
                outline: none;
            }
            ${constants.RIPPLE_ANIMATION}
        `;
    }
    static get properties() {
        return {
            value: { attribute: true }
        }
    }
    render() {
        return this.value != undefined
            ? html`
            <button class="ripple">${this.value}</button>`
            : ``;
    }
}

customElements.define('game-button', GameButton);