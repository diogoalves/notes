const { getUserId } = require('../utils');

// todo restrict access to owner
function notes (parent, args, context, info) {
  const userId = getUserId(context);
  const where = {
    createdBy: {
      id: userId
    }
  }
  return context.db.query.notes({ where }, info);
}

function note (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.query.note({ where: { id: args.id } },info);
}

module.exports = {
  notes,
  note
} 