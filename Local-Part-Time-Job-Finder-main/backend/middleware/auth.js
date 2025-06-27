export function authenticateEmployer(req, res, next) {
  // For development: get employer id from a custom header
  const id = Number(req.headers['x-user-id']);
  req.user = { id: id || 1 }; // fallback to 1 if not provided
  next();
} 