
type AutomationAnywhereData = {
  name: string
  email: string
  automationAnywhereId: string
}

type AccountData = {
  id?: string
  name?: string
}

export class AutomationAnywhereAccount {
  id?: string
  name: string
  email: string
  automationAnywhereId: string

  constructor (aaData: AutomationAnywhereData, accountData?: AccountData) {
    this.id = accountData?.id
    this.name = accountData?.name ?? aaData.name
    this.email = aaData.email
    this.automationAnywhereId = aaData.automationAnywhereId
  }
}
