var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);


var Notify = React.createClass({

    click: function () {
        clearTimeout(this.props.st);
        ReactDOM.unmountComponentAtNode(dom);       
    },
   
    render: function () {
        var className = '';

        if ( this.props.status ) {
            className = ' ' + this.props.status;
        }
        
        return (
            <p onClick={this.click} className={'webim-notify' + className}>
                {this.props.content}
            </p>
        );
    }
});


module.exports = {
    success: function ( content ) {

        var st = setTimeout(function () {
            ReactDOM.unmountComponentAtNode(dom);
        }, 3000);

        ReactDOM.render(
            <Notify st={st} status='success' content={content} />,
            dom 
        );
    },
    error: function ( content ) {

        var st = setTimeout(function () {
            ReactDOM.unmountComponentAtNode(dom);
        }, 3000);

        ReactDOM.render(
            <Notify st={st} status='error' content={content} />,
            dom
        );
        
    }
};
