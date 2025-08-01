const isAdmin = (req, res, next) => {
  // Ensure user is authenticated and has a role of 'admin'
  if (req.user && req.user.role === 'admin') {
    next(); // Allow access to next middleware or route
  } else {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = isAdmin;
