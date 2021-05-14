'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async index(ctx) {
    return {
      about: sanitizeEntity(await strapi.services.main.find(), { model: strapi.models.main }),
      mission: sanitizeEntity(await strapi.services.main_mission.find(), { model: strapi.models.main_mission }),
      results: sanitizeEntity(
        await strapi.services.main_our_results.find(),
        { model: strapi.models.main_our_results }
      ),
      help: sanitizeEntity(await strapi.services.main_help.find(), { model: strapi.models.main_help }),
      donate: sanitizeEntity(await strapi.services.main_donate.find(), { model: strapi.models.main_donate }),
    };
  }
};
