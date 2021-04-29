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
  height: ${props => props.opened ? '150px' : 0};
`;

const EditFormField = styled.input`
  background: aliceblue;
  height: 2vw;
  margin-bottom: 5px;
  
  &:focus {
    margin-bottom: 4px;
    border-bottom: blue solid 1px;
    outline: none;
  }
  
  &:last-of-type {
    margin: 0;
  }
`;

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
  
  &:hover {
    opacity: .6;
    cursor: pointer;
  }
`;

const EditFormSubmitButton = styled(FaceButton)`
  background-image: url(${confirmIcon});
  background-color: burlywood;
  border-radius: 12px;
  height: 2vw;
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
                nameRU,
                nameEN,
                page,
                order,
                children,
                pages,
                sub,
                handleDelete
}) => {
  const [fields, setFields] = React.useState({ nameRU, nameEN, page, order });
  const [formOpened, setFormOpened] = React.useState(false);

  function handleOnChange(e) {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
  }

  function handleDelete(e) {

  }

  function switchForm() {
    setFormOpened(!formOpened);
  }

  return (
    <ItemElement>
      <Face hide={formOpened}>
        <FaceName>{fields.nameRU}</FaceName>
        <FaceEditButton onClick={switchForm} />
        <FaceDeleteButton />
      </Face>
      <EditForm opened={formOpened} onSubmit={handleSubmit}>
        <EditFormField
          name="nameRU"
          type="text"
          value={fields.nameRU}
          onChange={handleOnChange}
          placeholder="Title_RU"
        />
        <EditFormField
          name="nameEN"
          type="text"
          value={fields.nameEN}
          onChange={handleOnChange}
          placeholder="Title_EN"
        />
        <select value={fields.page} onChange={handleOnChange} name="page">
          {pages.map(page =>
            <option key={page._id} value={page._id} /*selected={page._id === id}*/>
              {page.name}
            </option>
          )}
        </select>
        <EditFormField
          name="order"
          type="number"
          value={fields.order}
          onChange={handleOnChange}
          placeholder="Order"
        />
        <FormButtonContainer>
          <EditFormSubmitButton type="submit" />
          <CloseFormButton type="button" onClick={switchForm} />
        </FormButtonContainer>
      </EditForm>
      {children && children}
    </ItemElement>
  );
};

export default Item;
