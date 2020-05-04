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
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useForm } from 'react-hook-form';
import { numberToCurrency, currencyToNumber } from './libs/helper';
import InputDefault from './components/InputDefault';
import InputSelect from './components/InputSelect';
import InputDate from './components/InputDate';

const CustomDatePicker = React.forwardRef(
  (
    { onChange, placeholder, value, id, onClick, name, disabled, required },
    ref
  ) => {
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
        required={required}
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
  const {
    control,
    register,
    errors,
    watch,
    setValue,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: Object.getOwnPropertyNames(model).reduce((o, key) => {
      if (model[key].type === 'currency') {
        model[key].defaultValue = numberToCurrency(model[key].defaultValue);
      }
      if (model[key].type === 'select') {
        model[key].defaultValue = model[key].options.find(
          option => option.value === model[key].defaultValue
        );
      }
      return Object.assign(o, { [key]: model[key].defaultValue });
    }, {}),
  });
  const values = watch();
  console.log(values);
  const defaultState = Object.keys(model).reduce((a, b) => {
    const { defaultValue, type } = model[b];
    if (type === 'date') {
      a[b] = defaultValue ? defaultValue.toISOString() : '';
    } else if (type === 'select') {
      a[b] = defaultValue
        ? model[b].options.find(option => option.value === defaultValue)
        : '';
    } else if (type === 'checkbox') {
      a[b] = defaultValue && defaultValue.length ? defaultValue : [];
    } else if (type === 'submit') {
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
        <InputDate
          keyValue={key}
          control={control}
          rules={model[key].validation}
          value={getValues(key)}
          model={model[key]}
          errors={errors}
        />
      );
    } else if (model[key].type === 'select') {
      formItems.push(
        <InputSelect
          control={control}
          rules={model[key].validation}
          value={getValues(key)}
          keyValue={key}
          model={model[key]}
          options={model[key].options}
          errors={errors}
        />
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
                  id={item.label}
                  key={item.label}
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
                  id={item.label}
                  key={item.label}
                  name={key}
                  value={item.value}
                  checked={state[key] === item.value}
                  required={model[key].required}
                  disabled={model[key].disabled}
                  onChange={onChangeState}
                />
              );
            })}
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
        <div>
          <InputDefault
            value={getValues(key)}
            setValue={setValue}
            type={model[key].type}
            keyValue={key}
            model={model[key]}
            register={register(model[key].validation)}
            errors={errors}
          />
        </div>
      );
    }
  });

  React.useEffect(() => {
    if (onChange) {
      const changedObject = [];
      if (prevState && Object.keys(prevState).length > 0) {
        Object.keys(prevState).forEach(key => {
          if (prevState[key] !== state[key]) {
            changedObject.push(key);
          }
        });
        onChange({
          value: state,
          changed: changedObject,
        });
      }
    }
  }, [state]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>{formItems}</Form>
    </>
  );
};
