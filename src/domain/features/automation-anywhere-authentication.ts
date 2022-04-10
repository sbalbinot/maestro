import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '@/domain/errors'

export interface AutomationAnywhereAuthentication {
  perform: (params: AutomationAnywhereAuthentication.Params) => Promise<AutomationAnywhereAuthentication.Result>
}

export namespace AutomationAnywhereAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
