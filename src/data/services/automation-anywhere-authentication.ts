import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveAutomationAnywhereAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthentication } from '@/domain/features'
import { AutomationAnywhereAccount } from '@/domain/models'

export class AutomationAnywhereAuthenticationService {
  constructor (
    private readonly automationAnywhereApi: LoadAutomationAnywhereUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveAutomationAnywhereAccountRepository
  ) {}

  async perform (params: AutomationAnywhereAuthentication.Params): Promise<AuthenticationError> {
    const aaData = await this.automationAnywhereApi.loadUser(params)
    if (aaData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: aaData.email })
      const aaAccount = new AutomationAnywhereAccount(aaData, accountData)
      await this.userAccountRepo.saveWithAutomationAnywhere(aaAccount)
    }
    return new AuthenticationError()
  }
}
