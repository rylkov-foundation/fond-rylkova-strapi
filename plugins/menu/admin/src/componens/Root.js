import styled from 'styled-components';
import React from 'react';
import { request } from 'strapi-helper-plugin';
import Item from './Item/Item';
import AddItemButton from './AddItemButton/AddItemButton';

const ListItemsElement = styled.ul`
  padding: ${props => props.sub ? '0 0 0 40px' : 0};
  margin: 20px 0 0;
  list-style: none;
  width: fit-content;
`;

const Root = () => {
  const [items, setItems] = React.useState([]);
  const [pages, setPages] = React.useState([]);
  const [openedItemId, setOpenedItemId] = React.useState('');

  React.useEffect(
    () => {
      Promise.all([request('/menu/items'), request('/pages')])
        .then((data) => {
            setItems(data[0]);
            setPages(data[1]);
        })
      ;
    },
    []
  );

  function handleDeleteItem(id) {
    request(`/menu/items/${id}`, { method: 'DELETE' }).then(() => setItems(items.filter((item) => item._id !== id)));
  }

  function handleDeleteSubitem(id, parent) {
    request(`/menu/subitems/${id}`, { method: 'DELETE' })
      .then(() => {
        setItems(
          items.map((item) => {
          let editedItem = {};
          if (item._id === parent) {
            editedItem = item;
            editedItem.subitems = item.subitems.filter((subitem) => subitem._id !== id);
            return editedItem;
          } else {
            return item
          }
          })
        );
      })
    ;
  }

  function deleteAllNewItemsAndSubitems() {
    items.filter((item) => !item.newItem)
    items.map((item) => {
      const filteredItem = item;
      item.subitems = item.subitems.filter((subitem) => !subitem.newItem)
      return filteredItem;
    })
  }

  function handleAddItem() {
    deleteAllNewItemsAndSubitems();
    const newId = String(Math.random() * (100 - 1) + 1);
    setOpenedItemId(newId);
    setItems([...items, { _id: newId, newItem: true }])
  }

  function handleAddSubitem(itemId) {
    deleteAllNewItemsAndSubitems();
    setItems(
      items.map((item) => {
        let editedItem = {};
        if (item._id === itemId) {
          editedItem = item;
          const newId = String(Math.random() * (100 - 1) + 1);
          setOpenedItemId(newId);
          editedItem.subitems = [
            ...editedItem.subitems,
            { _id: newId, newItem: true }
          ];
          return editedItem;
        } else {
          return item;
        }
      })
    );
  }

  function handleSubmitItemForm(id, fields, url, isNewItem) {
    if (isNewItem) {
      return request(
        '/menu/items',
        {
          method: 'POST',
          body: {
            name_ru: fields.nameRU,
            name_en: fields.nameEN,
            page: fields.page,
            order: fields.order,
            url
          }
        }
      )
        .then((newItem) => setItems(items.map((item) => item._id === id ? newItem : item)));
    } else {
      return request(
        `/menu/items/${id}`,
        {
          method: 'PATCH',
          body: {
            name_ru: fields.nameRU,
            name_en: fields.nameEN,
            page: fields.page,
            order: fields.order,
            url,
            subitems: items.find((item) => item._id === id).subitems.map((subitem) => subitem._id)
          }
        }
      )
        .then((newItem) => setItems(items.map((item) => item._id === id ? newItem : item)));
    }
  }

  function handleSubmitSubitemForm(id, fields, url, isNewItem, parent) {
    if (isNewItem) {
      const parentSubitems = items
        .find((item) => item._id === parent).subitems
        .map((subitem) => subitem._id)
        .filter((subitem) => subitem !== id);
      return request(
        '/menu/subitems',
        {
          method: 'POST',
          body: {
            name_ru: fields.nameRU,
            name_en: fields.nameEN,
            page: fields.page,
            order: fields.order,
            url,
            parent,
            parent_subitems: parentSubitems
          }
        }
      )
        .then((updatedItem) => setItems(items.map((item) => item._id === parent ? updatedItem : item)));
    } else {
      return request(
        `/menu/subitems/${id}`,
        {
          method: 'PATCH',
          body: {
            name_ru: fields.nameRU,
            name_en: fields.nameEN,
            page: fields.page,
            order: fields.order,
            url
          }
        }
      )
        .then((newSubitem) => {
          setItems(
            items.map((item) => {
              let editedItem = {};
              if (item._id === parent) {
                editedItem = item;
                editedItem.subitems = item.subitems.map((subitem) => subitem._id === id ? newSubitem : subitem);
                return editedItem;
              } else {
                return item
              }
            })
          );
        });
    }
  }

  function deleteNewItem(id, parent) {
    if (!parent) {
      setItems(items.filter((item) => !item.newItem));
    } else {
      const currentItem = items.find((items) => items._id === parent);
      currentItem.subitems = currentItem.subitems.filter((item) => !item.newItem);
      setItems(items.map((item) => item._id === parent ? currentItem : item));
    }
  }

  return (
    <>
      <ListItemsElement>
        {items.length ? items.sort((a,b) => a.order - b.order).map(item =>
          <Item
            key={item._id}
            id={item._id}
            isNewItem={Boolean(item.newItem)}
            nameRU={item.name_ru || ''}
            nameEN={item.name_en || ''}
            page={item.pageDataPath || ''}
            pages={pages}
            order={Number(item.order)  || 0}
            handleDelete={handleDeleteItem}
            handleSubmit={handleSubmitItemForm}
            deleteNewItem={deleteNewItem}
            setOpenedItemId={setOpenedItemId}
            openedItemId={openedItemId}
          >
          {(item.subitems && item.subitems.length) ?
            <ListItemsElement sub>
              {item.subitems.sort((a,b) => a.order - b.order).map(subitem =>
                <Item
                  subOf={item._id}
                  key={subitem._id}
                  id={subitem._id}
                  isNewItem={Boolean(subitem.newItem)}
                  nameRU={subitem.name_ru || ''}
                  nameEN={subitem.name_en || ''}
                  page={subitem.pageDataPath || ''}
                  pages={pages}
                  order={Number(subitem.order) || 0}
                  handleDelete={handleDeleteSubitem}
                  handleSubmit={handleSubmitSubitemForm}
                  deleteNewItem={deleteNewItem}
                  setOpenedItemId={setOpenedItemId}
                  openedItemId={openedItemId}
                />
              )}
            </ListItemsElement> : ''}
          <AddItemButton onClick={() => handleAddSubitem(item._id)} sub />
        </Item>) : ''}
      </ListItemsElement>
      <AddItemButton onClick={handleAddItem} />
    </>
  );
}

export default Root;
