import { validateAdminPassword } from './AdminProvider.jsx'
import packageJSON from '../../package.json'

test('admin authentication with good password', () => {
    const result = validateAdminPassword(packageJSON.adminPassword)
    expect(result).toBe(true)
})

test('admin authentication with bad password', () => {
    const result = validateAdminPassword('thisisafakepassword')
    expect(result).toBe(false)
})