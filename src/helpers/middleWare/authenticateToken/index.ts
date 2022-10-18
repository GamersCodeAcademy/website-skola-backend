const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  console.log(req.headers)
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.sendStatus(401);

  jwt.verify(token, config.accessTokenSecret, (err: any, user: any) => {
    if(err) return res.sendStatus(403);
    req.user = user;
    next();

  });
}

export default authenticateToken
