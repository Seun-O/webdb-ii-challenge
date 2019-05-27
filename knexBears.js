const knex = require("knex");

const config = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
};

const db = knex(config);
//SQL SELECT * FROM bears
function find() {
  return db("bears");
}
// SELECT * FROM bears WHERE PrimaryKey-ID = id
function findById(id) {
  return db("bears")
    .first()
    .where({ id });
}
//SQL INSERT INTO bears (name) VALUES ('name')
function add(name) {
  return db("bears").insert(name);
}
// SQL UPDATE bears SET name = 'changes' WHERE PrimaryKey-ID = id
function update(id, changes) {
  return db("bears")
    .where({ id })
    .update(changes);
}
// SQL DELETE FROM bears WHERE PrimaryKey-ID = id
function remove(id) {
  return db("bears")
    .where({ id })
    .del();
}

/*
Function to test the functions without using postman or the browser.
async function execute() {
  const bears = await find();
  console.log(bears);
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
