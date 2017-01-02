module.exports = (models) => {
    let Feedback = models.Feedback;
    return {
        createFeedback: function (obj) {
            const feedback = new Feedback({
                name: obj.name,
                email: obj.email,
                phoneNumber: obj.phoneNumber,
                message: obj.message,
            });

            return Promise.resolve(feedback.save());
        },
        getAllFeedback: function () {
            return new Promise((resolve, reject) => {
                Feedback.find((err, allFeedback) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(allFeedback);
                });
            });
        }
    };
};