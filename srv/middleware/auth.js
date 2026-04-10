export const roleMiddleware = (req, res, next) => {
    const role = req.headers['user-role']
    console.log(role)
    req.isAdmin = role === 'admin';
    next()  
}