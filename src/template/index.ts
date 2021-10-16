
export const initEnv = async (creator: any, repo: string) => {
  repo = repo.replace('-template', '')
  const { beforeCreated } = await import('./' + repo)
  return beforeCreated(creator)
}

export const replateEnv = async (creator: any, repo: string) => {
  repo = repo.replace('-template', '')
  const { afterCreated } = await import('./' + repo)
  return afterCreated(creator)
}
