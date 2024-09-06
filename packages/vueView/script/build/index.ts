import { series, parallel, src, dest } from 'gulp';
import { deleteFileByPath, componentPath, runCommand } from '../utils';
// @ts-ignore
import jsonModify from 'gulp-json-modify';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import fs from 'fs';
import path from 'path';

// 删除 dist 目录
export const removeDist = () => {
  const distPath = `${componentPath}/dist`
  return deleteFileByPath(distPath);
};

// 打包组件
export const buildComponent = async () => {
  return runCommand('pnpm run build', componentPath).then(res => {
    console.log('打包组件 over')
  }).catch(err => {
    console.log('打包组件 error', err)
  })
};

//打包样式
export const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${componentPath}/dist/lib/src`))
    .pipe(dest(`${componentPath}/dist/es/src`))
    .on('end', () => console.log('Style build completed'));
};

export const copyReadme = async () => {
  return src(`${componentPath}/README.md`)
    .pipe(dest(`${componentPath}/dist`));
};

export const copyAndModifyPackageJson = async () => {
  const packageJsonPath = path.join(componentPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const utilsVersion = packageJson.dependencies['@yangxinhao/vue-view-utils'].replace('workspace:', '');

  return src(`${componentPath}/package.json`)
    .pipe(jsonModify({
      key: 'dependencies',
      value: {
        ...packageJson.dependencies,
        '@yangxinhao/vue-view-utils': utilsVersion
      }
    }))
    .pipe(dest(`${componentPath}/dist`));
};

export default series(
  async () => removeDist(),
  async () => buildComponent(),
  async () => buildStyle(),
  parallel(
    async () => copyAndModifyPackageJson(),
    async () => copyReadme()
  )
);
