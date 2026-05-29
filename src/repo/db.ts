import pgPromise from 'pg-promise'

const pgp = pgPromise()
export const db = pgp({
    user: "Alisha",
    password: "may",
    host: "localhost",
    database: "user_management",
    port: 5432
})