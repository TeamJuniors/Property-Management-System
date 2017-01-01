module.exports = (models) => {
    let ControlUnion = models.ControlUnion;
    return {
        findControlUnionBy: function(properties) {
            return new Promise((resolve, reject) => {

                ControlUnion.findOne({
                    floatNumber: properties.floatNumber,
                    entrance: properties.entrance,
                    city: properties.city,
                    neighborhood: properties.neighborhood
                }, function(err, controlUnion) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(controlUnion);
                    }
                });
            })
        },
        createControlUnion: function(obj) {
            //console.log(`Username: ${username}, Password: ${password}`);
            console.log("Hi from controlData");
            const controlUnion = new ControlUnion({
                leader: obj.leader,
                members: obj.members,
                floatNumber: obj.floatNumber,
                entrance: obj.entrance,
                city: obj.city,
                neighborhood: obj.neighborhood
            });
            console.log(controlUnion);
            return Promise.resolve(controlUnion.save());
        },
        getAllControlUnions: function() {
            return new Promise((resolve, reject) => {
                ControlUnion.find((err, controlUnions) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(controlUnions);
                })
            });
        },
        addMemberToControlUnion: function(prop, member) {
            return new Promise((resolve, reject) => {
                ControlUnion.findOne({
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
        changeLeaderName(prop, leader) {
            return new Promise((resolve, reject) => {
                ControlUnion.findOne({
                        floatNumber: prop.floatNumber,
                        entrance: prop.entrance,
                        city: prop.city,
                        neighborhood: prop.neighborhood
                    },
                    function(err, union) {
                        //console.log(apartment);
                        union.leader = leader;
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