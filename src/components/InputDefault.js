import React from 'react';
import { FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import { numberToCurrency } from '../libs/helper';

const InputDefault = React.memo(
  ({ type, value, setValue, keyValue, model, register, errors }) => {
    if (type === 'currency') {
      setValue(keyValue, numberToCurrency(value));
    }

    return (
      <FormGroup key={keyValue} row className="mb-4">
        <Label for={keyValue} sm={4}>
          {keyValue} {model.required ? '*' : null}
        </Label>
        <Col sm={8} className="d-flex flex-column">
          <Input
            innerRef={register}
            type={model.type}
            name={keyValue}
            id={keyValue}
            disabled={model.disabled}
            placeholder={model.placeholder}
          />
          {errors[keyValue] && (
            <Alert color="danger">{errors[keyValue].message}</Alert>
          )}
        </Col>
      </FormGroup>
    );
  },
  (prevProps, nextProps) =>
    prevProps.value === nextProps.value &&
    prevProps.errors[prevProps.keyValue] ===
      nextProps.errors[nextProps.keyValue]
);

export default InputDefault;
