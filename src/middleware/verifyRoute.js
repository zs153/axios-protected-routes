import jwt from 'jsonwebtoken'

const verifyRoute = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, user) => {
      if (err) {
        // token no válido
        return res.status(403).end();
      }

      req.user = user;
      next();
    })
  } else {
    // usuario no autenticado
    res.status(401).end();
  }
}

export default verifyRoute