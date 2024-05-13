import React from "react";

const Skeleton = () => {
  return (
    <div>
      <div
        role="status"
        className="max-w-sm border border-gray-200 rounded shadow animate-pulse  dark:border-gray-700"
      >
        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300  dark:bg-gray-700">
          <svg
            className="w-10 h-48 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          </svg>
        </div>
        <div className="p-5">
          <div className="flex flex-row justify-between  ">
            <h6 className="h-5 w-20 bg-gray-200 rounded-full dark:bg-gray-700   mb-2"></h6>
            <h6 className=" h-5 w-20 bg-gray-200 rounded-full dark:bg-gray-700   mb-2"></h6>
          </div>
          <h2 className=" line-clamp-1 h-7 w-full bg-gray-200 rounded-full dark:bg-gray-700  mb-5 "></h2>
          <h4 className="h-4 w-full  bg-gray-200 rounded-full dark:bg-gray-700 mb-4 "></h4>
          <div className="flex  justify-between flex-wrap lg:flex-nowrap">
            <h6 className=" flex flex-row  w-1/3 lg:w-full flex-nowrap items-center h-4  bg-gray-200 rounded-full dark:bg-gray-700  mb-2"></h6>
            <h6 className="  flex flex-row justify-end w-1/3 lg:justify-center lg:w-full items-center h-4  bg-gray-200 rounded-full dark:bg-gray-700   mb-2"></h6>
            <h6 className=" flex flex-row w-1/3 lg:w-full justify-start  lg:justify-end items-center h-4  bg-gray-200 rounded-full dark:bg-gray-700   line-clamp-1 mb-2">
              <p className="line-clamp-1"></p>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
