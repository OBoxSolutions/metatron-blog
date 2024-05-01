import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import { options } from "@/utils/options";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";

export default function ViewsLine() {
  const viewsData = {
    labels: ["Apple", "Android", "Linuxl", "Windows", "Lenovo"],
    datasets: [
      {
        label: "Reads",
        data: [12000, 17000, 17000, 22000, 12000],
        backgroundColor: [
          "#28AFB0",
          "#1B7071",
          "#2CC4C5",
          "#114747",
          "#4CD7D8",
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Card className="col-span-1">
      <CardBody>
        <Doughnut data={viewsData} options={options}></Doughnut>
      </CardBody>
    </Card>
  );
}
