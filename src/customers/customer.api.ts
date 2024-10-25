import { Elysia, t } from "elysia";
import NewCustomer from "./customer.handler";
// import addPhoneNumber from "./customer.handler";
import { addPhoneNumber } from "./customer.handler";
import { getPhoneNumbers } from "./customer.handler";


const app = new Elysia({ prefix: "/api/customers" });

app.post("/new", NewCustomer, {
  body: t.Object({
    fullname: t.String(),
    email: t.String(),
    password: t.String(),
    
  }),
});

app.post(
  "/add-phone/:userId",
  async ({ params, body }) => {
    const { userId } = params;  // Extract userId from URL
    const { phoneNumber } = body;  // Extract phoneNumber from request body

    if (!phoneNumber) {
      return { success: false, message: "Phone number is required" };
    }

    // Call the handler to add phone number
    return await addPhoneNumber(userId, phoneNumber);
  },
  {
    params: t.Object({
      userId: t.String(),  // Expect a userId parameter in the route
    }),
    body: t.Object({
      phoneNumber: t.String(),  // Expect a phoneNumber in the request body
    }),
  }
);

app.get(
  "/phone-numbers/:userId",
  async ({ params }) => {
    const { userId } = params;  // Extract userId from URL

    // Call the handler to get phone numbers
    return await getPhoneNumbers(userId);
  },
  {
    params: t.Object({
      userId: t.String(),  // Expect a userId parameter in the route
    }),
  }
);


export default app