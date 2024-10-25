import { Elysia } from 'elysia';
import {  checkout } from './Cart.Handler'

const app = new Elysia({prefix: '/api/cart'});


app
              
  .post('/cart/checkout', checkout);   

export default app;