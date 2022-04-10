import { AuthenticationError } from '@/domain/errors'
import { AutomationAnywhereAuthenticationService } from '@/data/services'
import { LoadAutomationAnywhereUserApi } from '@/data/contracts/apis'

class LoadAutomationAnywhereUserApiSpy implements LoadAutomationAnywhereUserApi {
  token?: string
  result = undefined

  async load (params: LoadAutomationAnywhereUserApi.Params): Promise<LoadAutomationAnywhereUserApi.Result> {
    this.token = params.token
    return this.result
  }
}

describe('AutomationAnywhereAuthenticationService', () => {
  it('should call LoadAutomationAnywhereUserApi with correct params', async () => {
    const loadAutomationAnywhereUserApi = new LoadAutomationAnywhereUserApiSpy()
    const sut = new AutomationAnywhereAuthenticationService(loadAutomationAnywhereUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadAutomationAnywhereUserApi.token).toBe('any_token')
  })

  it('should return AuthenticationError when LoadAutomationAnywhereUserApi returns undefined', async () => {
    const loadAutomationAnywhereUserApi = new LoadAutomationAnywhereUserApiSpy()
    loadAutomationAnywhereUserApi.result = undefined
    const sut = new AutomationAnywhereAuthenticationService(loadAutomationAnywhereUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
