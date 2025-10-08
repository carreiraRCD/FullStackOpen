const Country = ({name}) => {
    return(
        <li>{name}</li>
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

const Countries = ({countries}) => {
    if (countries.length > 10){
        return(<p>Too many matches ({countries.length}), specify another filter</p>)
    }else if(countries.length == 1){
        return(
            countries.map(c => <BasicCountry key={c.name.common} country={c}/>)
        )
    }else{
        return(
            <p>
                {countries.map(c => <Country key={c.name.common} name={c.name.common}/>)}
            </p>
        )
    }
}

export default Countries