import React from "react";
import ListTop from "./listTop";

const AddRequest = () => {
  return (
    <form>
      <div className="w-full mb-4 shadow-lg border border-gray-200 rounded-lg bg-gray-50 :bg-gray-700 :border-gray-600">
        <ListTop />
        <div className="px-4 py-2 bg-white rounded-b-lg :bg-gray-800">
          <label htmlFor="editor" className="sr-only">
            Publish post Where Dreams Meet Reality!
          </label>
          <textarea
            id="editor"
            rows="5"
            className="block w-full px-0 text-sm text-gray-800 bg-white border-0  focus:ring-0 resize-none "
            placeholder="Write an article..."
            required
          ></textarea>
        </div>
        <div className="w-full flex justify-end p-2 border-t-2 border-gray-200 ">
          <button
            type="submit"
            className="inline-flex w-fit items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary100 rounded-lg focus:ring-4 focus:ring-primary300  hover:bg-primary200"
          >
            Publish post
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddRequest;
