Angular - Drag and Drop
=================

Drag and drop dataobjects with angular using directives and HTML5

See example page for setup

<b>Todo</b> <br/>
<ul>
    
<li>
 Bind drag to drop, So we only can drop on specific drop if wanted.
</li>


</ul>

<b>drop</b><br/>
drop      - Context of the drop directive   <br/>
whenDrop  - Takes a function thats called when drag is dropped  <br/>
whenEnter - Takes a function thats called when drag enters drop-area    <br/>
whenLeave - Takes a function thats called when drag leaves drop-area    <br/>
    
<b>drag</b><br/>
drag      - Context of the current drag item. <br/>
whenStart - Takes a function to be called when drag starts <br />
whenEnd   - Takes a function to be called when drag ends    <br/>

  	<div ng-controller="MyCtrl" class="wrapper">

          <div class="objects">
              <div ng-repeat="item in htmlItems"  
                   drag="item" 
                   class="span12">
                  <span>{{item.name}}</span>
              </div>
          </div>

          <div drop="html"
               when-drop="addToLayout(data)"
               when-enter="previewHtml(data)"
               when-leave="removePreview(data)"
               class="html">
              <div ng-bind-html-unsafe="drop">

              </div>
          </div>

      </div>
<b>Exampel of usage</b>
<a target='_blank' href='http://imageshack.us/photo/my-images/268/angulardnd.png/'><img src='http://img268.imageshack.us/img268/4500/angulardnd.png' border='0'/></a><br></a>
