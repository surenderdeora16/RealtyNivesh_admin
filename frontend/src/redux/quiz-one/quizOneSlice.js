import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [
        {
            questions: "Body frame",
            options: ["Slim, Thin, Tall, Short", "Medium, Athletic", "Large, Bulky, Rounded"],
            selection: null
        },
        {
            questions: "Hair",
            options: ["Thin, dry ,less volume, lot of split ends", "Golden tinge, hair fall, greying, moderate volume", "Bluish tinge, thick black, mostly curly, lot of volume"],
            selection: null
        },
        {
            questions: "Skin",
            options: ["Dry and rough", "Sweaty, Prone to acne and infection", "Clear, moist and soft"],
            selection: null
        },
        {
            questions: "Body temperature",
            options: ["Hands and feet are usually cold.", "Face and forehead are usually warm.", "Normal with hands and feet slightly cold."],
            selection: null
        },
        {
            questions: "Body Weight",
            options: ["Low - don’t gain weight easily, find it difficult to keep it on", "Medium - can gain or lose weight easily", "Heavy - tend to gain weight easily and can have difficulty losing it"],
            selection: null
        },
        {
            questions: "Weather Preference",
            options: ["Dislike cold", "Dislike heat", "Dislike moist, rainy, and cool weather"],
            selection: null
        },
        {
            questions: "Appetite",
            options: ["Inconsistent—fluctuating and irregular", "Strong hunger pangs", "Steady, can skip a meal easily"],
            selection: null
        },
        {
            questions: "Elimination",
            options: ["Dry, hard, dark, constipation stools", "Soft, yellowish, loose stools", "Thich, heavy, sticky stools"],
            selection: null
        },
        {
            questions: "Preferred Taste",
            options: ["Sweet, Sour, Salty", "Sweet, Bitter, Astringent", "Bitter, Pungent, Astringent"],
            selection: null
        },
        {
            questions: "Sleep",
            options: ["Difficulty in falling asleep, light sleeper and awaken easily", "Short but sound periods of time than most people", "Enjoy deep, long sleep"],
            selection: null
        },
        {
            questions: "Talk",
            options: ["Fast, rambling, lots of talk, cracked voice", "Speak with confidence, to the point, never afraid", "Slow and less talk"],
            selection: null
        },
        {
            questions: "Decision Making",
            options: ["Spontaneously, impulsively based on your feeling at the time", "Precisely and confidently after doing your research", "Slowly, very consultative, let others make the choices"],
            selection: null
        }
    ]
}

export const quizOneSlice = createSlice({
    name: 'quiz_one',
    initialState,
    reducers: {
        setAnswer: (state, action) => {
            state.data[action.payload.index].selection = action.payload.value
        },
        resetData: (state, action) => {
            state.data = initialState.data;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAnswer, resetData } = quizOneSlice.actions

export default quizOneSlice.reducer