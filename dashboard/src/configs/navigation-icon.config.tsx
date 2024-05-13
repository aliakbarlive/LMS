import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
 
} from 'react-icons/hi'
import { LiaChalkboardTeacherSolid,LiaBookReaderSolid } from "react-icons/lia";
import { LiaUserEditSolid ,LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GrUserManager,GrUserAdmin } from "react-icons/gr";
import { HiOutlineUserGroup ,HiOutlineHandThumbUp  } from "react-icons/hi2";

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    enrolledCourse:<LiaBookReaderSolid size={28} />,
    editorGroupMenu:<LiaUserEditSolid size={28} />,
    instructorGroupMenu:<LiaChalkboardTeacherSolid size={28} />,
    managerGroupMenu:<GrUserManager  size={25}/>,
    userGroupMenu:<HiOutlineUserGroup size={25}/>,
    adminGroupMenu:<GrUserAdmin size={25}/>,
    invoiceSingleMenu:<LiaFileInvoiceDollarSolid  size={25}/>,
    approvalMenu:<HiOutlineHandThumbUp   size={25}/>,
}

export default navigationIcon
