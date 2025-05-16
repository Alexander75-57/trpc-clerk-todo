import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { todoRouter } from '@/server/routers/index'
import { createContext } from '@/server/context'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: todoRouter,
    createContext,
  })

export { handler as GET, handler as POST }