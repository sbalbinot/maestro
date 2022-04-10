import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthenticationService } from '@/data/services'
import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'
import { CreateAutomationAnywhereAccountRepository, LoadUserAccountRepository, UpdateAutomationAnywhereAccountRepository } from '@/data/contracts/repos'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AutomationAnywhereAuthenticationService', () => {
  let automationAnywhereApi: MockProxy<LoadAutomationAnywhereUserApi>
  let userAccountRepo: MockProxy<CreateAutomationAnywhereAccountRepository & LoadUserAccountRepository & UpdateAutomationAnywhereAccountRepository>
  let sut: AutomationAnywhereAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    automationAnywhereApi = mock()
    automationAnywhereApi.loadUser.mockResolvedValue({
      automationAnywhereId: 'any_aa_id',
      name: 'any_aa_name',
      email: 'any_aa_email'
    })
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(undefined)
    sut = new AutomationAnywhereAuthenticationService(automationAnywhereApi, userAccountRepo)
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

  it('should call CreateAutomationAnywhereAccountRepo when LoadUserAccountRepo returns undefined', async () => {
    await sut.perform({ token })

    expect(userAccountRepo.createFromAutomationAnywhere).toHaveBeenCalledWith({
      automationAnywhereId: 'any_aa_id',
      email: 'any_aa_email',
      name: 'any_aa_name'
    })
    expect(userAccountRepo.createFromAutomationAnywhere).toHaveBeenCalledTimes(1)
  })

  it('should call UpdateAutomationAnywhereAccountRepo when LoadUserAccountRepo returns data', async () => {
    userAccountRepo.load.mockResolvedValueOnce({
      id: 'any_id',
      name: 'any_name'
    })

    await sut.perform({ token })

    expect(userAccountRepo.updateWithAutomationAnywhere).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'any_name',
      automationAnywhereId: 'any_aa_id'
    })
    expect(userAccountRepo.updateWithAutomationAnywhere).toHaveBeenCalledTimes(1)
  })

  it('should update account name', async () => {
    userAccountRepo.load.mockResolvedValueOnce({
      id: 'any_id'
    })

    await sut.perform({ token })

    expect(userAccountRepo.updateWithAutomationAnywhere).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'any_aa_name',
      automationAnywhereId: 'any_aa_id'
    })
    expect(userAccountRepo.updateWithAutomationAnywhere).toHaveBeenCalledTimes(1)
  })
})
