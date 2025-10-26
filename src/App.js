import React, { useEffect, useState } from "react";
import Countries from "./Components/Countries";
import Header from "./Components/Header";
import Search from "./Components/Search";
import CountryDetails from "./Components/CountryDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTheme } from "./contexts/ThemeContext";

  

function App() {

  const [searchedInput, setSearchedInput] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const {theme} = useTheme()

  function handleRegionChange(value){
    setSelectedRegion(value)
  }

  function handleSearch(e){
    setSearchedInput(e.target.value)
  }

  useEffect(function(){
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Header/>
   <Routes>
    <Route path="/" element={
      <>
       <Search selectedRegion={selectedRegion} handleRegionChange={handleRegionChange} searchedInput={searchedInput} handleSearch={handleSearch}/>
    <Countries selectedRegion={selectedRegion} handleRegionChange={handleRegionChange} searchedInput={searchedInput}/>
      </>
    }/>
      
    <Route path="/country/:code" element={<CountryDetails/>} />
   </Routes>
    

    
    </BrowserRouter>
  );
}

export default App;
