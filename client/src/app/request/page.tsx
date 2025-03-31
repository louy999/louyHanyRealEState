import React from "react";
import AddRequest from "./components/addReq/addRequest";
import AllComments from "./components/AllComments";
import { ToastContainer } from "react-toastify";

const RequestPage = () => {
  return (
    <>
      <ToastContainer />
      <div className="translate-y-32 flex justify-center flex-wrap w-full    ">
        <AddRequest />
        <div className="w-full md:w-3/4 lg:w-2/4 flex flex-wrap p-2">
          <AllComments />
        </div>
      </div>
    </>
  );
};

export default RequestPage;
