const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'board-tasks',
    columns = { id: uuid(), title: 'information', order: 0 }
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [columns];
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return {
      id,
      title,
      columns: [columns, columns]
    };
  }
}

module.exports = Board;
