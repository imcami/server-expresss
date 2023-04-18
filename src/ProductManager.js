import {promises as fs} from 'fs' //importo solamente promesas  
import path from 'path';
class ProductManager{
   constructor(){
        this.path = this.path //mediante el path hago todas las operaciones del txt
        this.products = [];
        this.incrementId = 1
     try {
      const data = fs.readFile(this.path)
      this.products = JSON.parse(data)
      this.incrementId = this.incrementId()
    } catch (error) {
      console.error(`Can not read File ${this.path}: ${error}`);
    }
  } 

  static incrementId() {
    if (this.incrementId) {
       this.incrementId++
          } else {
           this.incrementId = 1
          }
          return this.incrementId
       }
saveProducts(){
  try {
    const data = JSON.stringify(this.products, null, 2)
    fs.writeFile(this.path, data)
  } catch (error) {
    console.log(`error writing to file ${this.path} : ${error} `)
  }
}   
//poner el await en el addproduct y modificar para que ande bien el id
async addProduct (title, description, price, thumbnail, code, stock) {
// valido que todos los campos sean obligatorios
if (!title || !description || !price || !thumbnail || !code || !stock ) {
  console.error(`All fields are required`);
  return;
}
//validar que el campo "code" no se repita
const productExists = this.products.some(product => product.code === code)
    if (productExists) {
     console.error(`the product ${code} already exists`);
     return;
     } 
    
 const newProduct = {
      id: this.incrementId++, 
      title,
      description,
      thumbnail,
      code, 
      stock
     };
     this.products.push(newProduct)
     this.saveProducts();
     console.log("The product was added successfully")
      
    }
    
    //getProduct debe devolver un arreglo vacio
   async getProducts(){
        //consulto el array del txt 
     return this.products
    }

   async getProductById(id){
    //conversion 
     const prodsJSON =  await fs.readFile(this.path, 'utf-8')
     const prods = JSON.parse(prodsJSON)
     const product = this.products.find(producto => producto.id == id);
     if (!product) {
      console.error(`Product id not found ${id}`);
    }
      return product;
    }


    async updateProduct (id, updateData){
     const productIndex = this.products.findIndex(product=> product.id === id)
     {
      if(productIndex === -1){
        console.error(`Product id ${id} was not found`);
        return;
      }
      const updateProduct = {...this.products[productIndex], ...updateData};
      this.products[productIndex] = updateProduct;
      this.saveProducts();
      console.log(`Product id ${id} successfully updated`)
     }
    }

    delateProduct(id){
    const productIndex =this.products.findIndex(product => product.id === id);
    if(productIndex === -1){
      console.error(`product id ${id} does not finded`)
      return;
    }
    this.products.splice(productIndex, 1)
    this.saveProducts();
    console.log(`product id  ${id} successfully delated `)
    }
  }
  
  
  


const product = new ProductManager('./products.json') //inserte la ruta al archivo txt, esta me permite guardar y ejecutar mis archivos

product.getProduct().then(prods => console.log(prods))

 ProductManager.addProduct( 
    "Remera",
    "Remera de algodon",
    1000,
    "https://d3ugyf2ht6aenh.cloudfront.net/stores/188/770/products/remera-negra-remera-hombre-remera-basica-21-6952776c38b5e6844216537450098865-640-0.webp",
     10
 
 );

ProductManager.addProduct(
  "camisa",
  "camisa larga",
  2000,
  "https://http2.mlstatic.com/D_NQ_NP_852996-MLA53168359304_012023-W.jpg",
  14
)
ProductManager.addProduct(
  "pantalon",
  "pantalon de jean",
   3000,
  "https://http2.mlstatic.com/D_NQ_NP_637588-MLA49328528400_032022-W.jpg",
   20
  )

//actualizar un producto pasando el ID y luego un obj con el nuevo stock
ProductManager.updateProduct(8, {stock: 8});

//productManager.deleteProduct(2);





 