import React from 'react'
import ReactDOM from 'react-dom'
import {shallow, render, mount} from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme';

// test
window.history.rawpushState = window.history.pushState;
window.history.pushState = function (a, b, url) {
    url = url.replace('index.', 'debug.');
    window.history.rawpushState(a, b, url);
};

let log = console.log.bind(console)

// init root element
let root = document.createElement("div")
root.id = 'root'
document.body.appendChild(root)

root.innerHTML = `
<section id='main' class='w100'>
    <article id='demo'></article>
    <article id='components'></article>
</section>
`;


// before 在每个case之前只会执行一遍，所以清理缓存类似操作不能放在此处
beforeEach(() => {
    jasmineEnzyme();

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

// Fake: render by enzyme
var Webim = require('../demo/javascript/src/components/webim');
var Api = require('../demo/javascript/src/api');
var Signin = require('../demo/javascript/src/components/sign/signin');
var Contact = require('../demo/javascript/src/components/contact/contact');

Api.render = function (node, change) {
    this.node = node;

    var props = {};
    switch (change) {
        case 'roster':
            props.rosterChange = true;
            break;
        case 'group':
            props.groupChange = true;
            break;
        case 'chatroom':
            props.chatroomChange = true;
            break;
        case 'stranger':
            props.strangerChange = true;
            break;
        default:
            props = null;
            break;
    }


    // 此处注意：不能用mount，mount会重新出发componentDidMount流程
    if (this.wrapper) {
        //
        wrapper.setProps(props)
        this.wrapper.update()
    } else {
        this.wrapper = mount(<Webim config={WebIM.config} close={this.logout} {...props} />, {
            attachTo: this.node
        });
    }
};

//
let fill = (selector, value) => {
    wrapper.find(selector).simulate('change', {
        target: {
            value: value
        }
    })
};

let domFill = (selector, value) => {
    wrapper.find(selector).node.value = value;
};


// init react component
require('../sdk/index')
require('../demo/javascript/src/entry')

// 顺序不能乱
let wrapper = Demo.api.wrapper;
let signin = wrapper.find(Signin);
let Wait = (() => {

    let events = [];
    let timeId = null;

    function init() {
        if (timeId) return false;
        timeId = setInterval(() => {
            try {
                events.forEach((v) => {
                    if (v.check() && !v.done) {
                        v.callback();
                        v.done = true
                    }
                })
                // for (let k in events) {
                //     let v = events[k]
                //     console.log(k, 'check', Symbol.for(v.check()).toString())
                //     if (v.check()) {
                //         v.callback();
                //         delete events[k]
                //     }
                // }
            } catch (e) {
                console.log('error', e)
                clearInterval(timeId)
            }
        }, 100)
    }

    function add(check, callback) {
        // events.push()
        // events[Symbol.for(check).toString()] = {
        events.push({
            check, callback, done: false
        })

        if (!timeId) {
            init()
        }
    }

    function done() {

    }

    return {
        add,
        done
    }
})();
//
// function checkLocation(str) {
//     return function () {
//         return location.pathname == `/${str}`;
//     }
// }

describe(' test login ', () => {

    it('fill params', done => {
        let node = signin.getNode();
        // console.log(signin);
        // console.log(node.refs.name);

        // node.refs.name.refs.input.simulate('change', {
        //     target: {
        //         value: 'liuwz'
        //     }
        // });

        node.refs.auth.refs.input.value = '1';
        node.refs.name.refs.input.value = 'liuwz';

        log(node.refs.name.refs.input.value);
        log(node.refs.auth.refs.input.value);
        // log(signin.find(node.refs.password.refs.input))

        node.login();

        let contact = wrapper.find(Contact).getNode()

        Wait.add(() => {
            // console.log(contact.props.friends)
            return contact.props.friends.length > 0
        }, () => {
            console.log('gogo', contact.props.friends)
            expect(contact.props.friends.length).toBeGreaterThan(0)
            done()
        })

    })
});
