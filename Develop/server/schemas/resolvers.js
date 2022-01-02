const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {

        if(context.user) {
            const userData = await User.findOne({})
            .select('-__v -password')
            .populate('books')
        
            return userData;
        }

        throw new AuthenticationError('User is not logged in')
    },
  },

  Mutation: {
    
  },
};

module.exports = resolvers;
