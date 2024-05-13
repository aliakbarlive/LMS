import { IoMdTime } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const ArticleCard = () => {
  const navigation = useNavigate();

//   const formattedDate = new Date(data?.createdAt).toLocaleString();

  const handleclick = () => {
    // navigation(`/singlenews/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 p-5 w-full hover:shadow-xl rounded-lg transition-all mr-10 ">
      <div className="w-full md:w-2/6">
        <img
          decoding="async"
          className="w-full  h-full rounded-md cursor-pointer"
          src=""
          alt="cover_image"
        //   onClick={() => handleclick(data?._id)}
        />
      </div>
      <div className="w-full md:w-4/6 flex flex-col justify-center">
        <h6 className="text-md  text-theme-green mb-2">category</h6>
        <h2
          className="text-xl font-bold text-black mb-2 cursor-pointer"
        //   onClick={() => handleclick(data?._id)}
        >
          title
        </h2>

        <h5 className="text-md line-clamp-2  text-black mb-5">
         data content
        </h5>
        <div className="flex gap-5">
          <h6 className=" text-gray-600 flex ">
            <IoMdTime className="m-1 text-base" />
            formattedDate
          </h6>
          <h6 className=" text-gray-600 flex ">
            <FaUserEdit className="m-1 text-base" />
            author name
          </h6>
        </div>
      </div>
    </div>
  );
};
export default ArticleCard;