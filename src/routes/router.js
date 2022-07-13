const { Router } = require("express")
const router = Router()
const perfilController = require("../controllers/userController")
const { login, loguear } = require("../controllers/loginController")
const verifyLogin = require("../middlewares/loginMiddleware")
const verifySingUp = require("../middlewares/signupMiddleware")
const { singUp, registrar} = require("../controllers/registroController")
const logOut = require("../controllers/logoutController")
const allProducts = require("../controllers/productoController")
const {carrito, finalizarCompra, comprar} = require("../controllers/carritoController")
const isAuthenticated = require("../middlewares/isAuthenticated")

router.get("/", async (req, res) => {
    res.render("index")
})

router.get("/registro", singUp)

router.post("/registro", verifySingUp, registrar)

router.get("/inicio", login)

router.post("/inicio", verifyLogin, loguear)

router.get("/salir", logOut)

router.get("/perfil", isAuthenticated, perfilController)

router.get("/productos", isAuthenticated, allProducts)

router.get("/carrito", isAuthenticated, carrito)

router.get("/comprar", isAuthenticated, finalizarCompra)

router.post("/comprar", isAuthenticated, comprar)

module.exports = router
