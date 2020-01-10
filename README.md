
# What is this ?

JSON React Form is library that convert JSON schema into React component forms.

## Supported form's types
- text
- number
- date
- select


## How To Use

Install this library using `npm i json-reactform` or `yarn add json-reactform`.

### JSON Schema
Then define JSON schema with format:
```
[name_label] : {
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

"Item Code & Name": {

"type": "select",

"query": "[your API]", //use request to get options, return it same as 'options' (value and label)

"required": true

},

"Qty": {

"type": "number",

"required": true

},

"Item Number": {

"type": "select",

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

"required": true

},

}

```

Don't forget to include css bootstrap into your project.
```
import 'bootstrap/dist/css/bootstrap.min.css';
```




Within the component you want to add JsonToForm, import `JsonToForm` from library and your schema, make your submit function inside your component,

then return it as component



```

import {JsonToForm} from 'json-reactform';

import model from '../your/schema';



const YourComponent = () => {

// Your submit functions here.
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





## Contributor



[Aji Agahari](---)

[Nasrul](---)



## Credits

[reactjs](https://reactjs.org/)

[reactstrap](https://reactstrap.github.io/)

[moment](https://momentjs.com/)

[axios](https://github.com/axios/axios)

[react-datepicker](https://github.com/Hacker0x01/react-datepicker)

[react-select](https://react-select.com/)

## License

MIT