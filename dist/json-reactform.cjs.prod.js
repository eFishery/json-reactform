"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var React = _interopDefault(require("react")), reactstrap = require("reactstrap"), DatePicker = _interopDefault(require("react-datepicker"));

require("react-datepicker/dist/react-datepicker.css");

var Select = _interopDefault(require("react-select")), CreatableSelect = _interopDefault(require("react-select/creatable"));

function numberToCurrency(n) {
  return ("string" != typeof n ? String(n) : n).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function currencyToNumber(n) {
  return ("string" != typeof n ? String(n) : n).replace(/[\,\.]/g, "");
}

function _extends() {
  return (_extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }).apply(this, arguments);
}

var CustomDatePicker = React.forwardRef((function(_ref, ref) {
  var onChange = _ref.onChange, placeholder = _ref.placeholder, value = _ref.value, id = _ref.id, onClick = _ref.onClick, name = _ref.name, disabled = _ref.disabled;
  return React.createElement(reactstrap.Input, {
    ref: ref,
    onChange: onChange,
    placeholder: placeholder,
    value: value,
    id: id,
    name: name,
    onClick: onClick,
    disabled: disabled
  });
}));

function usePrevious(value) {
  var ref = React.useRef();
  return React.useEffect((function() {
    ref.current = value;
  })), ref.current;
}

