import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useSearchParams, useNavigate } from 'react-router-dom';
// import './SearchBar.css';

function SearchBar(props: any) {
  let navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';

  const searchMovies = async (inputValue: string) => {
    if (inputValue) {
      const response = await fetch(`http://127.0.0.1:5000/product/search/${inputValue}`)
      const data = await response.json()
      return data;  
    }
    return [];
  };

  const loadOptions = async (inputValue: string, callback: (options: any[]) => void) => {
    const options = await searchMovies(inputValue);
    callback(options);
  };

  const colourStyles = {
    container: (style: Object) => ({...style,flex: 1}),
    indicatorSeparator: (style: Object) => ({...style, display: 'none'}),
    dropdownIndicator: (style: Object) => ({...style, display: 'none'}),
    control: (style: Object) => ({ ...style, backgroundColor: '#333', color: '#fff' }),
    singleValue: (style: Object) => ({...style, color: '#fff',}),
    input: (style: Object) => ({...style, color: '#fff',}),
    menu: (style: Object) => ({ ...style, backgroundColor: '#333', color: '#fff' }),
    option: (style: Object, { isDisabled, isFocused, isSelected }) => {
      const backgroundColor = isDisabled ? '#444' : isSelected ? '#666' : isFocused ? '#555' : '#333';
      const color = isDisabled ? '#888' : isSelected ? '#ccc' : isFocused ? '#fff' : '#ccc';
      return {
        ...style,
        backgroundColor,
        color,
        cursor: isDisabled ? 'not-allowed' : 'default'
      };
    },
  };

  let [keyword, setKeyword] = useState({productId: 0, productName: ''})
  return (
    <div className='search-bar'>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        placeholder='Search for a movie...'
        onChange={(selectedOption: Object) => setKeyword({productId: selectedOption.value, productName: selectedOption.label})}
        styles={colourStyles}
      />
      <button className='search-button' onClick={() => navigate(`/search?q=${keyword.productName}`)}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
