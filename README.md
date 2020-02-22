# Small frontend library for creating reusable UI blocks without any implicit magic.

The API documentation and guides will be ready later.

Please see an example below (classic todo-list).

```JavaScript
import {UI, Scheme, Styles, EventsChannel} from "ui-scheme"
import Input  from "./Input"
import Button from "./Button"
import Task   from "./Task"

class TodoList extends UI
{
    createScheme() {
        return new Scheme({
            form: new Scheme('form', {
                input: new Input(),
                createButton: new Button({text: 'Add'})
            }),
            items: 'div'
        });
    }

    addTask(name, isDone) {
        isDone = isDone === true;
        let task = new Task(name, isDone, this.channel);
        task.appendTo(this.items);
    }

    onRender() {
        this.form.on('submit', event => {
            event.preventDefault()
            let name = this.form.input.val().trim()
            if (name !== '') {
                this.addTask(name, false)
                this.form.input.val('')
            }
        });
    }
}

```


Somewhere in browser...
```HTML
<body>
    <div id="todo-list"></div>
    <script>
        // Render todo list into corresponding div.
        new TodoList().appendTo('#todo-list');
    </script>
</body>
```