import { ADD_STUDENT, DELETE_STUDENT, EDIT_STUDENT, SAVE_EDITED_STUDENT } from "../Type/reactFormType";

const DEFAULT_STATE = {
    userList: [
        {
            id: 1,
            userName: "nguyenA",
            fullName: "Nguyen Van A",
            password: "12345678",
            phoneNumber: "0123456789",
            email: "email@ghec.vn",
            type: "admin",
        },
        {
            id: 2,
            userName: "nguyenB",
            fullName: "Nguyen Van B",
            password: "12345678",
            phoneNumber: "0123456789",
            email: "nguyenvanB@ghec.vn",
            type: "admin",
        },
    ],
    selectedUser: null,
}

export const reactFormReducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case (ADD_STUDENT): {
            payload = {...payload, id:Date.now()}
            state.userList = [...state.userList, payload]
            return { ...state };
        }
            break;

        case (DELETE_STUDENT): {
            state.userList = state.userList.filter(ele => ele.id !== payload);
            return { ...state };
        }
            break;

        case (EDIT_STUDENT): {
            state.selectedUser = payload;
            return { ...state };
        }
            break;

        case (SAVE_EDITED_STUDENT): {
            state.userList = state.userList.map(ele => ele.id === payload.id ? payload : ele);
            state.selectedUser = null;
            return { ...state };
        }
            break;

        default: return { ...state }
            break;
    }
}