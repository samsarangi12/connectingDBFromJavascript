function accpetInput () {

  const input = process.argv.slice(2);
  return input;
}

function accessDetails () {
  const input = accpetInput();
  const pg = require("pg");
  const settings = require("./settings"); // settings.json

  const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    }
  });

  const firstName = input[0];
  const lastName = input[1];
  const dateOfBirth = input[2];

  knex.insert([{first_name: firstName, last_name: lastName, birthdate: dateOfBirth}])
  .into('famous_people')
  .then(function(rows) {
    console.log("One record inserted !!");
    knex.destroy();
  })
  .catch(function(error) {
    console.error(error)
  });
}

accessDetails();



