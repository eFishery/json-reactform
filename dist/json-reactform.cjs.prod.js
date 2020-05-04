"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var React = require("react"), React__default = _interopDefault(React), reactstrap = require("reactstrap"), Select = _interopDefault(require("react-select")), CreatableSelect = _interopDefault(require("react-select/creatable")), reactHookForm = require("react-hook-form"), DatePicker = _interopDefault(require("react-datepicker"));

function numberToCurrency(n) {
  return ("string" != typeof n ? String(n) : n).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

require("react-datepicker/dist/react-datepicker.css");

var InputDefault = React__default.memo((function(_ref) {
  var type = _ref.type, value = _ref.value, setValue = _ref.setValue, keyValue = _ref.keyValue, model = _ref.model, register = _ref.register, errors = _ref.errors;
  return "currency" === type && setValue(keyValue, numberToCurrency(value)), React__default.createElement(reactstrap.FormGroup, {
    key: keyValue,
    row: !0,
    className: "mb-4"
  }, React__default.createElement(reactstrap.Label, {
    for: keyValue,
    sm: 4
  }, keyValue, " ", model.required ? "*" : null), React__default.createElement(reactstrap.Col, {
    sm: 8,
    className: "d-flex flex-column"
  }, React__default.createElement(reactstrap.Input, {
    innerRef: register,
    type: model.type,
    name: keyValue,
    id: keyValue,
    disabled: model.disabled,
    placeholder: model.placeholder
  }), errors[keyValue] && React__default.createElement(reactstrap.Alert, {
    color: "danger"
  }, errors[keyValue].message)));
}), (function(prevProps, nextProps) {
  return prevProps.value === nextProps.value && prevProps.errors[prevProps.keyValue] === nextProps.errors[nextProps.keyValue];
}));

function _extends() {
  return (_extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }).apply(this, arguments);
}

var InputSelect = React__default.memo((function(_ref) {
  var SelectComponent, keyValue = _ref.keyValue, model = _ref.model, options = _ref.options, control = _ref.control, rules = _ref.rules, errors = _ref.errors, _useState = React.useState(options), optionsFilter = _useState[0], setOptionsFilter = _useState[1];
  return React__default.createElement(reactstrap.FormGroup, {
    key: keyValue,
    row: !0,
    className: "mb-4"
  }, React__default.createElement(reactstrap.Label, {
    for: keyValue,
    sm: 4
  }, keyValue, " ", model.required ? "*" : null), React__default.createElement(reactstrap.Col, {
    sm: 8,
    className: "d-flex flex-column"
  }, (SelectComponent = model.createable ? CreatableSelect : Select, optionsFilter.length > 0 ? React__default.createElement(React__default.Fragment, null, React__default.createElement(reactHookForm.Controller, {
    name: keyValue,
    control: control,
    rules: rules,
    onChange: function(_ref2) {
      return _ref2[0];
    },
    as: React__default.createElement(SelectComponent, {
      searchable: !0,
      isClearable: !0,
      options: optionsFilter,
      onCreateOption: function(inputValue) {
        return function(name, label, onCreateOption) {
          var newOptionObject = onCreateOption(label), optionsObject = {};
          optionsObject[name] = [].concat(optionsFilter[name], [ newOptionObject ]), setOptionsFilter(_extends({}, optionsFilter, {}, optionsObject));
        }(keyValue, inputValue, model.onCreateOption);
      },
      isDisabled: model.disabled,
      placeholder: model.placeholder
    })
  })) : React__default.createElement(reactstrap.Spinner, null)), errors[keyValue] && React__default.createElement(reactstrap.Alert, {
    color: "danger"
  }, errors[keyValue].message)));
})), InputDate = React__default.memo((function(_ref) {
  var value = _ref.value, keyValue = _ref.keyValue, rules = _ref.rules, model = _ref.model, control = _ref.control, errors = _ref.errors, CustomDatePicker = React__default.forwardRef((function(_ref2, ref) {
    var onChange = _ref2.onChange, placeholder = _ref2.placeholder, value = _ref2.value, id = _ref2.id, onClick = _ref2.onClick, name = _ref2.name, disabled = _ref2.disabled, required = _ref2.required;
    return React__default.createElement(reactstrap.Input, {
      ref: ref,
      onChange: onChange,
      placeholder: placeholder,
      value: value,
      id: id,
      name: name,
      onClick: onClick,
      disabled: disabled,
      required: required
    });
  }));
  return React__default.createElement(reactstrap.FormGroup, {
    key: keyValue,
    row: !0,
    className: "mb-4"
  }, React__default.createElement(reactstrap.Label, {
    for: keyValue,
    sm: 4
  }, keyValue, " ", rules.required ? "*" : null), React__default.createElement(reactstrap.Col, {
    sm: 8,
    className: "d-flex flex-column"
  }, React__default.createElement(reactHookForm.Controller, {
    name: keyValue,
    control: control,
    rules: rules,
    onChange: function(_ref3) {
      return _ref3[0];
    },
    as: React__default.createElement(DatePicker, {
      selected: value ? new Date(value) : "",
      dateFormat: model.format || "dd-MM-yyyy",
      showTimeSelect: !1,
      customInput: React__default.createElement(CustomDatePicker, null),
      todayButton: "Today",
      dropdownMode: "select",
      isClearable: !0,
      shouldCloseOnSelect: !0,
      placeholderText: model.placeholder
    })
  }), errors[keyValue] && React__default.createElement(reactstrap.Alert, {
    color: "danger"
  }, errors[keyValue].message)));
}));

