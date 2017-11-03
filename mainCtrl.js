angular.module('triviaTrend').controller('mainCtrl', function ($scope, triviaSrvc) {

    $scope.getQuestions = function(){
      triviaSrvc.getQuestions().then(function (response) {
        $scope.questions = response.data;
        addDifficulty($scope.questions);      
      })
    }


    $scope.getByDifficulty = function(difficulty) {
      triviaSrvc.getByDifficulty(difficulty).then(function(response) {
        $scope.questions = response;
        addDifficulty($scope.questions);
        console.log(response)
      })
    }


    $scope.checkAnswer = function(questionId, chosenAnswer) {
      var question;
      for (var i = 0; i < $scope.questions.length; i++) {
        if ($scope.questions[i]._id == questionId) {
          question = $scope.questions[i];
          break;
        }
      }
      question.chosenAnswer = chosenAnswer;
    }

    function addDifficulty(array) {
      array.map(function (el) {
        switch (el.difficulty) {
          case 1:
            el.labelDifficulty = 'Easy';
            break;
          case 2:
            el.labelDifficulty = 'Medium';
            break;
          case 3:
            el.labelDifficulty = 'Hard';
            break;
        }
      })
    }

    $scope.toggleSearch = function(){
      $scope.searchOpen = !$scope.searchOpen;
      $scope.search = {};
    }

    $scope.openModal = function (question) {
      $scope.currentQuestion = question;
      if (question) {
        $scope.editing = true;
      } else {
        $scope.addingNew = true;
      }
      $scope.modalOpen = true;
    }
    
    $scope.closeModal = function () {
      $scope.editing = false;
      $scope.addingNew = false;
      $scope.modalOpen = false;
    }
})