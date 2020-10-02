import { LitElement, html } from 'lit-element';

class GameMessage extends LitElement {
    render() {
        return html`<div>Hello Message</div>`;
    }
}

customElements.define('game-message', GameMessage);