
import * as path from 'path'
import * as fs from 'fs-extra'
import * as Inquirer from 'inquirer'
import { Creator } from './Creator'
export async function createProject(appName: string, f: boolean) {
  if (!appName) throw new Error('inspect project name')
  const cwd = process.cwd()
  const targetDir = path.resolve(cwd, appName)
  if (fs.existsSync(targetDir)) {
    if (f) fs.removeSync(targetDir)
    else {
      // 提示用户是否要覆盖
      const { action } = await Inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: `Target directory already exists Pick an action:`,
          choices: [
            { name: "Overwrite", value: "overwrite" },
            { name: "Cancel", value: false }
          ]
        }
      ])
      if (!action) return
      if (action === 'overwrite') fs.removeSync(targetDir)
    }
  }
  // 创建项目
  const creator = new Creator(appName, targetDir)
  creator.create()

}