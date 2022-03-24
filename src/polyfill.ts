import { Buffer } from 'buffer';

declare global {
  interface Window {
    kardiachain: any;
    ethereum: any;
  }
}

(window as any).global = window;
global.Buffer = Buffer;
global.process = {
    env: { DEBUG: undefined },
    version: '',
    nextTick: require('next-tick')
} as any;
