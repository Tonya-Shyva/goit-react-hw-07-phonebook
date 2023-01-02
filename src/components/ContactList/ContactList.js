import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BtnStyled } from 'components/ContactForm/ContactForm.styled';
import { getContacts, getFilter, getIsLoading } from 'redux/selectors';
import {
  ContactItem,
  ContactItemText,
  ContactListStyled,
  ContactNumber,
  ContactsWrap,
} from './ContactList.styled';
import { deleteContact } from 'redux/operations';

export const Contacts = () => {
  const contacts = useSelector(getContacts);
  // console.log(contacts);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const handleDelete = contactId => {
    return dispatch(deleteContact(contactId));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });

    const filterContacts =
      contacts.length !== 0 && filterContactsList.length === 0
        ? toast.info('No results find') && []
        : filterContactsList;
    return filterContacts;
  };

  return (
    <ContactsWrap>
      {getFilteredContacts().length === 0 && !isLoading ? (
        <p>No contacts</p>
      ) : (
        <ContactListStyled>
          {getFilteredContacts().map((contact, id) => (
            <ContactItem key={id}>
              <ContactItemText>
                <span>{contact.name}:</span>
                <ContactNumber>{contact.number}</ContactNumber>
              </ContactItemText>
              <BtnStyled type="button" onClick={() => handleDelete(contact.id)}>
                Delete
              </BtnStyled>
            </ContactItem>
          ))}
        </ContactListStyled>
      )}
    </ContactsWrap>
  );
};
