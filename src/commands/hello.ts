import { Command, flags } from '@oclif/command'

export default class Hello extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ lzm-cli create [name]`,
  ]

  static flags = {
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'appname' }]

  async run() {
    const { args, flags } = this.parse(Hello)
    // cli.action.start("test")
    // await new Promise(r => setTimeout(r, 10000))
    // cli.action.stop()
  }
}
