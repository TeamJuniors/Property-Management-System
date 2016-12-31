module.exports = (models) => {
    let Chat = models.Chat;
    return {
        createChat: function (obj) {
            const chat = new Chat({
                firstUser: obj.firstUser,
                secondUser: obj.secondUser,
                firstUserMessages: obj.firstUserMessages,
                secondUserMessages: obj.secondUserMessages
            });

            return Promise.resolve(chat.save());
        },
        doesChatExist: function (firstUser, secondUser) {
            return new Promise((resolve, reject) => {
                Chat.findOne({
                    firstUser: firstUser,
                    secondUser: secondUser
                }, (err, model) => {
                    if (err) {
                        return reject(err);
                    }

                    if (model) {
                        return resolve(model);
                    } else {
                        Chat.findOne({
                            firstUser: secondUser,
                            secondUser: firstUser
                        }, (err, model) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(model);
                        });
                    }
                });
            });
        },
        addChatMessage: function (text, author, receiver, time) {
            return new Promise((resolve, reject) => {
                Chat.findOneAndUpdate({
                    firstUser: author,
                    secondUser: receiver
                },
                    {
                        $push: {
                            'firstUserMessages': {
                                text: text,
                                time: time
                            }
                        }
                    },
                    (err, model) => {
                        if (err) {
                            return reject(err);
                        }

                        if (model) {
                            return resolve(model);
                        } else {
                            Chat.findOneAndUpdate({
                                firstUser: receiver,
                                secondUser: author
                            },
                                {
                                    $push: {
                                        'secondUserMessages': {
                                            text: text,
                                            time: time
                                        }
                                    }
                                },
                                (err, model) => {
                                    if (err) {
                                        return reject(err);
                                    }

                                    return resolve(model);
                                });
                        }
                    });
            });
        },
        getChatByUsers: function (firstUser, secondUser) {
            return new Promise((resolve, reject) => {
                Chat.findOne({
                    firstUser: firstUser,
                    secondUser: secondUser
                }, (err, model) => {
                    if (err) {
                        return reject(err);
                    }

                    if (model) {
                        return resolve(model);
                    } else {
                        Chat.findOne({
                            firstUser: secondUser,
                            secondUser: firstUser
                        }, (err, model) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(model);
                        });
                    }
                });
            });
        }
    };
};