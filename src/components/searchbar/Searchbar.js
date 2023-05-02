import { useState } from 'react';
import {
  SearchHeader,
  SearchForm,
  SearchButton,
  SearchLabel,
  SearchFormInput,
  
} from './Searchbar.styled.js';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('');
 
  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(query);
  };

  const handleChange = evt => {
    const {value} = evt.target;
    setQuery(value);
  };

    return (
      <SearchHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <AiOutlineSearch style={{ width: 30, height: 30 }} />
            <SearchLabel>Search</SearchLabel>
          </SearchButton>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </SearchForm>
      </SearchHeader>
    );
  };

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };