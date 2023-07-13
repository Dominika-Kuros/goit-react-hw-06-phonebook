import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <div>
      <label>
        Find contacts by name
        <input
          name="filter"
          type="text"
          value={value}
          onChange={e => dispatch(setFilter(e.target.value.trim()))}
        />
      </label>
    </div>
  );
};
