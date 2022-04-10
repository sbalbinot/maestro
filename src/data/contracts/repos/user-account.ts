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

export interface UpdateAutomationAnywhereAccountRepository {
  updateWithAutomationAnywhere: (params: UpdateAutomationAnywhereAccountRepository.Params) => Promise<void>
}

export namespace UpdateAutomationAnywhereAccountRepository {
  export type Params = {
    id: string
    name: string
    automationAnywhereId: string
  }
}
