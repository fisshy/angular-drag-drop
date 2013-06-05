Angular - Drag and Drop
=================

Drag and drop dataobjects with angular using directives and HTML5

jsFiddle example http://jsfiddle.net/ADukg/2516/    <br />
Live example http://www.devfishy.com/dnd

<b>Todo</b> <br/>
<ul>
    
<li>
 Bind drag to drop, So we only can drop on specific drop if wanted.
</li>


</ul>

<b>drop</b><br/>
drop     - Context of the drop directive<br/>
whendrop - function thats called when an item is dropped on it.
    
<b>drag</b><br/>
pass object to drag - that object will be dropped on drop and passed to drop function<br/>

  	<div
      		drop="todos"
      		when-drop="toTodo(data)">
      
                <ul class="thumbnails span12">

                    <li ng-repeat="item in drop" class="span12">

                        <div drag="item">

                            <div class="thumbnail item">

                                <span class="done-{{item.done}} ">{{item.title}}</span>
                                <a class="move-right" href="#/todos/edit/{{item.todoId}}">
                                    <i class="icon-edit"></i>
                                </a>

                            </div>

                        </div>

                    </li>

                </ul>

            </div>
<b>Exampel of usage</b>
<a target='_blank' href='http://imageshack.us/photo/my-images/268/angulardnd.png/'><img src='http://img268.imageshack.us/img268/4500/angulardnd.png' border='0'/></a><br></a>
