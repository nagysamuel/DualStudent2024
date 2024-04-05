import express, { Request, Response, Router } from 'express';
import * as database from './database';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const customers = database.getCustomers((result: unknown[]) => res.json(result));
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).send("Failed to fetch customers");
    }
});



export default router;
