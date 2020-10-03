import { LitElement, html, css } from 'lit-element';

export class GameCard extends LitElement {
    constructor() {
        super();
    }

    static get styles() {
        return css`
        .game-card {
            margin: auto;
            margin-top: 50px;
            display: inline-block;
            transition: all 0.2s ease-in-out 0s;
            box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
            background: rgb(255, 255, 255);
            padding: 20px;
            min-height: 50px;
            min-width: 50px;
            max-width: 75vw;
            max-height: 50vh;
          }
        `;
    }

    render() {
        return html`
            <div class="game-card">
            <slot></slot>
            </div>
        `;
    }
}

customElements.define('game-card', GameCard);