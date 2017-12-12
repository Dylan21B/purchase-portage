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
})