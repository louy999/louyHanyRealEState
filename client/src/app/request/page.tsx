import React from "react";
import AddRequest from "./components/addReq/addRequest";
import AllComments from "./components/AllComments";
import { ToastContainer } from "react-toastify";

const RequestPage = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-bg200 -z-20"></div>
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
