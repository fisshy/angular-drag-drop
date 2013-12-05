angular.module('dragAndDrop', [])
  .directive( 'drag', function ( dndApi ) {

    var drags = [];

    return {
      restrict: 'A',
      link: function ( $scope, $elem, $attr ) {

        var start = $scope.$eval($attr.start);
        var end = $scope.$eval($attr.end);
        var ngModel = $scope.$eval($attr.ngModel);

        $elem[0].addEventListener( 'dragstart', function ( e ) {

          if ( drags.length === 0 ) {
            drags = document.querySelectorAll( '.drop' );
          }

          angular.forEach( drags, function ( value, key ) {
            angular.element(value).addClass('draging');
          });

          $elem.addClass('on-drag');

          dndApi.setData(angular.copy(ngModel));

          (e.originalEvent || e).dataTransfer.effectAllowed = 'move';
          (e.originalEvent || e).dataTransfer.setData( 'text', 'no-data' );

          if(angular.isFunction(start)) {
            $scope.$apply(function() {
              start(dndApi.getData());
            });
          }

        });

        $elem[0].addEventListener( 'dragend', function ( e ) {

          $elem.removeClass('on-drag');

          angular.forEach( drags, function ( value, key ) {
            angular.element(value).removeClass('draging');
          });

          if(angular.isFunction(end)){
            $scope.$apply(function() {
              end(dndApi.getData());
            });
          }

          dndApi.removeData();
        });

        $elem[0].draggable = true;
        $elem.addClass('drag');
      }
    };
  }).directive( 'drop', function ( dndApi ) {

    var drags = [];

    return {
      link: function ( $scope, $elem, $attr ) {

        var elem    = $elem[0];
        var drop    = $scope.$eval($attr.drop),
            enter   = $scope.$eval($attr.enter),
            leave   = $scope.$eval($attr.leave);
            ngModel = $scope.$eval($attr.ngModel);        

        var left    = elem.offsetLeft,
            right   = left + elem.offsetWidth,
            top     = elem.offsetTop,
            bottom  = top + elem.offsetHeight;

        elem.addEventListener( 'drop', function ( e ) {
          if(e.stopPropagation()) {
            e.preventDefault();
          }

          if(angular.isFunction(drop)) {
            $scope.$apply(function() {
              drop(dndApi.getData(), elem);
            });
          }

          if (drags.length === 0) {
            drags = document.querySelectorAll( '.drop' );
          }

          angular.forEach(drags, function (value, key) {
           angular.element(value).addClass('draging');
          });

          dndApi.removeData();
        });

        elem.addEventListener ('dragenter', function(e) {
          if(elem === e.target) {
            if(angular.isFunction(enter)) {
              $scope.$apply(function() {
                enter(dndApi.getData(), elem);
              });
            }
          }
        });

        elem.addEventListener ( 'dragleave', function(e) {
          if((e.x < left || e.x > right) || (e.y < top  || e.y > bottom)) {
            if(angular.isFunction(leave)){
              $scope.$apply(function() {
                leave(dndApi.getData(), elem);
              });
            }
          }
        });

        elem.addEventListener ( 'dragover', function ( e ) {
          if ( e.preventDefault ) {
            e.preventDefault();
          }
          return false;
        });

        $elem.addClass('drop');
      }
    };

  }).factory('dndApi', function() {

    var dnd = {
      dragObject : {}
    };

    return {
      setData : function(data){
        dnd.dragObject = data;
      },
      removeData : function(){
        delete dnd.dragObject;
      },
      getData : function(){
        return dnd.dragObject;
      }
    };
  });

