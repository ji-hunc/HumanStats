// server
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
// const port = 3000;
const port = 8000;

// local db 접속2
var db = mysql.createConnection({
  // host: 'mariadb',
  host: '127.0.0.1',
  user: 'root',
  // password: '1234',
  password: 'wlgns620',
  database: 'HumanBenchmark',
  port: '3306',
});

db.connect();

app.use(cors());
app.use(bodyParser.json());

app.get('/rank/:gameName', (req, res) => {
  const gameName = req.params.gameName;
  let order = 'DESC';
  if (gameName === 'ReactionTime') {
    order = '';
  }
  db.query(
    `SELECT user_id, score FROM ${gameName}Record ORDER BY score ${order} LIMIT 10`,
    function (error, result) {
      if (error) {
        console.log('DB QUERY ERROR');
        console.log(error);
      }
      res.send(result);
    },
  );
});

app.post('/postScore', (req, res) => {
  const gameName = req.body.gameName;
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff);
  const formattedDate = koreaNow.toISOString().slice(0, 19).replace('T', ' ');

  db.query(
    `INSERT INTO ${gameName}Record (score, create_date, user_id) VALUES ('${req.body.score}', '${formattedDate}', '${req.body.id}');`,
    function (error, result) {
      if (error) {
        console.log('DB QUERY ERROR');
        console.log(error);
      }
      console.log('POST SCORE');
      console.log(`${req.body.score}', '${formattedDate}', '${req.body.id}`);
      res.send('i reveice');
    },
  );
});

app.post('/signup', (req, res) => {
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff);
  const formattedDate = koreaNow.toISOString().slice(0, 19).replace('T', ' ');

  db.query(
    `INSERT INTO Member (id, password, create_date) VALUES ('${req.body.id}', HEX(AES_ENCRYPT('${req.body.pw}', 'messi')), '${formattedDate}')`,
    function (error, result) {
      if (error) {
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
          res.send('already Exist!');
        } else {
          res.send(error.code);
        }
      }
      console.log('POST ACCOUNT');
      console.log(`${req.body.id}', '${req.body.pw}', '${formattedDate}`);

      res.send('registered!');
    },
  );
});

app.post('/login', (req, res) => {
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff);
  const formattedDate = koreaNow.toISOString().slice(0, 19).replace('T', ' ');

  db.query(
    `SELECT id, cast(AES_DECRYPT(UNHEX(password), 'messi') as char(100)) FROM Member WHERE id='${req.body.id}'`,
    function (error, result) {
      if (error) {
        console.log('DB QUERY ERROR');
        console.log(error);
      }
      const valueArray = Object.values(result[0]);
      const pw = valueArray[1];
      if (result == 0) {
        res.send('notRegistered');
      } else {
        if (pw === req.body.pw) {
          console.log('POST LOGIN');
          console.log(`ACCOUNT: ${req.body.id}`);
          res.send('allow');
        } else {
          res.send('wrongPW');
        }
      }
    },
  );
});

app.get('/', (req, res) => {
  console.log('enter!!!');
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
