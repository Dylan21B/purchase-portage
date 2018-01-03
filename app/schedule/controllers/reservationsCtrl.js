angular
    .module("purchase-portage")
    .controller("reservationsCtrl", function ($scope, $location, reservationsFactory, invoiceFactory) {
        $scope.invNeedDelivery = []
        $scope.day0Deliveries = []
        $scope.day1Deliveries = []
        $scope.day2Deliveries = []
        $scope.day3Deliveries = []
        $scope.day4Deliveries = []
        $scope.day5Deliveries = []
        $scope.day6Deliveries = []

        let allSales = []
        let allDeliveries = []
        let needDelivery = []
        let stillNeedDelivery = []
        let invoiceToRemove = ""
        let weekDeliveries = []

        // need to determine today and next 6 days in order to display
        // delivery schedules for those days

        let tDate = new Date();
        tDate.setHours(0, 0, 0, 0)
        Date.prototype.addDays = function (days) {
            let dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        }

        let eDate = tDate.addDays(6)
        let todayDate = Date.parse(tDate)
        let endDate = Date.parse(eDate)
        let delvDay0 = tDate
        let delvDay1 = tDate.addDays(1)
        let delvDay2 = tDate.addDays(2)
        let delvDay3 = tDate.addDays(3)
        let delvDay4 = tDate.addDays(4)
        let delvDay5 = tDate.addDays(5)
        let delvDay6 = eDate
        console.log("delvDay0=", delvDay0)
        function nameOfDay(num) {
            let nameDay = ""
            switch (num) {
                case 0:
                    nameDay = "Sunday"
                    break;
                case 1:
                    nameDay = "Monday"
                    break;
                case 2:
                    nameDay = "Tuesday"
                    break;
                case 3:
                    nameDay = "Wednesday"
                    break;
                case 4:
                    nameDay = "Thursday"
                    break;
                case 5:
                    nameDay = "Friday"
                    break;
                case 6:
                    nameDay = "Saturday"
                    break;
            }
            return nameDay
        }

        $scope.day0 = {
            "name": nameOfDay(delvDay0.getDay()),
            "hours": 360,
            "month": delvDay0.getMonth() + 1,
            "day": delvDay0.getDate()
        }
        $scope.day1 = {
            "name": nameOfDay(delvDay1.getDay()),
            "hours": 360,
            "month": delvDay1.getMonth() + 1,
            "day": delvDay1.getDate()
        }
        $scope.day2 = {
            "name": nameOfDay(delvDay2.getDay()),
            "hours": 360,
            "month": delvDay2.getMonth() + 1,
            "day": delvDay2.getDate()
        }
        $scope.day3 = {
            "name": nameOfDay(delvDay3.getDay()),
            "hours": 360,
            "month": delvDay3.getMonth() + 1,
            "day": delvDay3.getDate()
        }
        $scope.day4 = {
            "name": nameOfDay(delvDay4.getDay()),
            "hours": 360,
            "month": delvDay4.getMonth() + 1,
            "day": delvDay4.getDate()
        }
        $scope.day5 = {
            "name": nameOfDay(delvDay5.getDay()),
            "hours": 360,
            "month": delvDay5.getMonth() + 1,
            "day": delvDay5.getDate()
        }
        $scope.day6 = {
            "name": nameOfDay(delvDay6.getDay()),
            "hours": 360,
            "month": delvDay6.getMonth() + 1,
            "day": delvDay6.getDate()
        }


        //  function to remove the customer pick-up tickets
        function toBeDelivered(ticket) {
            return ticket.labor > 0
        }

        // function to remove tickets that have already been scheduled for delivery 
        function removeScheduled(ticket) {
            return ticket.id !== invoiceToRemove
        }

        // Use invoiceFactory to get all invoices from Firebase
        invoiceFactory.list().then(sales => {
            allSales = sales
            needDelivery = allSales.filter(toBeDelivered)

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
                        let appointmentDate = parseInt(stop.timeSlot)
                        console.log("appointmentDate=", appointmentDate, "todayDate=", todayDate, "endDate=", endDate)
                        if (appointmentDate >= todayDate && appointmentDate <= endDate) {
                            console.log("MEETS CONDITIONS")
                            weekDeliveries.push(stop)
                        }
                        // remove the scheduled invoice from the remaining array of tickets still needing to be delivered
                        stillNeedDelivery = needDelivery.filter(removeScheduled)
                    });
                    //sort weekDeliveries according to timeSlots
                    weekDeliveries.sort(function (a, b) { return a.timeSlot - b.timeSlot });
                    //
                    console.log("weekDeliveries=", weekDeliveries)
                    weekDeliveries.forEach(delivery => {
                        let date = new Date(delivery.timeSlot)
                        debugger
                        date.setHours(0, 0, 0, 0)
                        let d = Date.parse(date)
                        //
                        invoiceFactory.detail(delivery.invoiceID).then(invoice => {
                            let appointment = {
                                "lastName": invoice.lastName + ", ",
                                "city": invoice.city + ", ",
                                "invoiceNum": "INV#" + invoice.invoiceNum
                            }

                            if (d === Date.parse(delvDay0)) {
                                $scope.day0Deliveries.push(appointment)
                                $scope.day0.hours -= (parseInt(invoice.labor) + 60)
                            }
                            if (d === Date.parse(delvDay1)) {
                                $scope.day1Deliveries.push(appointment)
                                $scope.day1.hours -= (parseInt(invoice.labor) + 60)
                            }
                            if (d === Date.parse(delvDay2)) {
                                $scope.day2Deliveries.push(appointment)
                                $scope.day2.hours -= (parseInt(invoice.labor) + 60)
                            }
                            if (d === Date.parse(delvDay3)) {
                                $scope.day3Deliveries.push(appointment)
                                $scope.day3.hours -= (parseInt(invoice.labor) + 60)
                            }
                            if (d === Date.parse(delvDay4)) {
                                $scope.day4Deliveries.push(appointment)
                                $scope.day4.hours -= (parseInt(invoice.labor) + 60)
                            }
                            if (d === Date.parse(delvDay5)) {
                                $scope.day5Deliveries.push(appointment)
                                $scope.day5.hours = $scope.day5.hours - (invoice.labor + 60)
                            }
                            if (d === Date.parse(delvDay6)) {
                                $scope.day6Deliveries.push(appointment)
                                $scope.day6.hours -= (parseInt(invoice.labor) + 60)
                            }
                        })
                    });
                    // What to do with days that have no deliveries
                    
                    // if ($scope.day0Deliveries.length === 0) {
                    //     let appointment = {
                    //         "lastName": "NO",
                    //         "city": " DELIVERIES",
                    //         "invoiceNum": " SCHEDULED"
                    //     }
                    //     $scope.day0Deliveries.push(appointment)
                    // }
                    // if ($scope.day1Deliveries.length === 0) {
                    //     let appointment = {
                    //         "lastName": "NO",
                    //         "city": " DELIVERIES",
                    //         "invoiceNum": " SCHEDULED"
                    //     }
                    //     $scope.day1Deliveries.push(appointment)
                    // }
                    // if ($scope.day2Deliveries.length === 0) {
                    //     let appointment = {
                    //         "lastName": "NO",
                    //         "city": " DELIVERIES",
                    //         "invoiceNum": " SCHEDULED"
                    //     }
                    //     $scope.day2Deliveries.push(appointment)
                    // }
                    // if ($scope.day3Deliveries.length === 0) {
                    //     let appointment = {
                    //         "lastName": "NO",
                    //         "city": " DELIVERIES",
                    //         "invoiceNum": " SCHEDULED"
                    //     }
                    //     $scope.day3Deliveries.push(appointment)
                    // }
                    // if ($scope.day4Deliveries.length === 0) {
                    //     let appointment = {
                    //         "lastName": "NO",
                    //         "city": " DELIVERIES",
                    //         "invoiceNum": " SCHEDULED"
                    //     }
                    //     $scope.day4Deliveries.push(appointment)
                    // }
                    // if ($scope.day5Deliveries.length === 0) {
                    //     let appointment = {
                    //         "lastName": "NO",
                    //         "city": " DELIVERIES",
                    //         "invoiceNum": " SCHEDULED"
                    //     }
                    //     $scope.day5Deliveries.push(appointment)
                    // }
                    // if ($scope.day6Deliveries.length === 0) {
                    //     let appointment = {
                    //         "lastName": "NO",
                    //         "city": " DELIVERIES",
                    //         "invoiceNum": " SCHEDULED"
                    //     }
                    //     $scope.day6Deliveries.push(appointment)
                    // }
                }

                // set $scope.invNeedDelivery to equal the completely filtered array of stillNeedDelivery
                $scope.invNeedDelivery = stillNeedDelivery
                
            });
        })
    })
