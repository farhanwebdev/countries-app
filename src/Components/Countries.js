import React, { useState, useEffect } from 'react'
import Country from './Country'
import './Country.css'


// const url = 'https://restcountries.com/v3.1/all'
const url = 'https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,cca3'



const Countries = ({searchedInput, selectedRegion}) => {
    const [restCountries, setRestCountries] = useState([]) 
    const [isloading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(function(){
      async function fetchCountries(){
        try{
          setIsLoading(true)
          const res = await fetch(url)
          if(!res.ok) throw new Error(`Http error ${res.status}`)
        const data = await res.json()
      
        setRestCountries(data)
        setError(null)
        }
        catch(err){
          console.error(err.message)
          setError(err.message)
          setRestCountries([])
        }
        finally{
          setIsLoading(false)
        }
      } 
      fetchCountries()
    }, [])

    

    if(isloading){
      return <div>Loadind countries...</div>
    }

    if(error){
      return <div>Error loading data : {error}</div>
    }

    if(restCountries.length===0) {
      return <div>No countries found</div>
    }

    const filteredCountries = restCountries.filter((country)=> {
    const countryName = country.name.common.toLowerCase()   
    const search = searchedInput.toLowerCase()  

    const matchesSearch = countryName.includes(search)
    const matchesRegion = (selectedRegion === 'All' || country.region === selectedRegion);

    // 3. Return true only if BOTH filters pass
    return matchesSearch && matchesRegion;
    }
  )

  if(filteredCountries.length===0 && searchedInput.length>0)
    return <div style={{maxWidth:'90%', margin:'auto'}}>No countries found</div>
    
    
  return (
    <div className='countries_container'>
     <Country searchedInput={searchedInput} restCountries={filteredCountries}  />
    </div>
  )
}

export default Countries