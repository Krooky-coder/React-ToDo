export default interface TodoItem {
    id: number,
    text: string,
    completed: boolean,
    createdAt: string,
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