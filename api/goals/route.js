"use client";

import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { data: goals, error } = await supabase
          .from("goals")
          .select("*")
          .eq("user_id", req.query.userId);
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ goals });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "POST":
      try {
        const { name, target, startDate, endDate } = req.body;
        const { data: goal, error } = await supabase
          .from("goals")
          .insert({
            name,
            target,
            start_date: startDate,
            end_date: endDate,
            user_id: req.query.userId,
          })
          .select();
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(201).json({ goal });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "PUT":
      try {
        const { id, name, target, startDate, endDate } = req.body;
        const { data: goal, error } = await supabase
          .from("goals")
          .update({
            name,
            target,
            start_date: startDate,
            end_date: endDate,
          })
          .eq("id", id)
          .select();
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ goal });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "DELETE":
      try {
        const { id } = req.body;
        const { error } = await supabase
          .from("goals")
          .delete()
          .eq("id", id);
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(204).send();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    default:
      return res.status(405).json({ error: "Method Not Allowed" });
  }
}