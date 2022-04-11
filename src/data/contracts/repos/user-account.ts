export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    id: string
    name?: string
  }
}

export interface SaveAutomationAnywhereAccountRepository {
  saveWithAutomationAnywhere: (params: SaveAutomationAnywhereAccountRepository.Params) => Promise<SaveAutomationAnywhereAccountRepository.Result>
}

export namespace SaveAutomationAnywhereAccountRepository {
  export type Params = {
    id?: string
    name: string
    email: string
    automationAnywhereId: string
  }

  export type Result = {
    id: string
  }
}
