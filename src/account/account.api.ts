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

app.delete('/:userId', Handler.deleteAccouts, {
    params: t.Object({
        userId: t.String()
    })
});

app.delete('/delete/:id', Handler.deleteAccount, {
    params: t.Object({
        id: t.String()
    })
}
)



export default app