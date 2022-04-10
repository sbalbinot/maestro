import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthenticationService } from '@/data/services'
import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository } from '@/data/contracts/repos'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AutomationAnywhereAuthenticationService', () => {
  let loadAutomationAnywhereUserApi: MockProxy<LoadAutomationAnywhereUserApi>
  let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>
  let sut: AutomationAnywhereAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    loadAutomationAnywhereUserApi = mock()
    loadAutomationAnywhereUserApi.load.mockResolvedValue({
      automationAnywhereId: 'any_aa_id',
      name: 'any_aa_name',
      email: 'any_aa_email'
    })
    loadUserAccountRepo = mock()
    sut = new AutomationAnywhereAuthenticationService(loadAutomationAnywhereUserApi, loadUserAccountRepo)
  })

  it('should call LoadAutomationAnywhereUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(loadAutomationAnywhereUserApi.load).toHaveBeenCalledWith({ token })
    expect(loadAutomationAnywhereUserApi.load).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadAutomationAnywhereUserApi returns undefined', async () => {
    loadAutomationAnywhereUserApi.load.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepo when LoadAutomationAnywhereUserApi returns data', async () => {
    await sut.perform({ token })

    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({ email: 'any_aa_email' })
    expect(loadUserAccountRepo.load).toHaveBeenCalledTimes(1)
  })
})
