const express = require('express');
const logger = require('winston');


//=========================================================
//  SETUP
//---------------------------------------------------------
const HOST = '0.0.0.0';
const PORT = 3000;

const ROOT_DIR = process.cwd();
const TARGET_DIR = `${ROOT_DIR}/target`;

const app = express();

// request logging
app.use(require('morgan')('dev'));

// static files
app.use(express.static(TARGET_DIR, {index: false}));


//=========================================================
//  ROUTER
//---------------------------------------------------------
const router = new express.Router();

router.all('*', (req, res) => {
  res.sendFile(`${TARGET_DIR}/index.html`);
});

app.use(router);


//=========================================================
//  START SERVER
//---------------------------------------------------------
app.listen(PORT, HOST, error => {
  if (error) {
    logger.error(error);
  }
  else {
    logger.info(`Server listening @ ${HOST}:${PORT}`);
  }
});
