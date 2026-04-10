import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getProperty = async (id, isAdmin) => {

    const property =  await prisma.property.findUnique({
        where : { id : parseInt(id) },
        include : { user : true },
    });

    if(!property) return
    if(!isAdmin) {
        const { internalNotes, ...data } = property
        return data
    }

    return property
};


export const getProperties = async (filters, isAdmin) => {
    
    const { minPrice, maxPrice, beds, baths, suburb, propertyType, keyword, page } = filters;
    const limit       = 6;
    const currentPage = parseInt(page) || 1;
    const skip        = (currentPage - 1) * limit;
    const where       = {};

    if( minPrice || maxPrice ) {
        where.price = {
            gte : minPrice ? parseInt(minPrice) : undefined,
            lte : maxPrice ? parseInt(maxPrice) : undefined
        }
    };
    
    if(beds) where.beds         = { gte : parseInt(beds)};
    if(baths) where.baths       = { gte : parseInt(baths)};
    if(suburb) where.suburb     = { contains : suburb, mode : 'insensitive'};
    if(propertyType) where.propertyType = propertyType;

    if(keyword) {
        where.OR = [
            { title       : { contains : keyword, mode : 'insensitive'}},
            { description : { contains : keyword, mode : 'insensitive'}}
        ]
    };

    const [items, count] = await Promise.all([
        prisma.property.findMany({
            where : where,
            skip : skip,
            take : limit,
            orderBy : { id : 'desc'},
        }),

        prisma.property.count({ where })
    ])

    const data = items.map((item) => {
        if(!isAdmin) {
            const { internalNotes, ...rest } = item;
            return rest;
        };
        return item;
    })

    return {
        data : data,
        pagination : { count, page, limit, totalPages : Math.ceil(count / limit) }
    };
}