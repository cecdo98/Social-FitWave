import { Routes, Route } from "react-router-dom";
import MainPage from "./assets/Pages/MainPage.jsx";
import PersonalPage from "./assets/Pages/PersonalPage.jsx";
import RegisterBlock from "./assets/Blocks/RegisterBlock.jsx";


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="personalPage" element={<PersonalPage/>}/>
        <Route path="registerBlock" element={<RegisterBlock/>}/>
      </Routes>
    </>
  )
}

export default App
