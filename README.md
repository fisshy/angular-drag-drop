Angular - Drag and Drop
=================

Drag and drop dataobjects with angular using directives and HTML5


<b>drop</b><br/>
items - Context of the drop directive<br/>
drop  - function thats called when an item is dropped on it.
    
<b>drag</b><br/>
pass object to drag - that object will be dropped on drop and passed to drop function

 <drop items="todos"
       drop="toTodo(data)"
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
