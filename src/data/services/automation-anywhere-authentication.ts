import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { CreateAutomationAnywhereAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthentication } from '@/domain/features'

export class AutomationAnywhereAuthenticationService {
  constructor (
    private readonly automationAnywhereApi: LoadAutomationAnywhereUserApi,
    private readonly userAccountRepo: CreateAutomationAnywhereAccountRepository & LoadUserAccountRepository
  ) {}

  async perform (params: AutomationAnywhereAuthentication.Params): Promise<AuthenticationError> {
    const aaData = await this.automationAnywhereApi.loadUser(params)
    if (aaData !== undefined) {
      await this.userAccountRepo.load({ email: aaData.email })
      await this.userAccountRepo.createFromAutomationAnywhere(aaData)
    }
    return new AuthenticationError()
  }
}
