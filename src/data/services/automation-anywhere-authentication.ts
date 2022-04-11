import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveAutomationAnywhereAccountRepository } from '@/data/contracts/repos'
import { TokenGenerator } from '@/data/contracts/crypto'
import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthentication } from '@/domain/features'
import { AccessToken, AutomationAnywhereAccount } from '@/domain/models'

export class AutomationAnywhereAuthenticationService implements AutomationAnywhereAuthentication {
  constructor (
    private readonly automationAnywhereApi: LoadAutomationAnywhereUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveAutomationAnywhereAccountRepository,
    private readonly crypto: TokenGenerator
  ) {}

  async perform (params: AutomationAnywhereAuthentication.Params): Promise<AutomationAnywhereAuthentication.Result> {
    const aaData = await this.automationAnywhereApi.loadUser(params)
    if (aaData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: aaData.email })
      const aaAccount = new AutomationAnywhereAccount(aaData, accountData)
      const { id } = await this.userAccountRepo.saveWithAutomationAnywhere(aaAccount)
      const token = await this.crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
      return new AccessToken(token)
    }
    return new AuthenticationError()
  }
}
