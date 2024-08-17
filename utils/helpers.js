import { API_URL, API_KEY } from "./constants";
import { supabase } from "./supabase";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getProgressData = async (goalId: number) => {
  try {
    const { data: progress, error } = await supabase
      .from("progress")
      .select("*")
      .eq("goal_id", goalId)
      .order("date", { ascending: true });
    if (error) {
      console.error("Error fetching progress data:", error);
      return [];
    }
    return progress;
  } catch (error) {
    console.error("Error fetching progress data:", error);
    return [];
  }
};

export const formatProgressDataForChart = (progressData: any[]) => {
  const labels = [...new Set(progressData.map((data) => data.date))].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const datasets = progressData.map((data, index) => ({
    label: `Goal ${index + 1}`,
    data: labels.map((label) => {
      const progressValue = data.find(
        (d) => d.date === label
      )?.value;
      return progressValue ? parseFloat(progressValue) : null;
    }),
    borderColor: `hsl(${index * 30 + 20}, 70%, 50%)`,
    borderWidth: 2,
  }));

  return { labels, datasets };
};