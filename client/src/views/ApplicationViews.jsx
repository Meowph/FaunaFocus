import { Route, Routes } from "react-router-dom"
import { PostList } from "../components/Post/PostList.jsx"
import { ExperienceList } from "../components/experience/ExperienceList.jsx"
import { PostDetails } from "../components/Post/PostDetails.jsx"
import { ExperienceDetails } from "../components/experience/ExperienceDetails.jsx"
import { CreatePost } from "../components/post/CreatePost.jsx"
import { EditPost } from "../components/post/EditPost.jsx"
import { DeletePost } from "../components/post/DeletePost.jsx"
import { EditExperience } from "../components/experience/EditExperience.jsx"
import { DeleteExperience } from "../components/experience/DeleteExperience.jsx"
import { SubscribedPostList } from "../components/subs/SubscribedPostList.jsx"
import { CreateExperience } from "../components/experience/CreateExperience.jsx"
import { UserPostList } from "../components/post/UserPostList.jsx"
import { UserExperienceList } from "../components/experience/UserExperienceList.jsx"

export const ApplicationViews = () => {
    return(
       <Routes>
            <Route path="/post" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/newpost" element={<CreatePost />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
            <Route path="/posts/delete/:id" element={<DeletePost />} />
            <Route path="/myposts" element={<UserPostList />} />
            <Route path="/experiences" element={<ExperienceList />} />
            <Route path="/experiences/:id" element={<ExperienceDetails />} />
            <Route path="/newexperience" element={<CreateExperience />} />
            <Route path="/experiences/edit/:id" element={<EditExperience />} />
            <Route path="/experiences/delete/:id" element={<DeleteExperience />} />
            <Route path="/myexperiences" element={<UserExperienceList />} />
            <Route path="/subscription" element={<SubscribedPostList />} />
        </Routes>
    )
}