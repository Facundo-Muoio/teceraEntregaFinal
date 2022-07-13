const { getProductos } = require("../DAOs/DaoProducto")

const allProducts = async (req, res) => {
    const productos = await getProductos()
    res.render("productos", { productos })
}

module.exports = allProducts