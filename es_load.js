const { createReadStream } = require("fs")
const split = require("split2")
const { Client } = require("@elastic/elasticsearch")
const Index = "search-idx"
const seedIndex = async () => {
  const client = new Client({ node: "http://localhost:9200" })
  console.log(
    await client.helpers.bulk({
      datasource: createReadStream("./dataset.ndjson").pipe(split()),
      onDocument(doc) {
        return { index: { _index: Index } }
      },
      onDrop(doc) { b.abort() }
    })
  )
}
seedIndex()
