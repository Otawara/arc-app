(function() {
    'use strict';

    angular
        .module('ArcApp')
        .factory('DataStore', DataStore);

    DataStore.$inject = ['$http', '$q'];


    function DataStore($http, $q) {
        var services = {
            getMessages: getMessages,
            getMessagesAuthors: getMessagesAuthors,
            newMessage: newMessage,
            updateMessage: updateMessage,
            deleteMessage: deleteMessage
        };

        return services;


        // Your functions

        function getMessages() {
            var deferred = $q.defer();
            $http.get('/api/v1/messages')
              .success(function(resp, status) {
                  deferred.resolve(resp);
              })
              .error(function(error, status) {
                  deferred.reject(error);
              });
              return deferred.promise;
        }

        function getMessagesAuthors() {
            var deferred = $q.defer();
            $http.get('/api/v1/messages-authors')
              .success(function(resp, status) {
                  deferred.resolve(resp);
              })
              .error(function(error, status) {
                  deferred.reject(error);
              });
              return deferred.promise;
        }

        function newMessage(newMessageObject) {
          var deferred = $q.defer();
          $http.post('/api/v1/messages/', newMessageObject)
          .success(function(resp, status) {
            deferred.resolve(resp);
          })
          .error(function(error, status) {
            deferred.reject(error);
          });
          return deferred.promise;
        }

        function updateMessage(messageModal) {
          var deferred = $q.defer();
          console.log("12" + JSON.stringify(messageModal));
          $http.put('/api/v1/messages/'+messageModal._id, messageModal)
          .success(function(resp, status) {
                              console.log('resp01' + JSON.stringify(resp));
            deferred.resolve(resp);
                              console.log('resp02' + JSON.stringify(resp));
          })
          .error(function(error, status) {
            deferred.reject(error);
          });
          return deferred.promise;
        }

        function deleteMessage(id) {
            var deferred = $q.defer();
            $http.delete('/api/v1/messages/'+id)
              .success(function(resp, status) {
                  deferred.resolve(resp);
              })
              .error(function(error, status) {
                  deferred.reject(error);
              });
              return deferred.promise;
        }
    }
})();
