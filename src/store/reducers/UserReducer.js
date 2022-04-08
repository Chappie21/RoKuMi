const initialState = {
    user: undefined
}

const UserReducer = (state = initialState, action) =>{
    switch(action.type){

        // Establecer datos de usuario en REDUX
        case 'SET_USER':
            const { user } = action
            return { ...state, user }

        default:
            return state;
    }
}

export default UserReducer;