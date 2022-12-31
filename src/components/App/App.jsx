import { ToastContainer } from 'react-toastify';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Contacts } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { AppContainer, Title } from './App.styled';

export const App = () => {
  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <ContactForm />
      <Title as="h2">Contacts</Title>
      <Filter></Filter>
      <Contacts></Contacts>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </AppContainer>
  );
};
