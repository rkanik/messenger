import React from "react";
class Dropdown extends React.Component {

	state = { show: false }

	mousedown = {
		add(h) { document.addEventListener('mousedown', h) },
		remove(h) { document.removeEventListener('mousedown', h) }
	}

	constructor(props) {
		super(props);

		this.ref = React.createRef();
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onClickOutside = this.onClickOutside.bind(this)

	}

	componentDidMount() { this.mousedown.add(this.onMouseDown) }
	componentWillUnmount() { this.mousedown.remove(this.onMouseDown) }

	_setState(p) {
		this.setState(s => ({ ...s, ...p }))
	}

	onClickOutside() {
		this._setState({ show: false })
	}

	onMouseDown(event) {
		if (!this.ref) return
		if (this.ref.current.contains(event.target)) return
		this.onClickOutside()
	}

	render() {
		const { show } = this.state
		const { className, togglerClass, toggler, md } = this.props
		return <div ref={this.ref} className='relative'>
			<button
				className={togglerClass || ''}
				onClick={() => this._setState({ show: !show })}
			>
				{!md && (toggler || 'Button')}
				{md && <i className='material-icons text-sm'>{md}</i>}
			</button>
			<div className={`${className || ''} absolute z-10 transition-all top-full right-0 transform ${show ? 'opacity-100 visible translate-y-1' : 'opacity-0 invisible translate-y-3'}`.trim()}>
				{this.props.children}
			</div>
		</div>;
	}

}

export default Dropdown