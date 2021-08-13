import {configureStore} from '@reduxjs/toolkit'
import cardsReducer from './store/cardsSlice'
import gameReducer from './store/gameSlice'
import timeReducer from './store/timeSlice'

const store = configureStore({
    reducer: {
        cards: cardsReducer,
        game: gameReducer,
        time: timeReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store