angular
.module("purchase-portage")
.controller("reservationsItineraryCtrl", function ($scope, $routeParams, timeSlotFactory, reservationsFactory, invoiceFactory) {
    // need to pull delivery list then filter to the day in the URL
    // sort the deliveries by timeSlot (start time)
    // loop through all the time slots in a day
    // nest a loop through the deliveries in the day
    // if the time slot matches the 30 minutes less than the timeslot of a delivery, mark it and the subsequent timeslots for the duration of the delivery plus 30 more minutes occupied by the invoice / city and set the time slot counter forward to the next timeslot
    // the schedule button only appears when the labor of the current ticket to be delivered plus 60 minutes fits in the gap in availability
    // if the schedule button immediately next to a delivery is selected, the timeslot 30 minutes before or after the nearest delivery is assigned as the delivery's timeslot
    
    let testDate = $routeParams.date
    testDate = parseInt(testDate)
    let newDate = new Date(testDate)
    newDate.setHours(0,0,0,0)
    let newDateInt = Date.parse(newDate)
    
    let startAmPm = ""
    let endAmPm = ""
        let dateDayName = ""
        let dateMonthName = ""
        let dateNum = newDate.getDate() // Need to confirm whether this needs 1 added to it in order to display correctly
        let dateYear = newDate.getFullYear() // Need to confirm whether this needs 1 added to it in order to display correctly

        let testDelivery = ""

        let dayIntervals = []

        switch (newDate.getDay()) {
            case 0:
                dateDayName = "Sunday"
                break;
            case 1:
                dateDayName = "Monday"
                break;
            case 2:
                dateDayName = "Tuesday"
                break;
            case 3:
                dateDayName = "Wednesday"
                break;
            case 4:
                dateDayName = "Thursday"
                break;
            case 5:
                dateDayName = "Friday"
                break;
            case 6:
                dateDayName = "Saturday"
                break;
        }

        switch (newDate.getMonth()) {
            case 0:
                dateMonthName = "January"
                break;
            case 1:
                dateMonthName = "February"
                break;
            case 2:
                dateMonthName = "March"
                break;
            case 3:
                dateMonthName = "April"
                break;
            case 4:
                dateMonthName = "May"
                break;
            case 5:
                dateMonthName = "June"
                break;
            case 6:
                dateMonthName = "July"
                break;
            case 7:
                dateMonthName = "August"
                break;
            case 8:
                dateMonthName = "September"
                break;
            case 9:
                dateMonthName = "October"
                break;
            case 10:
                dateMonthName = "November"
                break;
            case 11:
                dateMonthName = "December"
                break;
        }

        // Create a dateObject for displaying the date on the page
        const dateObject = {
            "dayOfWeek": dateDayName,
            "month": dateMonthName,
            "day": dateNum,
            "year": dateYear
        }

        $scope.date = dateObject
        
        // Function to filter out time slots with same date as the $routeParams of this page
        function dateViewed(segment) {
            let segmentDate = new Date(parseInt(segment.dateTime))
            segmentDate.setHours(0, 0, 0, 0)
            segmentDate = Date.parse(segmentDate)
            
            
            if (segmentDate === newDateInt) {
                return true
            } else {
                return false
            }
        }

        // function to see if the timeSlotID of the current reservation matches the current timeSlot in the loop
        function isDelivery(testAppointment) {
            if (testAppointment.timeSlotID === testDelivery) {
                return true
            } else {
                return false
            }
        }

        // function to add minutes to a timeSlot start time to get an end time (this will affect the hour component of the time too)
        let addLabor = function (start, minutesToAdd) {
            let stopTime = start + (minutesToAdd * 60000)
            return stopTime
        }

        // Pull the timeSlot list then filter it to the same day as the $routeParams
        timeSlotFactory.list().then(calendar => {
            
            let dayView = calendar.filter(dateViewed)
            
            // pull a list of all invoices
            invoiceFactory.list().then(sales => {
                let salesTickets = sales

                // pull a list of all reservations
                reservationsFactory.list().then(deliveries => {
                    let deliveryData = deliveries
                    // loop through the timeSlots in dayView
                    
                    
                    dayView.forEach(segment => {
                        testDelivery = segment.id
                        let segmentDateObj = new Date(parseInt(segment.dateTime))
                        )
                        let startHour = parseInt(segmentDateObj.getHours())

                        if (startHour >= 12) {
                            startAmPm = "pm"
                        } else if (startHour < 12) {
                            startAmPM = "am"
                        } 
                        let startMin = segmentDateObj.getMinutes()
                        if (startMin === 0) {
                            startMin = "00"
                        }
                        let endTime = 0
                        let endHour = 0
                        let endMin = 0
                        let occupantString = ""
                        let actionButton = ""
                        if (deliveryData === "Currently no tickets are scheduled for delivery.") {
                            console.log(deliveryData)
                            appointment = "undefined"
                        } else {
                            let appointment = Array.deliveryData.find(isDelivery)
                        }
                        if (appointment === "undefined") {
                            let segmentDateInt = parseInt(segmentDateObj)
                            let segmentEndDateInt = addLabor(segmentDateInt, 15)
                            let newDateTime = new Date(segmentEndDateInt)
                            endTime = newDateTime
                            endHour = endTime.getHours()
                            if (endHour < 12) {
                                endAmPm = "am"
                            } else {
                                endAmPM = "pm"
                            }
                            endMin = endTime.getMinutes()
                            if (endMin === 0) {
                                endMin = "00"
                            }
                            occupantString = "OPEN"
                            actionButton = "NO"
                            // Need to activate schedule button
                        } else {
                            let segmentDateInt = parseInt(segmentDateObj)
                            let segmentEndDateInt = addLabor(segmentDateInt, appointment.labor)
                            let newDateTime = new Date(segmentEndDateInt)
                            endTime = newDateTime
                            endHour = endTime.getHours()
                            if (endHour < 12) {
                                endAmPm = "am"
                            } else {
                                endAmPM = "pm"
                            }
                            endMin = endTime.getMinutes()
                            if (endMin === 0) {
                                endMin = "00"
                            }
                            occupantString = salesTickets(appointment.invoiceID).invoiceNum
                            actionButton = "YES"
                        }
                        let spot = {
                            "startHour": startHour,
                            "startMin": startMin,
                            "startAmPm": startAmPm,
                            "endHour": endHour,
                            "endMin": endMin,
                            "endAmPm": endAmPm,
                            "occupant": occupantString,
                            "action": actionButton
                        }
                        
                        dayIntervals.push(spot)
                        
                    });
                    
                    $scope.intervalArray = dayIntervals
                    
                })
            })

        })
    })