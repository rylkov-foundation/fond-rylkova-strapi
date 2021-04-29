import styled from 'styled-components';
import React from 'react';
import Item from './Item/Item';
import AddItemButton from '../AddItemButton/AddItemButton';

const ListItemsElement = styled.ul`
  padding: ${props => props.sub ? '0 0 0 40px' : 0};
  margin: 20px 0 0;
  list-style: none;
  width: fit-content;
`;

const ListItems = ({ items, pages }) => {
  function handleAddItem(e) {
    console.log(e.target);
  }

  return (
    <>
      <ListItemsElement>
        {items && items.map(item => <Item
          key={item._id}
          id={item._id}
          nameRU={item.name_ru}
          nameEN={item.name_en}
          page={item.page || ''}
          pages={pages}
          order={item.order}
        >
          {(item.subitems && item.subitems.length) ?
          <ListItemsElement sub>
            {item.subitems.map(subitem =>
              <Item
                sub
                key={subitem._id}
                id={subitem._id}
                nameRU={subitem.name_ru}
                nameEN={subitem.name_en}
                page={subitem.page || ''}
                pages={pages}
                order={subitem.order}
              />
            )}
          </ListItemsElement> : ''}
          <AddItemButton onClick={handleAddItem} sub />
        </Item>)}
      </ListItemsElement>
      <AddItemButton onClick={handleAddItem} />
    </>
  )
};

export default ListItems;
