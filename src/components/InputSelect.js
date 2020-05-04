import React, { useState } from 'react';
import { FormGroup, Label, Col, Spinner, Alert } from 'reactstrap';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const InputSelect = React.memo(
  ({ keyValue, model, options, control, rules, errors }) => {
    const [optionsFilter, setOptionsFilter] = useState(options);
    const onCreateOptionSelect = (name, label, onCreateOption) => {
      const newOptionObject = onCreateOption(label);
      const optionsObject = {};
      optionsObject[name] = [...optionsFilter[name], newOptionObject];
      setOptionsFilter({
        ...optionsFilter,
        ...optionsObject,
      });
    };

    return (
      <FormGroup key={keyValue} row className="mb-4">
        <Label for={keyValue} sm={4}>
          {keyValue} {model.required ? '*' : null}
        </Label>
        <Col sm={8} className="d-flex flex-column">
          {(() => {
            const SelectComponent = model.createable ? CreatableSelect : Select;
            return optionsFilter.length > 0 ? (
              <>
                <Controller
                  name={keyValue}
                  control={control}
                  rules={rules}
                  onChange={([selected]) => {
                    return selected;
                  }}
                  as={
                    <SelectComponent
                      searchable={true}
                      isClearable={true}
                      options={optionsFilter}
                      onCreateOption={inputValue =>
                        onCreateOptionSelect(
                          keyValue,
                          inputValue,
                          model.onCreateOption
                        )
                      }
                      isDisabled={model.disabled}
                      placeholder={model.placeholder}
                    />
                  }
                />
              </>
            ) : (
              <Spinner />
            );
          })()}
          {errors[keyValue] && (
            <Alert color="danger">{errors[keyValue].message}</Alert>
          )}
        </Col>
      </FormGroup>
    );
  }
);

export default InputSelect;
