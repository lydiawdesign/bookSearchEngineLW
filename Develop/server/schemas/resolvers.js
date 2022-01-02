const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {

        if(context.user) {
            const userData = await User.findOne({_id: context.user._id})
            .select('-__v -password');
            return userData;
        }

        throw new AuthenticationError('User is not logged in')
    },
  },

  Mutation: {
    // login: Accepts an email and password as parameters; returns an `Auth` type.

    // Accepts a username, email, and password as parameters; returns an `Auth` type.
    addUser: async (parent, args) => {
      const user = await Profile.create(args);
      const token = signToken(user);

      return {token, user};
    },
    // saveBook:Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. (Look into creating what's known as an `input` type to handle all of these parameters!)

    // removeBook: Accepts a book's `bookId` as a parameter; returns a `User` type.
  },
};

module.exports = resolvers;
