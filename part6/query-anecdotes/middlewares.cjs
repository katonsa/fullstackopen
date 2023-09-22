// eslint-disable-next-line no-undef
module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.url === '/anecdotes') {
    const body = req.body

    if (body.content === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }

    if (body.content.length < 5) {
      return res.status(400).json({ error: 'content too short, must have length 5 or more' })
    }
  }
  next()
}