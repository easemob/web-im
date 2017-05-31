var React = require("react");


exports.Input = React.createClass({

    getInitialState: function () {
        return {
            value: this.props.value || ''
        }
    },

    handleChange: function (e) {
        typeof this.props.change === 'function' && this.props.change(this.refs.input.value);

        var v = e.target.value;
        this.setState({value: v});
        (typeof this.props.onChange == 'function') && this.props.onChange(e);
    },

    componentWillUnmount: function () {
        if (this.props.keydown) {
            this.refs.input.removeEventListener('keydown', this.props.keydown);
        }
        this.refs.input = null;
    },

    componentDidMount: function () {
        if (this.props.keydown) {
            this.refs.input.addEventListener('keydown', this.props.keydown);
        }
        if (this.props.defaultFocus) {
            this.refs.input.focus();
        }
    },

    render: function () {
        var type = this.props.type || 'text';
        return <input className='webim-input' type={type} defaultValue={this.props.text} ref='input'
                      value={this.state.value}
                      placeholder={this.props.placeholder} onChange={this.handleChange}/>;
    }
});


exports.Button = React.createClass({

    render: function () {
        var className = this.props.className ? ' ' + this.props.className : '';
        var cls = '';
        if(className.indexOf('hide') >= 0){
            cls = 'hide';
        }else{
            cls = 'webim-button bg-color' + className;
        }
        return <button className={cls} ref='button'
                       onClick={this.props.onClick}>{this.props.text}</button>;
    }
});


exports.SmallButton = React.createClass({

    render: function () {
        var className = this.props.status ? ' ' + this.props.status : '';
        return <button className={'webim-button small' + className}
                       onClick={this.props.click}>{this.props.text}</button>;
    }
});


exports.Radio = React.createClass({

    handleChange: function () {
        this.props.change(this.refs.input.checked);
    },

    render: function () {
        return <input ref='input' type='radio' className='webim-input' defaultValue={this.props.text}
                      onChange={this.handleChange}/>;
    }
});


exports.Checkbox = React.createClass({

    getInitialState: function () {
        return {
            checked: false
        };
    },

    handleClick: function () {
        this.toggleChecked();
        this.refs.input.checked = !this.state.checked;
        this.setState({checked: !this.state.checked});
    },

    toggleChecked: function () {
        if (this.refs.i.className) {
            this.refs.i.className = '';
        } else {
            this.refs.i.className = 'checked';
        }
    },

    handleChange: function () {
        typeof this.props.change === 'function' && this.props.change(this.refs.input.value);
    },

    render: function () {
        var className = this.state.checked ? '' : ' hide';

        return (
            <div className='webim-checkbox'>
                <i ref='i' onClick={this.handleClick}>
                    <em ref='rec' className={'font small' + className}>W</em>
                </i>
                <input ref='input' type='checkbox' className='hide' onChange={this.handleChange}/>
                <span>{this.props.text}</span>
            </div>
        );
    }
});
