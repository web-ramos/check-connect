import { Router, Request, Response } from 'express';
import { createConnection } from 'mysql2/promise';
import { createClient } from 'redis';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.render('index'); // Рендеринг страницы с формой
});

// Проверка MySQL
router.post('/check/mysql', async (req: Request, res: Response) => {
    const { host, port, user, password, database } = req.body;
    try {
        const connection = await createConnection({
            host,
            port: Number(port),
            user,
            password,
            database,
        });
        const [rows] = await connection.execute('SHOW DATABASES');
        await connection.end();

        res.render('result', { type: 'MySQL', success: true, details: rows });
    } catch (err: any) {
        res.render('result', { type: 'MySQL', success: false, error: err.message });
    }
});

// Проверка Redis
router.post('/check/redis', async (req: Request, res: Response) => {
    const { host, port, password } = req.body;

    try {
        const client = createClient({
            url: `redis://${password ? `:${password}@` : ''}${host}:${port}`,
        });

        await client.connect();
        const info = await client.info();
        await client.quit();

        res.render('result', { type: 'Redis', success: true, details: info });
    } catch (err: any) {
        res.render('result', { type: 'Redis', success: false, error: err.message });
    }
});

export default router;
