const knex = require("knex");

const config = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
};

const db = knex(config);
//SQL SELECT * FROM zoos
function find() {
  return db("zoos");
}
// SELECT * FROM zoos WHERE PrimaryKey-ID = id
function findById(id) {
  return db("zoos")
    .first()
    .where({ id });
}
//SQL INSERT INTO zoos (name) VALUES ('name')
function add(name) {
  return db("zoos").insert(name);
}
// SQL UPDATE zoos SET name = 'changes' WHERE PrimaryKey-ID = id
function update(id, changes) {
  return db("zoos")
    .where({ id })
    .update(changes);
}
// SQL DELETE FROM zoos WHERE PrimaryKey-ID = id
function remove(id) {
  return db("zoos")
    .where({ id })
    .del();
}

/*
Function to test the functions without using postman or the browser.
async function execute() {
  const zoos = await find();
  console.log(zoos);
}
execute();
*/

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};
