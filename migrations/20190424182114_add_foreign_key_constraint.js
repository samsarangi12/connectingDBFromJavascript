
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('milestones', function(table){
      table.foreign('famous_person_id').references('id').inTable('famous_people');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};
