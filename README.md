# What is this ?
a form generator in reacts
use your time for more useful things

## How To Use

Install this library using
`npm i jsontoForm`

make your schema
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
    "options": [    //use static json arry to get options
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
Import `jsontoForm` from library and your schema for form,
make your submit function inside your component,
then return it as component

```
import jsontoForm from 'react-jsontoform';
import model from '../schema/stock';

const FormStock = () => {
	const submit = (params) => {
		return postStock(params);
	}
	return (
		<Container>
			<JsonToForm model={model} onSubmit={submit}/>
		</Container>
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

