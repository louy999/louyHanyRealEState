// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { IoMdClose } from "react-icons/io";

// interface Developer {
//   id: string;
//   name: string;
//   image_developer: string;
//   location: string[];
// }

// interface ApiResponse {
//   data: Developer[];
// }

// const DeveloperSearch = () => {
//   const [dataDeveloper, setDataDeveloper] = useState<Developer[]>([]);
//   const [inputSearch, setInputSearch] = useState<string>("");
//   const [filter, setFilter] = useState<Developer[]>([]);

//   useEffect(() => {
//     const fetchDataDeveloper = async () => {
//       try {
//         const res = await axios.get<ApiResponse>(`${process.env.local}/dev`);
//         setDataDeveloper(res.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchDataDeveloper();
//   }, []);

//   useEffect(() => {
//     if (inputSearch) {
//       const filteredDevelopers = dataDeveloper.filter((developer) =>
//         developer?.name?.toLowerCase().includes(inputSearch.toLowerCase())
//       );
//       setFilter(filteredDevelopers);
//     }
//   }, [dataDeveloper, inputSearch]);

//   return (
//     <>
//       <div className="relative w-full h-fit rounded-lg bg-white px-2">
//         <label className="input input-info flex items-center gap-2 w-full">
//           <input
//             type="text"
//             className="grow rounded-lg p-2 outline-none "
//             placeholder="Search By Developer"
//             onChange={(e) => setInputSearch(e.target.value)}
//             value={inputSearch}
//           />
//           {inputSearch ? (
//             <IoMdClose
//               className="text-xl cursor-pointer hover:text-2xl duration-300 "
//               onClick={() => setInputSearch("")}
//             />
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 16 16"
//               fill="currentColor"
//               className="h-4 w-4 opacity-70"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           )}
//         </label>
//         {inputSearch && (
//           <div className="absolute top-15 w-full bg-white text-black shadow-xl rounded-lg h-[100px] overflow-y-auto">
//             {filter.map((d, i) => (
//               <Link
//                 href={`/developer/${d.id}`}
//                 key={i}
//                 className="flex hover:bg-slate-300 p-4 justify-start gap-3 my-4 items-center"
//               >
//                 <div className="avatar">
//                   <div className="w-14 rounded-full">
//                     <Image
//                       src={`${process.env.img}/image/${d.image_developer}`}
//                       alt="img"
//                       width={100}
//                       height={100}
//                       className="avatar"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div>{d.name}</div>
//                   <div>
//                     {d.location.map((r, a) => (
//                       <span
//                         key={a}
//                         className="m-1 bg-info bg-black  text-white  p-1 rounded-lg text-sm"
//                       >
//                         {r}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default DeveloperSearch;
import React from "react";

const DeveloperSearch = () => {
  return <div>DeveloperSearch</div>;
};

export default DeveloperSearch;
