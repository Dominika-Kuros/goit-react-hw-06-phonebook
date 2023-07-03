import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts) {
      setContacts(JSON.parse(localContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const addContact = ({ name, number }) => {
    const contactExists = contacts.find(
      value => value.name.toLowerCase() === name.toLowerCase()
    );

    if (contactExists) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(prevContacts => [
        ...prevContacts,
        { id: nanoid(), name: name, number: number },
      ]);
    }
  };

  const displayedContactList = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={handleInputChange} />
      <ContactList
        deleteContact={deleteContact}
        contacts={displayedContactList()}
      />
    </div>
  );
};
