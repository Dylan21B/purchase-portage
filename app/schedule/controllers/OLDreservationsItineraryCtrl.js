angular
.module("purchase-portage")
.controller("reservationsItineraryCtrl", function ($scope, $routeParams, timeSlotFactory, reservationsFactory, invoiceFactory) {
    // pull the data of the invoice in local storage to display at the top of the pageYOffset
    $scope.focusInvoice = (JSON.parse(localStorage.getItem('focusInvoice')))
    // need to pull delivery list then filter to the day in the URL
    // sort the deliveries by timeSlot (start time)
    // loop through all the time slots in a day
    // nest a loop through the deliveries in the day
    // if the time slot matches the 30 minutes less than the timeslot of a delivery, mark it and the subsequent timeslots for the duration of the delivery plus 30 more minutes occupied by the invoice / city and set the time slot counter forward to the next timeslot
    // the schedule button only appears when the labor of the current ticket to be delivered plus 60 minutes fits in the gap in availability
    // if the schedule button immediately next to a delivery is selected, the timeslot 30 minutes before or after the nearest delivery is assigned as the delivery's timeslot
    let totalLaborTime = parseInt($scope.focusInvoice.labor)
    // determine how many divs need to be highlighted in mouseover due to the totalLaborTime
    let divSize = totalLaborTime/15
    const slot1El = document.getElementById("slot1")
    const slot2El = document.getElementById("slot2")
    const slot3El = document.getElementById("slot3")
    const slot4El = document.getElementById("slot4")
    const slot5El = document.getElementById("slot5")
    const slot6El = document.getElementById("slot6")
    const slot7El = document.getElementById("slot7")
    const slot8El = document.getElementById("slot8")
    const slot9El = document.getElementById("slot9")
    const slot10El = document.getElementById("slot10")
    const slot11El = document.getElementById("slot11")
    const slot12El = document.getElementById("slot12")
    const slot13El = document.getElementById("slot13")
    const slot14El = document.getElementById("slot14")
    const slot15El = document.getElementById("slot15")
    const slot16El = document.getElementById("slot16")
    const slot17El = document.getElementById("slot17")
    const slot18El = document.getElementById("slot18")
    const slot19El = document.getElementById("slot19")
    const slot20El = document.getElementById("slot20")
    const slot21El = document.getElementById("slot21")
    const slot22El = document.getElementById("slot22")
    const slot23El = document.getElementById("slot23")
    const slot24El = document.getElementById("slot24")
    const slot25El = document.getElementById("slot25")
    const slot26El = document.getElementById("slot26")
    const slot27El = document.getElementById("slot27")
    const slot28El = document.getElementById("slot28")
    const slot29El = document.getElementById("slot29")
    const slot30El = document.getElementById("slot30")
    const slot31El = document.getElementById("slot31")
    const slot32El = document.getElementById("slot32")
    const slot33El = document.getElementById("slot33")
    const slot34El = document.getElementById("slot34")
    const slot35El = document.getElementById("slot35")
    const slot36El = document.getElementById("slot36")
    let testDate = $routeParams.date
    testDate = parseInt(testDate)
    let newDate = new Date(testDate)
    newDate.setHours(0,0,0,0)
    let newDateInt = Date.parse(newDate)
    let dayView = []
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
        // let addLabor = function (start, minutesToAdd) {
        //     let stopTime = start + (minutesToAdd * 60000)
        //     return stopTime
        // }

        // Pull the timeSlot list then filter it to the same day as the $routeParams
        timeSlotFactory.list().then(calendar => {
            
            dayView = calendar.filter(dateViewed)
            
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
                            "action": segment.id
                        }
                        
                        dayIntervals.push(spot)
                        
                    });
                    
                    $scope.intervalArray = dayIntervals
                    
                })
            })

        })

        // function tied to book delivery button
        $scope.bookDelivery = function (appointment) {
            console.log("appointment=",appointment)
        // Get the passed in timeSlot.id's dateTime value and capture it in newStart
        let newStart = dayView(appointment).dateTime
        // use the reservationsFactory to post a new delivery with the newStart as the dateTime
        reservationsFactory.add(newStart).then(() => {
        alert("DELIVERY BOOKED")

        // function is tied to mouse enter event
        $scope.brightLabor = function (divNum) {
            switch (divNum) {
                case 1:
                    slot1El.classList.add("bright")
                    break;
                case 2:
                    slot2El.classList.add("bright")
                    break;
                case 3:
                    slot3El.classList.add("bright")
                    break;
                case 4:
                    slot4El.classList.add("bright")
                    break;
                case 5:
                    slot5El.classList.add("bright")
                    break;
                case 6:
                    slot6El.classList.add("bright")
                    break;
                case 7:
                    slot7El.classList.add("bright")
                    break;
                case 8:
                    slot8El.classList.add("bright")
                    break;
                case 9:
                    slot9El.classList.add("bright")
                    break;
                case 10:
                    slot10El.classList.add("bright")
                    break;
                case 11:
                    slot11El.classList.add("bright")
                    break;
                case 12:
                    slot12El.classList.add("bright")
                    break;
                case 13:
                    slot13El.classList.add("bright")
                    break;
                case 14:
                    slot14El.classList.add("bright")
                    break;
                case 15:
                    slot15El.classList.add("bright")
                    break;
                case 16:
                    slot16El.classList.add("bright")
                    break;
                case 17:
                    slot17El.classList.add("bright")
                    break;
                case 18:
                    slot18El.classList.add("bright")
                    break;
                case 19:
                    slot19El.classList.add("bright")
                    break;
                case 20:
                    slot20El.classList.add("bright")
                    break;
                case 21:
                    slot21El.classList.add("bright")
                    break;
                case 22:
                    slot22El.classList.add("bright")
                    break;
                case 23:
                    slot23El.classList.add("bright")
                    break;
                case 24:
                    slot24El.classList.add("bright")
                    break;
                case 25:
                    slot25El.classList.add("bright")
                    break;
                case 26:
                    slot26El.classList.add("bright")
                    break;
                case 27:
                    slot27El.classList.add("bright")
                    break;
                case 28:
                    slot28El.classList.add("bright")
                    break;
                case 29:
                    slot29El.classList.add("bright")
                    break;
                case 30:
                    slot30El.classList.add("bright")
                    break;
                case 31:
                    slot31El.classList.add("bright")
                    break;
                case 32:
                    slot32El.classList.add("bright")
                    break;
                case 33:
                    slot33El.classList.add("bright")
                    break;
                case 34:
                    slot34El.classList.add("bright")
                    break;
                case 35:
                    slot35El.classList.add("bright")
                    break;
                case 36:
                    slot36El.classList.add("bright")
                    break;
            }
        }

        // function is tied to a mouse leave event
        $scope.dimLabor = function (divNum) {
            switch (divNum) {
                case 1:
                    slot1El.classList.remove("bright")
                    break;
                case 2:
                    slot2El.classList.remove("bright")
                    break;
                case 3:
                    slot3El.classList.remove("bright")
                    break;
                case 4:
                    slot4El.classList.remove("bright")
                    break;
                case 5:
                    slot5El.classList.remove("bright")
                    break;
                case 6:
                    slot6El.classList.remove("bright")
                    break;
                case 7:
                    slot7El.classList.remove("bright")
                    break;
                case 8:
                    slot8El.classList.remove("bright")
                    break;
                case 9:
                    slot9El.classList.remove("bright")
                    break;
                case 10:
                    slot10El.classList.remove("bright")
                    break;
                case 11:
                    slot11El.classList.remove("bright")
                    break;
                case 12:
                    slot12El.classList.remove("bright")
                    break;
                case 13:
                    slot13El.classList.remove("bright")
                    break;
                case 14:
                    slot14El.classList.remove("bright")
                    break;
                case 15:
                    slot15El.classList.remove("bright")
                    break;
                case 16:
                    slot16El.classList.remove("bright")
                    break;
                case 17:
                    slot17El.classList.remove("bright")
                    break;
                case 18:
                    slot18El.classList.remove("bright")
                    break;
                case 19:
                    slot19El.classList.remove("bright")
                    break;
                case 20:
                    slot20El.classList.remove("bright")
                    break;
                case 21:
                    slot21El.classList.remove("bright")
                    break;
                case 22:
                    slot22El.classList.remove("bright")
                    break;
                case 23:
                    slot23El.classList.remove("bright")
                    break;
                case 24:
                    slot24El.classList.remove("bright")
                    break;
                case 25:
                    slot25El.classList.remove("bright")
                    break;
                case 26:
                    slot26El.classList.remove("bright")
                    break;
                case 27:
                    slot27El.classList.remove("bright")
                    break;
                case 28:
                    slot28El.classList.remove("bright")
                    break;
                case 29:
                    slot29El.classList.remove("bright")
                    break;
                case 30:
                    slot30El.classList.remove("bright")
                    break;
                case 31:
                    slot31El.classList.remove("bright")
                    break;
                case 32:
                    slot32El.classList.remove("bright")
                    break;
                case 33:
                    slot33El.classList.remove("bright")
                    break;
                case 34:
                    slot34El.classList.remove("bright")
                    break;
                case 35:
                    slot35El.classList.remove("bright")
                    break;
                case 36:
                    slot36El.classList.remove("bright")
                    break;
            }
        }
        })
    }
        
        
        
        
        
        
        
        
        
        // add labortime from the  and 60 minutes to starttime in timeSlot matching 
        //  }
    
        //     if ($scope.newInvoice.invoiceNum === undefined) {
        //         $scope.warning.invoice = "INVOICE # REQUIRED"
        //         return false
        //     } else {
    })