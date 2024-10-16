import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [
        {
            heading: "DIGESTIVE TRACT",
            questions: [
                { que: "Nausea or vomiting", selection: null },
                { que: "Diarrhoea or loose stool", selection: null },
                { que: "Constipation", selection: null },
                { que: "Bloated feeling", selection: null },
                { que: "Belching/passing gas through anus", selection: null },
                { que: "Heartburn", selection: null },
                { que: "Intestinal/Stomach pain", selection: null }
            ],
        },
        {
            heading: "MIND",
            questions: [
                { que: "Poor memory", selection: null },
                { que: "Confusion, poor comprehension", selection: null },
                { que: "Poor concentration", selection: null },
                { que: "Poor physical coordination", selection: null },
                { que: "Difficulty in making decisions", selection: null },
                { que: "Stuttering or stammering", selection: null },
                { que: "Slurred speech", selection: null },
                { que: "Learning disabilities", selection: null }
            ],
        },
        {
            heading: "HEAD",
            questions: [
                { que: "Headaches", selection: null },
                { que: "Faintness", selection: null },
                { que: "Dizziness", selection: null },
                { que: "Insomnia", selection: null }
            ],
        },
        {
            heading: "JOINTS/MUSCLES",
            questions: [
                { que: "Pain or aches in joints", selection: null },
                { que: "Arthritis", selection: null },
                { que: "Stiffness or limitation of movement", selection: null },
                { que: "Pain or aches in muscles", selection: null },
                { que: "Feeling of weakness or tiredness", selection: null }
            ],
        },
        {
            heading: "ENERGY/ACTIVITY",
            questions: [
                { que: "Fatigue, sluggishness", selection: null },
                { que: "Apathy, lethargy", selection: null },
                { que: "Hyperactivity", selection: null },
                { que: "Restlessness", selection: null }
            ],
        },
        {
            heading: "EMOTIONS",
            questions: [
                { que: "Mood swings", selection: null },
                { que: "Anxiety, fear or nervousness", selection: null },
                { que: "Anger, irritability, or aggressiveness", selection: null },
                { que: "Depression", selection: null }
            ],
        },
        {
            heading: "EARS",
            questions: [
                { que: "Itchy ears", selection: null },
                { que: "Earaches, ear infections", selection: null },
                { que: "Drainage from ear", selection: null },
                { que: "Ringing in ears", selection: null },
                { que: "Hearing loss", selection: null }
            ],
        },
        {
            heading: "MOUTH/THROAT",
            questions: [
                { que: "Chronic coughing", selection: null },
                { que: "Gagging, frequent need to clear throat", selection: null },
                { que: "Sore throat, hoarseness, loss of voice", selection: null },
                { que: "Swollen/discoloured tongue, gum, lips", selection: null }
            ],
        },
        {
            heading: "SKIN",
            questions: [
                { que: "Acne", selection: null },
                { que: "Hives, rashes, or dry skin", selection: null },
                { que: "Hair loss", selection: null },
                { que: "Flushing or hot flushes", selection: null },
                { que: "Excessive sweating", selection: null }
            ],
        },
        {
            heading: "NOSE",
            questions: [
                { que: "Stuffy nose", selection: null },
                { que: "Sinus problems", selection: null },
                { que: "Watery", selection: null },
                { que: "Excessive mucus formation", selection: null },
                { que: "Sneezing attacks", selection: null }
            ]
        },
        {
            heading: "WEIGHT",
            questions: [
                { que: "Binge eating/drinking", selection: null },
                { que: "Craving certain foods", selection: null },
                { que: "Excessive weight", selection: null },
                { que: "Compulsive eating", selection: null },
                { que: "Water retention", selection: null },
                { que: "Underweight", selection: null },
            ]
        },
        {
            heading: "OTHER",
            questions: [
                { que: "Frequent illness", selection: null },
                { que: "Frequent or urgent urination", selection: null },
                { que: "Genital itch or discharge", selection: null }
            ],
        },
    ]
}

export const quizTwoSlice = createSlice({
    name: 'quiz_two',
    initialState,
    reducers: {
        setAnswer: (state, action) => {
            let { index, queIndex, value } = action.payload;
            state.data[index].questions[queIndex].selection = value
        },
        resetData: (state, action) => {
            state = initialState;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAnswer, resetData } = quizTwoSlice.actions

export default quizTwoSlice.reducer