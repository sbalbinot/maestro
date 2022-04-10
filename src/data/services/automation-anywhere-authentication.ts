import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveAutomationAnywhereAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthentication } from '@/domain/features'

export class AutomationAnywhereAuthenticationService {
  constructor (
    private readonly automationAnywhereApi: LoadAutomationAnywhereUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveAutomationAnywhereAccountRepository
  ) {}

  async perform (params: AutomationAnywhereAuthentication.Params): Promise<AuthenticationError> {
    const aaData = await this.automationAnywhereApi.loadUser(params)
    if (aaData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: aaData.email })
      await this.userAccountRepo.saveWithAutomationAnywhere({
        id: accountData?.id,
        name: accountData?.name ?? aaData.name,
        email: aaData.email,
        automationAnywhereId: aaData.automationAnywhereId
      })
    }
    return new AuthenticationError()
  }
}
