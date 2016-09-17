/**
 * 参考 https://github.com/wheatma/react-multiple-select-box
 *
 * 修改
 * 1.名称： MultipleSelectBox -> MultipleSelectBoxList
 * 2.去掉select框 options列表默认显示
 * 3.去掉 ok 和 cancel 按钮
 */
import React, { Component, PropTypes } from 'react';

let idInc = 0;

const interceptEvent = (event) => {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
};

const toggleClass = (fullClassName = '', className) => {
    return fullClassName.includes(className) ? fullClassName.replace(className, '') : fullClassName.trim() + ' ' + className;
};

const removeClass = (fullClassName = '', className) => {
    return fullClassName.replace(className, '');
};

const addClass = (fullClassName = '', className) => {
    return fullClassName.trim() + ' ' + className;
};


var MultipleSelectBoxList = React.createClass({
    getInitialState: function () {
        return {
            id: 'react-multi-select-box-' + (++idInc),
            open: false,
            focusedIndex: -1,
            pendingValue: this.props.value,
            value: this.props.value,
            options: this.props.options,
            clickingOption: false,
            blurTimeout: null
        }
    },

    getDefaultProps() {
        return {
            label: 'Choose ...',
            closeText: 'close',
            clearText: 'clear',
            confirmText: 'ok',
            cancelText: 'cancel',
            selectedLabel: 'selected ',
            nameText: '',
            value: [],
            options: [],
            async: false,
            onConfirmCallback: () => {
            },
            onCancelCallback: () => {
            }
        };
    },


    componentWillMount() {
        if (this.state.options.length === 0 && this.props.async && typeof this.props.asyncFetch == 'function') {
            this.props.asyncFetch(-1).then(data => {
                this.setState({
                    options: data
                });
            });
        }
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            pendingValue: nextProps.value,
            value: nextProps.value,
        });
    },

    label() {
        var selected = this.state.value.map(option => option.text);
        return selected.length > 0 ? selected.join(', ') : this.props.label;
    },

    value() {
        return this.state.value;
    },

    hasValue() {
        return this.value().length > 0;
    },

    handleConfirm() {
        let value = this.state.pendingValue;
        this.setState({
            open: false,
            value: value
        }, () => {
            this.props.onConfirmCallback(this.state.value);
        });
    },

    handleCancel() {
        let pendingValue = this.state.value;
        this.setState({
            open: false,
            pendingValue: pendingValue
        }, () => {
            this.props.onCancelCallback();
        });
    },

    isInclude(value, id) {
        let isIn = false;
        for (let o of value) {
            if (id == o.id) {
                isIn = true;
                break;
            }
        }
        return isIn;
    },

    getPendingValueIndex(id) {
        let key = 0,
            index = -1,
            pendingValue = this.state.pendingValue;
        for (let o of pendingValue) {
            if (id == o.id) {
                index = key;
                break;
            } else {
                key++;
            }
        }
        return index;
    },

    toggleOpenClose(event) {
        interceptEvent(event);
        this.setState({
            open: !this.state.open
        });
        if (this.state.open) {
            return this.setState({
                open: false
            });
        }

        this.handleOpen();
    },

    handleOpen(event) {
        interceptEvent(event);
        this.setState({
            open: true
        }, () => {
            this.refs.selectArea.focus();
        });
    },

    handleClose(event) {
        interceptEvent(event);
        if (!this.clickingOption) {
            this.setState({
                open: false,
                focusedIndex: -1
            });
        }
        this.handleCancel();
    },

    handleFocus() {
        clearTimeout(this.blurTimeout);
    },

    handleBlur() {
        clearTimeout(this.blurTimeout);
        this.blurTimeout = setTimeout(this.handleClose, 0);
    },

    handleMouseDown() {
        this.clickingOption = true;
    },

    handleSelect(item, event) {
        let pendingValue = this.state.pendingValue;
        if (!event.target.className.includes('react-multi-select-box-option-selected')) {
            this.setState({
                pendingValue: [
                    ...pendingValue,
                    item
                ]
            });
        } else {
            let index = this.getPendingValueIndex(item.id);
            setTimeout(() => {
                if (index >= 0) {
                    this.setState({
                        pendingValue: [
                            ...pendingValue.slice(0, index),
                            ...pendingValue.slice(index + 1)
                        ]
                    });
                }
            }, 10);
        }
    },

    handleSelectedOptionClick(index, event) {
        let pendingValue = this.state.pendingValue;
        this.setState({
            pendingValue: [
                ...pendingValue.slice(0, index),
                ...pendingValue.slice(index + 1)
            ]
        });
    },

    handleToggleOption(key, index, loaded, event) {
        let iconDOM = event.currentTarget.firstChild;
        let ulDOM = event.currentTarget.parentNode.lastChild;
        if (!this.props.async || loaded) {
            iconDOM.setAttribute('class', toggleClass(iconDOM.getAttribute('class'), 'expand'));
            ulDOM.setAttribute('class', toggleClass(ulDOM.getAttribute('class'), 'react-multi-select-hide'));
        } else {
            this.props.asyncFetch(key).then(items => {
                this.setState({
                    options: this.setOption(this.state.options, items, index)
                });
                iconDOM.setAttribute('class', toggleClass(iconDOM.getAttribute('class'), 'expand'));
                ulDOM.setAttribute('class', toggleClass(ulDOM.getAttribute('class'), 'react-multi-select-hide'));
            });
        }
    },

    setOption(options, items, index) {
        let keys = index.split('-');
        let tmp = options;
        for (let i of keys) {
            i = +i;
            if (!tmp[i]['sub']) {
                tmp[i]['sub'] = [];
            }
            tmp = tmp[i]['sub'];
        }
        Array.prototype.push.apply(tmp, items);
        return options;
    },

    renderButton() {
        let label = this.label();
        let title = this.hasValue() ? label : '';
        return (
            <button className="react-multi-select-box" ref="button" tabIndex="0" onClick={this.toggleOpenClose}>
                <div className="react-multi-select-box-label" title={title}>{label}</div>
            </button>
        );
    },

    renderOption(item, index, key) {
        if (item.hasOwnProperty('subLen') || item.hasOwnProperty('sub')) {
            return this.renderClassification(item, index, key);
        } else {
            return this.renderRow(item);
        }
    },

    renderClassification(item, index, key) {
        let loaded = ((item.hasOwnProperty('sub') && item.sub.length == item.subLen) || !item.hasOwnProperty('subLen')) ? true : false;
        if (key === '') {
            key = item.id;
        } else {
            key += '-' + item.id;
        }
        return (
            <li key={key} className="react-multi-select-classification">
                <div className="classification" onClick={this.handleToggleOption.bind(this, key, index, loaded)} loaded={loaded}>
                    <i className="react-multi-select-list-arrow"/>
                    <span>{item.text + '(' + (item.subLen ? item.subLen : (item.sub ? item.sub.length : 0)) + ')'}</span>
                </div>
                <ul key={`sub${item.id}`} className="react-multi-select-sub-options react-multi-select-hide">
                    {
                    loaded && item.sub.map((sub, i) => {
                        return this.renderOption(sub, index + '-' + i, key);
                    })
                        }
                </ul>
            </li>
        )
    },

    renderRow(item) {
        let className = 'react-multi-select-box-option';
        if (this.isInclude(this.state.pendingValue, item.id)) {
            className += ' react-multi-select-box-option-selected';
        }
        return (
            <li key={item.id} className="react-multi-select-list-option">
                <div className={className} value={item.id} label={item.text} onClick={this.handleSelect.bind(this, item)}>{item.text}</div>
            </li>
        )
    },

    renderSelectOption() {
        return (
            <ul className="react-multi-select-col">
                {
                    this.state.options.map((item, index) => {
                        return this.renderOption(item, index + '', '');
                    })
                    }
            </ul>
        )
    },

    renderSelectedOption(item, index) {
        return (
            <li key={item.id} className="selected-option-row" onClick={this.handleSelectedOptionClick.bind(this, index)}>{item.text}</li>
        )
    },

    renderSelectedValue() {
        return (
            <div className="react-multi-select-col">
                <div className="react-multiple-select-type-name">{this.props.selectedLabel + this.props.nameText}：</div>
                <ul>
                {
                    this.state.pendingValue.map((item, index) => {
                        return this.renderSelectedOption(item, index);
                    })
                    }
                </ul>
            </div>
        )
    },

    renderSelectOptBtn() {
        return (
            <div className="react-multi-select-area-btn">
                <button className="react-multi-select-btn" onClick={this.handleConfirm}>{this.props.confirmText}</button>
                <button className="react-multi-select-btn react-multi-select-btn-white" onClick={this.handleCancel}>{this.props.cancelText}</button>
            </div>
        )
    },

    renderSelectArea() {
        let className = 'react-multi-select-area'
        if (!this.state.open) {
            className += ' react-multi-select-box-hidden'
        }
        return (
            <div className={className} ref="selectArea" tabIndex="0" onBlur={this.handleBlur} onFocus={this.handleFocus}>
                <div className="react-multi-select-panel" tabIndex="-1">
                    {this.renderSelectOption()}
                    <div className="react-multi-select-sign">
                        <i/>
                    </div>
                    {this.renderSelectedValue()}
                </div>
                {this.renderSelectOptBtn()}
            </div>
        );
    },

    render() {
        let className = 'react-multi-select-box-container'
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        if (!this.hasValue()) {
            className += ' react-multi-select-box-empty';
        }
        return (
            <div className={className} id={this.state.id}>
                {this.renderButton()}
                {this.renderSelectArea()}
            </div>
        )
    }
});


module.exports = MultipleSelectBoxList;