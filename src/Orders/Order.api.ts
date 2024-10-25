import { Elysia, t } from "elysia";
import Handler from "./Order.Handler";

const app = new Elysia({ prefix: "/api/orders" });

app.post("/new", Handler.createOrder, {
  body: t.Object({
    userId: t.String(),
    product: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
      price: t.Number(),
    }),
    paymentType: t.String(),
    deliveryAddress: t.String(),
  }),
});

app.get("/get", Handler.getAllOrders);

app.get("/user/:userId", Handler.getOrdersByUser, {
  params: t.Object({
    userId: t.String(),
  }),
});

app.get("/:orderId", Handler.getOrderById, {
  params: t.Object({
    orderId: t.String(),
  }),
});

app.put("/:orderId", Handler.updateOrderStatus, {
  params: t.Object({
    orderId: t.String(),
  }),
  body: t.Object({
    status: t.String(),
  }),
});

app.delete("/:orderId", Handler.deleteOrder, {
  params: t.Object({
    orderId: t.String(),
  }),
});

// app.post("/post/:orderId", postToOrder, {
//   params: t.Object({
//     orderId: t.String(),
//   }),
//   body: t.Object({
//     product: t.Object({
//       name: t.String(),
//       description: t.Optional(t.String()),
//       price: t.Number(),
//     }),
//   }),
// });



export default app;