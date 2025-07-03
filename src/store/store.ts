import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';


type User = {
  from: string;
  to: string;
};

const User = {
    start:"",
    end:""
}

const userSlice = createSlice({
  name: 'user',
  initialState:User,
  reducers: {
    setFrom:(state, action: PayloadAction<string>)=>{
        state.start=action.payload
    },
    setTo:(state, action: PayloadAction<string>)=>{
         state.end=action.payload
    },

    
  },
});

export const { setFrom, setTo } = userSlice.actions;

// ✅ Create store
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});



// ✅ Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
