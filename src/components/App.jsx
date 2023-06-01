import { useState, useEffect } from 'react';
import { customAlphabet } from 'nanoid';

import { GlobalStyle } from './GlobalStyle';
import { Container } from './Container/Container.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notification } from './Notification/Notification';

const nanoid = customAlphabet('1234567890', 4);

export function App() {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem('contacts'))
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = values => {
    const contact = { id: nanoid(), ...values };
    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const onFormSubmit = values => {
    const contactExists = contacts.find(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );

    if (contactExists) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    addContact(values);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilterContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const filtedContacts = getFilterContacts();
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onFormSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      {filtedContacts.length ? (
        <ContactList
          contacts={filtedContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <Notification message="There are no contacts" />
      )}

      <GlobalStyle />
    </Container>
  );
}
