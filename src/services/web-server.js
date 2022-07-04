import http from 'http'
import logger, { token } from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import { port } from '../config/settings'
import apiOficinaRouter from '../routes/oficina.router'
import apiSmsRouter from '../routes/sms.router'
import apiUsuarioRouter from '../routes/usuario.router'
import apiFraudeRouter from '../routes/fraude.router'
import apiTipoHitoRouter from '../routes/tipohito.router'
import apiTipoFraudeRouter from '../routes/tipofraude.router'
import apiTipoEventoRouter from '../routes/tipoevento.router'
import apiSubtipoRouter from '../routes/subtipo.router'
import apiHitoRouter from '../routes/hito.router'
import apiCargaRouter from '../routes/carga.router'
import apiEventoRouter from '../routes/evento.router'
import verifyRoute from '../middleware/verifyRoute'

import { simpleExecute } from "../services/database.js";

let httpServer
let refreshTokens = []

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express()
    httpServer = http.createServer(app)

    // middleware
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(cors())

    // routes
    app.use('/api', apiOficinaRouter)
    app.use('/api', apiSmsRouter)
    app.use('/api', apiUsuarioRouter)
    app.use('/api', apiFraudeRouter)
    app.use('/api', apiTipoHitoRouter)
    app.use('/api', apiTipoEventoRouter)
    app.use('/api', apiTipoFraudeRouter)
    app.use('/api', apiSubtipoRouter)
    app.use('/api', apiHitoRouter)
    app.use('/api', apiCargaRouter)
    app.use('/api', apiEventoRouter)

    // const allowCors = function (req,res,next){
    //   res.header("Access-Control-Expose-Headers", "Authorization");
    //   next();
    // }
    // app.use(allowCors);

    // refresh
    app.post('/api/refresh', (req, res) => {
      const refreshToken = req.body.token

      if (!refreshToken) {
        // usuario no autenticado
        return res.status(401).end()
      }
      if (!refreshTokens.includes(refreshToken)) {
        // token no es válido
        return res.status(403).end()
      }

      jwt.verify(refreshToken, `${process.env.ACCESS_REFRESH_TOKEN_SECRET}`, (err, user) => {
        err && console.log('Error de verificacion de token', err)
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken)

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefresToken(user)

        refreshTokens.push(newRefreshToken)

        res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        })
      })
    })
    // login
    app.post('/api/login', async (req, res) => {
      const usuario = {
        userid: req.body.userid,
        pwdusu: req.body.pwdusu,
      }

      try {
        const baseQuery = `SELECT idusua, userid, rolusu, pwdusu FROM usuarios WHERE userid = '${usuario.userid}'`;
        const result = await simpleExecute(baseQuery);

        if (result !== null) {
          const user = {
            idusua: result.rows[0].IDUSUA,
            rolusu: result.rows[0].ROLUSU,
          }

          bcrypt.compare(usuario.pwdusu, result.rows[0].PWDUSU, (err, ret) => {
            if (ret) {
              const accessToken = generateAccessToken(user)
              const refreshToken = generateRefresToken(user)
              refreshTokens.push(refreshToken)

              return res.status(200).json({
                userId: result.rows[0].USERID,
                rol: result.rows[0].ROLUSU,
                accessToken,
                refreshToken,
              })
            }

            // la contraseña no coincide
            return res.status(400).end()
          })
        } else {
          // usuario no encontrado
          res.status(404).end()
        }
      } catch (error) {
        // no se puede conectar con la base de datos
        res.status(500).end()
      }
    })
    // logout
    app.post('/api/logout', verify, (req, res) => {
      const refreshToken = req.body.token;
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      // desconexión correta
      res.status(200).end()
    })

    // server
    httpServer
      .listen(port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${port}`)

        resolve()
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}

module.exports.initialize = initialize

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}

module.exports.close = close

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.idusua, rol: user.rolusu },
    `${process.env.ACCESS_TOKEN_SECRET}`,
    { expiresIn: "5s" },
  )
}
const generateRefresToken = (user) => {
  return jwt.sign(
    { id: user.idusua, rol: user.rolusu },
    `${process.env.ACCESS_REFRESH_TOKEN_SECRET}`,
  )
}

const verify = (req, res, next) => {
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
