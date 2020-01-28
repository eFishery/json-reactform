import React from 'react';
import { Modal, ModalHeader, ModalBody, Spinner, ModalFooter, Button, FormGroup, Label, Col, CustomInput, Input, Form } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { MdCheckCircle, MdError, MdQuestionAnswer } from 'react-icons/md';
import Select from 'react-select';

var ModalSpinner = function ModalSpinner(_ref) {
  var _ref$isOpen = _ref.isOpen,
      isOpen = _ref$isOpen === void 0 ? false : _ref$isOpen,
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? '' : _ref$message,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? '' : _ref$type,
      _ref$onAccept = _ref.onAccept,
      onAccept = _ref$onAccept === void 0 ? function () {
    return false;
  } : _ref$onAccept,
      _ref$onDismiss = _ref.onDismiss,
      onDismiss = _ref$onDismiss === void 0 ? function () {
    return false;
  } : _ref$onDismiss,
      _ref$btnAcceptId = _ref.btnAcceptId,
      btnAcceptId = _ref$btnAcceptId === void 0 ? '' : _ref$btnAcceptId;
  return React.createElement(Modal, {
    isOpen: isOpen,
    centered: true,
    returnFocusAfterClose: false,
    backdrop: "static"
  }, React.createElement(ModalHeader, null, "Pop-Up Message"), React.createElement(ModalBody, {
    className: "d-flex align-items-center font-weight-bold"
  }, type === 'loading' ? React.createElement(Spinner, {
    color: "success",
    className: "mr-2"
  }) : null, type === 'success' ? React.createElement(MdCheckCircle, {
    className: "text-success",
    size: 30
  }) : null, type === 'error' ? React.createElement(MdError, {
    className: "text-danger",
    size: 30
  }) : null, type === 'confirm' ? React.createElement(MdQuestionAnswer, {
    className: "text-dark",
    size: 30
  }) : null, React.createElement("span", {
    style: {
      fontSize: '18px'
    },
    className: "ml-3"
  }, message)), type !== 'loading' ? React.createElement(ModalFooter, null, React.createElement(Button, {
    color: "danger",
    onClick: onDismiss
  }, type === 'confirm' ? 'Cancel' : 'Close'), type === 'confirm' ? React.createElement(Button, {
    color: "primary",
    id: btnAcceptId,
    onClick: onAccept
  }, "Yes") : null) : null);
};

ModalSpinner.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.oneOf(['loading', 'success', 'error', 'confirm']),
  onDismiss: PropTypes.func,
  onAccept: PropTypes.func
};

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var CustomDatePicker = React.forwardRef(function (_ref, ref) {
  var onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      value = _ref.value,
      id = _ref.id,
      onClick = _ref.onClick,
      name = _ref.name;
  return React.createElement(Input, {
    ref: ref,
    onChange: onChange,
    placeholder: placeholder,
    value: value,
    id: id,
    name: name,
    onClick: onClick
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
  var defaultState = Object.keys(model).reduce(function (a, b) {
    return a[b] = model[b].type === 'date' ? new Date().toISOString() : model[b].type === 'checkbox' ? [] : "", a;
  }, {});

  var _React$useState = React.useState(defaultState),
      state = _React$useState[0],
      setState = _React$useState[1];

  var prevState = usePrevious(state);

  var _React$useState2 = React.useState({
    open: false,
    type: 'loading',
    // success, error
    message: ''
  }),
      modal = _React$useState2[0],
      setModal = _React$useState2[1];

  var clearRequest = function clearRequest() {
    cancelSource.cancel('component unmounted');
  };

  var formItems = [];

  var onFormSubmit = function onFormSubmit(e) {
    e.preventDefault();
    setModal(function (values) {
      return _extends({}, values, {
        type: 'loading',
        message: 'Saving..',
        open: true
      });
    });
    var newState = Object.keys(state).reduce(function (a, b) {
      return a[b] = model[b].type === 'number' ? parseInt(state[b]) : state[b], a;
    }, {});
    onSubmit(newState).then(function () {
      setState(defaultState);
      setModal(function (values) {
        return _extends({}, values, {
          type: 'success',
          message: 'Success'
        });
      });
    })["catch"](function (err) {
      console.log("GAGAL", err);
      setModal(function (values) {
        return _extends({}, values, {
          type: 'error',
          message: 'Failed to Save'
        });
      });
    });
  };

  var onChangeState = function onChangeState(e) {
    var changedObject = {};
    var _e$currentTarget = e.currentTarget,
        value = _e$currentTarget.value,
        name = _e$currentTarget.name; // const value = e.currentTarget.value

    changedObject[name] = value;
    setState(_extends({}, state, {}, changedObject));
  }; // khususon onchange si react-select


  var onChangeStateSelect = function onChangeStateSelect(name, selectedOption) {
    var changedObject = {}; // const value = e.currentTarget.value

    changedObject[name] = selectedOption === null ? '' : selectedOption;
    setState(_extends({}, state, {}, changedObject));
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
        selected: new Date(state[key]),
        onChange: function onChange(value) {
          return onChangeStateDate(key, value);
        },
        dateFormat: "dd/MM/yyyy",
        customInput: React.createElement(CustomDatePicker, null)
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
        return model[key].options.length > 0 ? React.createElement(React.Fragment, null, React.createElement(Select, {
          name: key,
          id: key,
          searchable: true,
          isClearable: true,
          required: model[key].required,
          defaultValue: model[key].options[0].value || '',
          value: state[key],
          onChange: function onChange(option) {
            return onChangeStateSelect(key, option);
          },
          options: model[key].options
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
          id: item.value,
          key: item.value,
          name: key,
          value: item.value,
          checked: state[key].includes(item.value),
          required: index === 0 && state[key].length === 0 && model[key].required,
          onChange: function onChange(e) {
            return onChangeStateCheckbox(key, e.target.value);
          }
        });
      }))));
    } else {
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
      }, React.createElement(Input, {
        type: model[key].type,
        onChange: onChangeState,
        value: state[key],
        name: key,
        id: key,
        required: model[key].required
      }))));
    }
  });
  React.useEffect(function () {
    return function () {
      clearRequest();
    };
  }, []);
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
    onSubmit: onFormSubmit
  }, formItems, React.createElement(Button, {
    color: "success"
  }, "Submit")), React.createElement(ModalSpinner, {
    isOpen: modal.open,
    type: modal.type,
    message: modal.message,
    onDismiss: function onDismiss() {
      return setModal(function (values) {
        return _extends({}, values, {
          open: false
        });
      });
    }
  }));
});

export default index;
