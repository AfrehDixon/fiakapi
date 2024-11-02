import { Elysia, t } from 'elysia';
import Handler  from './account.handler';

const app = new Elysia({ prefix: '/api/accounts' });


app.post('/add-account', Handler.addAccount, {
    body: t.Object({
        userId: t.String(),
        networkType: t.String(),
        number: t.String()
    })
});

app.get('/:userId', Handler.getAccounts, {
    params: t.Object({
        userId: t.String()
    })
});



export default app