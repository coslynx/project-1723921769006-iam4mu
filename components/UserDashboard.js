"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/supabase";
import { Goal } from "@/types";
import GoalCard from "@/components/GoalCard";
import ProgressChart from "@/components/ProgressChart";

export default function UserDashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true);
        if (session) {
          const { data: goals, error } = await supabase
            .from("goals")
            .select("*")
            .eq("user_id", session.user.id);
          if (error) {
            console.error("Error fetching goals:", error);
          } else {
            setGoals(goals);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching goals:", error);
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, [session]);

  return (
    <div className="flex flex-col gap-5">
      {isLoading ? (
        <p className="text-center">Loading goals...</p>
      ) : (
        <>
          {goals.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center">No goals yet. Create one!</p>
          )}
          <h2 className="text-2xl font-bold mb-4">Progress Overview</h2>
          <ProgressChart goals={goals} />
        </>
      )}
    </div>
  );
}