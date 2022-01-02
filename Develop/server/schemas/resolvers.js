const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    singleUser: async (parent, args, context) => {

        if(context.user) {
            const userData = await User.findOne({_id: context.user._id})
            .select('-__v -password');
            return userData;
        }

        throw new AuthenticationError('User is not logged in')
    },
  },

  Mutation: {
    addUser: async () => {
      const user = await Profile.create(args);
      const token = signToken(user);

      return {token, user};
    },
  },
};

module.exports = resolvers;
