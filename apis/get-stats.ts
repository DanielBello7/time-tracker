import type { STATS } from "@/types/stats.types";
// import axios from "axios";

const tempMetrics: STATS[] = [
  {
    amount: 40,
    _id: "1",
    description:
      "This is an insight about the total amount of bugs completed last week",
    sub: "+20.1% from last week",
    title: "Bugs Insight",
  },
  {
    amount: 4,
    _id: "2",
    description:
      "This is an insight about the total amount of stories completed last week",
    sub: "-80.14% from last week",
    title: "Stories Insight",
  },
  {
    amount: 44,
    _id: "3",
    description:
      "This is an insight about the total amount of tasks completed last week",
    sub: "+5.07% from last week",
    title: "Tasks Insight",
  },
];

export default async function getStats(
  userId: string
): Promise<STATS[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      console.log({ userId });
      resolve(tempMetrics);
    }, 4000);
  });
  // const response = await axios.get(`/api/users/stats/${userId}`);
  // return response.data.payload;
}
