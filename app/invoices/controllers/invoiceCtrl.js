angular
.module("purchase-portage")
.controller("invoiceCtrl", function ($scope, $location, $routeParams, invoiceFactory) {
        /*
        This function is bound to an ng-click directive
        on the button in the view
        */
    // $scope.unscheduledDeliveries = () =>
    //     $location.url("/invoices/unscheduled")
    /*
    This function is bound to an ng-click directive
    on the button in the view
    */
    $scope.invoiceEntry = () =>
        $location.url("/invoices/add")
})