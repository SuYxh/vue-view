import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import DefineOptions from 'unplugin-vue-define-options/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@yangxinhao/vue-view': path.resolve(__dirname, '../packages/vueView/index.ts')
    }
  },
  // @ts-ignore
  plugins: [vue(), DefineOptions(), vueJsx()]
});
