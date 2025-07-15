export {}

declare global {
  interface Window {
    __APP_CONFIG__?: {
      VITE_API_URL?: string
    }
    __CONFIG__?: {
      VITE_API_URL: string
    }
  }
}
