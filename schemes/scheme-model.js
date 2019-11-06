const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id })
    .first();
}

function findSteps(id) {
  return db
    .select('steps.id', 'scheme_name', 'step_number', 'instructions')
    .from('steps')
    .join('schemes', 'steps.scheme_id', 'schemes.id')
    .where('steps.scheme_id', Number(id));
}

function add(schemeData) {
  return db('schemes')
    .insert(schemeData)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('schemes')
    .where('id', id)
    .del();
}
