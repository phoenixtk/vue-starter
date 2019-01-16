import * as Express          from 'express';
import { Request, Response } from 'express';
import {jsonObj}             from '../../app/config/mockjson';

export const CounterRoutes = (app: Express.Application) => {
  const allowCrossDomain = (req: Request, res: Response, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  };
  app.use(allowCrossDomain);

  app.put('/counter/increment', (req: Request, res: Response) => {
    setTimeout(() => {
      res
      .status(200)
      .json({ count: parseInt(req.body.count, 10) + 1 });
    }, 200);
  });

  app.put('/counter/decrement', (req: Request, res: Response) => {
    setTimeout(() => {
      res
      .status(200)
      .json({ count: parseInt(req.body.count, 10) - 1 });
    }, 200);
  });

  function callback(ijson: any, req: Request, res: Response) {
    setTimeout(() => {
      res
        .status(200)
        .json(ijson.jsonBody);
    }, 200);
  }

  for (const ijson of jsonObj) {
    if (ijson.method === 'get') {
      app.get(ijson.url, (req: Request, res: Response) => {
        callback(ijson, req, res);
      });
    } else if (ijson.method === 'post') {
      app.post(ijson.url, (req: Request, res: Response) => {
        callback(ijson, req, res);
      });
    } else if (ijson.method === 'put') {
      app.put(ijson.url, (req: Request, res: Response) => {
        callback(ijson, req, res);
      });
    } else if (ijson.method === 'delete') {
      app.delete(ijson.url, (req: Request, res: Response) => {
        callback(ijson, req, res);
      });
    }
  }
};
