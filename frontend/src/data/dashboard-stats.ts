export interface DashboardStat {
  title: string
  value: number
  description: string
}

export const dashboardStats: DashboardStat[] = [
  {
    title: "Total Tasks",
    value: 42,
    description: "All tasks created",
  },
];
