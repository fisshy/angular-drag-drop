Angular - Drag and Drop
=================

Drag and drop dataobjects with angular using directives and HTML5

<b>Todo</b> <br/>
<ul>
    
<li>
 Highligt drop places on begin drag    
</li>


</ul>

<b>drop</b><br/>
drop     - Context of the drop directive<br/>
whendrop - function thats called when an item is dropped on it.
    
<b>drag</b><br/>
pass object to drag - that object will be dropped on drop and passed to drop function<br/>

  	<div
      		drop="todos"
      		whendrop="toTodo(data)"
      		class="drag-and-drop">
      
                <ul class="thumbnails span12">

                    <li ng-repeat="item in items" class="span12">

                        <div drag="item">
                            
                            <div class="thumbnail item" draggable="true">
                                
                                <span class="done-{{item.done}} ">{{item.title}}</span>
                                <a class="move-right" href="#/todos/edit/{{item.todoId}}">
                                    <i class="icon-edit"></i>
                                </a>

                            </div>

                        </div>

                    </li>

                </ul>

    </drop>
<b>Exampel of usage</b>
<a target='_blank' href='http://imageshack.us/photo/my-images/268/angulardnd.png/'><img src='http://img268.imageshack.us/img268/4500/angulardnd.png' border='0'/></a><br></a>
