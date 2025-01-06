// import React from "react";
// import { motion } from "framer-motion";

// const interiorTypes = [
//   {
//     title: "3 BHK: Charming Efficiency",
//     subtitle:
//       "Find yourself in perfect harmony of aesthetics and practicality.",
//     description:
//       "Our 3 BHK designs capture the essence of smart luxury, with every layout thoughtfully designed to maximize space and light. For modern families, are an epitome of elegance and seamless transitions with perfectly Luxury.",
//     image: "/placeholder.svg?height=300&width=400",
//   },
//   {
//     title: "3.5 BHK: An Ode to Luxury",
//     subtitle: "For more space where it matters the most.",
//     description:
//       "The 3.5 BHK concept offers an additional half-room that can transform into your personal sanctuary, be it a study, home office, or creative studio. These homes merge contemporary design with practical luxury.",
//     image: "/placeholder.svg?height=300&width=400",
//   },
//   {
//     title: "4 BHK: Grand Living, Amplified",
//     subtitle: "Space that speaks of sophistication.",
//     description:
//       "Step into a world of luxury with our 4 BHK homes, designed for the larger family or those who simply crave expansive living.",
//     image: "/placeholder.svg?height=300&width=400",
//   },
//   {
//     title: "4.5 BHK: Aspirations",
//     subtitle: "Tailor-made blend of space and style.",
//     description:
//       "Our 4.5 BHK homes offer unparalleled flexibility and luxury, with an additional half-room designed to adapt to your lifestyle, this extra space redefines personalized luxury in a modern home.",
//     image: "/placeholder.svg?height=300&width=400",
//   },
//   {
//     title: "5 BHK: The Pinnacle of Luxury",
//     subtitle: "Where every inch exudes grandeur.",
//     description:
//       "For those who prefer the ultimate luxury living lifestyle, our 5 BHK homes are the epitomes of magnificence with expansive layouts, grand interiors, and all this with an aura of sophistication.",
//     image: "/placeholder.svg?height=300&width=400",
//   },
// ];

// const HomeInteriors = () => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <motion.h1
//         className="lg:text-4xl text-xl font-semibold text-[#104438] text-center"
//         initial={{ opacity: 1, y: -50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ type: "spring", stiffness: 120, damping: 25 }}
//       >
//         Home Interiors
//       </motion.h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {interiorTypes.map((interior, index) => (
//           <motion.div
//             key={index}
//             className="bg-white rounded-lg shadow-lg overflow-hidden"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <img
//               src={interior.image}
//               alt={interior.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-6">
//               <h2 className="text-2xl font-semibold mb-2">{interior.title}</h2>
//               <h3 className="text-lg text-gray-600 mb-4">
//                 {interior.subtitle}
//               </h3>
//               <p className="text-gray-700">{interior.description}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomeInteriors;
