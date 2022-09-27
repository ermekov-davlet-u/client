

import JournalSelect from '../Blogs/Selects/journal';
import { useEffect } from 'react';
import useDirectory from '../service/redux/directory';
import TableJournalWrap from './../components/Table/JournalTable';

function Journal() {

    const { setNewYears,
        setNewWS } = useDirectory();
    useEffect(() =>{
        setNewYears()
        setNewWS()
    }, [])

    return ( 
        <>

                <JournalSelect />
                <TableJournalWrap />
        </>
     );
}

export default Journal;