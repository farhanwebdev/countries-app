// CountryDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CountryDetails.css';

const CountryDetails = () => {
    // 👈 Get the 'code' parameter from the URL
    const { code } = useParams(); 
    const navigate = useNavigate();
    
    const [countryData, setCountryData] = useState(null);
    const [borderNames, setBorderNames] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!code) return;

        // Optimized URL for detail page fetch
        const detailUrl = `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,region,subregion,capital,tld,currencies,languages,borders,population,cca3`;
       
        
        async function fetchCountryDetails() {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch(detailUrl);
                
       
                if (!res.ok)  throw new Error(`HTTP error: ${res.status}`);
                
                const data = await res.json();
                // The /alpha endpoint returns an array, take the first item
                
                setCountryData(data); 
            } catch (error) {
                console.error("Failed to fetch details:", error.message);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCountryDetails();
    }, [code]); // Dependency on 'code' ensures refetch if user clicks a border country

    useEffect(() => {
        // Only run this effect if countryData is loaded and has border codes
        if (countryData && countryData.borders && countryData.borders.length > 0) {
            
            // Join the CCA3 codes (e.g., ["BLR", "LVA"]) into a single string (e.g., "BLR,LVA")
            const borderCodes = countryData.borders.join(',');
            
            // API endpoint to fetch names by multiple codes
            const borderNameUrl = `https://restcountries.com/v3.1/alpha?codes=${borderCodes}&fields=name,cca3`;

            async function fetchBorderNames() {
                try {
                    const res = await fetch(borderNameUrl);
                    if (!res.ok) throw new Error(`Border fetch error: ${res.status}`);
                    
                    const borderData = await res.json();
                    
                    // Map the response to an array of just the common names
                  const namesAndCodes = borderData.map(border => ({
                    name: border.name.common,
                    code: border.cca3 // Store the code for navigation
                }));
                    setBorderNames(namesAndCodes);

                } catch (error) {
                    console.error("Failed to fetch border names:", error.message);
                    // Set an empty array on error
                    setBorderNames([]); 
                }
            }
            fetchBorderNames();
        } else if (countryData && (!countryData.borders || countryData.borders.length === 0)) {
            // Handle countries with no borders (e.g., islands)
            setBorderNames([]);
        }
    }, [countryData]);

    if (isLoading) return <div style={{padding: '50px'}}>Loading country details...</div>;
    if (error) return <div style={{padding: '50px'}}>Error fetching data: {error}</div>;
    if (!countryData) return <div style={{padding: '50px'}}>Country data not found.</div>;

    // --- Helper functions to format nested API data ---
    const getFormattedNames = (data) => {
        // 1. Check if nativeName exists before calling Object.values
        if (!data.name.nativeName) return 'N/A';
        const nativeNames = Object.values(data.name.nativeName);
        // 2. Safely access the first element
        return nativeNames.length > 0 ? nativeNames[0].common : 'N/A';
    };
    
    const getLanguages = (data) => {
        // 3. Check if languages exists
        if (!data.languages) return 'N/A';
        return Object.values(data.languages).join(', ');
    };
    
    const getCurrencies = (data) => {
        // 4. Check if currencies exists
        if (!data.currencies) return 'N/A';
        return Object.values(data.currencies).map(c => c.name).join(', ');
    };

    

    return (
        <div className="inside_country" style={{}}>
            {/* Back Button */}
            <div className="back_btn_container" onClick={() => navigate(-1)}>
                
                    <i className="fa-solid fa-arrow-left back-icon"></i>
                <button className="back-btn" > 
                    Back
                </button>
            </div>

            <div className="country_info">
                <div className="country_image">
                    <img src={countryData.flags.png} alt={`${countryData.name.common} flag`} />
                </div>
                
                <div className="country_info_details">
                    <h1>{countryData.name.common}</h1>
                    <div className="details-columns">
                        {/* Column 1: Core Details */}
                        <div className="details-column-one">
                            <p><strong>Native Name:</strong> {countryData.name.nativeName ? getFormattedNames(countryData) : 'N/A'}</p>
                            <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
                            <p><strong>Region:</strong> {countryData.region}</p>
                            <p><strong>Sub Region:</strong> {countryData.subregion || 'N/A'}</p>
                            <p><strong>Capital:</strong> {countryData.capital ? countryData.capital[0] : 'N/A'}</p>
                        </div>
                        
                        {/* Column 2: Specific Details */}
                        <div className="details-column-two">
                            <p><strong>Top Level Domain:</strong> {countryData.tld ? countryData.tld[0] : 'N/A'}</p>
                            <p><strong>Currencies:</strong> {countryData.currencies ? getCurrencies(countryData) : 'N/A'}</p>
                            <p><strong>Languages:</strong> {countryData.languages ? getLanguages(countryData) : 'N/A'}</p>
                        </div>
                    </div>
                    
                    {/* Border Countries - Next Step's implementation */}
                 <div className="border-info">
                       <div className="borderHeading">
                          <strong>Border Countries:</strong> 
                    </div>
                    <div className="border-countries-container">
                      
                        {borderNames.length > 0 ? (
                    borderNames.map((border)=>(
                        <button 
                            // 1. Attach onClick handler
                            // 2. Navigate using the stored code
                            onClick={() => navigate(`/country/${border.code}`)}
                            className='border_countries_name' 
                            key={border.code} // Use the unique code as the key
                        >
                            {border.name} {/* Display the full name */}
                        </button>
                    ))
                ) : (
                    // Handle case where country has borders but names haven't loaded yet
                    countryData.borders && countryData.borders.length > 0 ? (
                        <span>Loading border names...</span>
                    ) : (
                        <span>No Border Countries</span>
                    )
                )}
                    </div>
                 </div>
                </div>
            </div>
        </div>
    );
};

export default CountryDetails;