'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async main(ctx) {
    return {
      about: await strapi.services.about.find(),
      mission: await strapi.services.mission.find(),
      results: await strapi.services['our-results'].find(),
      help: await strapi.services.help.find(),
      footer: await strapi.services.footer.find(),
    };
  },
};
