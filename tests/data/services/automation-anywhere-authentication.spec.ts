import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthenticationService } from '@/data/services'
import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveAutomationAnywhereAccountRepository } from '@/data/contracts/repos'
import { TokenGenerator } from '@/data/contracts/crypto'
import { AutomationAnywhereAccount } from '@/domain/models'

import { mocked } from 'jest-mock'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/models/automation-anywhere-account')

describe('AutomationAnywhereAuthenticationService', () => {
  let automationAnywhereApi: MockProxy<LoadAutomationAnywhereUserApi>
  let crypto: MockProxy<TokenGenerator>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveAutomationAnywhereAccountRepository>
  let sut: AutomationAnywhereAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    automationAnywhereApi = mock()
    automationAnywhereApi.loadUser.mockResolvedValue({
      name: 'any_aa_name',
      email: 'any_aa_email',
      automationAnywhereId: 'any_aa_id'
    })
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(undefined)
    userAccountRepo.saveWithAutomationAnywhere.mockResolvedValueOnce({ id: 'any_account_id' })
    crypto = mock()
    sut = new AutomationAnywhereAuthenticationService(automationAnywhereApi, userAccountRepo, crypto)
  })

  it('should call LoadAutomationAnywhereUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(automationAnywhereApi.loadUser).toHaveBeenCalledWith({ token })
    expect(automationAnywhereApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadAutomationAnywhereUserApi returns undefined', async () => {
    automationAnywhereApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepo when LoadAutomationAnywhereUserApi returns data', async () => {
    await sut.perform({ token })

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_aa_email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should call SaveAutomationAnywhereAccountRepository with AutomationAnywhereAccount', async () => {
    const AutomationAnywhereStub = jest.fn().mockImplementation(() => ({
      any: 'any'
    }))
    mocked(AutomationAnywhereAccount).mockImplementation(AutomationAnywhereStub)

    await sut.perform({ token })

    expect(userAccountRepo.saveWithAutomationAnywhere).toHaveBeenCalledWith({ any: 'any' })
    expect(userAccountRepo.saveWithAutomationAnywhere).toHaveBeenCalledTimes(1)
  })

  it('should call TokenGenerator with correct params', async () => {
    await sut.perform({ token })

    expect(crypto.generateToken).toHaveBeenCalledWith({ key: 'any_account_id' })
    expect(crypto.generateToken).toHaveBeenCalledTimes(1)
  })
})
