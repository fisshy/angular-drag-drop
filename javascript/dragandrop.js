(function() {

    angular.module('dragAndDrop', [])
        .directive( 'drag', function ( dndApi ) {

            var drags = [],
                dragging = new RegExp( '(\\s|^)dragging(\\s|$)' );

            return {
                restrict: 'A',
                scope: {
                    item: '=drag',
                    whenStart : '&',
                    whenEnd : '&'
                },
                link: function ( scope, elem, attr, ctrl ) {

                    elem[0].addEventListener( 'dragstart', function ( e ) {

                        if ( drags.length === 0 ) {
                            drags = document.querySelectorAll( '.drop' );
                        }

                        angular.forEach( drags, function ( value, key ) {
                            value.className = value.className + ' dragging';
                        } );

                        this.style.opacity = '0.4';

                        dndApi.setData(scope.item);

                        e.dataTransfer.effectAllowed = 'move';

                        scope.$apply( function () {
                            scope.whenStart( { data: dndApi.getData() } );
                        } );

                    } );

                    elem[0].addEventListener( 'dragend', function ( e ) {

                        this.style.opacity = '1';

                        angular.forEach( drags, function ( value, key ) {
                            value.className = value.className.replace( dragging, '' );
                        } );

                        scope.$apply( function () {
                            scope.whenEnd( { data: dndApi.getData() } );
                        } );

                        dndApi.removeData();

                    } );

                    elem[0].draggable = true;

                    elem[0].className = elem[0].className + ' drag';

                }
            };
        } ).directive( 'drop', function ( dndApi ) {

            var drags = [],
                dragging = new RegExp( '(\\s|^)dragging(\\s|$)');

            return {
                scope: {
                    drop : '=',
                    whenDrop: '&',
                    whenEnter : '&',
                    whenLeave : '&'
                },
                link: function ( scope, elem, attr, ctrl ) {

                    var left = elem[0].offsetLeft,
                        right = left + elem[0].offsetWidth,
                        top = elem[0].offsetTop,
                        bottom = top + elem[0].offsetHeight;

                    elem[0].addEventListener( 'drop', function ( e ) {

                        if(e.stopPropagation()){
                            e.preventDefault();
                        }

                        scope.$apply( function () {
                            scope.whenDrop( { data: dndApi.getData() } );
                        } );

                        if ( drags.length === 0 ) {
                            drags = document.querySelectorAll( '.drop' );
                        }

                        angular.forEach( drags, function ( value, key ) {

                            value.className = value.className.replace( dragging, '' );

                        } );

                        dndApi.removeData();

                    } );

                    elem[0].addEventListener ( 'dragenter', function(e){

                        if(elem[0] === e.target)
                        {
                            scope.$apply( function () {
                                scope.whenEnter( { data: dndApi.getData() } );
                            } );
                        }

                    });

                    elem[0].addEventListener ( 'dragleave', function(e){


                        if( (e.x < left || e.x > right) ||
                            (e.y < top  || e.y > bottom) )
                        {
                            scope.$apply( function () {
                                scope.whenLeave( { data: dndApi.getData() } );
                            } );
                        }
                    });

                    elem[0].addEventListener ( 'dragover', function ( e ) {

                        if ( e.preventDefault ) {
                            e.preventDefault();
                        }

                        return false;

                    } );

                    elem[0].className = elem[0].className + ' drop';

                }
            };
        } ).factory('dndApi', function(){

            var dnd = {
                dragObject : {}
            };

            return {
                setData : function(data){
                    dnd.dragObject = data;
                },
                removeData : function(){
                    dnd.dragObject = null;
                },
                getData : function(){
                    return dnd.dragObject;
                }
            };
        } );

}());
