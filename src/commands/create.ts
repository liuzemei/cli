import { Command, flags } from '@oclif/command'
import { createProject } from '../create'

export default class Hello extends Command {
  static description = 'create a new project'

  static examples = [
    `$ lzm-cli create test`,
  ]

  static flags = {
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'project' }]

  async run() {
    const { args, flags } = this.parse(Hello)
    createProject(args.project, flags.force)
  }
}
