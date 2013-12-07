angular.module('dragAndDrop', [])
  .directive( 'drag', function ( dndApi ) {

    var drags = [];
    var parent = function(drag, max) {
      if(max > 5) {  return false; } /* Just incase */
      var p = drag.parent();
      if(p.hasClass('drop')) {
        return p[0];
      } else {
        max++;
        return parent(p, max);
      }
    };

    return {
      restrict: 'A',
      link: function ( $scope, $elem, $attr ) {
        var ngModel = $scope.$eval($attr.ngModel);      
        if(angular.isUndefined(ngModel)) { return; } 

        var elem  = $elem[0];
        var start = $scope.$eval($attr.start),
            end   = $scope.$eval($attr.end);

        elem.addEventListener( 'dragstart', function ( e ) {
          if(drags.length === 0) { drags = document.querySelectorAll( '.drop' ); }

          angular.forEach(dndApi.areas(), function ( value, key ) {
            if(value[0] !== parent($elem, 0)) { value.addClass('draging'); }
          });

          $elem.addClass('on-drag');

          dndApi.setData(ngModel, $elem);

          (e.originalEvent || e).dataTransfer.effectAllowed = 'move';
          (e.originalEvent || e).dataTransfer.setData( 'text', 'no-data' );

          if(angular.isFunction(start)) {
            $scope.$apply(function() {
              start(dndApi.getData(), $elem);
            });
          }

        });

        elem.addEventListener( 'dragend', function ( e ) {

          $elem.removeClass('on-drag');

          angular.forEach(dndApi.areas(), function ( area, key ) {
            area.removeClass('draging');
          });

          if(angular.isFunction(end)){
            $scope.$apply(function() {
              end(dndApi.getData(), $elem);
            });
          }
          dndApi.clear();
        });

        elem.draggable = true;
        $elem.addClass('drag');
      }
    };
  }).directive( 'drop', function ( dndApi ) {

    var areas = [];
    var drags = [];

   

    return {
      link: function ( $scope, $elem, $attr ) {
        
        var elem    = $elem[0];
        var drop    = $scope.$eval($attr.drop),
            enter   = $scope.$eval($attr.enter),
            leave   = $scope.$eval($attr.leave);
            
        var left    = elem.offsetLeft,
            right   = left + elem.offsetWidth,
            top     = elem.offsetTop,
            bottom  = top + elem.offsetHeight;

        dndApi.addArea($elem);

        elem.addEventListener( 'drop', function ( e ) {
          var result = dndApi.getData()
          if(!$elem.hasClass('draging')){ return; }
          if(e.stopPropagation()) { e.preventDefault(); }

          if(angular.isFunction(drop)) {
            $scope.$apply(function() {
              drop(result.data, result.element);
            });
          }

          angular.forEach(dndApi.areas(), function (area, key) {
            area.addClass('draging');
          });

          dndApi.clear();
        });

        elem.addEventListener ('dragenter', function(e) {
          if(elem === e.target && angular.isFunction(enter)) {
            $scope.$apply(function() {
              var result = dndApi.getData()
              enter(result.data, result.element);
            });
          }
        });

        elem.addEventListener ( 'dragleave', function(e) {
          if((e.x < left || e.x > right) || (e.y < top  || e.y > bottom)) {
            if(angular.isFunction(leave)){
              $scope.$apply(function() {
                var result = dndApi.getData()
                leave(result.data, result.element);
              });
            }
          }
        });

        elem.addEventListener ( 'dragover', function ( e ) {
          if (e.preventDefault) { e.preventDefault(); }
          return false;
        });

        $elem.addClass('drop');
      }
    };

  }).factory('dndApi', function() {

    var dnd = {
      dragObject : {}
    };

    var areas = [];

    return {
      addArea : function(area){
        areas.push(area);
      },
      areas : function() {
        return areas;
      },
      setData : function(data, element) {
        dnd.drag = { data : data, element : element};
      },
      clear : function(){
        delete dnd.drag;
      },
      getData : function(){
        return dnd.drag;
      }
    };
  });



