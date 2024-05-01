import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

import { options } from "@/utils/options";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";

export default function ViewsLine() {
  const viewsData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Views",
        data: [
          12000, 19000, 17000, 22000, 15000, 25000, 23000, 20000, 27000, 29000,
          24000, 30000,
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Card className="col-span-2">
      <CardBody>
        <Line data={viewsData} options={options}></Line>
      </CardBody>
    </Card>
  );
}
