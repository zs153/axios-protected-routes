import * as DAL from '../models/usuario.model'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const tokenFromRec = (req) => {
  const token = {
    refreshToken: req.body.token,
  }

  return token
}
const loginFromRec = (req) => {
  const login = {
    userid: req.body.login.userid,
    pwdusu: req.body.login.pwdusu,
  }

  return login
}

export const refresh = async (req, res) => {
  try {
    const result = await DAL.refresh(tokenFromRec(req))

    if (result !== null) {
      
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const login = async (req, res) => {
  try {
    const result = await DAL.find(loginFromRec(req).userid)

    if (result !== null) {
      const user = {
        idusua: result.data.IDUSUA,
        rolusu: result.data.ROLUSU,
      }

      bcrypt.compare(loginFromRec(req).pwdusu, result.data.PWDUSU, (err, ret) => {
        if (ret) {
          const accessToken = generateAccessToken(user)
          const refreshToken = generateRefresToken(user)
          
        }
      })

      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

const generateAccessToken = (user) =>{
  return jwt.sign(
    {id: user.idusua, rol: user.rolusu},
    `${process.env.ACCESS_TOKEN_SECRET}`,
    { expiresIn: "5s" },
  )
}
const generateRefresToken = (user) =>{
  return jwt.sign(
    {id: user.idusua, rol: user.rolusu},
    `${process.env.ACCESS_REFRESH_TOKEN_SECRET}`,
  )
}