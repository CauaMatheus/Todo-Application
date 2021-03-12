import express from 'express';

const router = express.Router();

router.get('/', (request, response) => response.json({ message: 'Hello World!' }));

export default router;
