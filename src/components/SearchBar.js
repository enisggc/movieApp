import React, {useState} from 'react';

const SearchBar = ({onSearch}) =>{
    const[query,setQuery] = useState('');;

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSearch(query);
    }
    return(
    <form onSubmit={handleSubmit} className='search-bar'>   
<input
type="text"
placeholder="Film ara..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
/>
<button type='submit'>Ara</button>
    </form>
)
};







export default SearchBar;