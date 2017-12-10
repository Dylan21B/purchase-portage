angular
.module("purchase-portage")
.controller("reservationsCreateCtrl", function ($scope, reservationsFactory) {
    let dat = new Date();
    Date.prototype.addDays = function(days) {
        let dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
      }
      let tomorrow = dat.addDays(1)
$scope.tomorrow = {
    "weekDay": tomorrow.getDay(),
    "month": tomorrow.getMonth(),
    "cardinalDate": tomorrow.getDate(),
    "year": tomorrow.getFullYear()
}

// $scope.endDate = {}

    // Tied to the search button
    $scope.searchAvailability = function () {
          const searchEnd = $scope.endDate
        
        for (let i = 0; i < 2; i++) {
            let currentDate = dat.addDays(i+1)
            let year = currentDate.getFullYear()
            let month = currentDate.getMonth()
            let cardinalDate = currentDate.getDate()
            let weekDay = currentDate.getDay()
    }

    $scope.scheduleDelivery = function () {
        const appointment = {
            "timeSlotID": $scope.timeSlot.id,
            "invoiceID": $scope.invoices.id
        }
        /**
         * Use the factory to POST to Firebase then clear the fields
         */
        reservationsFactory.add(appointment).then(() => {
            /**
            * If POST was successful, use alert to inform user the transaction was successful
            */
            alert("DELIVERY HAS BEEN ADDED TO SCHEDULE")

        })
    }
})
