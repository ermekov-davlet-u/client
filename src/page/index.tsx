
import Header from './../components/Header/index';
import MainTable from './../Blogs/Table/index';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentTable from './../components/Table/StudentTable';
import StudGradeTable from './../components/Table/StudGradeTable';
import SelectGrade from './../Blogs/Selects/StudentGrade';
import { useAppSelector } from '../store/hook';
import ModalLoading from './../components/Modal/ModalLoading';
import Diplom from './Diplom';
import Main from './Main';
import Journal from './Journal';
import { queryServer } from '../hooks/fetch';
import { useDispatch } from 'react-redux';
import { newDiplomDostup, newJournalDostup } from '../store/slice/dostupSlice';
import { useEffect } from 'react';

function MainWrap() {

    const { loading } = useAppSelector(state => state.loading)
    const { diplom, journal } = useAppSelector(state => state.dostup)
    const dispatch = useDispatch()
    const getDostups = async () => {
        const journalDostup = await queryServer<{ JurnalPermis: boolean }>("/avn13/api/AVN13/formask/getJurnalPermis")
        const diplomDostup = await queryServer<{ DiplomPermis: boolean }>("/avn13/api/AVN13/formask/getDiplomPermis")
        dispatch(newJournalDostup(journalDostup.JurnalPermis))
        dispatch(newDiplomDostup(diplomDostup.DiplomPermis))
    }

    useEffect(() => {
        getDostups()
    }, [])
    return ( 
        <>
            <ModalLoading show={loading} />
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="" element={<Main />}>
                        <Route path="/avn13" element={<MainTable />}/>
                        <Route path="/avn13/log-pass" element={<StudentTable />}/>
                        <Route path="/avn13/stud-grade" element={
                            <div>
                                <SelectGrade />
                                <StudGradeTable />
                            </div>
                        }/>
                    </Route>
                    {
                        diplom && <Route path="/avn13/diplom" element={<Diplom />}/>
                    }
                    {
                        journal && <Route path="/avn13/journal" element={<Journal />}/>
                    }
                        <Route path="*" element={<div>Error</div>}/>
                </Routes>
            </BrowserRouter>

        </>
     );
}

export default MainWrap;