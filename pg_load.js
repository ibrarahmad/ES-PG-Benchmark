var myArgs = process.argv.slice(2);
const pgp = require("pg-promise")()
const faker = require("faker")
const Iterations = parseInt(myArgs)
const seedDb = async () => {
  const db = pgp({
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    max: 30
  })
  const columns = new pgp.helpers.ColumnSet(
    ["key_str", "val_str", "val_int", "val_date"],
    { table: "search_idx" }
  )
  const getNextData = (_, pageIdx) =>
    Promise.resolve(
      pageIdx > Iterations - 1
        ? null
        : Array.from(Array(10000)).map(() => ({
            key_str: `${faker.lorem.word()} ${faker.lorem.word()}`,
            val_str: faker.lorem.words(),
            val_int: Math.floor(faker.random.float()),
            val_date: faker.date.past()
          }))
    )
  console.log(
    await db.tx("seed-db", t =>
      t.sequence(idx =>
        getNextData(t, idx).then(data => {
          if (data) return t.none(pgp.helpers.insert(data, columns))
        })
      )
    )
  )
}
seedDb()
