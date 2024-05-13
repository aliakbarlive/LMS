import { Course } from '@/@types'
interface IProps {
    data: Course
}
const DemoCard = (props: IProps) => {
    const { data } = props
  return ( 
    <>
    {
        data  ? <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
        <a href="#" className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
          <img src="" loading="lazy" alt="Article Thambnail" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
        </a>
  
        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            <a href="#" className="transition duration-100 hover:text-black ">Lorem ipsum dolor sit.</a>
          </h2>
  
          <p className="mb-8 text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint itaque eos quae ducimus, rerum ex.</p>
  
          <div className="mt-auto flex items-end justify-between">
            <div className="flex items-center gap-2 ">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 cursor-pointer">
                <img src="" loading="lazy" alt="User Profile Photo" className="h-full w-full object-cover object-center" />
              </div>
  
              <div className='cursor-pointer'>
                <span className="block text-black">Name</span>
                <span className="block text-sm text-gray-400">Date</span>
              </div>
            </div>
            <span className="rounded border px-2 py-1 text-sm text-gray-700 hover:bg-black hover:text-white  cursor-pointer  transition-all">Category</span>
          </div>
        </div>
      </div> : <div className="animate-pulse cursor-pointer">
          <div className="h-48 md:h-64 bg-gray-200 p-4 rounded-md"></div>
          <div className="pt-4 ">
            <div className="mb-2 h-6 bg-gray-200 rounded-md"></div>
            <div className="mb-8 h-16 bg-gray-200 rounded-md"></div>
            <div className="flex items-end justify-between pb-2">
              <div className="flex items-center gap-2 ">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200"></div>
                <div className='flex gap-2 flex-col'>
                  <div className="block h-3 bg-gray-200 w-[50px] rounded-md"></div>
                  <div className="block h-3 bg-gray-200 w-[50px] rounded-md"></div>
                </div>
              </div>
              <div className="rounded border w-[60px] py-1.5 text-sm cursor-pointer rounded-md bg-gray-200"></div>
            </div>
          </div>
        </div>
    }
    </>
  )
}

export default DemoCard