angular.module("purchase-portage").controller("navCtrl",
function ($scope, $location, authFactory) {
    /*
    Just a pass-through method to the authFactory method of the
    same name.
    */
    $scope.isAuthenticated = () => authFactory.isAuthenticated();

    /*
    Unauthenticate the client.
    */
    $scope.logout = () => authFactory.logout();

}
)