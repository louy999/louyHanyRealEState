import React from "react";
import AddRequest from "./components/addRequest";
import AllComments from "./components/AllComments";
import { ToastContainer } from "react-toastify";

const RequestPage = () => {
  return (
    <>
      <ToastContainer />
      <div className=" w-11/12 lg:w-2/4 absolute top-44 sm:top-36 left-2/4 -translate-x-2/4">
        <AddRequest />
        <div className="w-full">
          <AllComments />
        </div>
      </div>
    </>
  );
};

export default RequestPage;
