Angular - Drag and Drop
=================

Lightweight drag and drop with angular using directives and HTML5

1,9kb minified, 0,37kb gzipped

See example page for setup

Install
-------
With bower:

    $ bower install angular-dragndrop

</ul>

### Drop
´´´html
<div drop ng-model="['Volvo', 'Audi']"><div>
´´´

<b>Options</b><br>
ng-model	- Context of the drop directive<br/>
drop  		- Takes a function thats called when drag is dropped<br/>
enter 		- Takes a function thats called when drag enters drop-area<br/>
leave 		- Takes a function thats called when drag leaves drop-area<br/>
    
### Drag
´´´html
<div drag ng-model="'Volvo'"><div>
´´´

<b>Options</b><br>
ng-model    - Context of the current drag item.<br/>
start 		- Takes a function to be called when drag starts<br />
end   		- Takes a function to be called when drag ends<br/>

<b>Exampel of usage</b>
<a target='_blank' href='http://imageshack.us/photo/my-images/268/angulardnd.png/'><img src='http://img268.imageshack.us/img268/4500/angulardnd.png' border='0'/></a><br></a>

Building
-------
	$ grunt
	