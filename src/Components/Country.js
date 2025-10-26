import React from 'react'
import './Country.css'
import { useNavigate } from 'react-router-dom'

const Country = ({restCountries}) => {

  const navigate = useNavigate()

  function handleCardClick(countryCode){
    navigate(`/country/${countryCode}`)
  }
 
  
  return (
    <div className='country-container'>
       {restCountries.map((country)=>(
        <div className='country_details' onClick={()=>handleCardClick(country.cca3)} key={country.cca3}>
          <img className='country_flag' src={country.flags.png} alt={`${country.name.common} flag`}/>
         <div className="country_content">
             <div className='heading_div'>
            <h3 className='country_heading'>{country.name.common}</h3>
          </div>
          <div> <span style={{fontWeight:'600'}}>Population</span> : {country.population}</div>

          <div> <span style={{fontWeight:'600'}}>Region</span> : {country.region}</div>
        <div> <span style={{fontWeight:'600'}}>Capital</span>: {country.capital  ? country.capital[0]: 'NA'}</div>
         </div>
        
        </div>
      ))}
    </div>
  )
}

export default Country
