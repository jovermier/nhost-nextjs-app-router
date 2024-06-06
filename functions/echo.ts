import { type Request, type Response } from 'express';
import process from 'process';

import { type EchoData } from '../lib/echoType';

export default function echo(req: Request, res: Response) {
  const data: EchoData = {
    headers: req.headers,
    query: req.query,
    node: process.version,
  };
  return res.status(200).json(data);
}