var index = function(_ref2) {
  var model = _ref2.model, onSubmit = _ref2.onSubmit, onChange = _ref2.onChange, defaultState = Object.keys(model).reduce((function(a, b) {
    var defaultValue = model[b].defaultValue;
    return "date" === model[b].type ? a[b] = defaultValue ? defaultValue.toISOString() : (new Date).toISOString() : "select" === model[b].type ? a[b] = defaultValue ? model[b].options.find((function(option) {
      return option.value === defaultValue;
    })) : "" : "checkbox" === model[b].type ? a[b] = defaultValue && defaultValue.length ? defaultValue : [] : a[b] = defaultValue || "", 
    a;
  }), {}), defaultCurrency = Object.keys(model).reduce((function(a, b) {
    var defaultValue = model[b].defaultValue;
    return "currency" === model[b].type && (a[b] = numberToCurrency(defaultValue) || ""), 
    a;
  }), {}), defaultOptions = Object.keys(model).reduce((function(a, b) {
    return "select" === model[b].type && (a[b] = model[b].options), a;
  }), {}), formItems = [], _React$useState = React.useState(defaultState), state = _React$useState[0], setState = _React$useState[1], _React$useState2 = React.useState(defaultCurrency), currency = _React$useState2[0], setCurrency = _React$useState2[1], _React$useState3 = React.useState(defaultOptions), options = _React$useState3[0], setOptions = _React$useState3[1], prevState = usePrevious(state), _React$useState4 = React.useState({
    open: !1,
    type: "loading",
    message: ""
  }), onChangeState = (_React$useState4[0], _React$useState4[1], function(e) {
    var changedObject = {}, _e$currentTarget = e.currentTarget, value = _e$currentTarget.value;
    changedObject[_e$currentTarget.name] = value, setState(_extends({}, state, {}, changedObject));
  }), onChangeCurrency = function(e) {
    var changedObject = {}, currencyObject = {}, _e$currentTarget2 = e.currentTarget, value = _e$currentTarget2.value, name = _e$currentTarget2.name;
    changedObject[name] = currencyToNumber(value), setState(_extends({}, state, {}, changedObject)), 
    currencyObject[name] = numberToCurrency(value), setCurrency(_extends({}, currency, {}, currencyObject));
  };
  return Object.keys(model).forEach((function(key) {
    var SelectComponent;
    "date" === model[key].type ? formItems.push(React.createElement(reactstrap.FormGroup, {
      key: key,
      row: !0,
      className: "mb-4"
    }, React.createElement(reactstrap.Label, {
      for: key,
      sm: 4
    }, key, " ", model[key].required ? "*" : null), React.createElement(reactstrap.Col, {
      sm: 8,
      className: "d-flex flex-column"
    }, React.createElement(DatePicker, {
      id: key,
      name: key,
      selected: new Date(state[key]),
      onChange: function(value) {
        return function(key, value) {
          var changedObject = {};
          changedObject[key] = value.toISOString(), setState(_extends({}, state, {}, changedObject));
        }(key, value);
      },
      dateFormat: model[key].format || "dd-MM-yyyy",
      customInput: React.createElement(CustomDatePicker, null),
      disabled: model[key].disabled,
      placeholderText: model[key].placeholder
    })))) : "select" === model[key].type ? formItems.push(React.createElement(reactstrap.FormGroup, {
      key: key,
      row: !0,
      className: "mb-4"
    }, React.createElement(reactstrap.Label, {
      for: key,
      sm: 4
    }, key, " ", model[key].required ? "*" : null), React.createElement(reactstrap.Col, {
      sm: 8,
      className: "d-flex flex-column"
    }, (SelectComponent = model[key].createable ? CreatableSelect : Select, options[key].length > 0 ? React.createElement(React.Fragment, null, React.createElement(SelectComponent, {
      name: key,
      id: key,
      searchable: !0,
      isClearable: !0,
      required: model[key].required,
      value: state[key],
      options: options[key],
      onChange: function(option) {
        return (changedObject = {})[key] = null === (selectedOption = option) ? "" : selectedOption, 
        void setState(_extends({}, state, {}, changedObject));
        var selectedOption, changedObject;
      },
      onCreateOption: function(inputValue) {
        return function(name, label, onCreateOption) {
          var newOptionObject = onCreateOption(label), optionsObject = {};
          optionsObject[name] = [].concat(options[name], [ newOptionObject ]), setOptions(_extends({}, options, {}, optionsObject));
        }(key, inputValue, model[key].onCreateOption);
      },
      isDisabled: model[key].disabled,
      placeholder: model[key].placeholder
    }), React.createElement("input", {
      tabIndex: -1,
      autoComplete: "off",
      style: {
        opacity: 0,
        height: 0
      },
      value: state[key],
      required: model[key].required,
      onChange: function(e) {
        return e.preventDefault();
      }
    })) : React.createElement(reactstrap.Spinner, null))))) : "checkbox" === model[key].type ? formItems.push(React.createElement(reactstrap.FormGroup, {
      key: key,
      row: !0,
      className: "mb-4"
    }, React.createElement(reactstrap.Label, {
      for: key,
      sm: 4
    }, key, " ", model[key].required ? "*" : null), React.createElement(reactstrap.Col, {
      sm: 8,
      className: "d-flex flex-column"
    }, model[key].options.map((function(item, index) {
      return React.createElement(reactstrap.CustomInput, {
        type: "checkbox",
        label: item.label,
        id: item.value,
        key: item.value,
        name: key,
        value: item.value,
        checked: state[key].includes(item.value),
        required: 0 === index && 0 === state[key].length && model[key].required,
        disabled: model[key].disabled,
        onChange: function(e) {
          return function(key, value) {
            var changedObject = {};
            changedObject[key] = state[key].includes(value) ? state[key].filter((function(item) {
              return item != value;
            })) : [].concat(state[key], [ value ]), setState(_extends({}, state, {}, changedObject));
          }(key, e.target.value);
        }
      });
    }))))) : "radio" === model[key].type ? formItems.push(React.createElement(reactstrap.FormGroup, {
      key: key,
      row: !0,
      className: "mb-4"
    }, React.createElement(reactstrap.Label, {
      for: key,
      sm: 4
    }, key, " ", model[key].required ? "*" : null), React.createElement(reactstrap.Col, {
      sm: 8,
      className: "d-flex flex-column"
    }, model[key].options.map((function(item, index) {
      return React.createElement(reactstrap.CustomInput, {
        type: "radio",
        label: item.label,
        id: item.value,
        key: item.value,
        name: key,
        value: item.value,
        checked: state[key].includes(item.value),
        required: model[key].required,
        disabled: model[key].disabled,
        onChange: onChangeState
      });
    }))))) : "currency" === model[key].type ? formItems.push(React.createElement(reactstrap.FormGroup, {
      key: key,
      row: !0,
      className: "mb-4"
    }, React.createElement(reactstrap.Label, {
      for: key,
      sm: 4
    }, key, " ", model[key].required ? "*" : null), React.createElement(reactstrap.Col, {
      sm: 8,
      className: "d-flex flex-column"
    }, React.createElement(reactstrap.Input, {
      type: "text",
      onChange: onChangeCurrency,
      value: currency[key],
      name: key,
      id: key,
      required: model[key].required,
      disabled: model[key].disabled,
      placeholder: model[key].placeholder
    })))) : "submit" === model[key].type ? formItems.push(React.createElement(reactstrap.Row, {
      key: key,
      className: "mb-4"
    }, React.createElement(reactstrap.Col, {
      sm: 4
    }), React.createElement(reactstrap.Col, {
      sm: 8
    }, React.createElement(reactstrap.Button, {
      type: model[key].type,
      color: "success",
      disabled: model[key].disabled
    }, key)))) : formItems.push(React.createElement(reactstrap.FormGroup, {
      key: key,
      row: !0,
      className: "mb-4"
    }, React.createElement(reactstrap.Label, {
      for: key,
      sm: 4
    }, key, " ", model[key].required ? "*" : null), React.createElement(reactstrap.Col, {
      sm: 8,
      className: "d-flex flex-column"
    }, React.createElement(reactstrap.Input, {
      type: model[key].type,
      onChange: onChangeState,
      value: state[key],
      name: key,
      id: key,
      required: model[key].required,
      disabled: model[key].disabled,
      placeholder: model[key].placeholder
    }))));
  })), React.useEffect((function() {
    if (onChange) {
      var changedObject = [];
      prevState && Object.keys(prevState).length > 0 && (Object.keys(prevState).forEach((function(key) {
        prevState[key] !== state[key] && changedObject.push(key);
      })), onChange({
        value: state,
        changed: changedObject
      }));
    }
  }), [ state ]), React.createElement(React.Fragment, null, React.createElement(reactstrap.Form, {
    onSubmit: function(e) {
      e.preventDefault(), onSubmit(state);
    }
  }, formItems));
};

exports.default = index;
