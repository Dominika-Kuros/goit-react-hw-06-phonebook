import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { getContacts } from 'redux/selectors';
import { addContact } from '../../redux/contactsSlice';
export const ContactForm = () => {
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      id: nanoid(),
      name: e.currentTarget.elements.name.value,
      number: e.currentTarget.elements.number.value,
    };

    const isExist = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExist) {
      return `${contact.name} || ${contact.number} is already in contacts.`;
    }

    dispatch(addContact(contact));
    e.currentTarget.reset();
  };
  return (
    <form onSubmit={handleSubmit} className={css.formWrapper}>
      <label className={css.label}>
        Name
        <input
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={css.label}>
        Number
        <input
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
