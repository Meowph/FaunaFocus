import { Route, Routes } from "react-router-dom"
import { Post } from "../components/Post/Post.jsx"

export const ApplicationViews = () => {
    return(
       <Routes>
            <Route path="post" element={<Post />} />
        </Routes>
    )
}