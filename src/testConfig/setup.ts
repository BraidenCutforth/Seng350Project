import { initDb, closeDb } from '../db'

beforeAll(async () => {
    await initDb()
    return
})

afterAll(async () => {
    await closeDb()
})
