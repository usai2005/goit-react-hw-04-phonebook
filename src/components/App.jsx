import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from '../components/App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? '';
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = ({ name, number }) => {
    const submittedContact = { id: nanoid(), name, number };

    setContacts(prevState => [...prevState, submittedContact]);
  };

  const filterChangeHandler = e => {
    setFilter(e.currentTarget.value);
  };

  const getFoundContacts = () => {
    const filterToLowerCase = filter.toLowerCase();
    // console.log(filterToLowerCase);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div className={css.phonebook__section}>
      <h1 className={css.phonebook__title}>Phonebook</h1>
      <ContactForm
        onFormSubmit={formSubmitHandler}
        existingContacts={contacts}
      />
      <h2 className={css.contacts__title}>Contacts</h2>
      <Filter filterData={filter} filterChange={filterChangeHandler} />
      <ContactList
        renderList={getFoundContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
