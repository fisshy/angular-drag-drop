angular.module('dragAndDrop', [])
    .directive( 'drag', function () {

    var drags = [],
        dragging = new RegExp( '(\\s|^)dragging(\\s|$)' );;

    return {
        restrict: 'A',
        scope: { item: '=drag' },
        link: function ( scope, elem, attr, ctrl ) {

            elem.bind( 'dragstart', function ( e ) {

                if ( drags.length === 0 ) {
                    drags = document.querySelectorAll( '.drop' );
                }

                angular.forEach( drags, function ( value, key ) {

                    value.className = value.className + ' dragging';

                } );

                this.style.opacity = '0.4';

                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData( 'text', angular.toJson( scope.item ) );

            } );


            elem.bind( 'dragend', function ( e ) {

                this.style.opacity = '1';

                angular.forEach( drags, function ( value, key ) {

                    value.className = value.className.replace( dragging, '' );

                } );

            } );

            elem[0].draggable = true;

            elem[0].className = elem[0].className + ' drag';

        }
    };
} ).directive( 'drop', function () {

    var drags = [],
        dragging = new RegExp( '(\\s|^)dragging(\\s|$)' );;

    return {
        scope: {
            drop : '=',
            whenDrop: '&'
        },
        link: function ( scope, elem, attr, ctrl ) {

            elem.bind( 'drop', function ( e ) {

                if(e.stopPropagation()){
                    e.preventDefault();
                }

                var data = angular.fromJson( e.dataTransfer.getData( 'text' ) );

                scope.$apply( function () {
                    scope.whenDrop( { data: data } );
                } );

                if ( drags.length === 0 ) {
                    drags = document.querySelectorAll( '.drop' );
                }

                angular.forEach( drags, function ( value, key ) {

                    value.className = value.className.replace( dragging, '' );

                } );

            } );

            elem.bind ( 'dragenter', function(e){
                e.dataTransfer.dropEffect = 'move'
            });

            elem.bind( 'dragover', function ( e ) {

                if ( e.preventDefault ) {
                    e.preventDefault();
                }

                return false;

            } );

            elem[0].className = elem[0].className + ' drop';

        }
    };
} );
