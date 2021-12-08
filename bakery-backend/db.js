//Connect to dB
const promise = require("bluebird");
const monitor = require("pg-monitor");

const options = {
  query: function (e) {
    if (e.ctx && e.ctx.tag) monitor.query(e);
  },
  promiseLib: promise,
};

const pgp = require("pg-promise")(options);

postgresU = "postgres";
postgresP = "root";
postgresDB = "BAKERY";
postgresH = "localhost";
postgresPORT = "5432";
const connectionString = `postgres://${postgresU}:${postgresP}@${postgresH}:${postgresPORT}/${postgresDB}`;
monitor.attach(options, ["task", "transact", "error"]);
const db = pgp(connectionString);

db.connect()
  .then((obj) => {
    console.info("Connection to postgres: success!");
    obj.done();
  })
  .catch((error) => {
    console.error(
      "Connection to postfres failed with error:",
      error.message || error
    );
  });

module.exports = db;
