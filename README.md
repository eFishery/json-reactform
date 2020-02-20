[![npm](https://img.shields.io/npm/v/json-reactform)](https://www.npmjs.com/package/json-reactform)
![npm bundle size](https://img.shields.io/bundlephobia/min/json-reactform)
![GitHub contributors](https://img.shields.io/github/contributors-anon/efishery/json-reactform)
![NPM](https://img.shields.io/npm/l/json-reactform)

# JSON-ReactForm

JSON React Form is library that convert JSON schema into React component forms.

## Supported form's types

- text
- number
- textarea
- date
- select
- checkbox
- radio
- currency
- submit button

## How To Use

Install this library using `npm i json-reactform` or `yarn add json-reactform`.

## JSON Schema

Then define JSON schema with format:

```
[label_name] : {
    options
}
```

## Options

### Text, Number, Textarea --> `return string`

- **type**: text | number | textarea
- **required**: true | false
- **disabled**: true | false
- **defaultValue**: string
- **placeholder**: string

### Date --> `return ISO string`

We use react-datepicker for rendering input type date.

- **type**: date
- **required**: true | false
- **disabled**: true | false
- **defaultValue**: new Date()
  > example: `new Date()` for today or more specific with a certain date and time `new Date("11 July 2020")`
- **format**: string
  > example: `dd MM yyyy` or `MMMM dd, yyyy`.
  >
  > See react-datepicker custom format.

### Select --> `return string (value of selected)`

We use react-select for rendering input type select and its options. By default you can search option by typing in the field and you can clear the options by click on **x** button on the right side.

- **type**: select
- **required**: true | false
- **disabled**: true | false
- **defaultValue**: string
  > It must be the exact same string that representing the option you wanna set as default options.
- **placeholder**: string
- **createable**: true | false
  > Set to `true` if you want to add option on the fly. Simply by typing new options on the input field. The value you typed in will become the `label` of the new option object. You must provide the function to define your `value` based on that string within `onCreateOption` below.
- **onCreateOption**: callback

  > The callback will receive string you've typed in the input field. Then you must return an object that at lest contain `label` and `value`. Example:
  >
  > ```js
  > {
  >   onCreateOption: text => {
  >     const value = text.toLowerCase();
  >     return {
  >       label: text,
  >       value,
  >     };
  >   };
  > }
  > ```

- **options**: array
  > The options is array of object that consists at least `label` and `value`. Label will be displayed in the select's options, while value is the one that will be returned later.

### Checkbox --> `return array of string`

- **type**: checkbox
- **required**: true | false
- **disabled**: true | false
- **defaultValue**: array of string
  > It must be an array consisting the exact same string that representing the option you want to be set as checked by default.
- **options**: array
  > The options is array of object that consists at least `label` and `value`. Label will be displayed in options, while value is the one that will be returned later.

### Radio --> `return string`

- **type**: radio
- **required**: true | false
- **disabled**: true | false
- **defaultValue**: string
  > It must be the exact same string that representing the option you want to be set as checked by default.
- **options**: array
  > The options is array of object that consists at least `label` and `value`. Label will be displayed in options, while value is the one that will be returned later.

### Submit

The key you provided to the model will become text inside this submit button.

- **type**: submit
- **disabled**: true | false

## Example

```
export default {
  "Plan Date": {
    "type": "date",
    "format": "dd MMMM yyyy",
    "required": true
  },
  "Qty": {
    "type": "number",
    "required": true
  },
  "Item Number": {
    "type": "select",
    "required": true
    "options": [ //use static json arry to get options
      {
        "value": "1",
        "label": "item 1"
      },
      {
        "value": "2",
        "label": "item 2"
      }
    ],
  },
  "Parts": {
    "type": "checkbox",
    "required": true
    "options": [ //use static json arry to get options
      {
        "value": "checkbox_item_1",
        "label": "Checkbox 1"
      },
      {
        "value": "checkbox_item_2",
        "label": "Checkbox 2"
      }
    ],
  },
  "Status": {
    "type": "radio",
    "required": true,
    "options": [ //use static json arry to get options
      {
        "value": "completed",
        "label": "Completed"
      },
      {
        "value": "not_completed",
        "label": "Not Completed"
      }
    ],
  },
  "Save": { // button submit
    "type": "submit",
  }
}
```

Don't forget to include css bootstrap into your project.

```
import 'bootstrap/dist/css/bootstrap.min.css';
```

Within the component you want to add the form, import `JsonToForm` from library and your schema, make your submit function inside your component.

```
import JsonToForm from 'json-reactform';
import model from '../your/schema';

const YourComponent = () => {
  // Do anything within submit function.
  const submit = (params) => {
    console.log(params);
  }

  return (
    <div>
      <JsonToForm model={model} onSubmit={submit}/>
    </div>
  )
}
```

## peerDependecies

Make sure you have these npm libraries installed within your project.

- react

## Contributor

- [Aji Agahari](https://github.com/ajiagahari)
- [Nasrul Faizin](https://github.com/nasrul21)
- [Yuhanas Yulianto](https://github.com/yuhanasy)

## Credits

[reactjs](https://reactjs.org/)
[reactstrap](https://reactstrap.github.io/)
[axios](https://github.com/axios/axios)
[react-datepicker](https://github.com/Hacker0x01/react-datepicker)
[react-select](https://react-select.com/)

## License

MIT
