#/bin/bash

rm es_results.txt
for n in 100000 100000 200000
do
    node es_create.js $n
    node es_load.js

for m in 1 2 3
  do
    curl -sX GET "localhost:9200/search-idx/_search?pretty" \
    -H 'Content-Type: application/json' \
    -d'
    {
        "query": {
        "simple_query_string" : {
        "query": "\"repellat sunt\" -quis",
        "fields": ["key", "val"],
        "default_operator": "and"
        }
    }
    }
    ' >> es_results.txt
  done
done
./es_delete.sh
more es_results.txt | grep took | awk '{ print $3}'
