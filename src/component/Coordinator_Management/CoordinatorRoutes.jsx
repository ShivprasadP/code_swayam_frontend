import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoordinatorTable from "./CoordinatorTable";
import CoordinatorList from "./CoordinatorList";
import AddCoordinator from "./AddCoordinator";

// This component need to  rendered on App.jsx 


function CoordinatorRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoordinatorList events={CoordinatorTable} />} />
        <Route path="/add-coordinator"element={<AddCoordinator events={AddCoordinator} />} />
      </Routes>
    </Router>
  );
}

export default CoordinatorRoutes;
