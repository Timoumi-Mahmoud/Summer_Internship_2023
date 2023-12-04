  'user strict';

  var mysql = require('mysql');

  //local mysql db connection
  var connection = mysql.createConnection({
      host     : 'mysql',
      user     : 'root',
      password : '',
      database : 'espirtdb'
  });

  connection.connect(function(err) {
      if (err) throw err;
  });

 

module.exports = connection;


