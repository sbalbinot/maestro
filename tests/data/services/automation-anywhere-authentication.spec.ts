import { AutomationAnywhereAuthentication } from '@/domain/features'

class AutomationAnywhereAuthenticationService {
  constructor(private readonly loadAutomationAnywhereUserApi: LoadAutomationAnywhereUserApi) {}
  async perform (params: AutomationAnywhereAuthentication.Params): Promise<void> {
    await this.loadAutomationAnywhereUserApi.load(params)
  }
}

interface LoadAutomationAnywhereUserApi {
  load: (params: LoadAutomationAnywhereUserApi.Params) => Promise<void>
}

namespace LoadAutomationAnywhereUserApi {
  export type Params = {
    token: string
  }
}

class LoadAutomationAnywhereUserApiSpy implements LoadAutomationAnywhereUserApi {
  token?: string
  async load (params: LoadAutomationAnywhereUserApi.Params): Promise<void> {
    this.token = params.token
  }
}

describe('AutomationAnywhereAuthenticationService', () => {
  it('should call LoadAutomationAnywhereUserApi with correct params', async () => {
    const loadAutomationAnywhereUserApi = new LoadAutomationAnywhereUserApiSpy()
    const sut = new AutomationAnywhereAuthenticationService(loadAutomationAnywhereUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadAutomationAnywhereUserApi.token).toBe('any_token')
  })
})
