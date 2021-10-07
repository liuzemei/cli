
declare const download: (repo: string, desc: string, opts: any, fn: Function) => void



declare module 'download-git-repo' {
  export = download
}
