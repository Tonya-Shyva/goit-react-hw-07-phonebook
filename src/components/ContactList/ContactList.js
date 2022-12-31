import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BtnStyled } from 'components/ContactForm/ContactForm.styled';
import { deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';
import {
  ContactItem,
  ContactListStyled,
  ContactsWrap,
} from './ContactList.styled';

export const Contacts = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const handleDelete = contactId => dispatch(deleteContact(contactId));

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });

    const filterContacts =
      filterContactsList.length === 0
        ? toast.info('No results find') && []
        : filterContactsList;
    return filterContacts;
  };

  return (
    <ContactsWrap>
      {getFilteredContacts().length === 0 ? (
        <p>No contacts</p>
      ) : (
        <ContactListStyled>
          {getFilteredContacts().map((contact, id) => (
            <ContactItem key={id}>
              {contact.name}: {contact.number}
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
