'use client';

import Link from 'next/link'
import { useState } from 'react'
import '../app/styles/card.css'


export default function PropertyCard ({ item }) {
    const [loading, setLoading] = useState(false);

    return(
    <div>
        <div className="property-card">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2>{item.title}</h2>
                        <Link
                            style={{ textDecoration : 'None', color: 'black'}}
                            href={`/listings/${item.id}`} 
                            className="see-more-button"
                            onClick={() => setLoading(true)}>
                            <button>
                                {loading ? 'Loading...' : 'See more'}
                            </button>
                        </Link>
            </div>
            <small style={{margin: '0 0.4rem'}}><strong>Property Type: </strong>{item.propertyType}</small>
            <small style={{margin: '0 0.4rem'}}><strong>Beds: </strong>{item.beds}</small>
            <small style={{margin: '0 0.4rem'}}><strong>Status: </strong>{item.status}</small>
            {item.internalNotes && (
                <small><strong>Internal Note: </strong>{item.internalNotes}</small>
            )}
            <p>{item.description}</p>   
        </div>
    </div>
    )
}