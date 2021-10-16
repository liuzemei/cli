import { fetchRepoList, fetchTagsList, IName } from './request'
import { prompt } from 'inquirer'
import { downloadGitRepo, loading } from './utils'
import { replateEnv, initEnv } from '../template'

export class Creator {
  name: string
  target: string
  config: any = {}

  constructor(projectName: string, targetDir: string) {
    this.name = projectName
    this.target = targetDir
  }
  async create() {
    let repo = await this.fetchRepo()
    let tag = await this.fetchTag(repo)
    this.config = await initEnv(this, repo)
    await this.download(repo, tag)
    await replateEnv(this, repo)
  }

  async fetchRepo(): Promise<string> {
    const repoList = await loading<IName[]>(fetchRepoList, "fetching repos...")
    if (!repoList) throw new Error('fetch repo error...')
    const choices = repoList.map(item => item.name)
    const { repo } = await prompt({
      name: 'repo',
      type: 'list',
      choices,
      message: 'please choose a template to create project'
    })
    return repo
  }

  async fetchTag(repo: string): Promise<string> {
    const tagList = await loading<IName[]>(fetchTagsList, "fetching tags...", repo)
    const choices = tagList.map(item => item.name)
    const { tag } = await prompt({
      name: 'tag',
      type: 'list',
      choices,
      message: 'please choose a tag to create project'
    })
    return tag
  }

  async download(repo: string, tag: string): Promise<string> {
    const requestUrl = `lzm-cli/${repo}${tag ? '#' + tag : ''}`
    await
      loading(downloadGitRepo, "download template...", requestUrl, this.target, {})
    return this.target
  }

  async replaceEnv() {


    console.log("create success...\n")
  }
}