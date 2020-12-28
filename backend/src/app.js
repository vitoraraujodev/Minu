import express from 'express';
import path from 'path';
import cors from 'cors';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Aqui coloca o endereço da aplicação React (cors({origin: 'https://...'}))
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
