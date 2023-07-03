import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({
      name,
      number,
    });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.formWrapper}>
      <label className={css.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={css.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
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
