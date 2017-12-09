angular
.module("purchase-portage")
.controller("timeSlotCtrl", function ($scope, timeSlotFactory) {
    /**
     * upon button click, intervals are added to the timeSlots database in Firebase
     */
    
    $scope.appendTimeSlot = function () {
        Date.prototype.addDays = function(days) {
            let dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
          }
          
          let dat = new Date();
        
        for (let i = 0; i < 2; i++) {
            let currentDate = dat.addDays(i+1)
            let year = currentDate.getFullYear()
            let month = currentDate.getMonth()
            let cardinalDate = currentDate.getDate()
            let weekDay = currentDate.getDay()
            switch (weekDay) {
                case 0:
                dayName = "Sunday";
                break;
                case 1:
                    dayName = "Monday";
                    break;
                case 2:
                    dayName = "Tuesday";
                    break;
                case 3:
                    dayName = "Wednesday";
                    break;
                case 4:
                    dayName = "Thursday";
                    break;
                case 5:
                    dayName = "Friday";
                    break;
                case 6:
                    dayName = "Saturday";
            }
            for (let j = 0; j <= 35; j++) {
                switch (j) {
                    case 0:
                        segment = "8:00am - 8:15am";
                        break;
                    case 1:
                        segment = "8:15am - 8:30am";
                        break;
                    case 2:
                        segment = "8:30am - 8:45am";
                        break;
                    case 3:
                        segment = "8:45am - 9:00am";
                        break;
                    case 4:
                        segment = "9:00am - 9:15am";
                        break;
                    case 5:
                        segment = "9:15am - 9:30am";
                        break;
                    case 6:
                        segment = "9:30am - 9:45am";
                        break;
                    case 7:
                        segment = "9:45am - 10:00am";
                        break;
                    case 8:
                        segment = "10:00am - 10:15am";
                        break;
                    case 9:
                        segment = "10:15am - 10:30am";
                        break;
                    case 10:
                        segment = "10:30am - 10:45am";
                        break;
                    case 11:
                        segment = "10:45am - 11:00am";
                        break;
                    case 12:
                        segment = "11:00am - 11:15am";
                        break;
                    case 13:
                        segment = "11:15am - 11:30am";
                        break;
                    case 14:
                        segment = "11:30am - 11:45am";
                        break;
                    case 15:
                        segment = "11:45am - 12:00pm";
                        break;
                    case 16:
                        segment = "12:00pm - 12:15pm";
                        break;
                    case 17:
                        segment = "12:15pm - 12:30pm";
                        break;
                    case 18:
                        segment = "12:30pm - 12:45pm";
                        break;
                    case 19:
                        segment = "12:45pm - 1:00pm";
                        break;
                    case 20:
                        segment = "1:00pm - 1:15pm";
                        break;
                    case 21:
                        segment = "1:15pm - 1:30pm";
                        break;
                    case 22:
                        segment = "1:30pm - 1:45pm";
                        break;
                    case 23:
                        segment = "1:45pm - 2:00pm";
                        break;
                    case 24:
                        segment = "2:00pm - 2:15pm";
                        break;
                    case 25:
                        segment = "2:15pm - 2:30pm";
                        break;
                    case 26:
                        segment = "2:30pm - 2:45pm";
                        break;
                    case 27:
                        segment = "2:45pm - 3:00pm";
                        break;
                    case 28:
                        segment = "3:00pm - 3:15pm";
                        break;
                    case 29:
                        segment = "3:15pm - 3:30pm";
                        break;
                    case 30:
                        segment = "3:30pm - 3:45pm";
                        break;
                    case 31:
                        segment = "3:45pm - 4:00pm";
                        break;
                    case 32:
                        segment = "4:00pm - 4:15pm";
                        break;
                    case 33:
                        segment = "4:15pm - 4:30pm";
                        break;
                    case 34:
                        segment = "4:30pm - 4:45pm";
                        break;
                    case 35:
                        segment = "4:45pm - 5:00pm";
                        break;
                    
                }
                const timeInterval = {
                    "year": year,
                    "month": month,
                    "dayOfWeek": dayName,
                    "dayNumber": cardinalDate,
                    "timeSegment": segment
                }
                /**
                 * Use the factory to POST to Firebase
                 */
                console.log(timeInterval)
                timeSlotFactory.append(timeInterval).then(() => {
                    alert("2 days of time slots appended to timeSlots database.")
                    
                })
            }
        }
    }
})
