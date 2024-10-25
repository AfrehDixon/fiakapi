import { Elysia, t } from 'elysia';
import Handler from './Feedback.Handler';



const app = new Elysia({
  prefix: '/api/feedback',
});


app.post('/submit', Handler.submitFeedback, {
  body: t.Object({
    name: t.String(),
    email: t.String(),
    feedback: t.String(),
  }),
});

app.get('/get', Handler.getAllFeedback);



export default app;
