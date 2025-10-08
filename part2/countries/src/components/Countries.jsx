import Button from './Button'

const Country = ({country, onShow}) => {
    return(
        <li>{country.name.common} <Button text="Show" onClick={() => onShow(country)}/></li>
    )
}

const BasicCountry = ({country}) => {
    return(
        <><h1>{country.name.common}</h1>
        <p>
            <li>Capital {country.capital}</li>
            <li>Area {country.area}</li>
        </p>
        <h2>Languages</h2>
        <ul>
            {Object.values(country.languages).map(l => 
                <li key={l}>{l}</li>
            )}
        </ul>
        <img
            src = {country.flags.png}
            alt = {country.flags.alt}
        />
        </>
    )
}

const Countries = ({countries, onShowCountry, selectedCountry}) => {
    if (countries.length > 10){
        return(<p>Too many matches ({countries.length}), specify another filter</p>)
    }
    if(countries.length == 1){
        return(
            countries.map(c => <BasicCountry key={c.name.common} country={c}/>)
        )
    }
    if(selectedCountry){
        return(
            <p>
                {countries.map(c => <Country key={c.name.common} country={c} onShow={onShowCountry}/>)}
                <BasicCountry country={selectedCountry}/>
            </p>
            
        )        
    }

    return(
        <p>
            {countries.map(c => <Country key={c.name.common} country={c} onShow={onShowCountry}/>)}
        </p>
    )
    
}

export default Countries