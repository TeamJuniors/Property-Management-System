module.exports = function (io, data) {
    let onlineUsers = [];
    let clients = [];

    io.on('connection', (socket) => {
        socket.on('user-connect', (username) => {
            console.log('a user connected ' + username);

            data.findUserByUsername(username)
                .then((user) => {
                    if (!onlineUsers.map(x => x.username).includes(user.username)) {
                        onlineUsers.push(user);
                        clients.push(socket);
                    }
                    io.emit('send-online-users', onlineUsers);
                }).catch((err) => {
                    console.log(err);
                });
        });

        socket.on('user-logout', (username) => {
            console.log('a user logged out ' + username);
            var index = clients.indexOf(socket);
            if (index != -1) {
                clients.splice(index, 1);
            }
            onlineUsers = onlineUsers.filter(x => x.username !== username);
            io.emit('send-online-users', onlineUsers);
        });

        socket.on('send-message', (message, fromUsername, toUsername, time) => {
            data.addChatMessage(message, fromUsername, toUsername, time)
                .then((chat) => {
                    clients[onlineUsers.map(x => x.username).indexOf(onlineUsers.map(x => x.username).filter(username => username == chat.firstUser)[0])]
                        .emit('send-chat', chat);
                    clients[onlineUsers.map(x => x.username).indexOf(onlineUsers.map(x => x.username).filter(username => username == chat.secondUser)[0])]
                        .emit('send-chat', chat);
                }).catch((err) => {
                    console.log(err);
                });
        });

        socket.on('get-messages', (firstUser, secondUser) => {
            const firstUserMessages = [];
            const secondUserMessages = [];

            const obj = {
                firstUser: firstUser,
                secondUser: secondUser,
                firstUserMessages: firstUserMessages,
                secondUserMessages: secondUserMessages
            };

            data.doesChatExist(firstUser, secondUser)
                .then((chat) => {
                    if (!chat) {
                        data.createChat(obj)
                            .then((chatCreated) => {
                                clients[onlineUsers.map(x => x.username).indexOf(onlineUsers.map(x => x.username).filter(username => username == chatCreated.firstUser)[0])]
                                    .emit('send-chat', chatCreated);
                                clients[onlineUsers.map(x => x.username).indexOf(onlineUsers.map(x => x.username).filter(username => username == chatCreated.secondUser)[0])]
                                    .emit('send-chat', chatCreated);
                            }).catch((err) => {
                                console.log(err);
                            });
                    } else {
                        clients[onlineUsers.map(x => x.username).indexOf(onlineUsers.map(x => x.username).filter(username => username == chat.firstUser)[0])]
                            .emit('send-chat', chat);
                        clients[onlineUsers.map(x => x.username).indexOf(onlineUsers.map(x => x.username).filter(username => username == chat.secondUser)[0])]
                            .emit('send-chat', chat);
                    }
                }).catch((err) => {
                    console.log(err);
                });
        });

        socket.on('disconnect', () => {
            var index = clients.indexOf(socket);
            if (index != -1) {
                clients.splice(index, 1);
                onlineUsers.splice(index, 1);
            }
            io.emit('send-online-users', onlineUsers);
        });

        socket.on('get-online-users', (username, imgUrl) => {
            for (let i = 0; i < onlineUsers.length; i += 1) {
                if (onlineUsers[i].username === username) {
                    onlineUsers[i].imgUrl = imgUrl;
                }
            }

            io.emit('send-online-users', onlineUsers);
        });
    });
};