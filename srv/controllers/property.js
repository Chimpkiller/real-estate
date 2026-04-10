import * as PropertyService from '../services/properties.js';


export const getListings =  async (req, res) => {
    try {
        const result = await PropertyService.getProperties(req.query, req.isAdmin);
        return res.json(result);
    } catch (error) {
        console.error('error : ', error);
        return res.status(500).json({
            error : 'Internal server error',
        })
    }
}


export const getListingDetails = async (req, res) => {
    try {
        const result = await PropertyService.getProperty(req.params.id, req.isAdmin);

        if(!result) {
            return res.status(404).json({
                message : 'Property not found.'
            })
        };
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error : error.message
        });
    }
}