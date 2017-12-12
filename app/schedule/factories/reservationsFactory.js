angular
    .module("purchase-portage")
    .factory("reservationsFactory", function ($http) {
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            "add": {
                value: function (appointment) {
                    return $http({
                        method: "POST",
                        url: "https://purchase-portage.firebaseio.com/reservations/.json",
                        data: appointment
                    })
                }
            },
            // "edit": {
            //     value: function (reservations, key) {
            //         return $http({
            //             method: "GET",
            //             url: `https://purchase-portage.firebaseio.com/reservations/${key}/.json`,
            //             data: reservations
            //         })
            //     }
            // },
            "cancel": {
                value: function (key) {
                    return $http({
                        method: "DELETE",
                        url: `https://purchase-portage.firebaseio.com/reservations/${key}/.json`
                    })
                }
            },
            "detail": {
                value: function (key) {
                    return $http({
                        method: "GET",
                        url: `https://purchase-portage.firebaseio.com/reservations/${key}/.json`
                    }).then(response => {
                        return response.data
                    })
                }
            },
            "list": {
                value: function () {
                    return $http({
                        method: "GET",
                        url: "https://purchase-portage.firebaseio.com/reservations/.json",
                    }).then(response => {
                        const appointments = response.data
                        if (appointments === null) {
                            this.cache = "Currently no tickets are scheduled for delivery."
                        } else {

                            // capture the Firebase object of objects as an array
                            this.cache = Object.keys(appointments).map(key => {
                                appointments[key].id = key
                                return appointments[key]
                            })
                        }
                        return this.cache
                    })
                }
            }
        })
    })
