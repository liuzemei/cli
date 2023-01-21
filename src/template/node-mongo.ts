import cli from "cli-ux";
import * as fs from "fs";
import * as path from "path";
import * as ejs from "ejs";

export const beforeCreated = async (creator: any): Promise<object> => {
  const config: any = {};
  config.name = await cli.prompt("package name?", { default: creator.name });
  config.dbname = await cli.prompt("db name?", { default: creator.name });
  return config;
};

export const afterCreated = (creator: any) => {
  const { name, dbname } = creator.config;

  const configTemplatePath = path.resolve(
    creator.target,
    "config.default.json"
  );
  if (fs.existsSync(configTemplatePath)) {
    const t = fs.readFileSync(configTemplatePath, "utf8");
    const config = ejs.render(t, { dbname });
    const configPath = path.resolve(creator.target, "config.json");
    fs.writeFileSync(configPath, config);
  }

  const packageJsonPath = path.resolve(creator.target, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const t = fs.readFileSync(packageJsonPath, "utf8");
    const config = ejs.render(t, { name });
    fs.writeFileSync(packageJsonPath, config, { flag: "w" });
  }
};
