import express from 'express';
import morgan from 'morgan';
import cors from 'cors'

import router from './routes/index.js';
import audiosRoutes from './routes/audios.routes.js'

const app = express()

// para que otro servidor se pueda conectar
app.use(cors())

// morgan is view all requests to server
app.use(morgan('dev'))

// allow read json
app.use(express.json())

app.set('port', process.env.PORT || 3000);


// Routers
app.use(router);
app.use(audiosRoutes);


export default app;