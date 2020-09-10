const Iterations = parseInt(process.argv.slice(2));
const faker = require("faker")
const { writeFileSync } = require("fs")
writeFileSync(
  "./dataset.ndjson",
  Array.from(Array(Iterations))
    .map(() =>
      JSON.stringify({
        key: `${faker.lorem.word()} ${faker.lorem.word()}`,
        val: faker.lorem.words(),
        valInt: Math.floor(faker.random.float()),
        valDate: faker.date.past()
      })
    )
    .join("\n")
)
