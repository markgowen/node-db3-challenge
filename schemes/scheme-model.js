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
  return db('steps')
    .join('schemes', 'schemes.id', 'scheme_name')
    .select('steps.*', 'instructions')
    .where('scheme_id', id);
}

function add(schemeData) {
  return db('schemes')
    .add(schemeData)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(id, changes) {
  return db('schemes')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('schemes')
    .where('id', id)
    .del();
}
