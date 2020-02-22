class Task extends UI
{
    constructor(name, isDone, channel) {
        super({name, isDone});
        this.channel = channel
        this.done(isDone);
    }

    createScheme() {
        return new Scheme('label', {
            doneFlag: 'input',
            name:     'div.name'
        });
    }

    setName(name) {
        this.name.node.textContent = name;
    }

    getName() {
        return this.name.node.textContent;
    }

    isDone() {
        return this.doneFlag.node.checked;
    }

    done(isDone) {
        if (isDone === true) {
            this.doneFlag.node.checked = true;
            this.rootElement.node.classList.add('done');
        } else {
            this.doneFlag.node.checked = false;
            this.rootElement.node.classList.remove('done');
        }
    }

    onRender(params) {
        this.doneFlag.node.setAttribute('type', 'checkbox');
        this.doneFlag.on('change', () => {
            this.channel.trigger('itemChange', this)
        })
        this.name.node.textContent = params.name;
    }

    createStyles() {
        return new Styles({
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderBottom: '1px solid #eee',
            padding: '0.5rem 0.5rem',
            margin: '0.25rem 0',

            doneFlag: {
                marginRight: '0.5rem'
            },

            name: {
                fontSize: '0.85rem',
                fontFamily: '"Segoe UI", sans-serif'
            }
        });
    }
}
