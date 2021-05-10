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
  getItems: async (ctx) => {
    const items = await strapi.query('item', 'menu').model.find().populate('subitems');
    ctx.send(items);
  },

  createItem: async (ctx) => {
    if (!createItemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { name_ru, name_en, page, order } = ctx.request.body;
    const newItem = { name_ru, name_en, order, subitems: [] };
    if (page) newItem.page = page;
    const createdItem = await strapi.query('item', 'menu').model.create(newItem);
    ctx.send(createdItem);
  },

  updateItem: async (ctx) => {
    if (!updateItemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { id } = ctx.params;
    const { name_ru, name_en, page, order, subitems } = ctx.request.body;
    let updatedItem;
    if (!page) {
      updatedItem = await strapi.query('item', 'menu').model.findByIdAndUpdate(
        id,
        { $unset: { page: '' }, name_ru, name_en, order, subitems },
        { new: true }
      ).populate('subitems');
    } else {
      updatedItem = await strapi.query('item', 'menu').model.findByIdAndUpdate(
        id,
        { name_ru, name_en, order, subitems, page },
        { new: true }
      ).populate('subitems');
    }
    ctx.send(updatedItem);
  },

  deleteItem: async (ctx) => {
    if (!deleteItemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { id } = ctx.params;
    const deletedItem = await strapi.query('item', 'menu').model.findByIdAndRemove(id);
    ctx.send(deletedItem);
  },

  createSubitem: async (ctx) => {
    if (!createSubitemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { name_ru, name_en, page, order, parent, parent_subitems } = ctx.request.body;
    const newSubitem = { name_ru, name_en, order };
    if (page) newSubitem.page = page;
    const createdSubitem = await strapi.query('subitem', 'menu').model.create(newSubitem);
    const updatedItem = await strapi.query('item', 'menu').model.findByIdAndUpdate(
      parent,
      { subitems: [...parent_subitems, createdSubitem._id] },
      { new: true }
    ).populate('subitems');
    ctx.send(updatedItem);
  },

  updateSubitem: async (ctx) => {
    if (!updateSubitemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { id } = ctx.params;
    const { name_ru, name_en, page, order } = ctx.request.body;
    let updatedSubitem;
    if (!page) {
      updatedSubitem = await strapi.query('subitem', 'menu').model.findByIdAndUpdate(
        id,
        { $unset: { page: '' }, name_ru, name_en, order },
        { new: true }
      );
    } else {
      updatedSubitem = await strapi.query('subitem', 'menu').model.findByIdAndUpdate(
        id,
        { name_ru, name_en, order, page },
        { new: true }
      );
    }
    ctx.send(updatedSubitem);
  },

  deleteSubitem: async (ctx) => {
    if (!deleteSubitemValidation(ctx)) ctx.send({ error: 'validation error' });
    const { id } = ctx.params;
    const deletedSubitem = await strapi.query('subitem', 'menu').model.findByIdAndRemove(id);
    ctx.send(deletedSubitem);
  }
};
