export interface LoadAutomationAnywhereUserApi {
  loadUser: (params: LoadAutomationAnywhereUserApi.Params) => Promise<LoadAutomationAnywhereUserApi.Result>
}

export namespace LoadAutomationAnywhereUserApi {
  export type Params = {
    token: string
  }

  export type Result = undefined | {
    name: string
    email: string
    automationAnywhereId: string
  }
}
