import React, {useState, useEffect, useRef} from "react";
import API from "./api";

const CityAutoComplete = ({value, onChange}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [allCities, setAllCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchCities = async () => {
            setIsLoading(true);
            try {
                const response = await API.get('cities');
                const cities = response.data.map(item => item.city_name);
                setAllCities(cities);
            }
            finally {
                setIsLoading(false);
            }
        };fetchCities();}, []);

    useEffect(() => {
        if (value.trim() === "") {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        const filtered = allCities.filter(city =>
            city.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
    }, [value, allCities]);

    const handleSelect = (city) => {
        const syntheticEvent = {
            target: {
                value: city,
                name: "city"
            }
        };
        onChange(syntheticEvent);
        setShowSuggestions(false);
    };

    const handleInputChange = (e) => {
        onChange(e);
        setShowSuggestions(e.target.value.trim() !== '');
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={inputRef} className="city-autocomplete-container">
            <input 
                type="text" 
                value={value} 
                onChange={handleInputChange} 
                onFocus={() => {
                    if (value.trim() !== '' && suggestions.length > 0) {
                        setShowSuggestions(true);
                    }
                }}
                className="city-autocomplete-input"
            />
            
            {showSuggestions && suggestions.length > 0 && (
                <ul className="city-autocomplete-suggestions">
                    {suggestions.map((city, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(city)}
                            className="city-autocomplete-suggestion"
                        >
                            {city}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CityAutoComplete;