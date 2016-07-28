var React = require("react");


exports.Input = React.createClass({

    handleChange: function () {
        typeof this.props.change === 'function' && this.props.change(this.refs.input.value);
    },

    componentWillUnmount: function () {
        if ( this.props.keydown ) {
            this.refs.input.removeEventListener('keydown', this.props.keydown);
        }
        this.refs.input = null;
    },

    componentDidMount: function () {
        if ( this.props.keydown ) {
            this.refs.input.addEventListener('keydown', this.props.keydown);
        }
        if ( this.props.defaultFocus ) {
            this.refs.input.focus();
        }
    },

    render: function () {
        var type = this.props.type || 'text'; 
        return <input className='webim-input'  type={type}  defaultValue={this.props.text} ref='input' placeholder={this.props.placeholder} onChange={this.handleChange} />;
    }
});




exports.Button = React.createClass({

    render: function () {
        var className = this.props.className ? ' ' + this.props.className : '';
        return <button className={'webim-button base-bgcolor' + className}  onClick={this.props.onClick}>{this.props.text}</button>;
    }
});




exports.SmallButton = React.createClass({

    render: function () {
        var className = this.props.status ? ' ' + this.props.status : '';
        return <button className={'webim-button small' + className}  onClick={this.props.click}>{this.props.text}</button>;
    }
});





exports.Radio = React.createClass({

    handleChange: function () {
        this.props.change(this.refs.input.checked);
    },

    render: function () {
        return <input ref='input' type='radio' className='webim-input' defaultValue={this.props.text} onChange={this.handleChange} />;
    }
});





exports.Checkbox = React.createClass({

    handleChange: function () {
        this.props.change(this.refs.input.checked);
    },

    render: function () {
        return (
            <div>
                <input ref='input' type='checkbox' className='webim-input' onChange={this.handleChange} />
                <span>{this.props.text}</span>
            </div>
        );
    }
});
