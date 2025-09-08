import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      'Noto Sans JP', sans-serif;
    line-height: 1.6;
    color: #212121;
    background-color: #FAFAFA;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
    line-height: 1.3;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font: inherit;
  }

  input, textarea, select {
    font: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* スクロールバーのスタイル */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
    background: #BDBDBD;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #9E9E9E;
  }
`;