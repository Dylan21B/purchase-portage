angular
.module("purchase-portage")
.controller("invoiceCreateCtrl", function ($scope, invoiceFactory) {
    $scope.newInvoice = {}
    $scope.newInvoice.labor = 0
    $scope.laborHours = "CUSTOMER PICKUP"
    $scope.laborMinutes = " "
    $scope.warning = {
        "invoice": "",
        "date": "",
        "first": "",
        "last": "",
        "street": "",
        "city": "",
        "state": "",
        "zip": "",
        "phone": "",
        "email": ""
    }

    // Tied to the + button and increments the labor time up by 15 minutes 
    $scope.addLaborTime = function () {
        let newLabor = $scope.newInvoice.labor + 15

        // tests new labor amount to make sure it is less than 8 hours
        if (newLabor <= 480) {
            // sets the invoice labor time to be the new value
            $scope.newInvoice.labor = newLabor
            // computes the minutes of the labor time after hours are removed for display purposes
            $scope.laborMinutes = $scope.newInvoice.labor % 60
            // converts the minutes of the labor time into hours for display purposes
            $scope.laborHours = ($scope.newInvoice.labor - $scope.laborMinutes)/60
        } else {
            // does not allow labor time to go greater than 8 hours total
            $scope.newInvoice.labor = 480
        }

        // if labor time is 8 hours the labor display reflexs this is a maximum value
        if ($scope.newInvoice.labor === 480) {
            $scope.laborHours = "8 hours MAXIMUM"
            $scope.laborMinutes = " "
        // if labor time is 0 minutes the labor display reflexs this is a customer pick-up
        } else if ($scope.newInvoice.labor === 0) {
            $scope.laborHours = "CUSTOMER PICK-UP"
            $scope.laborMinutes = " "
        } else {
            // if there are whole hours in the labor time add hours to display
            if ($scope.laborHours >= 1) {
            $scope.laborHours += " hours"
            } else {
                $scope.laborHours = " "
            }
            // if there are minutes remaining after whole hours displayed then add minute display
            if ($scope.laborMinutes >= 15) {
                $scope.laborMinutes += " minutes"
            } else {
                $scope.laborMinutes = " "
            }
        }
    }

    // Tied to the - button and increments the labor time down by 15 minutes
    $scope.minusLaborTime = function () {
        let newLabor = $scope.newInvoice.labor - 15
        
        // tests new labor amount to make sure it is more than 0 minutes
        if (newLabor > 0) {
            // sets the invoice labor time to be the new value
            $scope.newInvoice.labor = newLabor
            // computes the minutes of the labor time after hours are removed for display purposes
            $scope.laborMinutes = $scope.newInvoice.labor % 60
            // converts the minutes of the labor time into hours for display purposes
            $scope.laborHours = ($scope.newInvoice.labor - $scope.laborMinutes)/60    
        } else {
            // does not allow labor time to go less than 0 minutes total
            $scope.newInvoice.labor = 0         
        }

        // if labor time is 8 hours the labor display reflexs this is a maximum value
        if ($scope.newInvoice.labor === 480) {
            $scope.laborHours = "8 hours MAXIMUM"
            $scope.laborMinutes = " "
        // if labor time is 0 minutes the labor display reflexs this is a customer pick-up
        } else if ($scope.newInvoice.labor === 0) {
            $scope.laborHours = "CUSTOMER PICK-UP"
            $scope.laborMinutes = " "
        } else {
            // if there are whole hours in the labor time add hours to display
            if ($scope.laborHours >= 1) {
                $scope.laborHours += " hours"
                } else {
                    $scope.laborHours = " "
                }
            // if there are minutes remaining after whole hours displayed then add minute display
            if ($scope.laborMinutes >= 15) {
                $scope.laborMinutes += " minutes"
            } else {
                $scope.laborMinutes = " "
            }
        }
    }

    // Tied to the Enter Invoice button - validate data fields then proceeds with adding invoice
    $scope.validateInvoice = function () {
        const phoneno = /^\d{10}$/
        const zipno = /^[0-9]{5}(?:-[0-9]{4})?$/

        if ($scope.newInvoice.invoiceNum === undefined) {
            $scope.warning.invoice = "INVOICE # REQUIRED"
            return false
        } else {
            $scope.warning.invoice = " "
        }
        if ($scope.newInvoice.purchaseDate === null) {
            $scope.warning.date = "PURCHASE DATE REQUIRED"
            return false
        } else {
            $scope.warning.date = " "
        }
        if ($scope.newInvoice.firstName === undefined) {
            $scope.warning.first = "FIRST NAME REQUIRED"
            return false
        } else {
            $scope.warning.first = " "
        }
        if ($scope.newInvoice.lastName === undefined) {
            $scope.warning.last = "LAST NAME REQUIRED"
            return false
        } else {
            $scope.warning.last = " "
        }
        if ($scope.newInvoice.street === undefined) {
            $scope.warning.street = "STREET ADDRESS REQUIRED"
            return false
        } else {
            $scope.warning.street = " "
        }
        if ($scope.newInvoice.city === undefined) {
            $scope.warning.city = "CITY REQUIRED"
            return false
        } else {
            $scope.warning.city = " "
        }
        if ($scope.newInvoice.state === undefined) {
            $scope.warning.state = "STATE REQUIRED"
            return false
        } else {
            $scope.warning.state = " "
        }
        if ($scope.newInvoice.zip === undefined || !($scope.newInvoice.zip.match(zipno))) {
            $scope.warning.zip = "ZIP CODE REQUIRED"
            return false
        } else {
            $scope.warning.zip = " "
        }
        if ($scope.newInvoice.phone === undefined || !($scope.newInvoice.phone.match(phoneno))) {
            $scope.warning.phone = "10 DIGIT (NUMERALS ONLY) PHONE NUMBER REQUIRED"
            return false
        } else {
            $scope.warning.phone = " "
        }
        if ($scope.newInvoice.email === undefined) {
            $scope.warning.email = "EMAIL REQUIRED"
            return false
        } else {
            $scope.warning.email = " "
        }

        const invoice = {
            "invoiceNum": $scope.newInvoice.invoiceNum,
            "purchaseDate": $scope.newInvoice.purchaseDate,
            "firstName": $scope.newInvoice.firstName,
            "lastName": $scope.newInvoice.lastName,
            "street": $scope.newInvoice.street,
            "city": $scope.newInvoice.city,
            "state": $scope.newInvoice.state,
            "zip": $scope.newInvoice.zip,
            "phone": $scope.newInvoice.phone,
            "email": $scope.newInvoice.email,
            "labor": $scope.newInvoice.labor
        }
        console.log(invoice)
        /**
         * Use the factory to POST to Firebase then clear the fields
         */
        invoiceFactory.add(invoice).then(() => {
            $scope.newInvoice.invoiceNum = ""
            $scope.newInvoice.purchaseDate = ""
            $scope.newInvoice.firstName = ""
            $scope.newInvoice.lastName = ""
            $scope.newInvoice.street = ""
            $scope.newInvoice.city = ""
            $scope.newInvoice.state = ""
            $scope.newInvoice.zip = ""
            $scope.newInvoice.phone = ""
            $scope.newInvoice.email = ""
            $scope.newInvoice.labor = ""
        })
    
        /**
         * If POST was successful, retrieve new list of invoices
         */
        .then(() => {
            alert("INVOICE SAVED")
        })  
    }
})