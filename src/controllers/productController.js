import Product from "../user";

// GET /api/products
export const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;

        const query = {};

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        if (category) {
            query.category = category;
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
