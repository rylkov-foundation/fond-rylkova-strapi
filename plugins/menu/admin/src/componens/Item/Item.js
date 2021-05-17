import styled from 'styled-components';
import React from 'react';
import confirmIcon from '../../images/confirm.svg';
import editIcon from '../../images/edit.svg';
import deleteIcon from '../../images/delete.svg';
import crossIcon from '../../images/cross.svg';
const permanentPages = require('../../../../constants/permanentPages');

const ItemElement = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: height .5s ease-out .2s;
  height: ${props => props.opened ? '250px' : 0};
`;

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-family: Times, serif;
  font-style: italic;`

const EditFormField = styled.input`
  background: aliceblue;
  height: 2vw;
  margin-bottom: 10px;
  
  &:focus {
    margin-bottom: 4px;
    border-bottom: blue solid 1px;
    outline: none;
  }
  
  &:last-of-type {
    margin: 0;
  }
`;

const FormSelect = styled.select `
  background: aliceblue;
  height: 2vw;
`

const Face = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  overflow: hidden;
  height: ${props => props.hide ? 0 : '2vw'};
  transition: height .5s ease-out;
  border: darkgray solid 1px;
  padding: 0 15px;
`;

const FaceName = styled.span`
  margin-right: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const FormButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const FaceButton = styled.button`
  padding: 0;
  height: 100%;
  width: 15px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: ${props => props.disabled ? '.1' : '1'};
  
  &:hover {
    opacity: ${props => props.disabled ? '.1' : '.6'};
    cursor: ${props => props.disabled ? 'unset' : 'pointer'};
  }
`;

const EditFormSubmitButton = styled(FaceButton)`
  background-image: url(${confirmIcon});
  background-color: burlywood;
  border-radius: 12px;
  height: 25px;
  width: 40%;
  margin: 5px auto 0;
`;

const CloseFormButton = styled(EditFormSubmitButton)`
  background-image: url(${crossIcon});
`;

const FaceEditButton = styled(FaceButton)`
  background-image: url(${editIcon});
`;

const FaceDeleteButton = styled(FaceButton)`
  background-image: url(${deleteIcon});
`;

const Item = ({
                id,
                isNewItem,
                nameRU,
                nameEN,
                page,
                order,
                children,
                pages,
                subOf,
                handleDelete,
                handleSubmit,
                deleteNewItem,
                setOpenedItemId,
                openedItemId
}) => {
  const [fields, setFields] = React.useState({ nameRU, nameEN, page, order });
  const [formOpened, setFormOpened] = React.useState(!nameRU && !nameEN && !page && !order);
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);

  React.useEffect(
    () => {
      if (openedItemId !== id) setFormOpened(false)
    }, [openedItemId]
  );

  React.useEffect(
    () => {
      if ((!fields.nameRU || !fields.nameEN || !fields.order) || (subOf && !fields.page)) {
        setIsSubmitButtonActive(false);
      } else {
        setIsSubmitButtonActive(true);
      }
    },
    [fields]
  );

  function handleOnChange(e) {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  }

  function handleEditButton(e) {
    e.preventDefault();
    const url = permanentPages.includes(fields.page) ?
      fields.page : fields.page ? pages.find((page) => page._id === fields.page).slug : '';
    handleSubmit(id, fields, url, isNewItem, subOf);
    setFormOpened(false);
  }

  function openForm() {
    setOpenedItemId(id);
    setFormOpened(true);
  }

  function closeForm() {
    if (isNewItem) {
      deleteNewItem(id, subOf);
    } else {
      setFormOpened(false);
      setFields({ nameRU, nameEN, page, order });
    }
  }

  return (
    <ItemElement>
      <Face hide={formOpened}>
        <FaceName>{fields.nameRU}</FaceName>
        <FaceEditButton onClick={openForm} />
        <FaceDeleteButton onClick={() => handleDelete(id, subOf)} />
      </Face>
      <EditForm opened={formOpened} onSubmit={handleEditButton}>
        <FormLabel> Название пункта меню (русский)
        <EditFormField
          name="nameRU"
          type="text"
          value={fields.nameRU}
          onChange={handleOnChange}
          placeholder="Title_RU"
          maxLength={subOf ? 24 : 20}
        />
        </FormLabel>
        <FormLabel>Название пункта меню (английский)
          <EditFormField
            name="nameEN"
            type="text"
            value={fields.nameEN}
            onChange={handleOnChange}
            placeholder="Title_EN"
            maxLength={subOf ? 24 : 20}
          />
        </FormLabel>
        <FormLabel> Выберите нужную страницу для отображения
          <FormSelect value={fields.page} onChange={handleOnChange} name="page">
            <option value=""/>
            <optgroup label='Уникальный макет'>
              {permanentPages.map(page =>
                <option key={page} value={page}>
                  {page}
                </option>
              )}
            </optgroup>
            {pages.map(page =>
              <optgroup key={page._id} label='Метамакет'>
                <option value={page._id}>
                  {page.title_ru}
                </option>
              </optgroup>
            )}
          </FormSelect>
        </FormLabel>
        <FormLabel> Номер для сортировки
          <EditFormField
            name="order"
            type="number"
            value={fields.order}
            onChange={handleOnChange}
            placeholder="Order"
            min={1}
            max={30}
          />
        </FormLabel>
        <FormButtonContainer>
          <EditFormSubmitButton type="submit" disabled={!isSubmitButtonActive} />
          <CloseFormButton type="button" onClick={closeForm} />
        </FormButtonContainer>
      </EditForm>
      {children}
    </ItemElement>
  );
};

export default Item;
