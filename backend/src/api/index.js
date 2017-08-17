// import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
// import images from "./images.route.js";
const fs = require('fs');

export default ({ config, db }) => {
  const api = Router();

  // mount the facets resource
  api.use('/facets', facets({ config, db }));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    // res.json({ version });
    res.send('hello world');
  });

  // images(api, db);

  // require("./images.route").default(api, db);


  /* eslint-disable global-require */
  fs.readdirSync(require('path').join(__dirname)).forEach((file) => {
    const reg = new RegExp(/^.*\.[\w]+\.js$/, 'igm');

    reg.test(file) && require(`./${file}`).default(api, db);
    /* eslint-disable global-require */
  });

  return api;
};
