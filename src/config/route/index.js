import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../../components/home";
import TaskInfo from "../../components/taskInfo";

export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<Home />}/>
        <Route path="/task/:id" element={<TaskInfo />}/>
    </>
))