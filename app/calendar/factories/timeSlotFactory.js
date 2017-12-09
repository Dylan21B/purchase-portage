angular
.module("purchase-portage")
.factory("timeSlotFactory", function ($http) {
    return Object.create(null, {
        "append": {
            value: function (interval) {
                return $http({
                    method: "POST",
                    url: "https://purchase-portage.firebaseio.com/timeSlots/.json",
                    data: interval
                })
            }
        }
    })
})