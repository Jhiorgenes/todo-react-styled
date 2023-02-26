import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    --white: #ffffff;

    --background: #23262C;
    --background-100: #2E3239;
    
    --gray-100: #F4F6FA;
    --gray-200: #B4B4B4;
    --gray-300: #8C8E93;

    --blue-300: #29ABE2;

    --font-small: 0.875rem;
    --font-base: 1rem;
    --font-medium: 1.25rem;
    --font-large: 1.5rem;
    --font-ultra: 2rem;

  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
   
  body #root {
    min-height: 100vh;
    background-color: var(--background);
    -webkit-font-smoothing: antialiased;
    padding: 5rem;
    position: relative;


    @media (max-width: 720px) {
      padding: 1rem;
    }
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
      
     
    }
    
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 700;
  }
  
  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
