module.exports = (models) => {
    let Condominium = models.Condominium;
    return {
        findCondominiumByApartmentBuildingNumber: function(apartmentBuildingNumber) {
            return new Promise((resolve, reject) => {

                Condominium.findOne({ apartmentBuildingNumber }, function(err, condominium) {
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
                homeOwners: [],
                apartmentBuildingNumber: obj.apartmentBuildingNumber,
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
        addHomeOwnerToCondominium: function(apartmentBuildingNumber, owner) {
            return new Promise((resolve, reject) => {
                Condominium.findOneAndUpdate({
                    apartmentBuildingNumber
                }, {
                    $push: { homeOwners: owner }
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