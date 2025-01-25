import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import { toast } from "react-toastify"; // Ensure toast is imported

interface AddReplayProps {
  request_id: string; // Replace `string` with the correct type if different
}

const AddReplay: React.FC<AddReplayProps> = ({ request_id }) => {
  const token = getCookie("token") as string | undefined; // Explicitly type `token`
  const [replay, setRequest] = useState("");

  const addRequestFetch = async () => {
    if (token) {
      try {
        const res = await axios.post(`${process.env.local}/replay`, {
          replay,
          user_id: token,
          request_id,
        });
        console.log(res.data);
        toast.success("This request is done");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error(error);
        toast.error("Failed to send the replay");
      }
    } else {
      toast.error("Please log in");
    }
  };

  return (
    <form>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 :bg-gray-700">
        <textarea
          id="chat"
          value={replay}
          onChange={(e) => setRequest(e.target.value)}
          rows={1}
          className="block resize-none mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 :bg-gray-800 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          placeholder="Your message..."
        ></textarea>
        <div
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 :text-blue-500 :hover:bg-gray-600"
          onClick={addRequestFetch}
        >
          <svg
            className="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
          <span className="sr-only">Send message</span>
        </div>
      </div>
    </form>
  );
};

export default AddReplay;
