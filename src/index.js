import React from 'react';
import { Form, Button, Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { numberToCurrency, currencyToNumber } from './libs/helper';
import InputDefault from './components/InputDefault';
import InputSelect from './components/InputSelect';
import InputDate from './components/InputDate';
import InputCustom from './components/InputCustom';

export default ({ model, onSubmit }) => {
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
  const formItems = [];

  const onFormSubmit = data => {
    const body = { ...data };
    for (let key of Object.keys(body)) {
      if (model[key].type === 'currency') {
        body[key] = currencyToNumber(body[key]);
      }
    }

    console.log(body);
    return body;
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
    } else if (model[key].type === 'radio' || model[key].type === 'checkbox') {
      formItems.push(
        <InputCustom
          model={model[key]}
          options={model[key].options}
          keyValue={key}
          type={model[key].type}
          register={register(model[key].validation)}
          errors={errors}
        />
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

  return (
    <>
      <Form onSubmit={handleSubmit(onFormSubmit)}>{formItems}</Form>
    </>
  );
};
