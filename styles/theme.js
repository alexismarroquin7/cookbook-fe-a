import { createGlobalStyle } from "styled-components";

const sharedTheme = {
  borderRadius: {
    primary: "5px"
  }
}

const light = {
  ...sharedTheme,
  color: {
    one: "#ff9d47", // orange
    two: "#4393fa" // blue
  }
};

const dark = {
  ...sharedTheme
};

export const theme = {
  light,
  dark
}

export const GlobalStyles = createGlobalStyle`
  /* add global styles here */
`