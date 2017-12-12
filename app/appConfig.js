angular.module("purchase-portage").constant("FIREBASE_CONFIG", {
    apiKey: "AIzaSyCI8UewDpfpejRAV_xvTsjbAuqOC9vRkrY",
    authDomain: "purchase-portage.firebaseapp.com",
    databaseURL: "https://purchase-portage.firebaseio.com",
    projectId: "purchase-portage",
    storageBucket: "purchase-portage.appspot.com",
    messagingSenderId: "616995006284"
})

angular.module("purchase-portage").run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG)
})

const isAuth = authFactory => new Promise ((resolve, reject) => {
    if (authFactory.isAuthenticated()){
        console.log("User is authenticated, resolve route promise")
        resolve()
    } else {
        console.log("User is not authenticated, reject route promise")
        reject()
    }
})


angular.module("purchase-portage").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes here
     */
    $routeProvider
        // .when("/", {
        //     templateUrl: "app/schedule/partials/main.html",
        //     controller: "scheduleCtrl",
        //     resolve: { isAuth }
        // })
        // .when("/schedule/main", {
        //     templateUrl: "app/schedule/partials/main.html",
        //     controller: "scheduleCtrl",
        //     resolve: { isAuth }
        // })
        .when("/calendar/setup", {
            templateUrl: "app/calendar/partials/setup.html",
            controller: "timeSlotCtrl",
            resolve: { isAuth }
        })
        .when('/invoices/main', {
            templateUrl: 'app/invoices/partials/main.html',
            controller: 'invoiceCtrl',
            resolve: { isAuth }
        })
        .when('/invoices/add', {
            templateUrl: 'app/invoices/partials/newInvoice.html',
            controller: 'invoiceCreateCtrl',
            resolve: { isAuth }
        })
        .when('/invoices/unscheduled', {
            templateUrl: 'app/invoices/partials/unscheduled.html',
            controller: 'invoiceListCtrl',
            resolve: { isAuth }
        })
        // .when('/invoices/detail/:invoiceID', {
        //     templateUrl: 'app/invoices/partials/detail.html',
        //     controller: 'invoiceDetailCtrl',
        //     resolve: { isAuth }
        // })
        // .when('/schedule/detail/:scheduleID', {
        //     templateUrl: 'app/schedule/partials/detail.html',
        //     controller: 'scheduleDetailCtrl',
        //     resolve: { isAuth }
        // })
        .when('/schedule/main', {
            templateUrl: 'app/schedule/partials/main.html',
            controller: 'reservationsCtrl',
            resolve: { isAuth }
        })
        .when('/schedule/delivery/:invoiceID', {
            templateUrl: 'app/schedule/partials/scheduleDelivery.html',
            controller: 'reservationsCreateCtrl',
            resolve: { isAuth }
        })
        .when('/schedule/itinerary/:date', {
            templateUrl: 'app/schedule/partials/itinerary.html',
            controller: 'reservationsItineraryCtrl',
            resolve: { isAuth }
        })
        .when('/auth', {
            templateUrl: 'app/auth/partials/register.html',
            controller: 'authCtrl'
        })
        .otherwise('/auth')
})