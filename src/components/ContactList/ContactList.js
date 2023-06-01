import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

import { ContactItem } from '../ContactItem/ContactItem';
import { Notification } from '../Notification/Notification';
import { List } from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getFilterContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const filtedContacts = getFilterContacts();
  return (
    <>
      {filtedContacts.length ? (
        <List>
          {filtedContacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </List>
      ) : (
        <Notification message="There are no contacts" />
      )}
    </>
  );
};
