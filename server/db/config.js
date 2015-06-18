// var Bookshelf = require('bookshelf');
// var knex = require('knex');
// var path = require('path');

// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'FFDrafter',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/FFDrafter.sqlite')
//   }
// });

// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 30);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('players').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('players', function (player) {
//       player.increments('id').primary();
//       player.string('first_name', 30);
//       player.string('last_name', 30);
//       player.string('position', 30);
//       player.string('team', 30);      
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('players_users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('players_users', function (player_user) {
//       player_user.integer('user_id').references('users.id');
//       player_user.integer('player_id').references('players.id');
//       player_user.integer('round');
//       player_user.timestamps();      
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;
