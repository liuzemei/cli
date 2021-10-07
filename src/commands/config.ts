import { Command, flags } from '@oclif/command'

export default class Hello extends Command {
  static description = 'inspect and modify the config'

  static examples = [
    `$ lzm-cli create test`,
  ]

  static flags = {
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'project' }]

  async run() {
    const { args, flags } = this.parse(Hello)
    console.log(args)
    if (!args.project) throw new Error('inspect project name')
    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from ./src/commands/hello.ts`)
    if (args.project && flags.force) {
      this.log(`you input --force and --project: ${args.project}`)
    }
  }
}
