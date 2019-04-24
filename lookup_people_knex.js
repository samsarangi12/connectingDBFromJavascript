function acceptInput () {

  const input = process.argv.slice(2)[0];
  return input;
}

function accessDetails () {
  const input = acceptInput();
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

  knex.select('first_name', 'last_name', 'birthdate')
  .from('famous_people')
  .where('first_name', input)
  .offset(0)
  .then(function(rows) {
    displayOutput(rows);
    knex.destroy();
  })
  .catch(function(error) {
    console.error(error)
  });
}

function displayOutput(item) {
  console.log("displayOutput executing")
  const queryResult = item;
  for (let i = 0; i < queryResult.length; i++) {
    let firstName = queryResult[i].first_name;
    let lastName = queryResult[i].last_name;
    let dateOfBirth = queryResult[i].birthdate.toISOString().slice(0,10);
    console.log(`- ${i+1} ${firstName} ${lastName}, born '${dateOfBirth}'`);
  }
}


accessDetails();