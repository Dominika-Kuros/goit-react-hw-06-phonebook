import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const filteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const handleDelete = id => dispatch(deleteContact(id));

  if (!filteredContacts) {
    return <h2>no contacts found</h2>;
  }

  return (
    <ul>
      {filteredContacts().map(({ id, name, number }) => (
        <li key={id}>
          {name + ' : ' + number}
          {
            <button
              type="button"
              name="delete"
              onClick={() => handleDelete(id)}
            >
              delete
            </button>
          }
        </li>
      ))}
    </ul>
  );
};
