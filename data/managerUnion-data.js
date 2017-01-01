module.exports = (models) => {
    let ManagerUnion = models.ManagerUnion;
    return {
        findManagerUnionBy: function(properties) {
            return new Promise((resolve, reject) => {

                ManagerUnion.findOne({
                    floatNumber: properties.floatNumber,
                    entrance: properties.entrance,
                    city: properties.city,
                    neighborhood: properties.neighborhood
                }, function(err, managerUnion) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(managerUnion);
                    }
                });
            })
        },
        createManagerUnion: function(obj) {
            //console.log(`Username: ${username}, Password: ${password}`);
            console.log("Hi from managerData");
            const managerUnion = new ManagerUnion({
                cashier: obj.cashier,
                manager: obj.manager,
                members: obj.members,
                floatNumber: obj.floatNumber,
                entrance: obj.entrance,
                city: obj.city,
                neighborhood: obj.neighborhood
            });
            console.log(managerUnion);
            return Promise.resolve(managerUnion.save());
        },
        getAllManagerUnions: function() {
            return new Promise((resolve, reject) => {
                ManagerUnion.find((err, managerUnions) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(managerUnions);
                })
            });
        },
        addMemberToManagerUnion: function(prop, member) {
            return new Promise((resolve, reject) => {
                ManagerUnion.findOne({
                        floatNumber: prop.floatNumber,
                        entrance: prop.entrance,
                        city: prop.city,
                        neighborhood: prop.neighborhood
                    },
                    function(err, union) {
                        //console.log(apartment);
                        union.members.push(member);
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }
                        return resolve(union.save());
                    });
            });
        },
        changeCashierName(prop, cashier) {
            return new Promise((resolve, reject) => {
                ManagerUnion.findOne({
                        floatNumber: prop.floatNumber,
                        entrance: prop.entrance,
                        city: prop.city,
                        neighborhood: prop.neighborhood
                    },
                    function(err, union) {
                        //console.log(apartment);
                        union.cashier = cashier;
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }
                        return resolve(union.save());
                    });
            });
        }
    };
};