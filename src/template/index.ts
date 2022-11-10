export const initEnv = async (creator: any, repo: string) => {
  try {
    repo = repo.replace("-template", "");
    const { beforeCreated } = await import("./" + repo);
    return beforeCreated(creator);
  } catch (e) {}
};

export const replaceEnv = async (creator: any, repo: string) => {
  try {
    repo = repo.replace("-template", "");
    const { afterCreated } = await import("./" + repo);
    return afterCreated(creator);
  } catch (e) {}
};
