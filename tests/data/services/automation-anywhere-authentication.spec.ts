import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthenticationService } from '@/data/services'
import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { CreateAutomationAnywhereAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repos'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AutomationAnywhereAuthenticationService', () => {
  let automationAnywhereApi: MockProxy<LoadAutomationAnywhereUserApi>
  let userAccountRepo: MockProxy<CreateAutomationAnywhereAccountRepository & LoadUserAccountRepository>
  let sut: AutomationAnywhereAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    automationAnywhereApi = mock()
    automationAnywhereApi.load.mockResolvedValue({
      automationAnywhereId: 'any_aa_id',
      name: 'any_aa_name',
      email: 'any_aa_email'
    })
    userAccountRepo = mock()
    sut = new AutomationAnywhereAuthenticationService(automationAnywhereApi, userAccountRepo)
  })

  it('should call LoadAutomationAnywhereUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(automationAnywhereApi.load).toHaveBeenCalledWith({ token })
    expect(automationAnywhereApi.load).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadAutomationAnywhereUserApi returns undefined', async () => {
    automationAnywhereApi.load.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepo when LoadAutomationAnywhereUserApi returns data', async () => {
    await sut.perform({ token })

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_aa_email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should call CreateUserAccountRepo when LoadUserAccountRepo returns undefined', async () => {
    userAccountRepo.load.mockResolvedValueOnce(undefined)

    await sut.perform({ token })

    expect(userAccountRepo.createFromAutomationAnywhere).toHaveBeenCalledWith({ automationAnywhereId: 'any_aa_id', email: 'any_aa_email', name: 'any_aa_name' })
    expect(userAccountRepo.createFromAutomationAnywhere).toHaveBeenCalledTimes(1)
  })
})
