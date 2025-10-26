
import './Search.css'


const Search = ({searchedInput, handleSearch, handleRegionChange, selectedRegion}) => {

  
  function onselectionchange(e){
    handleRegionChange(e.target.value)
  }
  
  
  return (
    <div className="inputs_container">
        <div className="search-container">
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input
        type="text" value={searchedInput} onChange={handleSearch}
        placeholder="Search for a country..."
        className="search-input"
      />
    </div>
    <div className="select_container">
        <select onChange={onselectionchange} value={selectedRegion} name="" id="">
           <option value="All" disabled={selectedRegion !== 'All'}>Filter By Region</option> 
                    <option value="All">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Ocenia</option>

        </select>
    </div>
    </div>
  )
}

export default Search
