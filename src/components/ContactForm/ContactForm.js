import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { addNewContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import {
  FormInputStyled,
  FormStyled,
  FormLabelStyled,
  BtnStyled,
} from './ContactForm.styled';
import { useState } from 'react';

export function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const id = nanoid();
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = e => {
    const { value } = e.target;
    setName(value);
  };

  const handleChangeNumber = e => {
    const { value } = e.target;
    setNumber(value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    // console.log(e);
    const { name, number } = e.target;

    const contactName = name.value;
    const contactNumber = number.value;
    const contactsLists = [...contacts];

    if (
      contactsLists.find(
        contact => contactName.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      toast.warn(
        `Name ${contactName} is already in contacts. Enter another name`
      );
      setName('');
      return;
    }
    if (contactsLists.find(contact => contactNumber === contact.number)) {
      toast.warn(
        `Number ${contactNumber} is already in contacts. Enter another number`
      );
      setNumber('');
      return;
    }

    dispatch(addNewContact({ id, name: contactName, number: contactNumber }));
    toast.success(`Contact ${contactName} successfully added`);
    reset();
  };

  return (
    <FormStyled onSubmit={handleFormSubmit}>
      <FormLabelStyled htmlFor={nameInputId}>Name</FormLabelStyled>
      <FormInputStyled
        id={nameInputId}
        type="text"
        name="name"
        placeholder="Enter name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChangeName}
      />

      <FormLabelStyled htmlFor={numberInputId}>Number</FormLabelStyled>
      <FormInputStyled
        id={numberInputId}
        type="tel"
        name="number"
        placeholder="Enter phone number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChangeNumber}
      />

      <BtnStyled type="submit">Add contact</BtnStyled>
    </FormStyled>
  );
}
