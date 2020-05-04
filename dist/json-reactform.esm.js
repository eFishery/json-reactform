import React, { useState } from 'react';
import { FormGroup, Label, Col, Input, Alert as Alert$1, Spinner, CustomInput, Row, Button, Form } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function numberToCurrency(n) {
  // format number 1000000 to 1,234,567
  var str = typeof n !== 'string' ? String(n) : n;
  return str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function currencyToNumber(n) {
  // format number 1,234,567 to 1000000
  var str = typeof n !== 'string' ? String(n) : n;
  return str.replace(/[\,\.]/g, "");
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
  }), errors[keyValue] && React.createElement(Alert$1, {
    color: "danger"
  }, errors[keyValue].message)));
}, function (prevProps, nextProps) {
  return prevProps.value === nextProps.value && prevProps.errors[prevProps.keyValue] === nextProps.errors[nextProps.keyValue];
});

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var InputSelect = React.memo(function (_ref) {
  var keyValue = _ref.keyValue,
      model = _ref.model,
      options = _ref.options,
      control = _ref.control,
      rules = _ref.rules,
      errors = _ref.errors;

  var _useState = useState(options),
      optionsFilter = _useState[0],
      setOptionsFilter = _useState[1];

  var onCreateOptionSelect = function onCreateOptionSelect(name, label, onCreateOption) {
    var newOptionObject = onCreateOption(label);
    var optionsObject = {};
    optionsObject[name] = [].concat(optionsFilter[name], [newOptionObject]);
    setOptionsFilter(_extends({}, optionsFilter, {}, optionsObject));
  };

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
  }, function () {
    var SelectComponent = model.createable ? CreatableSelect : Select;
    return optionsFilter.length > 0 ? React.createElement(React.Fragment, null, React.createElement(Controller, {
      name: keyValue,
      control: control,
      rules: rules,
      onChange: function onChange(_ref2) {
        var selected = _ref2[0];
        return selected;
      },
      as: React.createElement(SelectComponent, {
        searchable: true,
        isClearable: true,
        options: optionsFilter,
        onCreateOption: function onCreateOption(inputValue) {
          return onCreateOptionSelect(keyValue, inputValue, model.onCreateOption);
        },
        isDisabled: model.disabled,
        placeholder: model.placeholder
      })
    })) : React.createElement(Spinner, null);
  }(), errors[keyValue] && React.createElement(Alert$1, {
    color: "danger"
  }, errors[keyValue].message)));
});

var InputDate = React.memo(function (_ref) {
  var value = _ref.value,
      keyValue = _ref.keyValue,
      rules = _ref.rules,
      model = _ref.model,
      control = _ref.control,
      errors = _ref.errors;
  var CustomDatePicker = React.forwardRef(function (_ref2, ref) {
    var onChange = _ref2.onChange,
        placeholder = _ref2.placeholder,
        value = _ref2.value,
        id = _ref2.id,
        onClick = _ref2.onClick,
        name = _ref2.name,
        disabled = _ref2.disabled,
        required = _ref2.required;
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
  return React.createElement(FormGroup, {
    key: keyValue,
    row: true,
    className: "mb-4"
  }, React.createElement(Label, {
    "for": keyValue,
    sm: 4
  }, keyValue, " ", rules.required ? '*' : null), React.createElement(Col, {
    sm: 8,
    className: "d-flex flex-column"
  }, React.createElement(Controller, {
    name: keyValue,
    control: control,
    rules: rules,
    onChange: function onChange(_ref3) {
      var selected = _ref3[0];
      return selected;
    },
    as: React.createElement(DatePicker, {
      selected: value ? new Date(value) : '',
      dateFormat: model.format || 'dd-MM-yyyy',
      showTimeSelect: false,
      customInput: React.createElement(CustomDatePicker, null),
      todayButton: "Today",
      dropdownMode: "select",
      isClearable: true,
      shouldCloseOnSelect: true,
      placeholderText: model.placeholder
    })
  }), errors[keyValue] && React.createElement(Alert$1, {
    color: "danger"
  }, errors[keyValue].message)));
});

var InputCustom = React.memo(function (_ref) {
  var type = _ref.type,
      keyValue = _ref.keyValue,
      model = _ref.model,
      register = _ref.register,
      options = _ref.options,
      errors = _ref.errors;
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
  }, options.map(function (item) {
    return React.createElement(CustomInput, {
      type: type,
      innerRef: register,
      label: item.label,
      id: item.label,
      key: item.label,
      name: keyValue,
      value: item.value,
      disabled: model.disabled
    });
  }), errors[keyValue] && React.createElement(Alert, {
    color: "danger"
  }, errors[keyValue].message)));
});

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var index = (function (_ref) {
  var model = _ref.model,
      onSubmit = _ref.onSubmit;

  var _useForm = useForm({
    defaultValues: Object.getOwnPropertyNames(model).reduce(function (o, key) {
      var _Object$assign;

      if (model[key].type === 'currency') {
        model[key].defaultValue = numberToCurrency(model[key].defaultValue);
      }

      if (model[key].type === 'select') {
        model[key].defaultValue = model[key].options.find(function (option) {
          return option.value === model[key].defaultValue;
        });
      }

      return Object.assign(o, (_Object$assign = {}, _Object$assign[key] = model[key].defaultValue, _Object$assign));
    }, {})
  }),
      control = _useForm.control,
      register = _useForm.register,
      errors = _useForm.errors,
      watch = _useForm.watch,
      setValue = _useForm.setValue,
      getValues = _useForm.getValues,
      handleSubmit = _useForm.handleSubmit;

  var values = watch();
  var formItems = [];

  var onFormSubmit = function onFormSubmit(data) {
    var body = _extends$1({}, data);

    for (var _i = 0, _Object$keys = Object.keys(body); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];

      if (model[key].type === 'currency') {
        body[key] = currencyToNumber(body[key]);
      }
    }

    console.log(body);
    return body;
  };

  Object.keys(model).forEach(function (key) {
    if (model[key].type === 'date') {
      formItems.push(React.createElement(InputDate, {
        keyValue: key,
        control: control,
        rules: model[key].validation,
        value: getValues(key),
        model: model[key],
        errors: errors
      }));
    } else if (model[key].type === 'select') {
      formItems.push(React.createElement(InputSelect, {
        control: control,
        rules: model[key].validation,
        value: getValues(key),
        keyValue: key,
        model: model[key],
        options: model[key].options,
        errors: errors
      }));
    } else if (model[key].type === 'radio' || model[key].type === 'checkbox') {
      formItems.push(React.createElement(InputCustom, {
        model: model[key],
        options: model[key].options,
        keyValue: key,
        type: model[key].type,
        register: register(model[key].validation),
        errors: errors
      }));
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
  return React.createElement(React.Fragment, null, React.createElement(Form, {
    onSubmit: handleSubmit(onFormSubmit)
  }, formItems));
});

export default index;
