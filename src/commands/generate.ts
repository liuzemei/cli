import { Command, flags } from "@oclif/command";
import { createProject } from "../create";

export default class Generate extends Command {
  static description = "generate a new mode";

  static examples = [`$ lzmm-cli generate test`];

  static flags = {
    force: flags.boolean({ char: "f" }),
  };

  static args = [{ name: "mode" }];

  async run() {
    const { args, flags } = this.parse(Generate);
    createProject(args.project, flags.force);
  }
}
