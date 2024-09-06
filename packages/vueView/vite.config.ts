import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
// @ts-ignore
import DefineOptions from 'unplugin-vue-define-options/vite';
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
    //minify: false,
    rollupOptions: {
      //忽略不需要打包的文件
      external: ['vue', '@yangxinhao/vue-view-utils'],
      input: ['index.ts'],
      output: [
        {
          //打包格式
          format: 'es',
          //打包后文件名
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: getESDir()
        },
        {
          //打包格式
          format: 'cjs',
          //打包后文件名
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: getLibDir()
        }
      ]
    },
    lib: {
      entry: './index.ts',
      name: 'vueView'
    }
  },
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      outputDir: [
        getESDir(),
        getLibDir()
      ],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: '../../tsconfig.json'
    }),
    DefineOptions()
  ]
});
