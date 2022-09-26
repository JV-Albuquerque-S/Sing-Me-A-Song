import { Response, Request } from "express";
import { truncate } from "../services/testService.js";

export async function reset(req: Request, res: Response) {
    await truncate();
    res.sendStatus(200);
}