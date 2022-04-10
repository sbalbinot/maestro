import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthentication } from '@/domain/features'

export class AutomationAnywhereAuthenticationService {
  constructor (
    private readonly loadAutomationAnywhereUserApi: LoadAutomationAnywhereUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository
  ) {}

  async perform (params: AutomationAnywhereAuthentication.Params): Promise<AuthenticationError> {
    const aaData = await this.loadAutomationAnywhereUserApi.load(params)
    if (aaData !== undefined) {
      await this.loadUserAccountRepo.load({ email: aaData.email })
    }
    return new AuthenticationError()
  }
}
