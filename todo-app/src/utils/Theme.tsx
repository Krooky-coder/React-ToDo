declare module 'styled-components' {
    export interface DefaultTheme {
      main: string
      colors: {
        primary?: string,
        secondary?: string,
        text: string,
        background: string,
  },
}}
interface DefaultTheme {
  main: string
  colors: {
    primary?: string,
    secondary?: string,
    text: string,
    background: string,
  },
}

export const lightTheme: DefaultTheme  = {
    main: "yellow",
    colors: {
        text: 'f5f100',
        background: 'pink'
    }
}
export const blackTheme: DefaultTheme = {
  main: "mediumseagreen",
  colors: {
        text: 'green',
        background: 'blue'
    }
};

