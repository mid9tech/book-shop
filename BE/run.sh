docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=aA@01010001 postgres

# connect to docker container
docker exec -it postgres /bin/bash

# for show all db
psql -U postgres -l

# show all table
psql -U postgres -d shopp_nt -c "\dt"
