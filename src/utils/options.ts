export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  responsive: true,
  plugins: {
    tooltip: {
      mode: "index" as const,
      intersect: false,
    },
  },
};
