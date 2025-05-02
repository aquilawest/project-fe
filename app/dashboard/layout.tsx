import { ReactNode } from 'react'
import type { FC } from 'react'
import { Sidebars } from "@/scaffold/Sidebar";


interface layoutProps {
    children: ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
    return (
        <>
            <div className='flex flex-col '>


                <div className='lg:flex relative  '>
                    {/* Curved corner */}


                    <Sidebars >
                        <div className='flex-grow bg-white relative  overflow-auto bg-gray-200 min-h-screen pt-10'>

                            <div className="w-full  dark:bg-neutral-800 hidden md:block fixed  bg-white" style={{top: 0 , right:0 , left:0 , zIndex:20 , height:50}}>
                                {/* Empty navbar */}


                            </div>


                            <main className=' w-full relative   h-screen ' >{children}</main>
                        </div>

                    </Sidebars>
                </div>
            </div>
        </>
    )
}
export default layout