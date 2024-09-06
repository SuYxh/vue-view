import { spawn, SpawnOptions } from "child_process";

export const runCommand = async (command: string, path: string, options?: Partial<SpawnOptions>): Promise<number> => {
  if (!command || typeof command !== "string") {
    throw new Error("命令必须是非空字符串");
  }
  if (!path || typeof path !== "string") {
    throw new Error("路径必须是非空字符串");
  }

  const [cmd, ...args] = command.split(" ");
  
  return new Promise((resolve, reject) => {
    const spawnOptions: SpawnOptions = {
      cwd: path, // 执行命令的路径
      stdio: "inherit", // 输出共享给父进程
      shell: process.platform === "win32", // 在Windows上使用shell
      ...(options || {}) // 如果提供了options,则合并它们
    };

    const app = spawn(cmd, args, spawnOptions);

    app.on("close", (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`命令执行失败,退出码: ${code}`));
      }
    });

    app.on("error", (err) => {
      reject(new Error(`启动进程时发生错误: ${err.message}`));
    });
  });
};
