const Board = require('../resources/boards/board.model');
const User = require('../resources/users/user.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

const DBInit = () => {
  for (let i = 0; i < 3; i += 1) {
    DB.Users.push(new User());
    DB.Boards.push(new Board());
  }
};

DBInit();

const findIndex = (id, name) => {
  return DB[name].findIndex(item => item.id === id);
};

const getAll = nameDB => {
  return DB[nameDB].slice(0);
};

const create = (nameDB, data) => {
  DB[nameDB].push(data);
  return data;
};

const getId = (nameDB, id) => {
  return DB[nameDB].find(item => item.id === id);
};

const updateBoard = (nameDB, id, data) => {
  const idx = findIndex(id, nameDB);
  const { title, columns } = data;
  DB[nameDB][idx] = {
    id,
    title,
    columns
  };
  return DB[nameDB].slice(0)[idx];
};

const remove = async (nameDB, id) => {
  const idx = findIndex(id, nameDB);
  const arrStart = DB[nameDB].slice(0, idx);
  const arrFinish = DB[nameDB].slice(idx + 1);
  DB[nameDB] = arrStart.concat(arrFinish);
  DB.Tasks = DB.Tasks.filter(item => item.boardId !== id);
  return DB[nameDB].slice(0);
};

const updateUser = (nameDB, id, data) => {
  const { name, login, password } = data;
  const idx = findIndex(id, nameDB);
  DB.Users[idx] = {
    id,
    name,
    login,
    password
  };
  return DB.Users.slice(0)[idx];
};

const removeUser = async (id, nameDB) => {
  const idx = findIndex(id, nameDB);
  const arrStart = DB.Users.slice(0, idx);
  const arrFinish = DB.Users.slice(idx + 1);
  DB.Users = arrStart.concat(arrFinish);
  DB.Tasks.map(item => {
    if (item.userId === id) {
      item.userId = null;
    }
  });
  return DB.Users.slice(0);
};

const getAllTasks = async id => DB.Tasks.filter(task => task.boardId === id);

const getTask = async (boardId, taskId) => {
  return DB.Tasks.find(item => item.id === taskId && item.boardId === boardId);
};

const updateTask = async (boardId, taskId, taskData) => {
  const task = DB.Tasks.find(
    item => item.id === taskId && item.boardId === boardId
  );
  if (task) {
    Object.assign(task, taskData);
  }
  return task;
};

const removeTask = async (boardId, taskId) => {
  const indexTasks = DB.Tasks.findIndex(
    item => item.id === taskId && item.boardId === boardId
  );
  if (indexTasks >= 0) {
    return DB.Tasks.splice(indexTasks, 1);
  }
  return false;
};

module.exports = {
  getAllTasks,
  getTask,
  updateTask,
  removeTask,
  getAll,
  create,
  getId,
  updateBoard,
  remove,
  removeUser,
  updateUser
};
