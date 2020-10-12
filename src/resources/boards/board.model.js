const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'board-tasks',
    columns = [
      { id: uuid(), title: 'to do', order: 0 },
      { id: uuid(), title: 'done', order: 1 }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return {
      id,
      title,
      columns
    };
  }

  static fromRequest(board) {
    const { id, title, columns } = board;
    return {
      id,
      title,
      columns
    };
  }
}

module.exports = Board;
