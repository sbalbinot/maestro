export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined
}

export interface CreateAutomationAnywhereAccountRepository {
  createFromAutomationAnywhere: (params: LoadUserAccountRepository.Params) => Promise<void>
}

export namespace CreateAutomationAnywhereAccountRepository {
  export type Params = {
    automationAnywhereId: string
    email: string
    name: string
  }

}
