import { Route, Routes } from "react-router-dom"
import { PostList } from "../components/Post/PostList.jsx"
import { ExperienceList } from "../components/experience/ExperienceList.jsx"

export const ApplicationViews = () => {
    return(
       <Routes>
            <Route path="/post" element={<PostList />} />
            
            <Route path="/experiences" element={<ExperienceList />} />
        </Routes>
    )
}