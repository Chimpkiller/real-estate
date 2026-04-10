'use client';
import { useState, useEffect } from "react";
import '../app/styles/form.css'


export default function SearchFilter ({ onFilter }) {
    
    const[inputs, setInputs] = useState({
        minPrice     : '', 
        maxPrice     : '', 
        beds         : '', 
        baths        : '', 
        suburb       : '', 
        propertyType : '', 
        keyword      : '', 
    });

    const handleChange = (e) => {
        const {name , value} = e.target;
        setInputs(prev => ({
            ...prev, [name] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        onFilter(inputs)
    }

    return (
        <div style={{
            margin: '1rem 0',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '6px'
        }}>
            <form onSubmit={handleSubmit}>
                <h2>Filter properties</h2>
                <div className="formWrapper">
                    <div className="formFields">
                        <label>Suburbs</label>
                        <input 
                        type="text" 
                        name="suburb" 
                        placeholder="eg Baneshwor" 
                        value={inputs.suburb} 
                        onChange={handleChange}/>
                    </div>

                    <div className="formFields">
                        <label>Min Price</label>
                        <input 
                        type="number" 
                        name="minPrice" 
                        placeholder="Rs 500000" 
                        value={inputs.minPrice} 
                        onChange={handleChange}/>
                    </div>

                    <div className="formFields">
                        <label>Max Price</label>
                        <input 
                        type="number" 
                        name="maxPrice" 
                        placeholder="Rs 1000000" 
                        value={inputs.maxPrice} 
                        onChange={handleChange}/>
                    </div>

                    <div className="formFields">
                        <label>Property Type</label>
                        <select 
                        name="propertyType"
                        value={inputs.propertyType}
                        onChange={handleChange}>
                            <option value="">Select property type:</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="land">Land</option>
                        </select>
                    </div>

                    <div className="formFields">
                        <label>Beds</label>
                        <select 
                        name="beds"
                        value={inputs.beds}
                        onChange={handleChange}>
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>
                    </div>

                </div>

                <div style={{display: 'flex', justifyContent: 'end', gap: '0.5rem'}}>
                    <button
                    type="button"
                    onClick={()=> {
                        const reset = { suburb : '', minPrice : '', maxPrice : '', propertyType : '', beds : ''}
                        setInputs(reset)
                        onFilter(reset)
                    }}>Clear all</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}