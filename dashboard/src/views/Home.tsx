import CardWithInfo from "@/components/ui/CardWithInfo/CardWithInfo"
import CourseCardInfoHome from "@/components/ui/CardWithInfo/CourseCardInfoHome"
import {HiPlusCircle} from 'react-icons/hi'
import ViewUserList from "./userAdmin/components/ViewUserList"
import TodayClass from "./HomeClassesInfo/TodayClass"
import UpcomingClass from "./HomeClassesInfo/UpcomingClass"
import CourseTasks from "./HomeClassesInfo/CourseTasks"
import CourseFilter from "./HomeClassesInfo/CourseFilter"

const Home = () => {

const dashboardCards = [
    {
        title: "N/A",
        heading: "User Registrations"
    },
    {
        title: "N/A",
        heading: "User details"
    },
]

    const handleClick = () => {
        console.log("clicked on card")
    };

    return (
        <>
            <h2 className="text-[#444444]">Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-4">
               {
                   dashboardCards.map(({title, heading},index) => <CardWithInfo  key={index} onClick={handleClick} title={title} heading={heading} />)
               }
            </div>

            <button className="border-[1px] w-[23%] py-[7px] rounded-[5px] font-[600] border mt-[21px] bg-[#F6F6F6]">Email Invoices to Partner</button>  
            
            <div className="bg-[#F5F5F5] mt-[14px] px-[20px] pb-[28px] rounded-[8px]">
                <h3 className="mt-[20px] text-[#444444] font-[600]">Today's Class</h3>
                <hr className="border-[1.4px] rounded-[20px] mt-[4px] mb-[13px]"/>
                <TodayClass/>
            </div>

            <div className="bg-[#F5F5F5] mt-[50px] px-[20px] pb-[28px] rounded-[8px]">
                <h3 className="mt-[20px] text-[#444444] font-[600]">Upcoming's Class</h3>
                <hr className="border-[1.4px] rounded-[20px] mt-[4px] mb-[13px]"/>
                <UpcomingClass/>    
            </div>
            
            <div className="bg-[#F5F5F5] mt-[50px] px-[20px] pb-[28px] rounded-[8px]">
                <h3 className="mt-[20px] text-[#444444] font-[600]">Tasks</h3>
                <hr className="border-[1.4px] rounded-[20px] mt-[4px] mb-[13px]"/>
                <CourseTasks/>       
            </div>

            <div className="bg-[#F5F5F5] mt-[50px] px-[20px] pb-[28px] rounded-[8px]">

                <div className="flex items-center justify-between mt-[20px]">
                    <h4 className="text-[#444444] font-[600]">Filter Course</h4>
                    <div className="flex items-center gap-[5px]">
                        <button className="border-[1px] hover:border-[2px] py-[7px] px-[7px] rounded-[5px] hover:border-[#4f46e5] font-[600] bg-[#fff]">Send Reminder To All</button>
                        <button className="border-[1px] hover:border-[2px] py-[7px] px-[7px] rounded-[5px] hover:border-[#4f46e5] font-[600] bg-[#fff]">Select Users & Send Reminder</button>
                        <button className="border-[1px] hover:border-[2px] py-[7px] px-[7px] rounded-[5px] hover:border-[#4f46e5] font-[600] bg-[#fff]">Send Reminder To Company</button>
                    </div>
                </div>

                <div className="text-end mt-[7px]">             
                    <button className="border-[1px] hover:border-[2px] py-[7px] px-[14px] rounded-[5px] hover:border-[#4f46e5] font-[600] bg-[#fff]">Download</button>
                </div>

                
             

                <div className="flex gap-[15px] mt-[30px] items-end">


                    <div>
                        <p className="text-[15px] text-[#444444] font-[700] mb-[4px]">Email:</p>
                        <select className="py-[8px] pl-[8px] rounded-[7px] border-[1.6px]">
                            <option value="Course">Select Course</option>
                            <option value="Html">Html Course</option>
                            <option value="Css">Css Course</option>
                            <option value="Javascript">Javascript Course</option>
                        </select>
                    </div>

                    <div>
                        <button className="border-[1px] hover:border-[2px] py-[7px] px-[18px] rounded-[5px] hover:border-[#4f46e5] font-[600] bg-[#fff]">Search</button>
                    </div>
                </div>
                <div className="mt-[30px]">
                <CourseFilter/>
                </div>
            </div>
        </>
    )
}

export default Home




















// import CardWithInfo from "@/components/ui/CardWithInfo/CardWithInfo"
// import CourseCardInfoHome from "@/components/ui/CardWithInfo/CourseCardInfoHome"
// import {HiPlusCircle} from 'react-icons/hi'

// const Home = () => {

//     const handleClick = () => {
//         console.log("clicked on card")
//     };
//     const textData = {
//         leadCount: 10,
//         leadText: 'Lead',
//         tagText: 'Tag Text',
//         subTagText:'lorem',
//     };
//     const tagIcon = <HiPlusCircle className="text-base mr-1 rtl:ml-1"/>;
//     const icon = <HiPlusCircle />;

//     const textDataCourse = {
//         numbers: 10,
//         percent: 40,
//         text:'lorem',
//     };

//     return (
//         <>
//             Home Dashborad
//             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 py-4">
//                {
//                    [0,12,3,4].map(item => <CardWithInfo  key={item} onClick={handleClick} icon={icon} textData={textData} tagIcon={tagIcon} />)
//                }
//                <CourseCardInfoHome onClick={handleClick} icon={icon} textDataCourse={textDataCourse} />
//             </div>
            
//         </>
//     )
// }

// export default Home