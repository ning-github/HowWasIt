var Bookshelf = require('bookshelf');
var knex = require('knex');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'howWasIt',
    charset: 'utf8',
  }
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 30);
      user.string('email', 50);
      user.string('first_name', 30);
      user.string('last_name', 30);
      user.string('password', 60);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('reviews').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('reviews', function (review) {
      review.increments('id').primary();
      review.integer('user_id', 10).unsigned().references('users.id');
      review.string('review_text', 255);
      review.integer('up_votes', 10);
      review.integer('google_loc_id', 30);
      review.string('google_loc_name', 30);
      review.string('latitude', 30);
      review.string('longitude', 30);
      review.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('user_connections').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('user_connections', function (user_connection) {
      user_connection.integer('user_id').unsigned().references('users.id');
      user_connection.integer('friend_user_id').unsigned().references('users.id');
      user_connection.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
