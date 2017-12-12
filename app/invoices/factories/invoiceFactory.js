angular
    .module("purchase-portage")
    .factory("invoiceFactory", function ($http) {
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            "add": {
                value: function (invoice) {
                    let convDate = invoice.purchaseDate.toDateString()
                    invoice.purchaseDate = convDate
                    return $http({
                        method: "POST",
                        url: "https://purchase-portage.firebaseio.com/invoices/.json",
                        data: invoice
                    })
                }
            },
            // "edit": {
            //     value: function (invoice, key) {
            //         return $http({
            //             method: "GET",
            //             url: `https://purchase-portage.firebaseio.com/invoices/${key}/.json`,
            //             data: invoice
            //         })
            //     }
            // },
            "cancelSale": {
                value: function (key) {
                    return $http({
                        method: "DELETE",
                        url: `https://purchase-portage.firebaseio.com/invoices/${key}/.json`
                    })
                }
            },
            "detail": {
                value: function (key) {
                    return $http({
                        method: "GET",
                        url: `https://purchase-portage.firebaseio.com/invoices/${key}/.json`
                    }).then(response => {
                        return response.data
                    })
                }
            },
            "list": {
                value: function () {
                    return $http({
                        method: "GET",
                        url: "https://purchase-portage.firebaseio.com/invoices/.json",
                    }).then(response => {
                        const sales = response.data

                        // capture the Firebase object of objects as an array
                        this.cache = Object.keys(sales).map(key => {
                            sales[key].id = key
                            return sales[key]
                        })
                        return this.cache
                    })
                }
            }
        })
    })
