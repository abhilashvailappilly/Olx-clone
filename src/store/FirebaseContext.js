import { createContext, useState } from "react";

export const FirebaseContext = createContext(null)

export const AuthContext =  createContext(null);

export default function Context({children}) {
    const [user,setUser] = useState(null)
    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
// export const PostContext = createContext(null)

// export function Post({Child}){
//     const [postDetails,setPostDetails] = useState(null)
//     return(
//         <PostContext.Provider value={{postDetails,setPostDetails}}>
//             {Child}
//         </PostContext.Provider>
//     )
// }