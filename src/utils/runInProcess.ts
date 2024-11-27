import { fork } from "child_process";

export interface ProcessResult {
  result: string;
  error?: string;
}

export const runInProcess = <T>(
  scriptPath: string,
  args: T,
  options: {
    timeoutMs?: number;
  } = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { timeoutMs } = options;
    const child = fork(scriptPath);
    let timeout: Timer | undefined;

    const cleanup = () => {
      if (timeout) clearTimeout(timeout);
      if (!child.killed) child.kill();
    };

    if (timeoutMs) {
      timeout = setTimeout(() => {
        child.kill();
        reject(new Error("Process timed out"));
      }, timeoutMs);
    }

    child.send(JSON.stringify(args));

    child.on("message", (message: ProcessResult) => {
      cleanup();
      if (message.error) {
        reject(new Error(message.error));
      } else {
        resolve(message.result);
      }
    });

    child.on("error", (err) => {
      cleanup();
      reject(err);
    });

    child.on("exit", (code) => {
      cleanup();
      if (code !== 0) {
        reject(new Error(`Child process exited with code ${code}`));
      }
    });
  });
};
