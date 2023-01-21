import cli from "cli-ux";
import * as download from "download-git-repo";
import { promisify } from "util";

export const downloadGitRepo = promisify(download);

function sleep(n: number) {
  return new Promise((r) => setTimeout(r, n));
}

export async function loading<T>(
  fn: Function,
  msg: string,
  ...args: any
): Promise<T> {
  cli.action.start(msg + "\n");
  let res: T;
  try {
    res = await fn(...args);
    cli.action.stop("Success...");
  } catch (e) {
    cli.action.stop("request failed, refetch...");
    await sleep(1000);
    return loading(fn, msg);
  }
  return res;
}
