angular
.module("purchase-portage")
.controller("invoiceDetailCtrl",
    function ($scope, $location, $routeParams, invoiceFactory) {
        $scope.invoice = {}

        /**
         * Use the factory to get the details of a single invoice
         */
        invoiceFactory.detail($routeParams.invoiceId).then(invoice => {
            $scope.invoice = invoice
        })

        /*
        This function is bound to an ng-click directive
        on the button in the view
        */
        // $scope.edit = () =>
        //     invoiceFactory.pickup($scope.invoice, $routeParams.invoiceId).then(() =>
        //         $location.url("/"))

        /*
        This function is bound to an ng-click directive
        on the button in the view
        */
        $scope.cancelSale = () =>
            invoiceFactory.cancelSale($routeParams.invoiceId).then(() =>
                $location.url("/invoices/main"))
    }
)