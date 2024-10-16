import { Route, Routes } from "react-router-dom"
import { PostList } from "../components/Post/PostList.jsx"
import { ExperienceList } from "../components/experience/ExperienceList.jsx"
import { PostDetails } from "../components/Post/PostDetails.jsx"
import { ExperienceDetails } from "../components/experience/ExperienceDetails.jsx"

export const ApplicationViews = () => {
    return(
       <Routes>
            <Route path="/post" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/experiences" element={<ExperienceList />} />
            <Route path="/experiences/:id" element={<ExperienceDetails />} />
        </Routes>
    )
}