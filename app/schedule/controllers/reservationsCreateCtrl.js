angular
.module("purchase-portage")
.controller("reservationsCreateCtrl", function ($scope, reservationsFactory) {
    let dat = new Date();
    Date.prototype.addDays = function(days) {
        let dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
      }
      let tomorrow = dat.setHours(24,0,0,0)
$scope.tomorrow = {
    "weekDay": tomorrow.getDay(),
    "month": tomorrow.getMonth(),
    "cardinalDate": tomorrow.getDate(),
    "year": tomorrow.getFullYear()
}

$scope.searchEnd = {}

    // Tied to the search button
    $scope.searchAvailability = function () {
          $scope.searchEnd = {
              "month": $scope.endDate.getMonth(),
              "cardinalDate": $scope.endDate.getDate(),
              "year": $scope.endDate.getFullYear()
          }
            //   set $scope.days to be an empty array
            $scope.days = []
            let deliveries = []

            //   determine the number of days between tomorrow and the end date to be searched
            let searchDays = Math.floor((Date.UTC($scope.searchEnd.year, $scope.searchEnd.month, $scope.searchEnd.cardinalDate) - Date.UTC($scope.tomorrow.year, $scope.tomorrow.month, $scope.tomorrow.cardinalDate) ) /(1000 * 60 * 60 * 24))
        
            // function to make an array of reservationIDs between tomorrow and the search end date. From that array sum the labor time of the invoices related sharing the same month and cardinal day. Then display the available time remaining for each day (480 - 60 - 60 - sumoflabor). 480-s the 8 hour delivery day. 60 minutes is the lunch time. 60 minutes is the allowed 30 minute drive time to and from the delivery.
            reservationsFactory.list().then ( data => {
                let deliveryData = []
                deliveryData = data
                let monthDeliveries = []
                deliveryData.forEach(delivery => {
                    
                });
                if (deliveryData.month >= $scope.tomorrow.month && deliveryData.month <= $scope.searchEnd.month) {
                    push
                }


                    }
                }
            })
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
