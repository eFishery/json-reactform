[![npm](https://img.shields.io/npm/v/json-reactform)](https://www.npmjs.com/package/json-reactform)
![npm bundle size](https://img.shields.io/bundlephobia/min/json-reactform)
![GitHub contributors](https://img.shields.io/github/contributors/efishery/json-reactform)
![NPM](https://img.shields.io/npm/l/json-reactform)

# JSON-ReactForm
JSON React Form is library that convert JSON schema into React component forms.

## Supported form's types
- text
- number
- date
- select
- textarea
- checkbox
- radio
- submit button

## How To Use
Install this library using `npm i json-reactform` or `yarn add json-reactform`.

### JSON Schema
Then define JSON schema with format:
```
[label_name] : {
    options
}
```

#### Options
- **type**: text | number | date | select
- **required**: true | false
- **options**: array of object of value and label
- **query**: use request to get options, return it same as ***options*** (value and label)


## Example
```
export default {
  "Plan Date": {
    "type": "date",
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