const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDay = process.argv[4];

console.log("Inserting....");

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



knex('famous_people')
  .insert({ first_name: firstName, last_name: lastName, birthdate: birthDay}).asCallback(function(err, result ){
    if (err) {
      return console.error("error running query", err);
    }

  console.log('Inserted!!!!');

  })

// knex.select('*').from('famous_people').where('last_name', lookUp).orWhere('first_name', lookUp).asCallback(function (err, result){
//   if (err) {
//       return console.error("error running query", err);
//     }

  // console.log(`Found ${result.length} person(s) by the name ${lookUp}:`);
  //   for ( let i = 0; i < result.length; i++) {
  //     var d = new Date(result[i].birthdate);
  //     var curr_day = d.getDate();
  //     var curr_month = ('0' + (d.getMonth() + 1)).slice(-2);
  //     var curr_year = d.getFullYear();
  //     var convertedBDay = curr_year + "-" + curr_month + "-" + curr_day;
  //     console.log(`-${result[i].id}: ${result[i].first_name} ${result[i].last_name} born \'${convertedBDay}\'`);
  //   }



