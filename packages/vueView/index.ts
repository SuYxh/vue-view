import * as components from './src/index';
import { App } from 'vue';

export * from './src/index';

export default {
  install: (app: App) => {
    for (const c in components) {
      // @ts-ignore
      app.use(components[c]);
    }
  }
};
