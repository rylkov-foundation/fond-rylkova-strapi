'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async page(ctx) {
    return {
      donation: sanitizeEntity(await strapi.services.donation.find(), { model: strapi.models.donation }),
      requisites: sanitizeEntity(await strapi.services.requisites.find(), { model: strapi.models.requisites }),
      donation_globalgiving: sanitizeEntity(
        await strapi.services.donation_globalgiving.find(),
        { model: strapi.models.donation_globalgiving }
      ),
      donation_need_help: sanitizeEntity(
        await strapi.services.donation_need_help.find(),
        { model: strapi.models.donation_need_help }
      ),
      donation_yandex_money: sanitizeEntity(
        await strapi.services.donation_yandex_money.find(),
        { model: strapi.models.donation_yandex_money }
      ),
    };
  }
};
