declare global {
  interface Window {
    snap: {
      pay: (token: string, callbacks: any) => void;
    };
  }
}