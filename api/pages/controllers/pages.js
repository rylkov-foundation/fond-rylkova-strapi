'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async main(ctx) {
    console.debug(strapi.models)
    return {
      about: sanitizeEntity(await strapi.services.about.find(), { model: strapi.models.about }),
      mission: sanitizeEntity(await strapi.services.mission.find(), { model: strapi.models.mission }),
      results: sanitizeEntity(await strapi.services['our-results'].find(),{ model: strapi.models['our-results'] }),
      help: sanitizeEntity(await strapi.services.help.find(), { model: strapi.models.help }),
      footer: sanitizeEntity( await strapi.services.footer.find(),{ model: strapi.models.footer })
    };
  },
};
