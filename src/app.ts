import fastify from "fastify"
import { PrismaClient } from '@prisma/client'


export const app = fastify()

// Criando conexão com Banco de dados.
// Para isso, basta instanciar o PrismaClient

const prisma = new PrismaClient()

// prisma.user.create({
//     data: {
//         name: 'Name',
//         email: 'email'
//     }
// })