import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();
const users = [
    { 'name' : 'Batman', 'email' : 'batman@gmail.com', 'is_admin' : true },
    { 'name' : 'Superman', 'email' : 'superman@gmail.com', 'is_admin' : false },
    { 'name' : 'Man', 'email' : 'man@gmail.com', 'is_admin' : false },
]


const suburbs  = ['Lazimpath', 'Baluwatar', 'Baneshwor']
const types    = ['house', 'apartment', 'land']
const statuses = ['available', 'sold']


function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min };
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]}


const properties = Array.from({ length : 50 }, (_, i) => {
    const type   = pick(types);
    const suburb = pick(suburbs);
    const beds   = type === 'house' ? 0 : rand(1, 5);
    const baths  = type === 'apartment' ? 0 : rand(1, beds);
    const price  = rand(300, 2200) * 1000;

    return {
        title: `${beds > 0 ? beds + "-Bed " : ""}${type.charAt(0).toUpperCase() + type.slice(1)} in ${suburb}`,
        description: `Lovely ${type} located in the heart of ${suburb}. Features modern finishes and great natural light.`,
        suburb,
        district: 'kathmandu',
        price,
        beds,
        baths,
        propertyType:  type,
        status: pick(statuses),
        internalNotes: `Note #${i}.`,
    };
})


async function init() {
    try {
        await prisma.user.deleteMany()
        const createdUsers = []

        for(const u of users) {
            const user = await prisma.user.create({ data : u })
            createdUsers.push(user.id)
        }

        const finalProperties = properties.map(p => ({
            ...p,
            userId : pick(createdUsers)
        }))

        await prisma.property.createMany({
            data : finalProperties
        })
    } catch (error) {
        console.error('err:', error) 
    } finally {
        await prisma.$disconnect()
    }
}

init();