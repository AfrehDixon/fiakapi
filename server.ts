import { Elysia } from "elysia"; // Import Elysia framework
// import $config from "./server.config"; // Configuration file for server settings
import dbConnection from "./db.connection"; // Database connection module
import { cors } from '@elysiajs/cors'; // CORS middleware
import { swagger } from '@elysiajs/swagger'; // Swagger middleware for API documentation
// const app = require('cors');
import { logger } from "@chneau/elysia-logger";
import $Costomer from '../fikaApp-api/src/customers/customer.api';// Importing the customer API module
import $Order from '../fikaApp-api/src/Orders/Order.api';// Importing the order API module
import $Venues from '../fikaApp-api/src/Venue/Venue.api';// Importing the venue API module
import $Item from './src/Item/Product.api'
import $Feedback from '../fikaApp-api/src/Feedback/Feedback.api';// Importing the feedback API module
import $Cart from '../fikaApp-api/src/Cart/Cart.api';// Importing the cart API module

// import $Item from '../fikaApp-api/src/Items/Item.api';// Importing the item API module


const host = "localhost";
const port = 3112;
const start = async () => {
  try {
    const app = new Elysia().get('/', () => 'Hello World');
    app.use(logger());

    
  app.use(cors());


    app.use(swagger());

    await dbConnection();

    app.use($Costomer);
    app.use($Order);
    app.use($Venues)
    app.use($Item)
    app.use($Feedback)
    app.use($Cart)


    app.listen({ hostname: host, port: port });

    console.log(
      `🦊 Elysia is running at http://${host}:${port}`
    );
  } catch (err) {
    console.log("<--Server Error-->", err);
  }
};

start();
