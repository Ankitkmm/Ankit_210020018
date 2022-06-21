Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@Ankitkmm 
benawad
/
graphql-express-template
Public
Code
Issues
3
Pull requests
1
Actions
Projects
Wiki
Security
Insights
graphql-express-template/models/user.js /
@benawad
benawad confirm email before logging in
Latest commit d7badab on Sep 9, 2017
 History
 1 contributor
34 lines (32 sloc)  692 Bytes

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  User.associate = (models) => {
    // 1 to many with board
    User.hasMany(models.Board, {
      foreignKey: 'owner',
    });
    // 1 to many with suggestion
    User.hasMany(models.Suggestion, {
      foreignKey: 'creatorId',
    });
  };

  return User;
};
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete
