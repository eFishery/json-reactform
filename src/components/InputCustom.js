import React from 'react';
import { Col, FormGroup, Label, CustomInput } from 'reactstrap';

const InputCustom = React.memo(
  ({ type, keyValue, model, register, options, errors }) => {
    return (
      <FormGroup key={keyValue} row className="mb-4">
        <Label for={keyValue} sm={4}>
          {keyValue} {model.required ? '*' : null}
        </Label>
        <Col sm={8} className="d-flex flex-column">
          {options.map(item => {
            return (
              <CustomInput
                type={type}
                innerRef={register}
                label={item.label}
                id={item.label}
                key={item.label}
                name={keyValue}
                value={item.value}
                disabled={model.disabled}
              />
            );
          })}
          {errors[keyValue] && (
            <Alert color="danger">{errors[keyValue].message}</Alert>
          )}
        </Col>
      </FormGroup>
    );
  }
);

export default InputCustom;
