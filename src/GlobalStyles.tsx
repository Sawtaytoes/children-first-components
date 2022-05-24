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

        label {
          align-items: center;
          display: inline-flex;
        }

        button,
        input,
        option,
        select,
        .content {
          background-color: #fcfcfc;
          border-radius: 10px;
          border: 2px solid transparent;
          margin-bottom: 6px;
          margin-top: 6px;
          outline: 0;
          padding: 10px;
        }

        button {
          box-shadow: rgb(170, 170, 170) 0 4px 0 0;
        }

        button:hover {
          box-shadow: rgb(170, 170, 170) 0 2px 0 0;
          position: relative;
          top: 2px;
        }

        button:active {
          box-shadow: rgb(170, 170, 170) 0 0 0 0;
          position: relative;
          top: 4px;
        }

        input:focus {
          border: 2px solid rgba(128, 128, 128, 0.5);
        }

        input[type="checkbox"] {
          height: 20px;
          margin-right: 10px;
          width: 20px;
        }

        span[aria-checked]:not([class]) {
          border: 2px solid black;
          cursor: pointer;
          display: inline-block;
          margin: 2px;
          padding: 10px;
          user-select: none;
        }

        span[aria-checked="true"]:not([class]) {
          background-color: lightblue;
          border-color: darkblue;
          color: darkblue;
        }

        option {
          border: 2px solid #ccc;
          padding: 20px;
        }

        option:checked {
          border: 2px solid rgba(128, 128, 128, 0.5);
        }

        input[type="color"] {
          height: 100px;
          width: 100px;
        }

        [data-visited] {
          border-color: #88f;
        }

        input[data-error],
        select[data-error] {
          border-color: #f00;
        }

        [data-loading]::before {
          content: '⌛ ';
        }

        [data-submission-state="invalidSubmission"] {
          background-color: tomato;
          box-shadow: rgb(128, 0, 0) 0 4px 0 0;
        }

        [data-submission-state="invalidSubmission"]:hover {
          background-color: tomato;
          box-shadow: rgb(128, 0, 0) 0 2px 0 0;
        }

        [data-submission-state="invalidSubmission"]:active {
          background-color: tomato;
          box-shadow: rgb(128, 0, 0) 0 0 0 0;
        }

        [data-submission-state="pendingSubmission"] {
          background-color: yellow;
          box-shadow: rgb(128, 128, 0) 0 4px 0 0;
        }

        [data-submission-state="pendingSubmission"]:hover {
          background-color: yellow;
          box-shadow: rgb(128, 128, 0) 0 2px 0 0;
        }

        [data-submission-state="pendingSubmission"]:active {
          background-color: yellow;
          box-shadow: rgb(128, 128, 0) 0 0 0 0;
        }

        [data-submission-state="submitted"] {
          background-color: limegreen;
          box-shadow: rgb(0, 128, 0) 0 4px 0 0;
        }

        [data-submission-state="submitted"]:hover {
          background-color: limegreen;
          box-shadow: rgb(0, 128, 0) 0 2px 0 0;
        }

        [data-submission-state="submitted"]:active {
          background-color: limegreen;
          box-shadow: rgb(0, 128, 0) 0 0 0 0;
        }

        [data-table] {
          column-gap: 4px;
          display: inline-grid;
          grid-template-columns: repeat(3, 1fr);
          row-gap: 4px;
        }

        [data-table] input {
          width: 200px;
        }

        [data-table] > div {
          margin-bottom: 20px;
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

        .content {
          box-shadow: gray 0 4px 4px 0;
        }

        .overlay {
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
