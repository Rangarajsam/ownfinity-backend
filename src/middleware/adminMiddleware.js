
const admin = async(req, res, next) => {
    const isAdmin = req.user.isAdmin;
    if(!isAdmin) {
        res.status(403).send("Access Denied");
    }
    next();
}
export default admin;