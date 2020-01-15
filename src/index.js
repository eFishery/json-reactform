import React from 'react';
import {
	Form,
	Button,
	FormGroup,
	Label,
	Input,
	Col,
	Spinner
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModalSpinner from './components/ModalSpinner';
import axios from 'axios';
import Select from 'react-select';

const CustomDatePicker = React.forwardRef(({ onChange, placeholder, value, id, onClick, name }, ref) => (
	<Input
		ref={ref}
		onChange={onChange}
		placeholder={placeholder}
		value={value}
		id={id}
		name={name}
		onClick={onClick}
	/>
));
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default ({model,onSubmit,onChange}) => {
  const cancelSource = axios.CancelToken.source();
  const cancelToken = cancelSource.token;
	const defaultState = Object.keys(model).reduce((a, b) => {
		return (a[b] = model[b].type === 'date' ? new Date().toISOString() : "", a)
	}, {})
	const [state, setState] = React.useState(defaultState)
	const prevState = usePrevious(state);
	const [modal, setModal] = React.useState({
		open: false,
		type: 'loading', // success, error
		message: ''
	})
	const clearRequest = () => {
    cancelSource.cancel('component unmounted')
	}
	const formItems = [];
	const onFormSubmit = (e) => {
		e.preventDefault();
		setModal(values => ({ ...values, type: 'loading', message: 'Saving..', open: true}));
		const newState =  Object.keys(state).reduce((a, b) => {
			return (a[b] = model[b].type === 'number' ? parseInt(state[b]) : state[b], a)
		}, {});
		onSubmit(newState).then(() => {
			setState(defaultState);
			setModal(values => ({ ...values, type: 'success', message: 'Success'}));
		}).catch(err => {
			console.log("GAGAL", err);
			setModal(values => ({ ...values, type: 'error', message: 'Failed to Save'}));
		})
	}
	
	
	const onChangeState = (e) => {
		const changedObject = {}
		const {
			value,
			name
		} = e.currentTarget;
		// const value = e.currentTarget.value
		changedObject[name] = value;
		setState({
			...state,
			...changedObject
		})
	}

	// khususon onchange si react-select
	const onChangeStateSelect = (name, selectedOption) => {
		const changedObject = {}
		// const value = e.currentTarget.value
		changedObject[name] = selectedOption === null ? '' : selectedOption;
		setState({
			...state,
			...changedObject
		})
	}

	const onChangeStateDate = (key, value) => {
		const changedObject = {}
		changedObject[key] = value.toISOString()
		setState({
			...state,
			...changedObject
		})
	}

	Object.keys(model).forEach((key) => {
		if (model[key].type === 'date') {
			formItems.push(
				<FormGroup key={key} row className="mb-4">
					<Label for={key} sm={4}>{key} {model[key].required ? '*' : null}</Label>
					<Col sm={8} className="d-flex flex-column">
						<DatePicker
							id={key}
							name={key}
							selected={new Date(state[key])}
							onChange={value => onChangeStateDate(key, value)}
							dateFormat="dd/MM/yyyy"
							customInput={<CustomDatePicker />}
						/>
					</Col>
				</FormGroup>
			)

		}
		else if (model[key].type === 'select') {
			formItems.push(
				<FormGroup key={key} row className="mb-4">
					<Label for={key} sm={4}>{key} {model[key].required ? '*' : null}</Label>
					<Col sm={8} className="d-flex flex-column">
						{(() => {
							return model[key].options.length > 0 ?
								(
									<>
										<Select
											name={key}
											id={key}
											searchable={true}
											isClearable={true}
											required={model[key].required}
											defaultValue={model[key].options[0].value || ''}
											value={state[key]}
											onChange={option => onChangeStateSelect(key, option)}
											options={model[key].options}
										/>
										<input // this field hidden, for detect validation only
											tabIndex={-1}
											autoComplete="off"
											style={{ opacity: 0, height: 0 }}
											value={state[key]}
											required={model[key].required}
											onChange={e => e.preventDefault()}
										/>
									</>
								) : (
									<Spinner />
								)
						})()}

					</Col>
				</FormGroup>
			)
		}
		else {
			formItems.push(
				<FormGroup key={key} row className="mb-4">
					<Label for={key} sm={4}>{key} {model[key].required ? '*' : null}</Label>
					<Col sm={8} className="d-flex flex-column">
						<Input type={model[key].type} onChange={onChangeState} value={state[key]} name={key} id={key} required={model[key].required} />
					</Col>
				</FormGroup>
			)
		}

	})

	React.useEffect(() => {
		return () => {
			clearRequest();
		};
	}, [])

	React.useEffect(()=>{
		if(onChange) {
			const changedObject = [];
			if(prevState && Object.keys(prevState).length>0){
				Object.keys(prevState).forEach((key) => {
					if(prevState[key]!==state[key]){
						changedObject.push(key);
					}
				})
				onChange({
					value: state,
					changed: changedObject
				});
			}
		}
	}, [state])

	
	return (
		<>
			<Form onSubmit={onFormSubmit}>
				{formItems}
				<Button color="success">Submit</Button>
			</Form>
			<ModalSpinner
				isOpen={modal.open}
				type={modal.type}
				message={modal.message}
				onDismiss={() => setModal(values => ({...values, open: false}))} />
		</>
	)
}
