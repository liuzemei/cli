import cli from 'cli-ux'
import * as fs from 'fs'
import * as path from 'path'
import * as ejs from 'ejs'

export const beforeCreated = async (creator: any): Promise<object> => {
  const config: any = {}
  config.organization = await cli.prompt("organization name?")
  config.repo = await cli.prompt("repo name?", { default: creator.name })
  return config
}

export const afterCreated = (creator: any) => {
  const { config: { organization, repo }, target } = creator
  renderFile(target, { organization, repo })
}

function renderFile(target: string, obj: Object) {
  fs.readdirSync(target).forEach(file => {
    if (fs.statSync(path.resolve(target, file)).isDirectory()) {
      renderFile(path.resolve(target, file), obj)
    } else {
      const content = fs.readFileSync(path.resolve(target, file), 'utf8')
      const newContent = ejs.render(content, obj)
      fs.writeFileSync(path.resolve(target, file), newContent, { flag: 'w' })
    }
  })
}
