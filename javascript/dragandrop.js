
/*app.js module*/
module.directive( 'drag', function () {

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

                e.originalEvent.dataTransfer.effectAllowed = 'move';

                e.originalEvent.dataTransfer.setData( 'text', angular.toJson( scope.item ) );

            } );

            elem.bind( 'dragleave', function ( e ) {

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
} );

module.directive( 'drop', function () {

    var drags = [],
        dragging = new RegExp( '(\\s|^)dragging(\\s|$)' );;

    return {
        scope: {
            items: '=drop',
            whendrop: '&'
        },
        link: function ( scope, elem, attr, ctrl ) {

            elem.bind( 'drop', function ( e ) {

                e.stopPropagation();
                e.preventDefault();

                e.originalEvent.dataTransfer.dropEffect = 'move';

                var data = angular.fromJson( e.originalEvent.dataTransfer.getData( 'text' ) );

                scope.$apply( function () {

                    scope.whendrop( { data: data } );

                } );

                if ( drags.length === 0 ) {
                    drags = document.querySelectorAll( '.drop' );
                }

                angular.forEach( drags, function ( value, key ) {

                    value.className = value.className.replace( dragging, '' );

                } );

            } );

            elem.bind( 'dragover', function ( e ) {

                if ( e.preventDefault ) {
                    e.preventDefault();
                }

                return false;

            } );

            elem.bind( 'dragleave', function ( e ) {

            } );


            elem.bind( 'dragenter', function ( e ) {

            } );

            elem[0].className = elem[0].className + ' drop';

        }
    };
} );