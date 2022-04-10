export interface LoadAutomationAnywhereUserApi {
  loadUser: (params: LoadAutomationAnywhereUserApi.Params) => Promise<LoadAutomationAnywhereUserApi.Result>
}

export namespace LoadAutomationAnywhereUserApi {
  export type Params = {
    token: string
  }

  export type Result = undefined | {
    automationAnywhereId: string
    name: string
    email: string
  }
}
