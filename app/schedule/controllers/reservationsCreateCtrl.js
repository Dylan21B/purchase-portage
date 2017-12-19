angular
    .module("purchase-portage")
    .controller("reservationsCreateCtrl", function ($scope, $routeParams, timeSlotFactory, reservationsFactory, invoiceFactory) {
        let dat = new Date();
        Date.prototype.addDays = function (days) {
            let dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        }
        let tomorrow = dat.addDays(1)
        tomorrow.setHours(0, 0, 0, 0)
        $scope.tomorrow = {
            "weekDay": tomorrow.getDay(),
            "month": tomorrow.getMonth(),
            "cardinalDate": tomorrow.getDate(),
            "year": tomorrow.getFullYear()
        }
        const gapResultsEl = document.getElementById("gapResults")
        $scope.searchEnd = {}
        $scope.days = []

        // Pull the details from the invoice by identifying the invoice from the URL
        invoiceFactory.detail($routeParams.invoiceID).then(invoice => {
            let completeInvoice = invoice
            completeInvoice.invoiceID = $routeParams.invoiceID
            $scope.invoice = invoice

            // put invoice into local storage to use in subsequent partials
            localStorage.setItem('focusInvoice', JSON.stringify($scope.invoice));
        })

        // Tied to the search button
        $scope.searchAvailability = function () {
            $scope.searchEnd = {
                "month": $scope.endDate.getMonth(),
                "cardinalDate": $scope.endDate.getDate(),
                "year": $scope.endDate.getFullYear()
            }
            //   determine the number of days between tomorrow and the end date to be searched
            let searchDays = (Math.floor((Date.UTC($scope.searchEnd.year, $scope.searchEnd.month, $scope.searchEnd.cardinalDate) - Date.UTC($scope.tomorrow.year, $scope.tomorrow.month, $scope.tomorrow.cardinalDate)) / (1000 * 60 * 60 * 24)))+1

            // function to make an array of reservationIDs between tomorrow and the search end date. From that array sum the labor time of the invoices related sharing the same month and cardinal day. Then display the available time remaining for each day (480 - 60 - 60 - sumoflabor). 480-s the 8 hour delivery day. 60 minutes is the lunch time. 60 minutes is the allowed 30 minute drive time to and from the delivery.
            invoiceFactory.list().then(sales => {
                let salesData = {}
                salesData = sales

                // timeSlotFactory.list().then(calendar => {
                //     let timeSlotCalendar = {}
                //     timeSlotCalendar = calendar

                    reservationsFactory.list().then(data => {
                        let deliveryData = data

                        for (let i = 0; i < searchDays; i++) {
                            let currentDay = tomorrow.addDays(i)
                            let dayName = ""
                            switch (currentDay.getDay()) {
                                case 0:
                                    dayName = "Sunday"
                                    break;
                                case 1:
                                    dayName = "Monday"
                                    break;
                                case 2:
                                    dayName = "Tuesday"
                                    break;
                                case 3:
                                    dayName = "Wednesday"
                                    break;
                                case 4:
                                    dayName = "Thursday"
                                    break;
                                case 5:
                                    dayName = "Friday"
                                    break;
                                case 6:
                                    dayName = "Saturday"
                                    break;
                            }
                            let month = (currentDay.getMonth())+1
                            let dayNumber = currentDay.getDate()
                            let day = {
                                "date": currentDay.getTime(),
                                "dayOfWeek": dayName,
                                "month": month,
                                "dayNumber": dayNumber,
                                "availableTime": 360
                            }
                            if (deliveryData === "Currently no tickets are scheduled for delivery.") {
                                console.log(deliveryData)
                            } else {

                                deliveryData.forEach(delivery => {
                                    let checkInvoice = salesData(delivery.invoiceID)
                                    let checkFullDay = deliveryData(delivery.timeSlotID)
                                    let checkShortDay = checkFullDay.setHours(0, 0, 0, 0)

                                    if (checkShortDay.dateTime === currentDay) {
                                        day.availableTime -= checkInvoice.labor
                                    }
                                })
                            }
                            $scope.days.push(day)
                            // Need to convert day data into what the user can understand when displayed. Day needs to be the name of the day. Convert the labor time into hours and minutes
                        }
                        gapResultsEl.classList.remove("hidden")
                    })
                })
        }
    })
    //     $scope.scheduleDelivery = function () {
    //         const appointment = {
    //             "timeSlotID": $scope.timeSlot.id,
    //             "invoiceID": $scope.invoices.id
    //         }
    //         /**
    //          * Use the factory to POST to Firebase then clear the fields
    //          */
    //         reservationsFactory.add(appointment).then(() => {
    //             /**
    //             * If POST was successful, use alert to inform user the transaction was successful
    //             */
    //             alert("DELIVERY HAS BEEN ADDED TO SCHEDULE")

    //         })
    // }
