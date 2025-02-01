// "use client";
// import React, { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const FormContact = () => {
//   const [phone, setPhoneNumber] = useState("");
//   const [name, setName] = useState("");
//   return (
//     <div className="w-96 hidden lg:block bg-bg200 shadow-lg rounded-md p-2 relative h-[46vh]  translate-y-2/4">
//       <h2 className="">Contact Us</h2>
//       <div>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 mb-2">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             className={`w-full px-4 py-2 border rounded-lg outline-none `}
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="phone" className="block text-gray-700 mb-2">
//             Phone Number
//           </label>
//           <PhoneInput
//             country={"eg"} // Default country set to US
//             value={phone}
//             onChange={(value) => setPhoneNumber(value)}
//             inputStyle={{
//               width: "100%",
//               borderRadius: "8px",
//             }}
//           />
//         </div>
//         <textarea
//           id="editor"
//           rows={5}
//           className="block w-full px-0 text-sm text-gray-800 bg-white border-0  focus:ring-0 resize-none "
//           placeholder="Write an article..."
//           required
//         ></textarea>{" "}
//         <button
//           type="button"
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
//         >
//           Default
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FormContact;
import React from "react";

const formContact = () => {
  return <div>formContact</div>;
};

export default formContact;
