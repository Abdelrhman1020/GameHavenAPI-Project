export const logger = (req, res, next) => {
  const now = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  console.log(`[${now}] ${method} ${url}`);

  next();
};