angular
.module("purchase-portage")
.controller("invoiceListCtrl", function ($scope, invoiceFactory) {
    $scope.invoice = []
    let allInvoices = []

    /**
     * Use factory to get all employees from Firebase
     */
    invoiceFactory.list().then(data => {
        allInvoices = data
        let unscheduledInvoices = function(invoices) {
            return invoices.labor = 0
        }
        $scope.invoice = allinvoices.filter(unscheduledInvoices)

    })
})