function _extends$1() {
  return (_extends$1 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }).apply(this, arguments);
}

var CustomDatePicker = React__default.forwardRef((function(_ref, ref) {
  var onChange = _ref.onChange, placeholder = _ref.placeholder, value = _ref.value, id = _ref.id, onClick = _ref.onClick, name = _ref.name, disabled = _ref.disabled, required = _ref.required;
  return React__default.createElement(reactstrap.Input, {
    ref: ref,
    onChange: onChange,
    placeholder: placeholder,
    value: value,
    id: id,
    name: name,
    onClick: onClick,
    disabled: disabled,
    required: required
  });
}));

function usePrevious(value) {
  var ref = React__default.useRef();
  return React__default.useEffect((function() {
    ref.current = value;
  })), ref.current;
}

var index = function(_ref2) {
  var model = _ref2.model, onSubmit = _ref2.onSubmit, onChange = _ref2.onChange, _useForm = reactHookForm.useForm({
    defaultValues: Object.getOwnPropertyNames(model).reduce((function(o, key) {
      var _Object$assign;
      return "currency" === model[key].type && (model[key].defaultValue = numberToCurrency(model[key].defaultValue)), 
      "select" === model[key].type && (model[key].defaultValue = model[key].options.find((function(option) {
        return option.value === model[key].defaultValue;
      }))), Object.assign(o, ((_Object$assign = {})[key] = model[key].defaultValue, _Object$assign));
    }), {})
  }), control = _useForm.control, register = _useForm.register, errors = _useForm.errors, watch = _useForm.watch, setValue = _useForm.setValue, getValues = _useForm.getValues, handleSubmit = _useForm.handleSubmit, values = watch();
  console.log(values);
  var defaultState = Object.keys(model).reduce((function(a, b) {
    var _model$b = model[b], defaultValue = _model$b.defaultValue, type = _model$b.type;
    if ("date" === type) a[b] = defaultValue ? defaultValue.toISOString() : ""; else if ("select" === type) a[b] = defaultValue ? model[b].options.find((function(option) {
      return option.value === defaultValue;
    })) : ""; else if ("checkbox" === type) a[b] = defaultValue && defaultValue.length ? defaultValue : []; else {
      if ("submit" === type) return a;
      a[b] = defaultValue || "";
    }
    return a;
  }), {}), defaultCurrency = Object.keys(model).reduce((function(a, b) {
    var defaultValue = model[b].defaultValue;
    return "currency" === model[b].type && (a[b] = numberToCurrency(defaultValue) || ""), 
    a;
  }), {}), defaultOptions = Object.keys(model).reduce((function(a, b) {
    return "select" === model[b].type && (a[b] = model[b].options), a;
  }), {}), formItems = [], _React$useState = React__default.useState(defaultState), state = _React$useState[0], setState = _React$useState[1], _React$useState2 = React__default.useState(defaultCurrency), _React$useState3 = (_React$useState2[0], 
  _React$useState2[1], React__default.useState(defaultOptions)), prevState = (_React$useState3[0], 
  _React$useState3[1], usePrevious(state)), _React$useState4 = React__default.useState({
    open: !1,
    type: "loading",
    message: ""
  }), onChangeState = (_React$useState4[0], _React$useState4[1], function(e) {
    var changedObject = {}, _e$currentTarget = e.currentTarget, value = _e$currentTarget.value;
    changedObject[_e$currentTarget.name] = value, setState(_extends$1({}, state, {}, changedObject));
  });
  return Object.keys(model).forEach((function(key) {
    "date" === model[key].type ? formItems.push(React__default.createElement(InputDate, {
      keyValue: key,
      control: control,
      rules: model[key].validation,
      value: getValues(key),
      model: model[key],
      errors: errors
    })) : "select" === model[key].type ? formItems.push(React__default.createElement(InputSelect, {
      control: control,
      rules: model[key].validation,
      value: getValues(key),
      keyValue: key,
      model: model[key],
      options: model[key].options,
      errors: errors
    })) : "checkbox" === model[key].type ? formItems.push(React__default.createElement(reactstrap.FormGroup, {
      key: key,
      row: !0,
      className: "mb-4"
    }, React__default.createElement(reactstrap.Label, {
      for: key,
      sm: 4
    }, key, " ", model[key].required ? "*" : null), React__default.createElement(reactstrap.Col, {
      sm: 8,
      className: "d-flex flex-column"
    }, model[key].options.map((function(item, index) {
      return React__default.createElement(reactstrap.CustomInput, {
        type: "checkbox",
        label: item.label,
        id: item.label,
        key: item.label,
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
            })) : [].concat(state[key], [ value ]), setState(_extends$1({}, state, {}, changedObject));
          }(key, e.target.value);
        }
      });
    }))))) : "radio" === model[key].type ? formItems.push(React__default.createElement(reactstrap.FormGroup, {
      key: key,
      row: !0,
      className: "mb-4"
    }, React__default.createElement(reactstrap.Label, {
      for: key,
      sm: 4
    }, key, " ", model[key].required ? "*" : null), React__default.createElement(reactstrap.Col, {
      sm: 8,
      className: "d-flex flex-column"
    }, model[key].options.map((function(item, index) {
      return React__default.createElement(reactstrap.CustomInput, {
        type: "radio",
        label: item.label,
        id: item.label,
        key: item.label,
        name: key,
        value: item.value,
        checked: state[key] === item.value,
        required: model[key].required,
        disabled: model[key].disabled,
        onChange: onChangeState
      });
    }))))) : "submit" === model[key].type ? formItems.push(React__default.createElement(reactstrap.Row, {
      key: key,
      className: "mb-4"
    }, React__default.createElement(reactstrap.Col, {
      sm: 4
    }), React__default.createElement(reactstrap.Col, {
      sm: 8
    }, React__default.createElement(reactstrap.Button, {
      type: model[key].type,
      color: "success",
      disabled: model[key].disabled
    }, key)))) : formItems.push(React__default.createElement("div", null, React__default.createElement(InputDefault, {
      value: getValues(key),
      setValue: setValue,
      type: model[key].type,
      keyValue: key,
      model: model[key],
      register: register(model[key].validation),
      errors: errors
    })));
  })), React__default.useEffect((function() {
    if (onChange) {
      var changedObject = [];
      prevState && Object.keys(prevState).length > 0 && (Object.keys(prevState).forEach((function(key) {
        prevState[key] !== state[key] && changedObject.push(key);
      })), onChange({
        value: state,
        changed: changedObject
      }));
    }
  }), [ state ]), React__default.createElement(React__default.Fragment, null, React__default.createElement(reactstrap.Form, {
    onSubmit: handleSubmit(onSubmit)
  }, formItems));
};

exports.default = index;
