module.exports = function(data) {
    function removeTasks() {
        data.getAllUsers()
            .then(users => {
                for (let i = 0; i < users.length; i += 1) {
                    if (users[i].tasks) {
                        for (let j = 0; j < users[i].tasks.length; j += 1) {
                            let date = users[i].tasks[j].date;
                            if (new Date(+date.split('-')[0], +date.split('-')[1], +date.split('-')[2]) < new Date()) {
                                console.log('REMOVING');
                                data.removeTask(users[i].username, users[i].tasks[j]);
                            }
                        }
                    }
                }
            })
    }

    setInterval(removeTasks, 30000);
};