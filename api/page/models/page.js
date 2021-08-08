'use strict';

const slugify = require('slugify');

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.title_en) {
        data.slug = slugify(data.title_en.toLowerCase());
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.title_en) {
        data.slug = slugify(data.title_en.toLowerCase());
      }
    },
    afterUpdate: async (result) => {
      const AUTHOR = 'strapi-author'
      const EDITOR = 'strapi-editor'

      const roles = (
        await strapi.query('role', 'admin').find({})
      )
        .reduce(
          (acc, role) => ({ ...acc, [role.id]: role.code }),
          {}
        )
      const documentCreatorRoles = result.created_by.roles.map((role) => role.toString())

      const administrators = await strapi.query('user', 'admin').find({})
      const firstEditor = administrators.find(
        (user) => user.roles.some((role) => roles[role.id] === EDITOR)
      )

      if (
        result['published_at'] &&
        documentCreatorRoles.some((role) => roles[role] === AUTHOR)
      ) {
        await strapi
          .query('page')
          .model
          .updateOne(
            { _id: result.id },
            { created_by: firstEditor.id.toString() }
          )
      }
    }
  },
};
