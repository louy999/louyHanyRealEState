// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { FaAngleDown } from "react-icons/fa";
// import axios from "axios";

// const TypesUnitsSearch: React.FC = () => {
//   const router = useRouter();
//   const [selectedType, setSelectedType] = useState<string | null>(null);
//   const [unitTypes, setUnitTypes] = useState<
//     { value: string; label: string }[]
//   >([]);
//   const [open, setOpen] = useState(false);

//   const handleTypeChange = (value: string) => {
//     setSelectedType((prev) => (prev === value ? null : value));
//   };

//   useEffect(() => {
//     if (selectedType) {
//       router.push(`?type=${selectedType}`);
//     }
//   }, [router, selectedType]);

//   useEffect(() => {
//     const fetchUnitTypes = async () => {
//       try {
//         const res = await axios.get(`${process.env.local}/offer/type`);
//         const rawData = res.data.data;

//         const uniqueTypes = Array.from(
//           new Set(rawData.map((item: { unit_type: string }) => item.unit_type))
//         ).map((type) => ({
//           value: type,
//           label: type.charAt(0).toUpperCase() + type.slice(1),
//         }));

//         setUnitTypes(uniqueTypes);
//       } catch (error) {
//         console.log("Error fetching unit types:", error);
//       }
//     };

//     fetchUnitTypes();
//   }, []);

//   return (
//     <div
//       className={`p-2 md:p-4 bg-white rounded-lg shadow-md my-2 overflow-y-hidden ${
//         open ? "h-fit" : "h-12"
//       }`}
//     >
//       <h3
//         className="text-lg font-semibold mb-4 flex justify-between items-center cursor-pointer"
//         onClick={() => setOpen((prev) => !prev)}
//       >
//         <span> Property Types</span>
//         <FaAngleDown />
//       </h3>
//       <div className="flex flex-col gap-2">
//         {unitTypes.map((type) => (
//           <label key={type.value} className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               className="form-checkbox"
//               checked={selectedType === type.value}
//               onChange={() => handleTypeChange(type.value)}
//             />
//             {type.label}
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TypesUnitsSearch;
import React from "react";

const TypeUnitSearch = () => {
  return <div>TypeUnitSearch</div>;
};

export default TypeUnitSearch;
