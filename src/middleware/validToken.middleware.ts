import "dotenv/config"

import { Request, Response, NextFunction } from "express"

import { verify } from "jsonwebtoken"
import Repository from "../util/repository.util"

const validTokenMiddleware = async ( req:Request, res:Response, next:NextFunction ) => {
    let token = req.headers.authorization

    if (!token) {
      return res.status(401).json({message:"Usuario deve estar logado para acessar o recurso"})
    }

    token = token.split(' ')[1];

    verify(token, process.env.SECRET_KEY as string, async (error, decoded:any) => {
        if (error) {
          return res.status(401).json({message:"Token invalido"})
        }
        
        const user = await Repository.user.findOneBy({ id: decoded.sub })

        if( !user ){
          return res.status(404).json({message:"Usuario do token não encontrado"})
        }

        req.token = {
          id: decoded.sub,
        };

        next();
      }
    );

}

export default validTokenMiddleware