import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { PrismaClient } from './generated/prisma'

const app = new Elysia()
const prisma = new PrismaClient()


app.use(cors()) 

app.get('/questions', async () => {
    return await prisma.quiz.findMany()
})

app.post('/questions', async ({ body }: {body :{ question:string, options:string[] ,answer:number ,tag:string}}) => {
    return await prisma.quiz.create({
        data: {
            question: body.question,
            options: body.options,
            answer: body.answer,
            tag: body.tag,
        }
    })
})

app.delete('/questions/:id', async ({ params }: {params :{ id:string}}) => {    
    await prisma.quiz.delete({
        where: {
            id: params.id,
        }
    })
    return { message: 'quiz deleted successfully' }
})

app.listen(3001)

console.log("Server is running on http://localhost:3001")