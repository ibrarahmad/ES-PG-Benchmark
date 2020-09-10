#/bin/bash
rm pg_results.txt
for n in 10 20 30
do
    psql postgres -f pg.sql
    ./pg_load.sh $n
    for n in 1 2 3
    do
        psql postgres -c 'ANALYZE search_idx;'
        psql postgres -f pg_bench.sql >> pg_results.txt
    done
done
cat pg_results.txt |grep Time | awk '{ print $2}'
