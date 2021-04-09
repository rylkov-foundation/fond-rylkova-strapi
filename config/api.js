module.exports = ({ env }) => ({
  responses: {
    privateAttributes: [
      "createdAt",
      "updatedAt",
      "published_at",
      "id",
      "_id",
      "__v",

      /* for Media fields */
      "name",
      "alternativeText",
      "caption",
      "hash",
      "ext",
      "mime",
      "size",
      "provider",
      "width",
      "height",
      "related"
    ]
  },
});
