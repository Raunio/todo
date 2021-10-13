import { Request, Response, NextFunction } from 'express';

const NAMESPACE = 'Health Controller';

const healthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'All is good.'
    });
};

export default { healthCheck };
