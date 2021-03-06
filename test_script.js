const lookUp = process.argv[2];

console.log("Searching....");

const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});

knex.select('*').from('famous_people').where('last_name', lookUp).orWhere('first_name', lookUp).asCallback(function (err, result){
  if (err) {
      return console.error("error running query", err);
    }

  console.log(`Found ${result.length} person(s) by the name ${lookUp}:`);
    for ( let i = 0; i < result.length; i++) {
      var d = new Date(result[i].birthdate);
      var curr_day = d.getDate();
      var curr_month = ('0' + (d.getMonth() + 1)).slice(-2);
      var curr_year = d.getFullYear();
      var convertedBDay = curr_year + "-" + curr_month + "-" + curr_day;
      console.log(`-${result[i].id}: ${result[i].first_name} ${result[i].last_name} born \'${convertedBDay}\'`);
    }

});


// const lookUp = process.argv[2];


// const pg = require("pg");
// const settings = require("./settings"); // settings.json

// const client = new pg.Client({
//   user     : settings.user,
//   password : settings.password,
//   database : settings.database,
//   host     : settings.hostname,
//   port     : settings.port,
//   ssl      : settings.ssl
// });

// console.log("Searching....");
// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   client.query("SELECT * FROM famous_people WHERE last_name = $1::text OR first_name = $1::text ", [lookUp], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }

//     console.log(`Found ${result.rows.length} person(s) by the name ${lookUp}:`);
//     for (const row of result.rows) {
//       var d = new Date(row.birthdate);
//       var curr_day = d.getDate();
//       var curr_month = ('0' + (d.getMonth() + 1)).slice(-2);
//       var curr_year = d.getFullYear();
//       var convertedBDay = curr_year + "-" + curr_month + "-" + curr_day;
//       console.log(`-${row.id}: ${row.first_name} ${row.last_name} born \'${convertedBDay}\'`);
//     }

//     client.end();
//   });
// });