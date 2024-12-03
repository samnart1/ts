import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
// import dotenv from 'dotenv'
// dotenv.config({ path: '.env' })
// dotenv.config({ path: '.env.dev' })

const app = new Hono()
app.use('*', timing())
app.use('*', logger())

console.log(Bun.env.TEST)
console.log(Bun.env.AI)

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

export default app
