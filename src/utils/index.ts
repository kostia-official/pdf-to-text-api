import { Worker } from "worker_threads";

export const runWorker = <T, R>(workerPath: string, arg: T): Promise<R> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath);

    worker.postMessage(arg);

    worker.on("message", (message) => {
      if (message.success) {
        resolve(message.data);
      } else {
        reject(message.error);
      }
    });

    worker.on("error", (error) => reject(error));
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};
