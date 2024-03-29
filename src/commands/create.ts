import { Command, flags } from "@oclif/command";
import { createProject } from "../create";

export default class Create extends Command {
  static description = "create a new project";

  static examples = [`$ lzmm-cli create test`];

  static flags = {
    force: flags.boolean({ char: "f" }),
  };

  static args = [{ name: "project" }];

  async run() {
    const { args, flags } = this.parse(Create);
    createProject(args.project, flags.force);
  }
}
