import express from 'express'
import { ProductManager } from '/ProductManager.js'


//definimos las rutas y constantes
const app = express()
const PORT = 8080
app.use((express.json)) //para poder ejecutar JSON en mi app
app.use(express.urlencoded({extended: true}))

//product manager
const ProductManager = new ProductManager('./products.txt');
app.get("/", (req, res) => {
    res.send(`<h3>Welcome to Express server!</h3>`);
  });
  
app.get("/product", async (req, res) =>{
    const products = await ProductManager.getProducts()
    res.send(products)
})

app.get("/product:id", async (req, res) => {
    const product = await ProductManager.getProductsById(req.params.idUser)
    res.send(product)
})

app.post('/product', (req, res)=>{
    const {title, description, id, code, thumbnail, price} = req.body //datos enviados por postman
    products.push({title: title, code: code, id: id, thumbnail: thumbnail, price: price})
    res.send("product was created")
})

//endpint que muestra todos los productos o la cantidad especificada por query
app.get("/products", async (req, res) => {
    try {
      const products = await manager.getProducts();
      let { limit } = req.query;
  
      if (limit) {
        if (isNaN(limit)) {
          throw new Error("Invalid query.");
        }
        let filterProducts = products.slice(0, limit);
        res.send(filterProducts);
      } else {
        res.send(products);
      }
    } catch (error) {
      res.json({ Error: error.message });
    }
  });
  
  //endpoint que filtra por params por Id de producto
  app.get("/products/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await manager.getProductsById(Number(pid));
  
      if (!product) throw new Error("Product not found.");
  
      res.send(product);
    } catch (error) {
      res.json({ Error: error.message });
    }
  });

  app.listen(port, (err) => {
    if (err) console.log(err);
    console.log("Server ready in port", port);
  });