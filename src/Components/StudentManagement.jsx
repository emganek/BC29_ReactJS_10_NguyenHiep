import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudentAction, editStudentAction } from '../Store/Action/reactFormAction';

export default function StudentManagement() {
    const [state, setState] = useState({
        keyword: "",
        filerType: "all",
    });

    const reduxState = useSelector(state => ({ ...state.reactFormReducer }));

    const dispatch = useDispatch();

    const deleteUser = (id) => {
        dispatch(deleteStudentAction(id))

    }
    const editUser = (user) => {
        dispatch(editStudentAction(user))
    }

    //Filter by Full Name ====================================================================
    const filterByFullName = (evt) => {
        const { value } = evt.target
        setState({
            ...state,
            keyword: value,
        })
    };

    //Filter by Type ====================================================================
    const filterByType = (evt) => {
        const { value } = evt.target
        setState({
            ...state,
            filerType: value,
        })
        console.log(value)
    };


    // Render User List ======================================================================
    const renderUserList = () => {
        let filteredUserList = reduxState.userList.filter(ele => ele.fullName.trim().toLowerCase().indexOf(state.keyword.trim().toLowerCase()) !== -1)

        if (state.filerType !== "all") {
            filteredUserList = filteredUserList.filter(ele => ele.type === state.filerType)
            console.log("filter123")
        }

        return filteredUserList.map((ele, index) => {
            return (
                <tr key={index} className={`${index % 2 === 0 && 'bg-light'}`}>
                    <td>{index + 1}</td>
                    <td>{ele.userName}</td>
                    <td>{ele.fullName}</td>
                    <td>{ele.email}</td>
                    <td>{ele.phoneNumber}</td>
                    <td>{ele.type}</td>
                    <td>
                        <button onClick={() => editUser(ele)} className="btn btn-info mr-2">EDIT</button>
                        <button onClick={() => deleteUser(ele.id)} className="btn btn-danger">DELETE</button>
                    </td>
                </tr>
            )

        })
    }

    return (
        <div className="card p-0 mt-3">
            <div className="card-header font-weight-bold">USER MANAGEMENT</div>
            <div className="row mt-4 px-3 ">
                <div className="col-4">
                    <div className="form-group mb-0">
                        <input
                            onChange={filterByFullName}
                            type="text"
                            placeholder="Search by full name..."
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-3 ml-auto">
                    <div className="form-group mb-0">
                        <select onChange={filterByType} className="form-control">
                            <option value="all">All</option>
                            <option value="client">Client</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderUserList()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
