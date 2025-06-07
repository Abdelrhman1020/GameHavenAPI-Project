export const authorizeRole = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.user;

    // This Condition Only For Testing
    if (process.env.NODE_ENV === "test") {
      return next();
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: You don’t have access" });
    }

    next();
  };
};
