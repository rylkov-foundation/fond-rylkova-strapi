'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async main(ctx) {
    const dirtyResults = sanitizeEntity(
      await strapi.services['our-results'].find(),
      { model: strapi.models.about }
      ).results;

    const footer = sanitizeEntity(
      await strapi.services.footer.find(),
      { model: strapi.models.about }
      );

    const results = dirtyResults.map(result => sanitizeEntity(result, { model: strapi.models.result }));

    footer.Social_links = footer.Social_links.map(link => ({ link: link.Link, iconUrl: link.Icon.url }));
    footer.Foreign_agent_link = { link: footer.Foreign_agent_link.Link, iconUrl: footer.Foreign_agent_link.Icon.url };

    return {
      about: sanitizeEntity(await strapi.services.about.find(), { model: strapi.models.about }),
      mission: sanitizeEntity(await strapi.services.mission.find(), { model: strapi.models.about }),
      results,
      help: sanitizeEntity(await strapi.services.help.find(), { model: strapi.models.about }),
      footer
    };
  },
};
