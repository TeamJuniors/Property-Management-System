module.exports = (models) => {
    let Condominium = models.Condominium;
    return {
        findCondominimumBy: function(floatNumber, entrance, city, neighborhood) {
            return new Promise((resolve, reject) => {

                Condominium.findOne({ floatNumber: floatNumber, entrance: entrance, city: city, neighborhood: neighborhood }, function(err, condominium) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(condominium);
                    }
                });
            })
        },
        createCondominium: function(obj) {
            const condominium = new Condominium({
                manager: obj.manager,
                apartments: obj.apartments,
                floatNumber: obj.floatNumber,
                entrance: obj.entrance,
                city: obj.city,
                neighborhood: obj.neighborhood
            });

            return Promise.resolve(condominium.save());
        },
        getAllCondominiums: function() {
            return new Promise((resolve, reject) => {
                Condominium.find((err, condominiums) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(condominiums);
                })
            });
        },
        addApartmentToCondominium: function(floatNumber, entrance, city, neighborhood, apartment) {
            return new Promise((resolve, reject) => {
                Condominium.findOneAndUpdate({
                    floatNumber: floatNumber,
                    entrance: entrance,
                    city: city,
                    neighborhood: neighborhood
                }, {
                    $push: { apartments: apartment }
                }, (err, condominium) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(condominium);
                });
            });
        }
    };
};