import React, {createContext,useContext} from "react";

export const TodoContext = createContext({
    user : "Lodash",
    uid: 0,
    addTodo: (user,uid) => {
        this.user = user
        this.uid = uid
        console.log("user: ",user)
        console.log("uid: ",uid)
    },
    
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider