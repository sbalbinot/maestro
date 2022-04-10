import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthenticationService } from '@/data/services'
import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'

import { mock } from 'jest-mock-extended'

describe('AutomationAnywhereAuthenticationService', () => {
  it('should call LoadAutomationAnywhereUserApi with correct params', async () => {
    const loadAutomationAnywhereUserApi = mock<LoadAutomationAnywhereUserApi>()
    const sut = new AutomationAnywhereAuthenticationService(loadAutomationAnywhereUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadAutomationAnywhereUserApi.load).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadAutomationAnywhereUserApi.load).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadAutomationAnywhereUserApi returns undefined', async () => {
    const loadAutomationAnywhereUserApi = mock<LoadAutomationAnywhereUserApi>()
    loadAutomationAnywhereUserApi.load.mockResolvedValueOnce(undefined)
    const sut = new AutomationAnywhereAuthenticationService(loadAutomationAnywhereUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
