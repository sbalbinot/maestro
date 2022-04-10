import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthentication } from '@/domain/features'

export class AutomationAnywhereAuthenticationService {
  constructor(private readonly loadAutomationAnywhereUserApi: LoadAutomationAnywhereUserApi) {}
  async perform (params: AutomationAnywhereAuthentication.Params): Promise<AuthenticationError> {
    await this.loadAutomationAnywhereUserApi.load(params)
    return new AuthenticationError()
  }
}
