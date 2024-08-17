"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Goal } from "@/types";
import SocialShareButton from "@/components/SocialShareButton";

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const formattedStartDate = format(new Date(goal.start_date), "MMM dd, yyyy");
  const formattedEndDate = format(new Date(goal.end_date), "MMM dd, yyyy");

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h3 className="text-lg font-bold mb-2">{goal.name}</h3>
      <p className="text-gray-600 mb-2">
        {goal.target} ({formattedStartDate} - {formattedEndDate})
      </p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
        <SocialShareButton
          title={goal.name}
          url="https://www.example.com/goal/" // Replace with your actual URL
          imageUrl="" // Replace with your actual image URL
          description={`Track your progress towards ${goal.target}`}
        />
      </div>
      {showDetails && (
        <div className="mt-4">
          {/* Add detailed goal information here, such as progress charts, current status, etc. */}
        </div>
      )}
    </div>
  );
}