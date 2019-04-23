function accpetInput () {

  const input = process.argv.slice(2)[0];
  return input;
}

function accessDetails () {
  const input = accpetInput();
  const pg = require("pg");
  const settings = require("./settings"); // settings.json

  const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  });

  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    client.query(`SELECT first_name
                        ,last_name
                        ,birthdate
                    from famous_people
                   where first_name = $1`, [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    displayOutput (result.rows);
    client.end();
    });
  });
}

function displayOutput(item) {
  const queryResult = item;
  for (let i = 0; i < queryResult.length; i++) {
    let firstName = queryResult[i].first_name;
    let lastName = queryResult[i].last_name;
    let dateOfBirth = queryResult[i].birthdate.toISOString().slice(0,10);
    console.log(`- ${i+1} ${firstName} ${lastName}, born '${dateOfBirth}'`);
  }
}

accessDetails ();






