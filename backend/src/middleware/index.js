import { Router } from 'express';

export default ({ config, db }) => {
  const routes = Router();

  // add middleware here
  console.log('middleware ');
  console.log(config, db);

  return routes;
};
