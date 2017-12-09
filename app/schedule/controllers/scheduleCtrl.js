// module to display current schedule in Firebase
angular
.module("purchase-portage")
.factory("scheduleFactory", function ($http) {
    return Object.create(null, {
        "cache": {
            value: null,
            writable: true
        },
        // "current": {
        //     value: function () {
        //         return $http({
        //             method: "GET",
        //             url: "https://purchase-portage.firebaseio.com/schedule/.json"
        //         }).then(response => {
        //             const data = response.data

        //             this.cache = Object.keys(data).map(key => {
        //                 data[key].id = key
        //                 return data[key]
        //             })

        //             return this.cache
        //         })
        //     }
        // },
        // "single": {
        //     value: function (key) {
        //         return $http({
        //             method: "GET",
        //             url: `https://purchase-portage.firebaseio.com/schedule/${key}/.json`
        //         }).then(response => {
        //             return response.data
        //         })
        //     }
        // },
        // "cancel": {
        //     value: function (key) {
        //         return $http({
        //             method: "DELETE",
        //             url: `https://purchase-portage.firebaseio.com/schedule/${key}/.json`
        //         })
        //     }
        // },
        // "find": {
        //     value: function (searchString) {
        //         const result = this.cache.find(custDetail => {
        //             return custDetail.invoice.includes(searchString) ||
        //                    custDetail.delivery.includes(searchString)
        //         })
        //         return result
        //     }
        // },
        // "reserve": {
        //     value: function (delivery, key) {
        //         delivery.employmentEnd = Date.now()

        //         return $http({
        //             method: "PUT",
        //             url: `https://purchase-portage.firebaseio.com/schedule/${key}/.json`,
        //             data: delivery
        //         })
        //     }
        // },
        // "reschedule": {
        //     value: function (delivery, key) {
        //         delivery.employmentEnd = Date.now()

        //         return $http({
        //             method: "PUT",
        //             url: `https://purchase-portage.firebaseio.com/schedule/${key}/.json`,
        //             data: delivery
        //         })
        //     }
        // }
    })
})