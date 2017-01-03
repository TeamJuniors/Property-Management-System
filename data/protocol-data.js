module.exports = (models) => {
    let Protocol = models.Protocol;
    return {
        findProtocolBy: function(properties) {
            return new Promise((resolve, reject) => {

                Protocol.find({
                    floatNumber: properties.floatNumber || properties.flatNumber,
                    entrance: properties.entrance || properties.exitNumber,
                    city: properties.city,
                    neighborhood: properties.neighborhood
                }, function(err, protocol) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(protocol);
                    }
                });
            })
        },
        createProtocol: function(obj) {
            //console.log(`Username: ${username}, Password: ${password}`);
            const protocol = new Protocol({
                number: obj.number,
                date: obj.date,
                content: obj.content,
                floatNumber: obj.floatNumber,
                entrance: obj.entrance,
                city: obj.city,
                neighborhood: obj.neighborhood
            });

            return Promise.resolve(protocol.save());
        },
        getAllProtocols: function() {
            return new Promise((resolve, reject) => {
                Protocol.find((err, protocols) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(protocols);
                })
            });
        }
    };
};