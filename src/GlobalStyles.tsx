const GlobalStyles = () => (
  <style>
    {
      `
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          color: #333;
          font-family: sans-serif;
          font-size: 24px;
        }

        body {
          background-color: #e0e0da;
        }

        button,
        input,
        option,
        select,
        .modalContent {
          background-color: #fcfcfc;
          border-radius: 10px;
          border: 2px solid transparent;
          margin-bottom: 6px;
          outline: 0;
          padding: 10px;
        }

        button,
        input[type="button"] {
          --box-shadow-color: #aaaaaa;
          box-shadow: var(--box-shadow-color) 0 4px 0 0;
        }

        button:hover,
        input[type="button"]:hover,
        button[aria-pressed="true"],
        input[type="button"][aria-pressed="true"] {
          box-shadow:
          var(--box-shadow-color) 0 2px 0 0;
          position: relative;
          top: 2px;
        }

        button[aria-pressed="true"],
        input[type="button"][aria-pressed="true"] {
          --box-shadow-color: bisque;
          background-color: beige;
          color: lightsalmon;
        }

        button:active,
        input[type="button"]:active {
          box-shadow: var(--box-shadow-color) 0 0 0 0;
          position: relative;
          top: 4px;
        }

        input[type="checkbox"] {
          height: 20px;
          margin-right: 10px;
          width: 20px;
        }

        input[type="text"]:focus {
          border: 2px solid rgba(128, 128, 128, 0.5);
        }

        fieldset {
          border: none;
          margin: 0;
          outline: none;
          padding: 0;
        }

        [data-horizontal],
        [data-vertical] {
          display: inline-flex;
          gap: 6px;
        }

        [data-horizontal] {
          flex-direction: row;
        }

        [data-vertical] {
          flex-direction: column;
        }

        [role="switch"] {
          display: inline-flex;
          gap: 12px;
        }

        [role="switch"] > span {
          border-radius: 10px;
          padding: 10px;
        }

        [role="checkbox"][aria-checked],
        [role="option"][aria-selected],
        [role="radio"][aria-checked] {
          background-color: white;
          cursor: pointer;
          display: inline-block;
          padding: 10px;
          user-select: none;
        }

        [role="checkbox"][aria-checked="true"],
        [role="option"][aria-selected="true"],
        [role="radio"][aria-checked="true"],
        [role="switch"][aria-checked="false"] > :first-child,
        [role="switch"][aria-checked="true"] > :last-child {
          background-color: lightblue;
          color: darkblue;
        }

        code {
          font-family: monospace;
          background-color: #ddd;
          color: #000;
          padding-left: 0.25rem;
          padding-right: 0.25rem;
          padding-top: 0.15rem;
          padding-bottom: 0.15rem;
          border-radius: 0.25rem;
        }

        .modalContent {
          box-shadow: gray 0 4px 4px 0;
        }

        .modalOverlay {
          align-items: center;
          background-color: rgba(128, 128, 128, 0.5);
          display: flex;
          height: 100vh;
          justify-content: center;
          left: 0;
          position: fixed;
          top: 0;
          width: 100vw;
        }
      `
    }
  </style>
)

export default GlobalStyles
