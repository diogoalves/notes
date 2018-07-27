const { getUserId } = require('../utils');

function notes (parent, args, context, info) {
  const userId = getUserId(context);
  const noteId = args.id;

  const where = {
    id: noteId,
    createdBy: {
      id: userId
    }
  }
  return context.db.query.notes({ where }, info);
}

module.exports = {
  notes
} 