
/*app.js module*/
module.directive( 'drag', function () {

    return {
        restrict: 'A',
        scope: { item: '=drag' },
        link: function ( scope, elem, attr, ctrl ) {

            elem.bind( 'dragstart', function ( e ) {

                this.style.opacity = '0.4';

                e.originalEvent.dataTransfer.effectAllowed = 'move';

                e.originalEvent.dataTransfer.setData( 'text/plain', angular.toJson( scope.item ) );

            } );

            elem.bind( 'dragleave', function ( e ) {
            } );

            elem.bind( 'dragend', function ( e ) {

                this.style.opacity = '1';

            } );
        }
    };
} );

module.directive( 'drop', function ( $compile ) {

    return {
        scope: {
            items: '=items',
            drop: '&'
        },
        link: function ( scope, elem, attr, ctrl ) {

            elem.bind( 'drop', function ( e ) {

                e.stopPropagation();
                e.preventDefault();

                e.originalEvent.dataTransfer.dropEffect = 'move';

                var data = angular.fromJson( e.originalEvent.dataTransfer.getData( 'text/plain' ) );

                scope.$apply( function () {

                    scope.drop( { data: data } );

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

        }
    };
} );