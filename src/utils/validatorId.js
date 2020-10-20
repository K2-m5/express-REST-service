const isUUID = async id => {
  const pattern =
    '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';
  if (id.match(pattern) === null) {
    return false;
  }
  return true;
};

module.exports = {
  isUUID
};
