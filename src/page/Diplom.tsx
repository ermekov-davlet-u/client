import DiplomTable from './../components/Table/Diplom';
import { useEffect } from 'react';
import useStudQuery from '../service/redux/main';
import DiplomSelect from './../Blogs/Selects/diplom';
import useDirectory from '../service/redux/directory';

function Diplom() {

    const { setNewYears} = useDirectory();
    const { setNewKvalification } = useStudQuery();
    useEffect(() =>{
        setNewKvalification()
        setNewYears()
    }, [])

    return ( 
        <>

                <DiplomSelect />
                <DiplomTable />
        </>
     );
}

export default Diplom;