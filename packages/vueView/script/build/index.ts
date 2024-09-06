import { series, parallel, src, dest } from 'gulp';
import { deleteFileByPath, componentPath, runCommand } from '../utils';
// @ts-ignore
import jsonModify from 'gulp-json-modify';
import fs from 'fs';
import path from 'path';

// 删除 dist 目录
export const removeDist = () => {
  const distPath = `${componentPath}/dist`
  return deleteFileByPath(distPath);
};

// 打包组件
export const buildComponent = async () => {
  runCommand('pnpm run build', componentPath);
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
  parallel(
    async () => buildComponent()
  ),
  async () => copyAndModifyPackageJson(),
  async () => copyReadme()
);
