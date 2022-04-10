import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthenticationService } from '@/data/services'
import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AutomationAnywhereAuthenticationService', () => {
  let loadAutomationAnywhereUserApi: MockProxy<LoadAutomationAnywhereUserApi>
  let sut: AutomationAnywhereAuthenticationService

  beforeEach(() => {
    loadAutomationAnywhereUserApi = mock()
    sut = new AutomationAnywhereAuthenticationService(loadAutomationAnywhereUserApi)
  })

  it('should call LoadAutomationAnywhereUserApi with correct params', async () => {
    await sut.perform({ token: 'any_token' })

    expect(loadAutomationAnywhereUserApi.load).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadAutomationAnywhereUserApi.load).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadAutomationAnywhereUserApi returns undefined', async () => {
    loadAutomationAnywhereUserApi.load.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
