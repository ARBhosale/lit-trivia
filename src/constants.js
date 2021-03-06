import { css } from 'lit-element';
export const constants = {
  FONT_COLOR: css`#2c3e50`,
  SIZE_BIG: css`24px`,
  BORDER_COLOR: css`grey`,
  FOCUS_COLOR: css`red`,
  ACTION_COLOR: css`#2196f3`,
  RIPPLE_ANIMATION: css`.ripple {
        background-position: center;
        transition: background 0.8s;
      }
      .ripple:hover {
        background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;
      }
      .ripple:active {
        background-color: #6eb9f7;
        background-size: 100%;
        transition: background 0s;
      }`,
  FADE_ANIMATION: css`.fade {
        -webkit-animation: fade 0.6s;
        animation: fade 0.6s;
        opacity: 1;
     }
    /* -fail- */
    @-webkit-keyframes fade {
        from {opacity: 0}
        to {opacity: 1}
    }@keyframes fade {
        from {opacity: 0}
        to {opacity: 1}
    }`,
  categories: [{
    text: "General Knowledge",
    code: 9
  },
  {
    text: "Computer Science",
    code: 18
  },
  {
    text: "Sports",
    code: 21
  },
  ],
  questions: [
    {
      text: 'question question question question question question question question question question ?',
      options: [
        { text: 'option option option 1', code: 1 },
        { text: 'option option option 2', code: 2 },
        { text: 'option option option 3', code: 3 },
        { text: 'option option option 4', code: 4 },
      ],
      answer: 2
    },
    {
      text: 'question question question question question question question question question question ?',
      options: [
        { text: 'option option option 1', code: 1 },
        { text: 'option option option 2', code: 2 },
        { text: 'option option option 3', code: 3 },
        { text: 'option option option 4', code: 4 },
      ],
      answer: 2
    },{
      text: 'question question question question question question question question question question ?',
      options: [
        { text: 'option option option 1', code: 1 },
        { text: 'option option option 2', code: 2 },
        { text: 'option option option 3', code: 3 },
        { text: 'option option option 4', code: 4 },
      ],
      answer: 2
    },
    {
      text: 'question question question question question question question question question question ?',
      options: [
        { text: 'option option option 1', code: 1 },
        { text: 'option option option 2', code: 2 },
        { text: 'option option option 3', code: 3 },
        { text: 'option option option 4', code: 4 },
      ],
      answer: 2
    }
  ]
}