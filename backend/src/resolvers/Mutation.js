const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, `{ id }`)

  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

function createNote(parent, args, context, info) {
  const userId = getUserId(context)
  return context.db.mutation.createNote(
    {
      data: {
        content: args.content,
        createdBy: { connect: { id: userId } },
      },
    },
    info,
  )
}

function updateNote(parent, args, context, info) {
  const userId = getUserId(context)
  return context.db.mutation.updateNote(
    {
      data: {
        content: args.content,
        createdBy: { connect: { id: userId } }
      },
      where: {
        id: args.id
      }
    },
    info,
  )
}

module.exports = {
    signup,
    login,
    createNote,
    updateNote
}