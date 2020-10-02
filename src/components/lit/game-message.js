import { LitElement, html, css } from 'lit-element';
import { constants } from '../../constants';

class GameMessage extends LitElement {

    constructor() {
        super();
        this.bold = this.bold != undefined;
        this.big = this.big != undefined;
    }

    static get properties() {
        return {
            text: { attribute: true },
            bold: { attribute: true, },
            big: { attribute: true, },
        };
    }

    static get styles() {
        return css`
        p {
            color: ${constants.FONT_COLOR};
        }`;
    }

    get styles() {
        let weight = `font-weight: ${this.bold ? css`bold` : css`normal`};`;
        let size = `font-size: ${this.big ? css`${constants.SIZE_BIG}` : css`inherit;`};`;
        return `${weight}${size}`;
    }

    render() {
        return html`
        <p style="${this.styles}">
            ${this.text}
        </p>`;
    }
}

customElements.define('game-message', GameMessage);