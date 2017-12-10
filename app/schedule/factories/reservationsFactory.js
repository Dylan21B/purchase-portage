angular
.module("purchase-portage")
.factory("reservationsFactory", function ($http) {
    return Object.create(null, {
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
                    const data = response.data
                })
            }
        }
    })
})
