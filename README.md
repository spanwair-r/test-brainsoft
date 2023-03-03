Author: Jan Gabriel

!IMPORTANT NOTE!
test are not implemented. Please check my code and if you like it than I can manage to implement test.

# BE APP

### STACK
Node.js (Typescript, Fastify)
GraphQL (Nexus)
PostgreSQL (Objection.js)

### INSTALLATION
yarn

### START APP
!IMPORTANT NOTE, BE SURE YOU HAS .env FILE IN YOUR SCRIPT

(add --build option after script only on first call)
docker-compose up

### SEED DB
DB Password is in .env file as PASSWORD_DB

run script on separate terminal from app root folder
`docker exec -i postgres_url psql -U postgres_user -d postgres_db < ./doc/pokemons.sql`

the response should be like this
```
DROP TABLE
NOTICE:  table "pokemons" does not exist, skipping
DROP SEQUENCE
CREATE SEQUENCE
CREATE TABLE
INSERT 0 800
```

### POSTMAN
import Collection of Requests from ./doc/pokemons-postman.json file into your Postman
