(function() {
    'use strict';

    angular
        .module('ArcApp')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', '$q', 'DataStore'];

    function AppCtrl($scope, $q, DataStore) {

        $scope.messages = [];
        $scope.messageLoading = true;
        // $scope.toUpdateCitation = toUpdateCitation;
        $scope.newMessageObject = {
            author: "",
            content: "",
            time: null
        };
        $scope.newMessage = newMessage;
        // $scope.updateCitation = updateCitation;
        // $scope.deleteCitation = deleteCitation;

        init();

        function init() {
            var promises = [getMessages()];
            $q.all(promises).then(function() {
                console.log('The chatroom is ready !');
            });
        }

        function getMessages() {
            DataStore.getMessages()
            .then(function(messages) {
                $scope.messages = messages;
                $scope.messageLoading = false;
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function newMessage(newMessageObject) {
            console.log($scope.newMessageObject);
            $scope.newMessageObject.author = "Anas";
            $scope.newMessageObject.time = Date();
            DataStore.newMessage(newMessageObject)
            .then(function(message) {
                init();
                $scope.newMessageObject = {
                    author: "",
                    content: "",
                    time: null
                };
            })
            .catch(function(err) {
                console.error(err);
            });
        }
/*
        function getCitationsAuthors() {
            DataStore.getCitationsAuthors()
            .then(function(authors) {
                $scope.authors = authors;
            })
            .catch(function(err) {
                console.error(err);
            });
        }


        function deleteCitation(id) {
            console.log(id);
            DataStore.deleteCitation(id)
            .then(function(citation) {
                init();
            })
            .catch(function(err) {
                console.error(err);
            });
        }

        function toUpdateCitation(citationUp) {
            console.log("toUpdateCitation");
            
            console.log($scope.modalTyper);
            $scope.citationModal = citationUp;
        }

        function updateCitation(citationModal) {
            console.log("11" + JSON.stringify(citationModal));
            DataStore.updateCitation(citationModal)
            .then(function(citation) {
                console.log("Notif" + JSON.stringify(citation));
                $scope.citationModal = {};
                init();
            })
            .catch(function(err) {
                console.error(err);
            });
        }
*/
    }

})();
