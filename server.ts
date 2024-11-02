import { Elysia } from "elysia"; // Import Elysia framework
import $config from "./server.config"; // Configuration file for server settings
import dbConnection from "./db.connection"; // Database connection module
import { cors } from '@elysiajs/cors'; // CORS middleware
import { swagger } from '@elysiajs/swagger'; // Swagger middleware for API documentation
// const app = require('cors');
import { logger } from "@chneau/elysia-logger";
import $Customer from './src/customers/customer.api'
import $Order from './src/Orders/Order.api'
import $Venues from './src/Venue/Venue.api'
import $Item from './src/Item/Product.api'
import $Feedback from './src/Feedback/Feedback.api'
import $Cart from './src/Cart/Cart.api'
import $Account from "./src/account/account.api"
import jwt from "@elysiajs/jwt";
import config from "./server.config";



const host = '0.0.0.0';
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    const app = new Elysia().get('/', () => 'Hello World');
    app.use(logger());
    app.use(jwt({name: 'jwt',secret: config.jwtKey}))

    
  app.use(cors());


    app.use(swagger());

    await dbConnection();

    app.use($Customer);
    app.use($Order);
    app.use($Venues)
    app.use($Item)
    app.use($Feedback)
    app.use($Cart)
    app.use($Account)


    app.listen({ hostname: host, port: port });

    console.log(
      `🦊 Elysia is running at http://${host}:${port}`
    );
  } catch (err) {
    console.log("<--Server Error-->", err);
  }
};

start();
