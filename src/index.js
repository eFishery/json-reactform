import React from 'react';
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Spinner,
  CustomInput,
  Row,
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { numberToCurrency, currencyToNumber } from './libs/helper';

const CustomDatePicker = React.forwardRef(
  ({ onChange, placeholder, value, id, onClick, name, disabled }, ref) => {
    return (
      <Input
        ref={ref}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        id={id}
        name={name}
        onClick={onClick}
        disabled={disabled}
      />
    );
  }
);

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default ({ model, onSubmit, onChange }) => {
  const defaultState = Object.keys(model).reduce((a, b) => {
    const { defaultValue, type } = model[b];
    if (type === 'date') {
      a[b] = defaultValue
        ? defaultValue.toISOString()
        : new Date().toISOString();
    } else if (type === 'select') {
      a[b] = defaultValue
        ? model[b].options.find(option => option.value === defaultValue)
        : '';
    } else if (type === 'checkbox') {
      a[b] = defaultValue && defaultValue.length ? defaultValue : [];
    } else if(type === 'submit') {
      return a;
    } else {
      a[b] = defaultValue || '';
    }
    return a;
  }, {});

  const defaultCurrency = Object.keys(model).reduce((a, b) => {
    const { defaultValue } = model[b];
    if (model[b].type === 'currency') {
      a[b] = numberToCurrency(defaultValue) || '';
    }
    return a;
  }, {});

  const defaultOptions = Object.keys(model).reduce((a, b) => {
    if (model[b].type === 'select') {
      a[b] = model[b].options;
    }
    return a;
  }, {});

	const formItems = [];
	const onFormSubmit = (e) => {
		e.preventDefault();
		onSubmit(state);
	}

  const [state, setState] = React.useState(defaultState);
  const [currency, setCurrency] = React.useState(defaultCurrency);
  const [options, setOptions] = React.useState(defaultOptions);

  const prevState = usePrevious(state);

  const [modal, setModal] = React.useState({
    open: false,
    type: 'loading', // success, error
    message: '',
  });

  const onChangeState = e => {
    const changedObject = {};
    const { value, name } = e.currentTarget;
    // const value = e.currentTarget.value
    changedObject[name] = value;
    setState({
      ...state,
      ...changedObject,
    });
  };

  const onChangeCurrency = e => {
    const changedObject = {};
    const currencyObject = {};
    const { value, name } = e.currentTarget;
    // const value = e.currentTarget.value
    changedObject[name] = currencyToNumber(value);
    setState({
      ...state,
      ...changedObject,
    });
    currencyObject[name] = numberToCurrency(value);
    setCurrency({
      ...currency,
      ...currencyObject,
    });
  };

  // khususon onchange si react-select
  const onChangeStateSelect = (name, selectedOption) => {
    const changedObject = {};
    // const value = e.currentTarget.value
    changedObject[name] = selectedOption === null ? '' : selectedOption;
    setState({
      ...state,
      ...changedObject,
    });
  };

  const onCreateOptionSelect = (name, label, onCreateOption) => {
    const newOptionObject = onCreateOption(label);
    const optionsObject = {};
    optionsObject[name] = [...options[name], newOptionObject];
    setOptions({
      ...options,
      ...optionsObject,
    });
  };

  // onchange checkbox
  const onChangeStateCheckbox = (key, value) => {
    const changedObject = {};
    changedObject[key] = state[key].includes(value)
      ? state[key].filter(item => item != value)
      : [...state[key], value];
    setState({
      ...state,
      ...changedObject,
    });
  };

  const onChangeStateDate = (key, value) => {
    const changedObject = {};
    changedObject[key] = value.toISOString();
    setState({
      ...state,
      ...changedObject,
    });
  };

  Object.keys(model).forEach(key => {
    if (model[key].type === 'date') {
      formItems.push(
        <FormGroup key={key} row className="mb-4">
          <Label for={key} sm={4}>
            {key} {model[key].required ? '*' : null}
          </Label>
          <Col sm={8} className="d-flex flex-column">
            <DatePicker
              id={key}
              name={key}
              selected={new Date(state[key])}
              onChange={value => onChangeStateDate(key, value)}
              dateFormat={model[key].format || 'dd-MM-yyyy'}
              customInput={<CustomDatePicker />}
              disabled={model[key].disabled}
              placeholderText={model[key].placeholder}
            />
          </Col>
        </FormGroup>
      );
    } else if (model[key].type === 'select') {
      formItems.push(
        <FormGroup key={key} row className="mb-4">
          <Label for={key} sm={4}>
            {key} {model[key].required ? '*' : null}
          </Label>
          <Col sm={8} className="d-flex flex-column">
            {(() => {
              const SelectComponent = model[key].createable
                ? CreatableSelect
                : Select;
              return options[key].length > 0 ? (
                <>
                  <SelectComponent
                    name={key}
                    id={key}
                    searchable={true}
                    isClearable={true}
                    required={model[key].required}
                    value={state[key]}
                    options={options[key]}
                    onChange={option => onChangeStateSelect(key, option)}
                    onCreateOption={inputValue =>
                      onCreateOptionSelect(
                        key,
                        inputValue,
                        model[key].onCreateOption
                      )
                    }
                    isDisabled={model[key].disabled}
                    placeholder={model[key].placeholder}
                  />
                  <input // this field hidden, for detect validation only
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ opacity: 0, height: 0 }}
                    value={state[key]}
                    required={model[key].required}
                    onChange={e => e.preventDefault()}
                  />
                </>
              ) : (
                <Spinner />
              );
            })()}
          </Col>
        </FormGroup>
      );
    } else if (model[key].type === 'checkbox') {
      formItems.push(
        <FormGroup key={key} row className="mb-4">
          <Label for={key} sm={4}>
            {key} {model[key].required ? '*' : null}
          </Label>
          <Col sm={8} className="d-flex flex-column">
            {model[key].options.map((item, index) => {
              return (
                <CustomInput
                  type="checkbox"
                  label={item.label}
                  id={item.value}
                  key={item.value}
                  name={key}
                  value={item.value}
                  checked={state[key].includes(item.value)}
                  required={
                    index === 0 &&
                    state[key].length === 0 &&
                    model[key].required
                  }
                  disabled={model[key].disabled}
                  onChange={e => onChangeStateCheckbox(key, e.target.value)}
                />
              );
            })}
          </Col>
        </FormGroup>
      );
    } else if (model[key].type === 'radio') {
      formItems.push(
        <FormGroup key={key} row className="mb-4">
          <Label for={key} sm={4}>
            {key} {model[key].required ? '*' : null}
          </Label>
          <Col sm={8} className="d-flex flex-column">
            {model[key].options.map((item, index) => {
              return (
                <CustomInput
                  type="radio"
                  label={item.label}
                  id={item.value}
                  key={item.value}
                  name={key}
                  value={item.value}
                  checked={state[key].includes(item.value)}
                  required={model[key].required}
                  disabled={model[key].disabled}
                  onChange={onChangeState}
                />
              );
            })}
          </Col>
        </FormGroup>
      );
    } else if (model[key].type === 'currency') {
      formItems.push(
        <FormGroup key={key} row className="mb-4">
          <Label for={key} sm={4}>
            {key} {model[key].required ? '*' : null}
          </Label>
          <Col sm={8} className="d-flex flex-column">
            <Input
              type="text"
              onChange={onChangeCurrency}
              value={currency[key]}
              name={key}
              id={key}
              required={model[key].required}
              disabled={model[key].disabled}
              placeholder={model[key].placeholder}
            />
          </Col>
        </FormGroup>
      );
    } else if (model[key].type === 'submit') {
      formItems.push(
        <Row key={key} className="mb-4">
          <Col sm={4}></Col>
          <Col sm={8}>
            <Button
              type={model[key].type}
              color="success"
              disabled={model[key].disabled}
            >
              {key}
            </Button>
          </Col>
        </Row>
      );
    } else {
      formItems.push(
        <FormGroup key={key} row className="mb-4">
          <Label for={key} sm={4}>
            {key} {model[key].required ? '*' : null}
          </Label>
          <Col sm={8} className="d-flex flex-column">
            <Input
              type={model[key].type}
              onChange={onChangeState}
              value={state[key]}
              name={key}
              id={key}
              required={model[key].required}
              disabled={model[key].disabled}
              placeholder={model[key].placeholder}
            />
          </Col>
        </FormGroup>
      );
    }
  });

	React.useEffect(()=>{
		if(onChange) {
			const changedObject = [];
			if(prevState && Object.keys(prevState).length>0){
				Object.keys(prevState).forEach((key) => {
					if(prevState[key]!==state[key]){
						changedObject.push(key);
					}
				})
				onChange({
					value: state,
					changed: changedObject
				});
			}
		}
	}, [state])


	return (
		<>
			<Form onSubmit={onFormSubmit}>
				{formItems}
			</Form>
		</>
	)
}
