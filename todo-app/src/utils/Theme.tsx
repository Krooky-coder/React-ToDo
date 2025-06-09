interface DefaultTheme {
  main: string,
  colors: {
    primary?: string,
    secondary?: string,
    text: string,
    background: string,
  },
}

export const lightTheme: DefaultTheme  = {
    main: 'lightBlue',
    colors: {
        text: 'black',
        primary: 'white',
        secondary: 'darkRed',
        background: 'pink',
    }
}

export const blackTheme: DefaultTheme = {
  main: 'green',
  colors: {
        text: 'white',
        background: 'black',
        primary: 'darkBlue',
        secondary: 'darkRed',
    }
};

