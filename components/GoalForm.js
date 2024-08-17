"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/utils/supabase";
import { Goal } from "@/types";

interface GoalFormProps {
  onSubmit: (goal: Goal) => void;
}

export default function GoalForm({ onSubmit }: GoalFormProps) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (session) {
        const { data: goal, error } = await supabase
          .from("goals")
          .insert({
            name,
            target,
            start_date: startDate,
            end_date: endDate,
            user_id: session.user.id,
          })
          .select();
        if (error) {
          console.error("Error creating goal:", error);
        } else {
          onSubmit(goal[0]);
          setName("");
          setTarget("");
          setStartDate("");
          setEndDate("");
        }
      }
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">Create New Goal</h2>
      <div>
        <label htmlFor="name" className="block mb-1">
          Goal Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md px-3 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="target" className="block mb-1">
          Target:
        </label>
        <input
          type="text"
          id="target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="border rounded-md px-3 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="start-date" className="block mb-1">
          Start Date:
        </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded-md px-3 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="end-date" className="block mb-1">
          End Date:
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded-md px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Goal
      </button>
    </form>
  );
}