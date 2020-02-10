"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var React = _interopDefault(require("react")), reactstrap = require("reactstrap"), DatePicker = _interopDefault(require("react-datepicker"));

require("react-datepicker/dist/react-datepicker.css");

var PropTypes = _interopDefault(require("prop-types")), md = require("react-icons/md"), Select = _interopDefault(require("react-select")), ModalSpinner = function(_ref) {
  var _ref$isOpen = _ref.isOpen, isOpen = void 0 !== _ref$isOpen && _ref$isOpen, _ref$message = _ref.message, message = void 0 === _ref$message ? "" : _ref$message, _ref$type = _ref.type, type = void 0 === _ref$type ? "" : _ref$type, _ref$onAccept = _ref.onAccept, onAccept = void 0 === _ref$onAccept ? function() {
    return !1;
  } : _ref$onAccept, _ref$onDismiss = _ref.onDismiss, onDismiss = void 0 === _ref$onDismiss ? function() {
    return !1;
  } : _ref$onDismiss, _ref$btnAcceptId = _ref.btnAcceptId, btnAcceptId = void 0 === _ref$btnAcceptId ? "" : _ref$btnAcceptId;
  return React.createElement(reactstrap.Modal, {
    isOpen: isOpen,
    centered: !0,
    returnFocusAfterClose: !1,
    backdrop: "static"
  }, React.createElement(reactstrap.ModalHeader, null, "Pop-Up Message"), React.createElement(reactstrap.ModalBody, {
    className: "d-flex align-items-center font-weight-bold"
  }, "loading" === type ? React.createElement(reactstrap.Spinner, {
    color: "success",
    className: "mr-2"
  }) : null, "success" === type ? React.createElement(md.MdCheckCircle, {
    className: "text-success",
    size: 30
  }) : null, "error" === type ? React.createElement(md.MdError, {
    className: "text-danger",
    size: 30
  }) : null, "confirm" === type ? React.createElement(md.MdQuestionAnswer, {
    className: "text-dark",
    size: 30
  }) : null, React.createElement("span", {
    style: {
      fontSize: "18px"
    },
    className: "ml-3"
  }, message)), "loading" !== type ? React.createElement(reactstrap.ModalFooter, null, React.createElement(reactstrap.Button, {
    color: "danger",
    onClick: onDismiss
  }, "confirm" === type ? "Cancel" : "Close"), "confirm" === type ? React.createElement(reactstrap.Button, {
    color: "primary",
    id: btnAcceptId,
    onClick: onAccept
  }, "Yes") : null) : null);
};

function _extends() {
  return (_extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }).apply(this, arguments);
}

ModalSpinner.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.oneOf([ "loading", "success", "error", "confirm" ]),
  onDismiss: PropTypes.func,
  onAccept: PropTypes.func
};

var CustomDatePicker = React.forwardRef((function(_ref, ref) {
  var onChange = _ref.onChange, placeholder = _ref.placeholder, value = _ref.value, id = _ref.id, onClick = _ref.onClick, name = _ref.name;
  return React.createElement(reactstrap.Input, {
    ref: ref,
    onChange: onChange,
    placeholder: placeholder,
    value: value,
    id: id,
    name: name,
    onClick: onClick
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
    return a[b] = "date" === model[b].type ? (new Date).toISOString() : "checkbox" === model[b].type ? [] : "", 
    a;
  }), {}), _React$useState = React.useState(defaultState), state = _React$useState[0], setState = _React$useState[1], prevState = usePrevious(state), _React$useState2 = React.useState({
    open: !1,
    type: "loading",
    message: ""
  }), modal = _React$useState2[0], setModal = _React$useState2[1], formItems = [], onChangeState = function(e) {
    var changedObject = {}, _e$currentTarget = e.currentTarget, value = _e$currentTarget.value;
    changedObject[_e$currentTarget.name] = value, setState(_extends({}, state, {}, changedObject));
  };
  return Object.keys(model).forEach((function(key) {
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
      customInput: React.createElement(CustomDatePicker, null)
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
    }, model[key].options.length > 0 ? React.createElement(React.Fragment, null, React.createElement(Select, {
      name: key,
      id: key,
      searchable: !0,
      isClearable: !0,
      required: model[key].required,
      defaultValue: model[key].options[0].value || "",
      value: state[key],
      onChange: function(option) {
        return (changedObject = {})[key] = null === (selectedOption = option) ? "" : selectedOption, 
        void setState(_extends({}, state, {}, changedObject));
        var selectedOption, changedObject;
      },
      options: model[key].options
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
    })) : React.createElement(reactstrap.Spinner, null)))) : "checkbox" === model[key].type ? formItems.push(React.createElement(reactstrap.FormGroup, {
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
        onChange: onChangeState
      });
    }))))) : "submit" === model[key].type ? formItems.push(React.createElement(reactstrap.Row, {
      key: key,
      row: !0,
      className: "mb-4"
    }, React.createElement(reactstrap.Col, {
      sm: 4
    }), React.createElement(reactstrap.Col, {
      sm: 8
    }, React.createElement(reactstrap.Button, {
      type: model[key].type,
      color: "success"
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
      required: model[key].required
    }))));
  })), React.useEffect((function() {
    return function() {
      cancelSource.cancel("component unmounted");
    };
  }), []), React.useEffect((function() {
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
      e.preventDefault(), setModal((function(values) {
        return _extends({}, values, {
          type: "loading",
          message: "Saving..",
          open: !0
        });
      }));
      var newState = Object.keys(state).reduce((function(a, b) {
        return a[b] = "number" === model[b].type ? parseInt(state[b]) : state[b], a;
      }), {});
      onSubmit(newState).then((function() {
        setState(defaultState), setModal((function(values) {
          return _extends({}, values, {
            type: "success",
            message: "Success"
          });
        }));
      })).catch((function(err) {
        console.log("GAGAL", err), setModal((function(values) {
          return _extends({}, values, {
            type: "error",
            message: "Failed to Save"
          });
        }));
      }));
    }
  }, formItems), React.createElement(ModalSpinner, {
    isOpen: modal.open,
    type: modal.type,
    message: modal.message,
    onDismiss: function() {
      return setModal((function(values) {
        return _extends({}, values, {
          open: !1
        });
      }));
    }
  }));
};

exports.default = index;
