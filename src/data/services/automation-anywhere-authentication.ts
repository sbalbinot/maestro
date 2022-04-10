import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { CreateAutomationAnywhereAccountRepository, LoadUserAccountRepository, UpdateAutomationAnywhereAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthentication } from '@/domain/features'

export class AutomationAnywhereAuthenticationService {
  constructor (
    private readonly automationAnywhereApi: LoadAutomationAnywhereUserApi,
    private readonly userAccountRepo: CreateAutomationAnywhereAccountRepository & LoadUserAccountRepository & UpdateAutomationAnywhereAccountRepository
  ) {}

  async perform (params: AutomationAnywhereAuthentication.Params): Promise<AuthenticationError> {
    const aaData = await this.automationAnywhereApi.loadUser(params)
    if (aaData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: aaData.email })
      if (accountData?.name !== undefined) {
        await this.userAccountRepo.updateWithAutomationAnywhere({
          id: accountData.id,
          name: accountData.name,
          automationAnywhereId: aaData.automationAnywhereId
        })
      } else {
        await this.userAccountRepo.createFromAutomationAnywhere(aaData)
      }
    }
    return new AuthenticationError()
  }
}
