import React, { useState } from 'react'
import { useHistory } from 'react-router';
import './Search.css'

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const history = useHistory()

    return (
      <form 
      onSubmit={(e) => {
          e.preventDefault()
          history.push(`/search?value=${searchValue}`)
      }}
      >
        <div className="search">
          <input
            className="search__input"
            type="text"
            value={searchValue}
            placeholder='Search...'
            onChange= {(e) => {setSearchValue(e.target.value)}}
          />
          <button className="search__button" type="submit"></button>
        </div>
      </form>
    );
}

export default Search
