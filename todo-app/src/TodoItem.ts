export default interface TodoItem {
    id: string,
    text: string,
    status: boolean,
    date: Date,
  }

  declare module 'styled-components' {
    export interface DefaultTheme {
      main: string,
      colors: {
        primary?: string,
        secondary?: string,
        text: string,
        background: string,
  },
}}