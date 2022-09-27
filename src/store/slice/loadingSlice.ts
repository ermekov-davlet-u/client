import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface IEducShSliceType{
    loading: boolean
}

const initialState: IEducShSliceType = {
    loading: false
}

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading: (state: IEducShSliceType, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer