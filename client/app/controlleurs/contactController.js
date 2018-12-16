
angular.module('App').controller('contactController', ['$scope','$http',function($scope, $http){

function afficherListeContacts()
    {
        $http({
            method: 'GET',
            url: 'api/contacts/show'
          }).then(function successCallback(response) {
              
            $scope.maliste = response.data;
    
            console.log(response);
            
        }, function errorCallback(response) {
              
        });
    }
$scope.visible = false;

$scope.detailsContact = function(contact){
        $scope.visible = true;

        $scope.infosContact = contact;
        console.log(contact);
    }


$scope.vu = false;
$scope.voirAjout = function(){
  $scope.vu = !$scope.vu;
  $scope.visible = false;
} 



$scope.ajout = function(contact){
        $http({
            method: 'POST',
            url: 'api/contacts/add',
            data: contact
          }).then(function successCallback(response) {
            

            afficherListeContacts();

    
            console.log(response);
            
        }, function errorCallback(response) {
  
        });
        

    }

 $scope.update = function(contact){

        $scope.contactDetails2 = contact;
        $scope.data2 = contact;
        console.log(contact);
    }

    $scope.modifier = function(contact){


        $http({
            method: 'PUT',
            url: '/api/contacts/modifier',
            data: contact
          }).then(function successCallback(response) {
            
            $scope.contactDetails2 = null;
    
            console.log(response);
            
        }, function errorCallback(response) {
      
        });
        

    }
$scope.delete = function(contact){

        $http({
            method: 'DELETE',
            url: 'api/contacts/delete/'+contact._id
          }).then(function successCallback(response) {
              
            
           afficherListeContacts();
         

        }, function errorCallback(response) {
              
        });
    
        console.log(contact._id);
        
    }

    afficherListeContacts();

}]);
