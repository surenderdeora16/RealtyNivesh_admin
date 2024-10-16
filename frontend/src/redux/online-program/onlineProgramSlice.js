import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AxiosHelper from '../../helper/AxiosHelper';

const initialState = {
    status: 'idle',
    error: null,
    packages: [],
    slots: [
        { id: 1, days: "Mon - Wed - Fri - Sun", time: "6 AM - 7 AM" },
        { id: 2, days: "Mon - Wed - Fri - Sun", time: "7 AM - 8 AM" },
        { id: 3, days: "Mon - Wed - Fri - Sun", time: "6 PM - 7 PM" },
        { id: 4, days: "Mon - Wed - Fri - Sun", time: "7 PM - 8 PM" },

        { id: 5, days: "Mon - Wed - Fri - Sun ", time: "6 AM - 7 AM" },
        { id: 6, days: "Mon - Wed - Fri - Sun ", time: "7 AM - 8 AM" },
        { id: 7, days: "Mon - Wed - Fri - Sun ", time: "6 PM - 7 PM" },
        { id: 8, days: "Mon - Wed - Fri - Sun ", time: "7 PM - 8 PM" },
    ]
}

export const fetchPackges = createAsyncThunk('onlineProgram/fetchPackges', async () => {
    const { data } = await AxiosHelper.getData("/online-program-price");
    if (data?.status === true) {
        return data.data
    }
})

export const onlineProgramSlice = createSlice({
    name: 'onlineProgram',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchPackges.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPackges.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.packages = action.payload;
            })
            .addCase(fetchPackges.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

// Action creators are generated for each case reducer function
export const {  } = onlineProgramSlice.actions

export default onlineProgramSlice.reducer