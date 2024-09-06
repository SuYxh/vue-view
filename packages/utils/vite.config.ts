import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

const getESDir = () => {
  return resolve(__dirname, './dist/es');
};

const getLibDir = () => {
  return resolve(__dirname, './dist/lib');
};


export default defineConfig({
  build: {
    //压缩
    minify: false,
    rollupOptions: {
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: getESDir()
        },
        {
          format: 'cjs',
          //不用打包成.mjs
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: getLibDir()
        }
      ]
    },
    lib: {
      entry: './index.ts',
      name: 'vueViewUtils'
    }
  },

  plugins: [
    dts({
      entryRoot: 'src',
      outputDir: [
        getESDir(),
        getLibDir()
      ],
      tsConfigFilePath: '../../tsconfig.json'
    })
  ]
});
