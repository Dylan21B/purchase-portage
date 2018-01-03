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
        let divSize = totalLaborTime / 15
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
        let startDelivery = 0
        let endDelivery = 0
        let testDate = $routeParams.date
        testDate = parseInt(testDate)
        let newDate = new Date(testDate)
        newDate.setHours(0, 0, 0, 0)
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

        //function to select correct elements by divsize
        function brightSize(start, end) {
            slot1El.classList.remove("bright")
            slot2El.classList.remove("bright")
            slot3El.classList.remove("bright")
            slot4El.classList.remove("bright")
            slot5El.classList.remove("bright")
            slot6El.classList.remove("bright")
            slot7El.classList.remove("bright")
            slot8El.classList.remove("bright")
            slot9El.classList.remove("bright")
            slot10El.classList.remove("bright")
            slot11El.classList.remove("bright")
            slot12El.classList.remove("bright")
            slot13El.classList.remove("bright")
            slot14El.classList.remove("bright")
            slot15El.classList.remove("bright")
            slot16El.classList.remove("bright")
            slot17El.classList.remove("bright")
            slot18El.classList.remove("bright")
            slot19El.classList.remove("bright")
            slot20El.classList.remove("bright")
            slot21El.classList.remove("bright")
            slot22El.classList.remove("bright")
            slot23El.classList.remove("bright")
            slot24El.classList.remove("bright")
            slot25El.classList.remove("bright")
            slot26El.classList.remove("bright")
            slot27El.classList.remove("bright")
            slot28El.classList.remove("bright")
            slot29El.classList.remove("bright")
            slot30El.classList.remove("bright")
            slot31El.classList.remove("bright")
            slot32El.classList.remove("bright")
            slot33El.classList.remove("bright")
            slot34El.classList.remove("bright")
            slot35El.classList.remove("bright")
            slot36El.classList.remove("bright")

            for (let i = start; i < end; i++) {
                if (i === 1) {
                    slot1El.classList.add("bright")
                } else if (i === 2) {
                    slot2El.classList.add("bright")
                } else if (i === 3) {
                    slot3El.classList.add("bright")
                } else if (i === 4) {
                    slot4El.classList.add("bright")
                } else if (i === 5) {
                    slot5El.classList.add("bright")
                } else if (i === 6) {
                    slot6El.classList.add("bright")
                } else if (i === 7) {
                    slot7El.classList.add("bright")
                } else if (i === 8) {
                    slot8El.classList.add("bright")
                } else if (i === 9) {
                    slot9El.classList.add("bright")
                } else if (i === 10) {
                    slot10El.classList.add("bright")
                } else if (i === 11) {
                    slot11El.classList.add("bright")
                } else if (i === 12) {
                    slot12El.classList.add("bright")
                } else if (i === 13) {
                    slot13El.classList.add("bright")
                } else if (i === 14) {
                    slot14El.classList.add("bright")
                } else if (i === 15) {
                    slot15El.classList.add("bright")
                } else if (i === 16) {
                    slot16El.classList.add("bright")
                } else if (i === 17) {
                    slot17El.classList.add("bright")
                } else if (i === 18) {
                    slot18El.classList.add("bright")
                } else if (i === 19) {
                    slot19El.classList.add("bright")
                } else if (i === 20) {
                    slot20El.classList.add("bright")
                } else if (i === 21) {
                    slot21El.classList.add("bright")
                } else if (i === 22) {
                    slot22El.classList.add("bright")
                } else if (i === 23) {
                    slot23El.classList.add("bright")
                } else if (i === 24) {
                    slot24El.classList.add("bright")
                } else if (i === 25) {
                    slot25El.classList.add("bright")
                } else if (i === 26) {
                    slot26El.classList.add("bright")
                } else if (i === 27) {
                    slot27El.classList.add("bright")
                } else if (i === 28) {
                    slot28El.classList.add("bright")
                } else if (i === 29) {
                    slot29El.classList.add("bright")
                } else if (i === 30) {
                    slot30El.classList.add("bright")
                } else if (i === 31) {
                    slot31El.classList.add("bright")
                } else if (i === 32) {
                    slot32El.classList.add("bright")
                } else if (i === 33) {
                    slot33El.classList.add("bright")
                } else if (i === 34) {
                    slot34El.classList.add("bright")
                } else if (i === 35) {
                    slot35El.classList.add("bright")
                } else if (i === 36) {
                    slot36El.classList.add("bright")
                }
            }
        }
        // function is tied to mouse enter event
        $scope.brightLabor = function (divNum) {

            console.log("divNum=", divNum)
            if (divNum === 1) {
                startDelivery = 1
                endDelivery = divSize + 5
            } else if (divNum === 2) {
                startDelivery = 1
                endDelivery = divSize + 4
            } else {
                if ((divNum + divSize + 2) >= 36) {
                    startDelivery = 36 - divSize - 4
                    endDelivery = 36
                } else {
                    startDelivery = divNum - 2
                    endDelivery = divNum + divSize + 2
                }
                console.log("startDelivery=", startDelivery, "endDelivery=", endDelivery)
                brightSize(startDelivery, endDelivery)
            }
        }
        // function tied to book clicking
        $scope.bookDelivery = function (appointment) {
            let newHour = Math.floor((appointment*15)/60)+8
            let newMin = (appointment*15)%60
            let newDelivery = newDate.setHours(newHour,newMin,0,0)
            let newReservation = {
                "timeSlot": newDelivery,
                "invoiceID": $scope.focusInvoice.invoiceID
            }
            
            // use the reservationsFactory to post a new delivery with the newStart as the dateTime
            reservationsFactory.add(newReservation).then((booking) => {
                let postDelivery = new Date(parseInt(booking.timeSlot))
                let pDel = postDelivery.toString('MM/dd/yy HH:mm:ss')
                alert("DELIVERY BOOKED FOR ", postDelivery)
            })
            
        }
    })