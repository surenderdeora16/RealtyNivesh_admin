import { configureStore } from '@reduxjs/toolkit';
import quizOneReducer from './redux/quiz-one/quizOneSlice';
import quizTwoReducer from './redux/quiz-two/quizTwoSlice';
import themeReducer from './redux/theme/themeSlice';
import adminReducer from './redux/admin/adminSlice';
import userReducer from './redux/user/userSlice';
import onlineProgramReducer from './redux/online-program/onlineProgramSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        admin: adminReducer,
        user: userReducer,
        quiz_one: quizOneReducer,
        quiz_two: quizTwoReducer,
        onlineProgram: onlineProgramReducer,
    },
})