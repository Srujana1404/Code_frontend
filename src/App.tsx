import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contest from "./Pages/Contest/Contest";
import Upload from "./Pages/Upload/Upload";
import MCQs_questions from "./Pages/MCQs_questions/MCQs_questions";
import ContestOver from "./Pages/ContestOver/ContestOver";
import DisQualified from "./Pages/DisQualified/DisQualified";

const router = createBrowserRouter([
  {
    path: "/contests/:id",
    element: <Contest />,
  },
  {
    path: "/contests/:id/mcqs",
    element: <MCQs_questions />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/contest-over",
    element: <ContestOver />,
  },
  {
    path: "/disqualified",
    element: <DisQualified />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;