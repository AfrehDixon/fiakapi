import { Elysia, t } from "elysia";
import  Handler  from "./customer.handler";
// import NewCustomer from "./customer.handler";
// import addPhoneNumber from "./customer.handler";



const app = new Elysia({ prefix: "/api/customers" });

app.post("/new", Handler.NewCustomer, {
  body: t.Object({
    fullname: t.String(),
    email: t.String(),
    password: t.String(),
    phoneNumber: t.String(),
    
  }),
});

app.post("/login", Handler.Login, {
  body: t.Object({
    email: t.String(),
    password: t.String()
  })
})


export default app