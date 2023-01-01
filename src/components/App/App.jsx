import { ToastContainer } from 'react-toastify';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Contacts } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { AppContainer, Title } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

export const App = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <ContactForm />
      <Title as="h2">Contacts</Title>
      <Filter></Filter>
      {/* {isLoading && <Contacts></Contacts>} */}
      {error && <p>{error}</p>}
      <p>{items.length > 0 && JSON.stringify(items, null, 2)}</p>

      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </AppContainer>
  );
};
