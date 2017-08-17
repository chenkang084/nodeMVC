import resource from 'resource-router-middleware';
import facets from '../models/facets';

export default ({ config, db }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: 'facet',

    /** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
    load(req, id, callback) {
      const _facet = facets.find(facet => facet.id === id),
        err = _facet ? null : 'Not found';
      callback(err, _facet);
    },

    /** GET / - List all entities */
    index({ params }, res) {
      console.log(config, db);
      res.json(facets);
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      body.id = facets.length.toString(36);
      facets.push(body);
      res.json(body);
    },

    /** GET /:id - Return a given entity */
    read({ facet }, res) {
      res.json(facet);
    },

    /** PUT /:id - Update a given entity */
    update({ facet, body }, res) {
      Object.keys(body).forEach((value) => {
        if (value !== 'id') {
          facet[value] = body[value];
        }
      });
      res.sendStatus(204);
    },

    /** DELETE /:id - Delete a given entity */
    delete({ facet }, res) {
      facets.splice(facets.indexOf(facet), 1);
      res.sendStatus(204);
    }
  });
