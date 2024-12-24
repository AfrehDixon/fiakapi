import { sendEmail } from "./emailservice";
import { t } from 'elysia';
import Elysia from 'elysia';

const app = new Elysia({ prefix: "/api" });

app.post("/sendmail", async (ctx) => {
    const { name, email, subject, content } = await ctx.body as {
        name: string;
        email: string;
        subject: string;
        content: string;
    };

    try {
        const response = await sendEmail({ name, email, subject, content });
        return ctx.json(response, 200);
    } catch (error) {
        return ctx.json({ success: false, message: 'Error sending email' }, 500);
    }
}, {
    body: t.Object({
        name: t.String(),
        email: t.String(),
        subject: t.String(),
        content: t.String(),
    }),
});

export default app;