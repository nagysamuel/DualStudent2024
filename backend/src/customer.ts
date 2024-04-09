// Assume database.getCustomers now returns a Promise<unknown[]>
import express, { Request, Response, Router } from 'express';
import * as database from './database';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        // Await the async operation
        const customers = await database.getCustomers();
        res.json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        // Respond with error message
        res.status(500).send("Failed to fetch customers");
    }
});

export default router;
