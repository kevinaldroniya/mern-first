import Product from "../models/product.model.js"

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send({
            success: true,
            data: products
        })
    } catch (error) {
        console.log('Error while fetching products:', error.message);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: `Product with id: ${id} not found`
            })
        }
        res.status(200).send({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error while fetching product:', error.message);
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    } 
}

export const createProduct = async (req, res) => {
    const product = req.body;
    console.log({
        product,
    })
    if (!product.name || !product.price || !product.image) {
        return res.status(400).send({
            Error: "Bad Request",
            message: "Please provide all fields"
        });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).send({
            success: true,
            data: newProduct
        })
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;
        console.log({
            product
        })
        if (!product.name || !product.price || !product.image) {
            return res.status(400).send({
                Error: "Bad Request",
                message: "Please provide all fields"
            });
        }

        const newProduct = await Product.findByIdAndUpdate(id, product, { new:true });
        if (!newProduct) {
            return res.status(404).send({
                success: false,
                message: `Product with id: ${id} not found`
            })
        }

        res.status(200).send({
            success: true,
            data: newProduct
        })
    } catch (error) {
        console.error('Error while updating product:', error.message);
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: `Product with id: ${id} not found`
            })
        }
        await Product.deleteOne(product);
        res.status(200).send({
            status: true,
            message: `products "${id}" successfully deleted`
        })
    } catch (error) {
        console.error('Error while fetching product:', error.message);
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}