"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/supabase";
import UserDashboard from "@/components/UserDashboard";
import GoalForm from "@/components/GoalForm";
import GoalCard from "@/components/GoalCard";
import ProgressChart from "@/components/ProgressChart";
import { Goal } from "@/types";

export default function Page() {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-10">
        <h1 className="text-5xl font-bold text-center">Fitness Goal Tracker</h1>
        {session ? (
          <>
            <GoalForm />
            <div className="flex flex-col gap-5">
              {isLoading ? (
                <p className="text-center">Loading goals...</p>
              ) : (
                <>
                  {goals.length > 0 ? (
                    goals.map((goal) => (
                      <GoalCard key={goal.id} goal={goal} />
                    ))
                  ) : (
                    <p className="text-center">No goals yet. Create one!</p>
                  )}
                </>
              )}
              <UserDashboard />
            </div>
          </>
        ) : (
          <p className="text-center">Please log in to access your dashboard.</p>
        )}
      </div>
    </main>
  );
}