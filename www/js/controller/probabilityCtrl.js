angular.module('app.controllers', [])

  .controller('probabilityCtrl', function($scope) {

  })

  .controller('letSPlayCtrl', function($scope) {



    var y=randw();
    var x=Math.floor((Math.random() * 10) + 1)*10;//randomly generated no. of points up for play
    var z= randomWithProbability(y);
    var w=0;
    $scope.check=function() {
      if(z==1)
      {
        sessionStorage.total=Number(sessionStorage.total)+x;
        alert("you won "+x+" points");
        z=-1;
      }
      else
      if(z==0)
      {
        sessionStorage.total= Number(sessionStorage.total)-x;
        alert("you lost "+x+" points");
        z=-1;
      }
    };
    $scope.rand={

      chancew:y,//randomly generated chance of winning
      chancel:100-y,//chance of losing
      amount:x



    };
    $scope.plus=function(){
      if(w==0)
      {sessionStorage.total=Number(sessionStorage.total)+1;
        alert("you got a point");
      w=-1;}




    };





    function randomWithProbability(a) {
      var notRandomNumbers = [];
      var l=100-a;
      for(var i=0;i<a;i++)
      {
        notRandomNumbers.push(1);
      }
      for(var i=0;i<l;i++)
      {
        notRandomNumbers.push(0);
      }

      var idx = Math.floor(Math.random() * notRandomNumbers.length);
      return notRandomNumbers[idx];
    }


    function randw(){
      var y=Math.floor(Math.random() * (20 - 1 + 1)) + 1;

      switch(y)
      {
        case 1:
          return 5;

        case 2:
          return 10;

        case 3:
          return 15;

        case 4:
          return 20;

        case 5:
          return 25;

        case 6:
          return 30;
        case 7:
          return 35;

        case 8:
          return 40;

        case 9:
          return 45;

        case 10:
          return 50;

        case 11:
          return 55;

        case 12:
          return 60;

        case 13:
          return 65;

        case 14:
          return 70;

        case 15:
          return 75;

        case 16:
          return 80;

        case 17:
          return 85;

        case 18:
          return 90;

        case 19:
          return 95;

        default:
          return 95;





      }

    }


  })



  .controller('endCtrl', function($scope) {

    $scope.final=function(){

      alert("you got: "+sessionStorage.total+"points");
    }
  })

