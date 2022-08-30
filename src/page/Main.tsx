
import Selects from './../Blogs/Selects/index';
import Header from './../components/Header/index';
import MainTable from './../Blogs/Table/index';
import Sidebar from './../components/Sidebar/index';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentTable from './../components/Table/StudentTable';
import StudGradeTable from './../components/Table/StudGradeTable';
import SelectGrade from './../Blogs/Selects/StudentGrade';

function Main() {

    

    return ( 
        <>
            <Header />
            <BrowserRouter>
                <Selects />
                <Sidebar />
                <Routes>
                    <Route path="/" element={<MainTable />}/>
                    <Route path="/log-pass" element={<StudentTable />}/>
                    <Route path="/stud-grade" element={
                    <div>
                        <SelectGrade />
                        <StudGradeTable />
                    </div>
                    }/>
                </Routes>
            </BrowserRouter>

        </>
     );
}

export default Main;