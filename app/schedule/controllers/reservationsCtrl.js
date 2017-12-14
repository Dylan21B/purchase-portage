angular
.module("purchase-portage")
.controller("reservationsCtrl", function ($scope, $location, reservationsFactory, invoiceFactory) {
    $scope.invNeedDelivery = []
    let allSales = []
    let allDeliveries = []
    let needDelivery = []
    let stillNeedDelivery = []
    let invoiceToRemove = ""

    //  function to remove the customer pick-up tickets
    function toBeDelivered (ticket) {
        return ticket.labor > 0
    }

    // function to remove tickets that have already been scheduled for delivery 
    function removeScheduled (ticket) {
        return ticket.id !== invoiceToRemove
    }

    // Use invoiceFactory to get all invoices from Firebase
    invoiceFactory.list().then(sales => {
        allSales = sales
        let needDelivery = allSales.filter(toBeDelivered)

        // check to see if there are any reservations
        // Use reservationsFactory to get all reservations from Firebase
        reservationsFactory.list().then(deliveries => {
            allDeliveries = deliveries
            if (allDeliveries === "Currently no tickets are scheduled for delivery.") {
                stillNeedDelivery = needDelivery
                } else {

                    // Cycle through all the reservations/deliveries
                    allDeliveries.forEach(stop => {
                        // set the invoice to be removed to be the current resevation in cycle
                        invoiceToRemove = stop.invoiceID
                        // remove the scheduled invoice from the remaining arrayu of tickets still needing to be delivered
                        stillNeedDelivery = needDelivery.filter(removeScheduled)             
                    });
                }
        
            // set $scope.invNeedDelivery to equal the completely filtered array of stillNeedDelivery
            $scope.invNeedDelivery = stillNeedDelivery               
        });
    })
})
