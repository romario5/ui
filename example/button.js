class Button extends UI
{
	createScheme() {
		return new Scheme('button');
	}

	defaultParams() {
		return {
			text: 'Button',
			type: 'submit'
		};
	}

	onClick(handler) {
		this.rootElement.node.addEventListener('click', handler);
	}

	onRender(params) {
		this.rootElement.node.textContent = params.text;
		this.rootElement.node.setAttribute('type', params.type);
	}

	createStyles() {
		return new Styles({
			width: 'auto',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '2.25rem',
			padding: '0 1rem',
			border: 'none',
			borderRadius: '0.25rem',
			backgroundColor: '#008ed6',
			color: '#fff',
			outline: 'none',
			fontSize: '0.85rem',
			fontFamily: '"Segoe UI", sans-serif',
			cursor: 'pointer',
			transition: '0.15s',

			':hover': {
				backgroundColor: '#00a1f2',
				boxShadow: '0 0.1rem 0.5rem rgba(0, 142, 214, 0.25)'
			}
		});
	}
}