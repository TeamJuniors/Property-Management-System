module.exports = (models) => {
    let Apartment = models.Apartment;
    return {
        findApartmentBy: function(floatNumber, entrance, city, neighborhood, apartmentNumber) {
            return new Promise((resolve, reject) => {

                Apartment.findOne({
                    floatNumber: floatNumber,
                    entrance: entrance,
                    city: city,
                    neighborhood: neighborhood,
                    apartmentNumber: apartmentNumber
                }, function(err, apartment) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(apartment);
                    }
                });
            })
        },
        createApartment: function(obj) {
            console.log("Hello from apartment-data");
            //console.log(Apartment);
            const apartment = new Apartment({
                apartmentNumber: obj.apartmentNumber,
                users: obj.users,
                floatNumber: obj.floatNumber,
                entrance: obj.entrance,
                city: obj.city,
                neighborhood: obj.neighborhood
            });
            return Promise.resolve(apartment.save());
        },
        getAllApartments: function() {
            return new Promise((resolve, reject) => {
                Apartment.find((err, apartments) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(apartments);
                })
            });
        },
        addUserToAppartment: function(floatNumber, entrance, city, neighborhood, apartmentNumber, user) {
            return new Promise((resolve, reject) => {
                Apartment.findOne({
                        floatNumber,
                        entrance,
                        city,
                        neighborhood,
                        apartmentNumber
                    },
                    function(err, apartment) {
                        //console.log(apartment);
                        apartment.users.push(user);
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }
                        return resolve(apartment.save());
                    });
            });
        }
    };
};