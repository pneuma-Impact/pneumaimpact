exports.generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

exports.dataOffset = (page = 1, perPage = 20) => {
  return page > 0 ? (page - 1) * perPage : 0;
};
