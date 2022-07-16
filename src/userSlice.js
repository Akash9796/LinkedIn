import { createSlice } from '@reduxjs/toolkit'

// const [first, setfirst] = useState(null) 

const initialState = {
userName:null,
userEmail:null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action)=>{
        state.userName = action.payload.userName
        state.userEmail = action.payload.userEmail
        state.userPhoto = action.payload.userPhoto

    },
    setUserLogoutState: state =>{
        state.userName = null
        state.userEmail = null
        state.userPhoto = null
    }
  }
});

export const {setActiveUser, setUserLogoutState  } = userSlice.actions

export const selectUserName = state => state.user.userName
export const selectUserEmail = state => state.user.userEmail
export const selectUserPhoto = state => state.user.userPhoto

export default userSlice.reducer