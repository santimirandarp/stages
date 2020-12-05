# run from the "backup" directory, so ${PWD} has the correct value

mongodump 'mongodb+srv://CLUS.mongodb.net/todos' --authenticationDatabase admin --username        --password          -c quotes --gzip --path ${PWD}/backup/dump/todos

mongoexport 'mongodb+srv://CLUS.mongodb.net/todos' --authenticationDatabase admin --username     --password   -c quotes --out=${PWD}/backup/json/quotes.json
