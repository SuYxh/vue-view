import fs from 'fs';
import { resolve } from 'path';

/**
 * 删除文件
 * @param path 路径
 * @param stayFiles 保留的文件, 比如： ['package.json', 'README.md']
 * @returns
 */
export const deleteFileByPath = async (path: string, stayFiles?: string[]) => {
  if (!fs.existsSync(path)) return;

  const files = fs.readdirSync(path);

  for (const file of files) {
    const curPath = resolve(path, file);

    if (fs.statSync(curPath).isDirectory()) {
      // 递归删除子目录
      if (file !== 'node_modules') await deleteFileByPath(curPath, stayFiles);
    } else {
      // 删除文件
      if (!stayFiles || !stayFiles.includes(file)) {
        fs.unlinkSync(curPath);
      }
    }
  }

  // 如果没有传入stayFiles或目录为空,则删除整个目录
  if (!stayFiles || fs.readdirSync(path).length === 0) {
    fs.rmdirSync(path);
  }
};