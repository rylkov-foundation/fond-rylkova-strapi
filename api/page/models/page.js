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
  },
};
