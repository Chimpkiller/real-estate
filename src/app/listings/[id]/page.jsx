import { fetchPropertyById } from "../../../api/property";

export default async function PropertyDetails({ params }) {
    const { id } = await params; 

    try {
        const property = await fetchPropertyById(id);
        console.log(property)

        if (!property) return <div>Property not found.</div>;

        return (
            <main className="p-10">
                <h1>{property.title}</h1>
                <p>{property.description}</p>
                <p>Location: {property.suburb}</p>
                {property.internalNotes && (
                    <p>Internal note: {property.internalNotes}</p>
                )}
            </main>
        );
    } catch (error) {
        return <div>Error: {error.message}</div>;
    }
}