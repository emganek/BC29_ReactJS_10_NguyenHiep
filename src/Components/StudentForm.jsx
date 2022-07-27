import React, { createRef, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onSubmitHandlerAction, saveEditedStudentAction } from '../Store/Action/reactFormAction';

const DEFAULT_VALUES = {
    id: "",
    userName: "",
    fullName: "",
    password: "",
    phoneNumber: "",
    email: "",
    type: "client",
}

const formRef = createRef();
const pattern = '[^0-9.,/<>?:"\!@#$%^~`&\'{}\[()]+'
export default function StudentForm() {
    const [state, setState] = useState({
        values: DEFAULT_VALUES,
        errors: {
            id: "",
            userName: "",
            fullName: "",
            password: "",
            phoneNumber: "",
            email: "",
            type: "",
        },
        isFormValid: false,
    });

    const dispatch = useDispatch();
    const reduxState = useSelector(state => ({ ...state.reactFormReducer }));


    //Handler set State equal to Redux State if selectedUser is not null=================
    useMemo(() => {
        if (reduxState.selectedUser !== null && reduxState.selectedUser.id !== state.values.id) {
            setState({
                ...state, values: reduxState.selectedUser,
            });
        }
    }, [reduxState.selectedUser])
    // =====================================================================================




    //Form hanler=============================================================================
    // Read infomation from inputs
    const inputListening = (evt) => {
        const { name, value } = evt.target;
        const updateValues = { ...state.values, [name]: value };

        console.log("input Listening")

        setState({
            ...state, values: updateValues
        });

    };

    //Error handler
    const errorHandler = (evt) => {
        const { name, title } = evt.target;
        const { valueMissing, patternMismatch } = evt.target.validity;
        let errorMessage = "";

        if (name === "email" && patternMismatch) {
            errorMessage = `${title} is not valid!`
        }
        if (name === "phoneNumber" && patternMismatch) {
            errorMessage = `${title} must be number and have 10 digits`
        }
        if (name === "fullName" && patternMismatch) {
            errorMessage = `${title} cannot contain any numbers or special charectors`
        }
        if (valueMissing) {
            errorMessage = `Please fill ${title} !`
        }
        const updatedErrors = { ...state.errors, [name]: errorMessage };
        setState({
            ...state, errors: updatedErrors
        });
    }

    // When SAVE is clicked
    const submitHandler = (evt) => {
        evt.preventDefault();

        reduxState.selectedUser !== null ? dispatch(saveEditedStudentAction(state.values)) : dispatch(onSubmitHandlerAction(state.values));

        resetFormHandler();

    };

    const resetFormHandler = () => {
        setState({
            ...state, values: DEFAULT_VALUES,
        });
    }
    // =====================================================================================

    return (
        <div className="card p-0">
            <div className="card-header bg-warning text-white font-weight-bold">
                REGISTER FORM BY REACT HOOK
            </div>
            <div className="card-body">
                <form ref={formRef} noValidate onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Username</label>
                                <input required value={state.values.userName} title="Username" name="userName" onBlur={errorHandler} onChange={inputListening} type="text" className="form-control" />
                                {state.errors.userName !== "" && <span className='text-danger'>{state.errors.userName}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input pattern={pattern} required value={state.values.fullName} title="Full Name" name="fullName" onBlur={errorHandler} onChange={inputListening} type="text" className="form-control" />
                                {state.errors.fullName !== "" && <span className='text-danger'>{state.errors.fullName}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Password</label>
                                <input required value={state.values.password} title="Password" name="password" onBlur={errorHandler} onChange={inputListening} type="text" className="form-control" />
                                {state.errors.password !== "" && <span className='text-danger'>{state.errors.password}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input pattern='[0-9]{10}\b' required value={state.values.phoneNumber} title="Phone Number" name="phoneNumber" onBlur={errorHandler} onChange={inputListening} type="text" className="form-control" />
                                {state.errors.phoneNumber !== "" && <span className='text-danger'>{state.errors.phoneNumber}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Email</label>
                                <input pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$" required value={state.values.email} title="Email" name="email" onBlur={errorHandler} onChange={inputListening} type="text" className="form-control" />
                                {state.errors.email !== "" && <span className='text-danger'>{state.errors.email}</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Type</label>
                                <select required value={state.values.type} name="type" onChange={inputListening} className="form-control">
                                    <option value='client'>Client</option>
                                    <option value='admin'>Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button disabled={!formRef.current?.checkValidity()}className="btn btn-warning mr-2">SAVE</button>
                    <button onClick={resetFormHandler} type="reset" className="btn btn-outline-dark">RESET</button>
                </form>
            </div>
        </div>
    )
}
