
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('milestones', function(table){
      table.integer('famous_person_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};
