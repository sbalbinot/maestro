import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { CreateAutomationAnywhereAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthentication } from '@/domain/features'

export class AutomationAnywhereAuthenticationService {
  constructor (
    private readonly loadAutomationAnywhereUserApi: LoadAutomationAnywhereUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository,
    private readonly createAutomationAnywhereAccountRepo: CreateAutomationAnywhereAccountRepository
  ) {}

  async perform (params: AutomationAnywhereAuthentication.Params): Promise<AuthenticationError> {
    const aaData = await this.loadAutomationAnywhereUserApi.load(params)
    if (aaData !== undefined) {
      await this.loadUserAccountRepo.load({ email: aaData.email })
      await this.createAutomationAnywhereAccountRepo.createFromAutomationAnywhere(aaData)
    }
    return new AuthenticationError()
  }
}
