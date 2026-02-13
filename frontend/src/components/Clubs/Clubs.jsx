import React from "react";
import { useParams } from "react-router-dom";

const clubs = [
  {
    id: 1,
    name: "Coding Club",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    description: `This is description`,
  },
  {
    id: 2,
    name: "Photography Club",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    description: "This is description",
  },
];

const ClubDetails = () => {
  const { id } = useParams();
  const club = clubs.find((c) => c.id === Number(id));

  if (!club) return (
    <div className="bg-amber-400"> <h1 className="text-center bg-linear-to-r from-cyan-200 to-blue-300  mt-10">Club Not Found</h1></div>
 
);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={club.image}
        alt={club.name}
        className="w-full rounded-xl  w-sm shadow-lg mb-5"
      />

      <h1 className="text-3xl font-bold mb-3">{club.name}</h1>
      <p className="text-gray-700 text-lg">{club.description}</p>
    </div>
  );
};

export default ClubDetails;
