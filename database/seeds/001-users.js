const bcryptjs = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'monk', password: bcryptjs.hashSync('sanfran', 8), department: 'investigation' },
        {username: 'psych',password: bcryptjs.hashSync('santabarbara', 8), department: 'investigation'},
        {username: 'valley', password: bcryptjs.hashSync('sanfran', 8), department: 'engineering'}
      ]);
    });
};
