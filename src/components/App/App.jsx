import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Contacts } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { AppContainer, Title } from './App.styled';
import { fetchContacts } from 'redux/operations';
import { getError, getIsLoading } from 'redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <ContactForm />
      <Title as="h2">Contacts</Title>
      <Filter></Filter>
      {isLoading && !error && <b>Reqest in progress...</b>}
      <Contacts></Contacts>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </AppContainer>
  );
};
