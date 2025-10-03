import React, { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


export default function Home() {
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = async (event, value) => {
        setInputValue(value);
        if (value.length === 0) {
            setOptions([]);
            return;
        }
        const response = await fetch(`http://localhost:3000/api/autocomplete?q=${encodeURIComponent(value)}`);
        if (response.ok) {
            const data = await response.json();
            setOptions(data);
        }
    };

    return (
        <>
            <div><h1 style={{ textAlign: "center" }}>Home Page</h1></div>
            <div style={{ textAlign: "center" }}>
                <form action="/search">
                    <Autocomplete
                        freeSolo
                        options={options}
                        inputValue={inputValue}
                        onInputChange={handleInputChange}
                        filterOptions={(x) => x} // Disable built-in filtering to show all options
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="q"
                                placeholder="Search.."
                                variant="outlined"
                                style={{ width: 300 }}
                            />
                        )}
                        style={{ width: 300, margin: "0 auto" }}
                    />
                </form>
            </div>
        </>
    )
}