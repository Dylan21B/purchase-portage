// module to authenticate or register new user in Firebase
angular.module("purchase-portage")
.controller("authCtrl", function($scope, $location, authFactory) {
    $scope.auth = {}

    $scope.logOutUser = function () {
        authFactory.logout()
        $location.url('/auth')
    }

    $scope.logInUser = function () {
        authFactory.authenticate($scope.auth).then(function (didLogin) {
            $scope.login = {}
            $location.path("/schedule/main")
        })
    }

    $scope.registerUser = function(registerNewUser) {
      authFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
        $scope.logInUser(registerNewUser)
      })
    }

})