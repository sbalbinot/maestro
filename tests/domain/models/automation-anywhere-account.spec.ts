import { AutomationAnywhereAccount } from '@/domain/models'

describe('AutomationAnywhereAccount', () => {
  const aaData = {
    name: 'any_aa_name',
    email: 'any_aa_email',
    automationAnywhereId: 'any_aa_id'
  }

  it('should create with automation anywhere data only', () => {
    const sut = new AutomationAnywhereAccount(aaData)

    expect(sut).toEqual({
      name: 'any_aa_name',
      email: 'any_aa_email',
      automationAnywhereId: 'any_aa_id'
    })
  })

  it('should update name if its empty', () => {
    const accountData = { id: 'any_id' }

    const sut = new AutomationAnywhereAccount(aaData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_aa_name',
      email: 'any_aa_email',
      automationAnywhereId: 'any_aa_id'
    })
  })

  it('should not update name if its not empty', () => {
    const accountData = { id: 'any_id', name: 'any_name' }

    const sut = new AutomationAnywhereAccount(aaData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_aa_email',
      automationAnywhereId: 'any_aa_id'
    })
  })
})
