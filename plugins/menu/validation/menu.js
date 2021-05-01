const isObjectId = require('mongoose').Types.ObjectId.isValid;

const isNameValid = name => (typeof name === 'string' && name.length >= 1 && name.length <= 20);
const isOrderValid = order => (typeof order === 'number' && order >= 0 && order <= 30);

const createItemValidation = ctx => {
  const body = ctx.request.body;
  return (
    body['name_ru'] && body['name_en'] && body.page && body.order && body.subitems &&
    isNameValid(body['name_ru']) && isNameValid(body['name_en']) && isObjectId(body.page) &&
    isOrderValid(body.order) && Array.isArray(body.subitems) /* check subitems */
  );
};

const updateItemValidation = ctx => {
  const params = ctx.params;
  const body = ctx.request.body;
  if (
    (params.id && isObjectId(params.id))
    &&
    (body['name_ru'] || body['name_en'] || body.page || body.order || body.subitems)
  ) {
    return !(
      (body['name_ru'] && !isNameValid(body['name_ru']))
      ||
      (body['name_en']  && !isNameValid(body['name_en']))
      ||
      (body.page && !isObjectId(body.page))
      ||
      (body.order && !isOrderValid(body.order))
      ||
      (body.subitems && !Array.isArray(body.subitems) /* check subitems */)
    )
  } else {
    return false;
  }
};
const deleteItemValidation = ctx => (ctx.params.id && isObjectId(ctx.params.id));
const createSubitemValidation = ctx => {
  const body = ctx.request.body;
  return (
    body['name_ru'] && body['name_en'] && body.page && body.order &&
    isNameValid(body['name_ru']) && isNameValid(body['name_en']) && isObjectId(body.page) && isOrderValid(body.order)
  );
};
const updateSubitemValidation = ctx => {
  const params = ctx.params;
  const body = ctx.request.body;
  if (
    (params.id && isObjectId(params.id))
    &&
    (body['name_ru'] || body['name_en'] || body.page || body.order)
  ) {
    return !(
      (body['name_ru'] && !isNameValid(body['name_ru']))
      ||
      (body['name_en']  && !isNameValid(body['name_en']))
      ||
      (body.page && !isObjectId(body.page))
      ||
      (body.order && !isOrderValid(body.order))
    )
  } else {
    return false;
  }
};
const deleteSubitemValidation = deleteItemValidation;

module.exports = {
  createItemValidation,
  updateItemValidation,
  deleteItemValidation,
  createSubitemValidation,
  updateSubitemValidation,
  deleteSubitemValidation
};
