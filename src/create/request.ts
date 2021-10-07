import axios from 'axios'

const gitIns = axios.create({
  baseURL: "https://api.github.com"
})

gitIns.interceptors.response.use(res => res.data)

export interface IName {
  name: string
}

export const fetchRepoList = async (): Promise<IName[]> => gitIns.get(`/orgs/lzm-cli/repos`)

export const fetchTagsList = async (repo: string): Promise<IName[]> => gitIns.get(`/repos/lzm-cli/${repo}/tags`)
