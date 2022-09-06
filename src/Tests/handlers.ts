import { rest } from 'msw'
import pokemon from './pokemon'
export const handlers = [
  rest.get('*/api/v2/pokemon-form/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(pokemon))
  }),
  // rest.get('*/api/v2/pokemon?offset=:offset', (req, res, ctx) => {
  //   return res(ctx.json({ offset: req.params.offset }))
  // }),
]
