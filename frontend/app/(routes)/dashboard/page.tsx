import React from 'react'
import { Appbar } from '@/components/app/Appbar'
import WorkFlowCard from '@/components/app/WorkFlowCard'
import { workflowcard } from '@/lib/dummyData'
import PriceDialog from '../price-dialog/page'

const Dashboard = () => {
    return (
        <div>
            <Appbar />
            <div className='flex flex-wrap justify-center gap-2 mt-2'>
                {workflowcard.map(({ id, title, description }, idx) => (
                    <div key={idx} className='w-[200] '>
                        <WorkFlowCard id={id} title={title} description={description} />
                    </div>
                ))}
            </div>
            {/* <PriceDialog/> */}
        </div>
    )
}

export default Dashboard