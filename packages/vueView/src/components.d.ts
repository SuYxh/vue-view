import * as components from './index';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XButton: typeof components.Button;
    XIcon: typeof components.Icon;
  }
}
export {};
