import React from 'react';
import { nanoid } from 'nanoid';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import ContactForm from './ContactForm/ContactForm.';
import css from './App.module.css';

export class App extends React.Component {
  state = {
    contacts: [
      { key: 'id-1', contactName: 'Rosie Simpson', contactNumber: '459-12-56' },
      {
        key: 'id-2',
        contactName: 'Hermione Kline',
        contactNumber: '443-89-12',
      },
      { key: 'id-3', contactName: 'Eden Clements', contactNumber: '645-17-79' },
      {
        key: 'id-4',
        contactName: 'Annie Copeland',
        contactNumber: '227-91-26',
      },
    ],
    filter: '',
  };

  deleteContact = contactKey => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.key !== contactKey
      ),
    }));
  };

  addContact = (contactName, contactNumber) => {
    const isDuplicate = this.state.contacts.some(
      contact => contact.contactName === contactName
    );

    if (isDuplicate) {
      alert('The contact already exist');
      return;
    }

    const contact = {
      key: nanoid(),
      contactName: contactName,
      contactNumber: contactNumber,
    };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.contactName.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm addContactCallback={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
