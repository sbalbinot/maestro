import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthenticationService } from '@/data/services'
import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'

import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: AutomationAnywhereAuthenticationService
  loadAutomationAnywhereUserApi: MockProxy<LoadAutomationAnywhereUserApi>
}

const makeSut = (): SutTypes => {
  const loadAutomationAnywhereUserApi = mock<LoadAutomationAnywhereUserApi>()
  const sut = new AutomationAnywhereAuthenticationService(loadAutomationAnywhereUserApi)
  return {
    sut,
    loadAutomationAnywhereUserApi
  }
}

describe('AutomationAnywhereAuthenticationService', () => {
  it('should call LoadAutomationAnywhereUserApi with correct params', async () => {
    const { sut, loadAutomationAnywhereUserApi } = makeSut()

    await sut.perform({ token: 'any_token' })

    expect(loadAutomationAnywhereUserApi.load).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadAutomationAnywhereUserApi.load).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadAutomationAnywhereUserApi returns undefined', async () => {
    const { sut, loadAutomationAnywhereUserApi } = makeSut()
    loadAutomationAnywhereUserApi.load.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
