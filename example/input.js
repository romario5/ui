class Input extends UI
{
	createScheme() {
		return 'input';
	}

	defaultParams() {
		return {
			type: 'test'
		};
	}


	onChange(handler) {
		this.rootElement.node.addEventListener('change', handler);
	}


	onRender(params) {
		this.rootElement.node.setAttribute('type', params.type);
	}


	val(value) {
		if (value === undefined) {
			return this.rootElement.node.value;
		}
		this.rootElement.node.value = value;
	}


	createStyles() {
		return new Styles({
			height: '2.25rem',
			borderRadius: '0.25rem',
			padding: '0 0.75rem',
			border: '1px solid #ccc',
			outline: 'none',
			fontSize: '0.8rem',
			fontFamily: '"Segoe UI", sans-serif',
			color: '#444',
			transition: '0.15s',

			':focus': {
				borderColor: '#008ed6',
				boxShadow: '0 0 0 3px rgba(0, 142, 214, 0.25)'
			}
		});
	}
}