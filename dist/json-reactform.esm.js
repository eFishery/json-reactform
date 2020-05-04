import React from 'react';
import { FormGroup, Label, Col, Input, Alert, Spinner, CustomInput, Row, Button, Form } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useForm } from 'react-hook-form';

function numberToCurrency(n) {
  // format number 1000000 to 1,234,567
  var str = typeof n !== 'string' ? String(n) : n;
  return str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var InputDefault = React.memo(function (_ref) {
  var type = _ref.type,
      value = _ref.value,
      setValue = _ref.setValue,
      keyValue = _ref.keyValue,
      model = _ref.model,
      register = _ref.register,
      errors = _ref.errors;

  if (type === 'currency') {
    setValue(keyValue, numberToCurrency(value));
  }

  return React.createElement(FormGroup, {
    key: keyValue,
    row: true,
    className: "mb-4"
  }, React.createElement(Label, {
    "for": keyValue,
    sm: 4
  }, keyValue, " ", model.required ? '*' : null), React.createElement(Col, {
    sm: 8,
    className: "d-flex flex-column"
  }, React.createElement(Input, {
    innerRef: register,
    type: model.type,
    name: keyValue,
    id: keyValue,
    disabled: model.disabled,
    placeholder: model.placeholder
  }), errors[keyValue] && React.createElement(Alert, {
    color: "danger"
  }, errors[keyValue].message)));
}, function (prevProps, nextProps) {
  return prevProps.value === nextProps.value && prevProps.errors[prevProps.keyValue] === nextProps.errors[nextProps.keyValue];
});

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var CustomDatePicker = React.forwardRef(function (_ref, ref) {
  var onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      value = _ref.value,
      id = _ref.id,
      onClick = _ref.onClick,
      name = _ref.name,
      disabled = _ref.disabled,
      required = _ref.required;
  return React.createElement(Input, {
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
});

function usePrevious(value) {
  var ref = React.useRef();
  React.useEffect(function () {
    ref.current = value;
  });
  return ref.current;
}

var index = (function (_ref2) {
  var model = _ref2.model,
      onSubmit = _ref2.onSubmit,
      onChange = _ref2.onChange;

  var _useForm = useForm(),
      register = _useForm.register,
      errors = _useForm.errors,
      watch = _useForm.watch,
      setValue = _useForm.setValue,
      getValues = _useForm.getValues,
      handleSubmit = _useForm.handleSubmit;

  var watchAll = watch();
  console.log(watchAll);
  var defaultState = Object.keys(model).reduce(function (a, b) {
    var _model$b = model[b],
        defaultValue = _model$b.defaultValue,
        type = _model$b.type;

    if (type === 'date') {
      a[b] = defaultValue ? defaultValue.toISOString() : '';
    } else if (type === 'select') {
      a[b] = defaultValue ? model[b].options.find(function (option) {
        return option.value === defaultValue;
      }) : '';
    } else if (type === 'checkbox') {
      a[b] = defaultValue && defaultValue.length ? defaultValue : [];
    } else if (type === 'submit') {
      return a;
    } else {
      a[b] = defaultValue || '';
    }

    return a;
  }, {});
  var defaultCurrency = Object.keys(model).reduce(function (a, b) {
    var defaultValue = model[b].defaultValue;

    if (model[b].type === 'currency') {
      a[b] = numberToCurrency(defaultValue) || '';
    }

    return a;
  }, {});
  var defaultOptions = Object.keys(model).reduce(function (a, b) {
    if (model[b].type === 'select') {
      a[b] = model[b].options;
    }

    return a;
  }, {});
  var formItems = [];

  var _React$useState = React.useState(defaultState),
      state = _React$useState[0],
      setState = _React$useState[1];

  var _React$useState2 = React.useState(defaultCurrency),
      currency = _React$useState2[0],
      setCurrency = _React$useState2[1];

  var _React$useState3 = React.useState(defaultOptions),
      options = _React$useState3[0],
      setOptions = _React$useState3[1];

  var prevState = usePrevious(state);

  var _React$useState4 = React.useState({
    open: false,
    type: 'loading',
    // success, error
    message: ''
  }),
      modal = _React$useState4[0],
      setModal = _React$useState4[1];

  var onChangeState = function onChangeState(e) {
    var changedObject = {};
    var _e$currentTarget = e.currentTarget,
        value = _e$currentTarget.value,
        name = _e$currentTarget.name; // const value = e.currentTarget.value

    changedObject[name] = value;
    setState(_extends({}, state, {}, changedObject));
  };


  var onChangeStateSelect = function onChangeStateSelect(name, selectedOption) {
    var changedObject = {}; // const value = e.currentTarget.value

    changedObject[name] = selectedOption === null ? '' : selectedOption;
    setState(_extends({}, state, {}, changedObject));
  };

  var onCreateOptionSelect = function onCreateOptionSelect(name, label, onCreateOption) {
    var newOptionObject = onCreateOption(label);
    var optionsObject = {};
    optionsObject[name] = [].concat(options[name], [newOptionObject]);
    setOptions(_extends({}, options, {}, optionsObject));
  }; // onchange checkbox


  var onChangeStateCheckbox = function onChangeStateCheckbox(key, value) {
    var changedObject = {};
    changedObject[key] = state[key].includes(value) ? state[key].filter(function (item) {
      return item != value;
    }) : [].concat(state[key], [value]);
    setState(_extends({}, state, {}, changedObject));
  };

  var onChangeStateDate = function onChangeStateDate(key, value) {
    var changedObject = {};
    changedObject[key] = value.toISOString();
    setState(_extends({}, state, {}, changedObject));
  };

  Object.keys(model).forEach(function (key) {
    if (model[key].type === 'date') {
      formItems.push(React.createElement(FormGroup, {
        key: key,
        row: true,
        className: "mb-4"
      }, React.createElement(Label, {
        "for": key,
        sm: 4
      }, key, " ", model[key].required ? '*' : null), React.createElement(Col, {
        sm: 8,
        className: "d-flex flex-column"
      }, React.createElement(DatePicker, {
        id: key,
        name: key,
        selected: state[key] ? new Date(state[key]) : '',
        onChange: function onChange(value) {
          return onChangeStateDate(key, value);
        },
        dateFormat: model[key].format || 'dd-MM-yyyy',
        customInput: React.createElement(CustomDatePicker, null),
        disabled: model[key].disabled,
        placeholderText: model[key].placeholder,
        required: model[key].required
      }))));
    } else if (model[key].type === 'select') {
      formItems.push(React.createElement(FormGroup, {
        key: key,
        row: true,
        className: "mb-4"
      }, React.createElement(Label, {
        "for": key,
        sm: 4
      }, key, " ", model[key].required ? '*' : null), React.createElement(Col, {
        sm: 8,
        className: "d-flex flex-column"
      }, function () {
        var SelectComponent = model[key].createable ? CreatableSelect : Select;
        return options[key].length > 0 ? React.createElement(React.Fragment, null, React.createElement(SelectComponent, {
          name: key,
          id: key,
          searchable: true,
          isClearable: true,
          required: model[key].required,
          value: state[key],
          options: options[key],
          onChange: function onChange(option) {
            return onChangeStateSelect(key, option);
          },
          onCreateOption: function onCreateOption(inputValue) {
            return onCreateOptionSelect(key, inputValue, model[key].onCreateOption);
          },
          isDisabled: model[key].disabled,
          placeholder: model[key].placeholder
        }), React.createElement("input", {
          // this field hidden, for detect validation only
          tabIndex: -1,
          autoComplete: "off",
          style: {
            opacity: 0,
            height: 0
          },
          value: state[key],
          required: model[key].required,
          onChange: function onChange(e) {
            return e.preventDefault();
          }
        })) : React.createElement(Spinner, null);
      }())));
    } else if (model[key].type === 'checkbox') {
      formItems.push(React.createElement(FormGroup, {
        key: key,
        row: true,
        className: "mb-4"
      }, React.createElement(Label, {
        "for": key,
        sm: 4
      }, key, " ", model[key].required ? '*' : null), React.createElement(Col, {
        sm: 8,
        className: "d-flex flex-column"
      }, model[key].options.map(function (item, index) {
        return React.createElement(CustomInput, {
          type: "checkbox",
          label: item.label,
          id: item.label,
          key: item.label,
          name: key,
          value: item.value,
          checked: state[key].includes(item.value),
          required: index === 0 && state[key].length === 0 && model[key].required,
          disabled: model[key].disabled,
          onChange: function onChange(e) {
            return onChangeStateCheckbox(key, e.target.value);
          }
        });
      }))));
    } else if (model[key].type === 'radio') {
      formItems.push(React.createElement(FormGroup, {
        key: key,
        row: true,
        className: "mb-4"
      }, React.createElement(Label, {
        "for": key,
        sm: 4
      }, key, " ", model[key].required ? '*' : null), React.createElement(Col, {
        sm: 8,
        className: "d-flex flex-column"
      }, model[key].options.map(function (item, index) {
        return React.createElement(CustomInput, {
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
      }))));
    } else if (model[key].type === 'submit') {
      formItems.push(React.createElement(Row, {
        key: key,
        className: "mb-4"
      }, React.createElement(Col, {
        sm: 4
      }), React.createElement(Col, {
        sm: 8
      }, React.createElement(Button, {
        type: model[key].type,
        color: "success",
        disabled: model[key].disabled
      }, key))));
    } else {
      formItems.push(React.createElement("div", null, React.createElement(InputDefault, {
        value: getValues(key),
        setValue: setValue,
        type: model[key].type,
        keyValue: key,
        model: model[key],
        register: register(model[key].validation),
        errors: errors
      })));
    }
  });
  React.useEffect(function () {
    if (onChange) {
      var changedObject = [];

      if (prevState && Object.keys(prevState).length > 0) {
        Object.keys(prevState).forEach(function (key) {
          if (prevState[key] !== state[key]) {
            changedObject.push(key);
          }
        });
        onChange({
          value: state,
          changed: changedObject
        });
      }
    }
  }, [state]);
  return React.createElement(React.Fragment, null, React.createElement(Form, {
    onSubmit: handleSubmit(onSubmit)
  }, formItems));
});

export default index;
