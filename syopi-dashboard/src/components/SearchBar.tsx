import { useState } from "react";
import AsyncSelect from "react-select/async";
import { useSearchParams, useNavigate } from "react-router-dom";
// import './SearchBar.css';

function SearchBar(props: any) {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  const searchMovies = async (inputValue: string) => {
    if (inputValue) {
      try {
        const response = await fetch(`http://127.0.0.1:5002/product/search/${inputValue}`);
        const json = await response.json();
        console.log(JSON.parse(json.data));
        return JSON.parse(json.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    return [];
  };
  

  const loadOptions = async (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    const options = await searchMovies(inputValue);
    callback(options);
  };

  const colourStyles = {
    container: (style: Object) => ({...style, width: '70vw', flex: 1}),
    indicatorSeparator: (style: Object) => ({...style, display: 'none'}),
    dropdownIndicator: (style: Object) => ({...style, display: 'none'})
  };

  let [keyword, setKeyword] = useState({ productId: 0, productName: "" });
  return (
    <div className="search-bar flex">
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        placeholder="Search for products"
        onChange={(selectedOption: Object) =>
          setKeyword({
            productId: selectedOption.value,
            productName: selectedOption.label,
          })
        }
        styles={colourStyles}
        noOptionsMessage={() => 'No products found'}
      />
      <button
        className="search-button"
        onClick={() => navigate(`/search?keyword=${keyword.productName}`)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;