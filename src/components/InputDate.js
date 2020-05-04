import React from 'react';
import { FormGroup, Label, Col, Input, Alert } from 'reactstrap';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputDate = React.memo(
  ({ value, keyValue, rules, model, control, errors }) => {
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

    return (
      <FormGroup key={keyValue} row className="mb-4">
        <Label for={keyValue} sm={4}>
          {keyValue} {rules.required ? '*' : null}
        </Label>
        <Col sm={8} className="d-flex flex-column">
          <Controller
            name={keyValue}
            control={control}
            rules={rules}
            onChange={([selected]) => {
              return selected;
            }}
            as={
              <DatePicker
                selected={value ? new Date(value) : ''}
                dateFormat={model.format || 'dd-MM-yyyy'}
                showTimeSelect={false}
                customInput={<CustomDatePicker />}
                todayButton="Today"
                dropdownMode="select"
                isClearable
                shouldCloseOnSelect
                placeholderText={model.placeholder}
              />
            }
          />
          {errors[keyValue] && (
            <Alert color="danger">{errors[keyValue].message}</Alert>
          )}
        </Col>
      </FormGroup>
    );
  }
);

export default InputDate;
