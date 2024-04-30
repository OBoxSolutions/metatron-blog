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
        label: "Reads",
        data: [
          12000, 17000, 17000, 22000, 12000, 25000, 22000, 20000, 27000, 29500,
          24000, 28000,
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
