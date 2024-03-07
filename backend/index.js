const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://dewanshkumarthakur:getmeinnow1234@cluster0.h8cru1q.mongodb.net/e-commerce");
app.get("/", (request, response) => {
    response.send("Express App is Running");
});
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'),(request, response) => {
    response.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${request.file.filename}`
    });
});
//Schema
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

app.post('/addproduct', async(request, response)=>{
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id +1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:request.body.name,
        image:request.body.image,
        category:request.body.category,
        new_price:request.body.new_price,
        old_price:request.body.old_price,
    });
    console.log(product);
    await product.save();//save the product in database taking time
    console.log("Product Saved");
    response.json({
        success: true,
        name:request.body.name,
    })
})

//Creating API  for deleting Products
app.post('/removeproduct', async(request,response)=>{
    await Product.findOneAndDelete({id:request.body.id})
    console.log("Removed");
    response.json({
        success: true,
        name: request.body.name
    })
})
//Creating API for getting all products
app.get('/allproducts', async(request,response)=>{
    let products = await Product.find({});
    console.log("All Products Fetched")
    response.send(products);
})
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error Occurred: " + error);
    }
});
