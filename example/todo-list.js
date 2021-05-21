class TodoList extends UI
{
    init(params) {
        this.channel = new EventsChannel()
    }

    createScheme() {
        return new Scheme({
            form: new Scheme('form', {
                spinner: new ui.Spinner(3, 360),
                input: new Input(),
                createButton: new Button('Add')
            }),
            items: 'div'
        });
    }

    addTask(name, isDone) {
        isDone = isDone === true;
        let task = new Task(name, isDone, this.channel);
        task.appendTo(this.items);
    }

    onRender(params) {
        this.form.on('submit', event => {
            console.log(event)
            event.preventDefault();
            let name = this.form.input.val().trim();
            if (name !== '') {
                this.addTask(name, false);
                this.form.input.val('');
            }
        });

        this.channel.on('itemChange -> 1', task => {
            console.log('"' + task.getName() + '" has been ' + (task.isDone() ? 'done' : 'undone'));
        });

        this.channel.off('itemChange -> 2')
    }

    createStyles() {
        return new Styles({
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '0.5rem',
            padding: '2rem',
            boxShadow: '0 0 0.75rem rgba(0,0,0,0.15)',

            '@keyframes spin': {
                from: {
                    transform: 'rotate(0deg)'
                },
                to: {
                    transform: 'rotate(360deg)'
                }
            },

            form: {
                display: 'flex',

                input: {
                    flexGrow: '1',
                    marginBottom: '1rem',
                    marginRight: '1rem'
                },

                createButton: {
                    visibility: 'visible'
                }
            }
        });
    }
}

