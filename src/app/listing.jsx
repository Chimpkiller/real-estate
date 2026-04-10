'use client';
import { useState, useEffect } from "react";
import { fetchProperties } from "../api/property";
import SearchFilter from "../components/searchFilter"
import PropertyCard from "../components/propertyCard";


export default function Listings() {
    const [properties, setProperties] = useState([]);
    const [pagination, setPagination] = useState({});
    const [filters, setFilters] = useState({ page : 1})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async() => {
            setLoading(true);
            try {
                const result = await fetchProperties(filters);
                console.log(result)
                setProperties(result.data);
                setPagination(result.pagination);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [filters]);


    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters, page : 1});
    };

    const handlePagination = (e, direction) => {
        e.preventDefault()
        setFilters((prevFilters) => ({
            ...prevFilters,
            page : direction === 'next' ? prevFilters.page + 1 : prevFilters.page - 1
        }));
    };
    
    return (
        <div className="listing-container">
            <SearchFilter onFilter={handleFilterChange}/>

            { loading ? (
                <p>Loading Properties</p>
            ) : (
                <div style={{margin: '2rem 0'}}>
                    <div style={{display : 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{margin: 'auto 0'}}>Featured Properties</h2>
                        <div className="pagination-section" style={{
                            display: 'flex',
                            margin: '1rem 0',
                            justifyContent: 'end',
                            gap: '0.5rem'
                        }}>
                            <button className="button" onClick={(e) => handlePagination(e, 'prev')} disabled={filters.page <= 1}>Prev</button>
                            <button className="button" onClick={(e) => handlePagination(e, 'next')} disabled={filters.page >= pagination.totalPages}>Next</button>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '0.5rem'
                    }}>
                        {properties.map(item => {
                            return <PropertyCard key={item.id} item={item}/>
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
