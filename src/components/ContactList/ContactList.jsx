import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const filteredContacts = () =>
    filter
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;
  const handleDelete = id => dispatch(deleteContact(id));

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
