'use strict';

const {
  createItemValidation,
  updateItemValidation,
  deleteItemValidation,
  createSubitemValidation,
  updateSubitemValidation,
  deleteSubitemValidation
} = require('../validation/menu');

module.exports = {
  /*index: async (ctx) => {
    // Add your own logic here.
    // Send 200 `ok`
    ctx.send({
      message: 'ok',
    });
  },*/

  getItems: async (ctx) => {
    const items = await strapi.query('item', 'menu').model.find().populate('subitems');
    ctx.send(items);
  },

  createItem: async (ctx) => {
    if (!createItemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { name_ru, name_en, page, order } = ctx.request.body;
    const createdItem = await strapi.query('item', 'menu').model.create(
      { name_ru, name_en, page, order, subitems: [] }
    );
    ctx.send(createdItem);
  },

  updateItem: async (ctx) => {
    if (!updateItemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { id } = ctx.params;
    const { name_ru, name_en, page, order, subitems } = ctx.request.body;
    const updatedItem = await strapi.query('item', 'menu').model.update(
      { id },
      { name_ru, name_en, page, order, subitems }
    );
    ctx.send(updatedItem);
  },

  deleteItem: async (ctx) => {
    if (!deleteItemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { id } = ctx.params;
    const deletedItem = await strapi.query('item', 'menu').model.delete({ id });
    ctx.send(deletedItem);
  },

  createSubitem: async (ctx) => {
    if (!createSubitemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { name_ru, name_en, page, order } = ctx.request.body;
    const createdSubitem = await strapi.query('subitem', 'menu').model.create(
      { name_ru, name_en, page, order }
    );
    ctx.send(createdSubitem);
  },

  updateSubitem: async (ctx) => {
    if (!updateSubitemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { id } = ctx.params;
    const { name_ru, name_en, page, order } = ctx.request.body;
    const updatedSubitem = await strapi.query('subitem', 'menu').model.update(
      { id },
      { name_ru, name_en, page, order }
    );
    ctx.send(updatedSubitem);
  },

  deleteSubitem: async (ctx) => {
    if (!deleteSubitemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { id } = ctx.params;
    const deletedSubitem = await strapi.query('subitem', 'menu').model.delete({ id });
    ctx.send(deletedSubitem);
  }
};
