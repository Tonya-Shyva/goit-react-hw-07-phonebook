// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';
import { FilterWrap, FilterInput } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <FilterWrap>
      <label>
        Find contacts by Name{' '}
        <FilterInput
          type="text"
          name="filter"
          placeholder="Enter name"
          value={filter}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
    </FilterWrap>
  );
};

// Filter.propTypes = {
//   filter: PropTypes.string.isRequired,
//   handleChange: PropTypes.func.isRequired,
// };
