module.exports = (models) => {
    let User = models.User;
    return {
        findUserByUsername: function(name) {
            return new Promise((resolve, reject) => {

                User.findOne({ username: name }, function(err, user) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user);
                    }
                });
            })
        },
        createUser: function(obj) {

            //console.log(`Username: ${username}, Password: ${password}`);
            const user = new User({
                username: obj.username,
                password: obj.password,
                firstName: obj.firstName,
                lastName: obj.lastName,
                isManager: obj.manager
            });

            return Promise.resolve(user.save());
        },
        getAllUsers: function() {
            return new Promise((resolve, reject) => {
                User.find((err, users) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(users);
                })
            });
        }
    };
};