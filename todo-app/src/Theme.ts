interface DefaultTheme {
  main: string,
  colors: {
    text: string;
    background: string;
    borderColors: string;
    primary?: string;
    secondary?: string;
    error: string;
  },
}

export const lightTheme: DefaultTheme  = {
  main: 'lightBlue',
  colors: {
    text: 'black',
    background: 'pink',
    borderColors: 'lightBlue',
    primary: 'white',
    secondary: 'black',
    error: 'red',
  }
}

export const blackTheme: DefaultTheme = {
  main: 'green',
  colors: {
    borderColors: 'white',
    text: 'white',
    background: 'black',
    primary: 'darkBlue',
    secondary: 'darkRed',
    error: 'red',
  }
};

