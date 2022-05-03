const { UserList } = require("../DummyData");

const resolvers = {
  Query: {
    users() {
      return UserList;
    },
  },
};

module.exports = { resolvers };
