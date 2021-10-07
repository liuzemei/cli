import { fetchRepoList, fetchTagsList, IName } from './request'
import { prompt } from 'inquirer'
import { downloadGitRepo, loading } from './utils'
import * as fs from 'fs'
import * as path from 'path'
import * as ejs from 'ejs'
import cli from 'cli-ux'

export class Creator {
  name: string
  target: string
  config: any = {}

  constructor(projectName: string, targetDir: string) {
    this.name = projectName
    this.target = targetDir
  }
  async create() {
    await this.receivedEnv()

    let repo = await this.fetchRepo()

    let tag = await this.fetchTag(repo)
    await this.download(repo, tag)

    this.replaceEnv()
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

  async receivedEnv() {
    this.config.name = await cli.prompt("package name?", { default: this.name })
    this.config.dbname = await cli.prompt("db name?", { default: this.name })
  }

  async replaceEnv() {
    const { name, dbname } = this.config

    const configTemplatePath = path.resolve(this.target, 'config.default.json')
    if (fs.existsSync(configTemplatePath)) {
      const t = fs.readFileSync(configTemplatePath, 'utf8')
      const config = ejs.render(t, { dbname })
      const configPath = path.resolve(this.target, 'config.json')
      fs.writeFileSync(configPath, config)
    }

    const packageJsonPath = path.resolve(this.target, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      const t = fs.readFileSync(packageJsonPath, 'utf8')
      const config = ejs.render(t, { name })
      fs.writeFileSync(packageJsonPath, config, { flag: 'w' })
    }

    console.log("create success...\n")
  }
}