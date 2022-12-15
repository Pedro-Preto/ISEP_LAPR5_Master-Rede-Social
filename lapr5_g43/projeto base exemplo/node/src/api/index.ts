import { Router } from 'express';
import post from './routes/postRoute';

export default () => {
	const app = Router();

	post(app);
	
	return app
}