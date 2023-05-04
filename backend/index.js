const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const userModel = require('./models');
const Verify = require('./verify_model');
const app = express();

const DB = `mongodb+srv://defraudapp05:VeSeVvCmsbPxcHSE@defraud.cbywv1h.mongodb.net/?retryWrites=true&w=majority`;
const port = process.env.PORT || 3000;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error(`Error connecting to database: ${err.message}`);
    process.exit(1);
  });

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Server Running' });
});

app.post('/add_product', celebrate({
  body: Joi.object({
    productId: Joi.string().required(),
    productName: Joi.string().required(),
    productDescription: Joi.string().required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
  }),
}), async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(`Error adding product: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/product_details/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await userModel.findOne({ productId });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    console.error(`Error fetching product details: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});

app.use(errors());

// Update the logger to use Vercel logging
const logger = require('./logger');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const winstonLogger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    myFormat,
  ),
  transports: [new transports.Console()],
});

logger.stream = {
  write: (message) => {
    winstonLogger.info(message.trim());
  },
};

// Add a Vercel configuration file
const server = app.listen(port, () => {
  winstonLogger.info(`Listening on port ${port}`);
});

module.exports = server;









// const express = require('express');
// const cors = require('cors');
// const app = express();
// const mongoose=require('mongoose')
// var bodyParser = require('body-parser');
// const userModel = require("./models");
// const Verify = require("./verify_model");
// // 
// const DB=`mongodb+srv://defraudapp05:VeSeVvCmsbPxcHSE@defraud.cbywv1h.mongodb.net/?retryWrites=true&w=majority`
// const port = process.env.PORT || 3000;



// mongoose.connect(DB,
    
//     ).then(()=>{
//     console.log(`Connection successful`)
// }).catch((err)=> console.log(err));


// app.use(cors({
//   credentials: true,
//   origin: "http://localhost:3000"
// }));


// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res, next) => {
//   return res.json({ message: "Server Running" });
// });


// app.post("/add_product", async (request, response) => {
//   const user = new userModel(request.body);

//   try {
//     await user.save();
//     response.send(user);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });



// app.get("/product_details/:id", async (request, response) => {
//   const productId = request.params.id;
//   try {
//     const product = await userModel.findOne({ productId: productId });
    
//     if (!product) {
//       return response.status(404).send("Product not found");
//     }
    
//     response.send(product);
//   } catch (error) {
//     console.error(error);
//     response.status(500).send("Error fetching product details");
//   }
// });



// app.listen(port, () => {
//   console.log(`Listening on $port`)
// })



// module.exports = app;
