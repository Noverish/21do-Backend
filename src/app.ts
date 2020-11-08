import express from 'express';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';

import { PORT } from '@src/envs';
import routes from '@src/routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan('dev'));
app.use('/', routes);

app.use((req, res, next) => {
  res.status(404);
  res.json({ msg: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.json({ msg: err.stack });
});

const server: http.Server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`* API Server Started at ${PORT}`);
});