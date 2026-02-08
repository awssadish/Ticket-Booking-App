export const validateItem = (req, res, next) => {
    const { name, price } = req.body;

    if( !name || !price) {
        return res.status(400).json({
            message: "name and price required",
        })
    }
    next();
};

