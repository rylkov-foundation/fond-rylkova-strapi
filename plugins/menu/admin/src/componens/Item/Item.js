import styled from 'styled-components';
import React from 'react';
import confirmIcon from '../../images/confirm.svg';
import editIcon from '../../images/edit.svg';
import deleteIcon from '../../images/delete.svg';
import crossIcon from '../../images/cross.svg';

const ItemElement = styled.li`
  display: flex;
  flex-direction: column;
  width: 20vw;
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
  height: ${props => props.opened ? '220px' : 0};
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
  width: 20vw;
  height: ${props => props.hide ? 0 : '2vw'};
  transition: height .5s ease-out;
  border: darkgray solid 1px;
  padding: 0 10px;
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
                deleteNewItem
}) => {
  const [fields, setFields] = React.useState({ nameRU, nameEN, page, order });
  const [formOpened, setFormOpened] = React.useState(!nameRU && !nameEN && !page && !order);
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);

  React.useEffect(
    () => {
      if (!fields.nameRU || !fields.nameEN || !fields.order) {
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
    handleSubmit(id, fields, isNewItem, subOf);
    setFormOpened(false);
  }

  function switchForm() {
    setFormOpened(!formOpened);
  }

  function closeForm() {
    if (isNewItem) {
      deleteNewItem(id, subOf);
    } else {
      setFormOpened(!formOpened);
      setFields({ nameRU, nameEN, page, order });
    }
  }

  return (
    <ItemElement>
      <Face hide={formOpened}>
        <FaceName>{fields.nameRU}</FaceName>
        <FaceEditButton onClick={switchForm} />
        <FaceDeleteButton onClick={() => handleDelete(id, subOf)} />
      </Face>
      <EditForm opened={formOpened} onSubmit={handleEditButton}>
        <EditFormField
          name="nameRU"
          type="text"
          value={fields.nameRU}
          onChange={handleOnChange}
          placeholder="Title_RU"
          maxLength={20}
        />
        <EditFormField
          name="nameEN"
          type="text"
          value={fields.nameEN}
          onChange={handleOnChange}
          placeholder="Title_EN"
          maxLength={20}
        />
        <FormLabel> Выберите нужную страницу для отображения
          <FormSelect onChange={handleOnChange} name="page">
            <option value="" />
            {pages.map(page =>
              <option key={page._id} value={page._id}>
                {page.name}
              </option>
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
