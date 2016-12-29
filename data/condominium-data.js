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
                apartments: obj.apartments,
                floatNumber: obj.floatNumber,
                entrance: obj.entrance,
                city: obj.city,
                neighborhood: obj.neighborhood
            });
            console.log("Hello from condominium data.");
            console.log(condominium);
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
        AddUserToApartmentInCondominium(cond, apar, user) {
            console.log('Start');
            return new Promise((resolve, reject) => {
                Condominium.update({
                        "apartments.floatNumber": apar.floatNumber,
                        "apartments.entrance": apar.entrance,
                        "apartments.city": apar.city,
                        "apartments.neighborhood": apar.neighborhood,
                        "apartments.apartmentNumber": apar.apartmentNumber
                    }, { "$push": { "apartments.$.users": user } },
                    function(err, numAffected) {
                        if (err) {
                            return reject(err);
                        }
                        console.log("IZDISLAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
                        console.log(numAffected);
                        resolve(numAffected);
                    }
                );
                /*Condominium.update({
                    floatNumber: cond.floatNumber,
                    entrance: cond.entrance,
                    city: cond.city,
                    neighborhood: cond.neighborhood
                }, function(err, condominium) {
                    if (err) {
                        return reject(err);
                    } else {
                        for (let i = 0; i < condominium.apartments.length; i++) {
                            console.log(i);
                            console.log(condominium.apartments[i]);
                            if (apar.apartmentNumber == condominium.apartments[i].apartmentNumber) {
                                console.log("Find");
                                Condominium.update();
                                condominium.apartments[i].users.push(user);
                                console.log(condominium.apartments[i]);
                            }
                        }
                        return resolve(condominium.save());
                    }
                });*/
            });
        },
        addApartmentToCondominium: function(floatNumber, entrance, city, neighborhood, apartment) {
            return new Promise((resolve, reject) => {
                Condominium.findOne({
                        floatNumber,
                        entrance,
                        city,
                        neighborhood
                    },
                    function(err, condominium) {
                        if (err) {
                            return reject(err);
                        }
                        condominium.apartments.push(apartment);
                        return resolve(condominium.save());
                    });
            });
        }
    };
};