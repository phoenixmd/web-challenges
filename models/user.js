'use strict';

const bcrypt = require('bcrypt-as-promised');
const SALT_WORK_FACTOR = 10;
const expressSession = require('express-session');
const Store = require('express-sequelize-session')(expressSession.Store);


module.exports = function(sequelize, DataTypes) {
  var store = new Store(sequelize);
  var User = sequelize.define('User', {
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
          User.belongsTo(store.Session, {foreignKeyConstraint: true});
        // associations can be defined here
      },
      getUser: function(email){
          var that = this;
          return new Promise(function(resolve, reject){
              that.findOne({where: {email: email}}).then(function(user){
                  return resolve(user);
              }).catch(function(error){
                  reject(error);
              })

          });

      },
      createUser: function(params, req){
          return new Promise(function(resolve,reject){
              User.create({email: params.email, password: params.password})
                  .then(function(user) {
                      console.log(req.sessionID);
                      store.Session.findOne({where:{sid: req.sessionID}}).then(function(session){
                          if (session) {
                              user.setSession(session)
                          }
                          resolve(user);
                      }), function(error){}


                  }).catch(function(error) {
                      console.log(error);
                      reject(error);
                  });

          });

      },
        login: function(req,done){
            User.getUser(req.body.email).then(function(user){
                if(user){
                    user.comparePassword(req.body.password).then(function(matched){
                        if(matched){
                            store.Session.findOne({where:{sid: req.sessionID}}).then(function(session){
                                if(session){
                                    user.setSession(session);
                                }
                                done(null,user);
                            })
                        }

                    }, function(error){
                        done("Incorrect Password", null);
                    });
                }else{
                    done("No user found", null);
                }
            }).catch(function(error){
                done(error, null)
            })

        },
        logout: function(req, done){
            User.getUser(req.session.user.email).then(function(user){
                if(user){
                    user.setSession(null).then(function(user){
                        done(null, user)
                    });
                }
            }).catch(function(error){
                done(error, null);
            })

        }

    },
    instanceMethods: {
      comparePassword:  function(candidatePassword) {
        var that = this;
        return new Promise(function(resolve, reject){
          bcrypt.compare(candidatePassword, that.password)
              .then(function(matched){
                resolve(matched);
              }, function(error){reject(error);})
              .catch(function(error){
                  reject(error);
              })
        });
      }
  }
});

  User.beforeCreate(function(user, options, next) {
    bcrypt.genSalt(SALT_WORK_FACTOR).then(function(salt){
         bcrypt.hash(user.password, salt).then(function(hash){
           user.password = hash;
           next();
         }, console.error);
        },
        console.error)

  })
  return User;
};