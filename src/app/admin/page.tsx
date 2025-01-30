"use client";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";

import ViewsLine from "./_components/dashboard-charts/ViewsLine";
import ReadsLine from "./_components/dashboard-charts/ReadsLine";
import RegisteredUsersBar from "./_components/dashboard-charts/RegisteredUsersBar";
import PopularCategoriesDoughnut from "./_components/dashboard-charts/PopularCategoriesDoughnut";

export default function Admin() {
  const activeWriters = [
    {
      name: "John",
      articles: 150,
    },
    {
      name: "Jane",
      articles: 140,
    },
    {
      name: "Bob",
      articles: 124,
    },
    {
      name: "Alice",
      articles: 100,
    },
    {
      name: "Charlie",
      articles: 80,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl">Dashboard</h2>
      <div className="grid grid-cols-4 gap-4">
        <ViewsLine></ViewsLine>
        <ReadsLine></ReadsLine>
        <Card className="col-span-4">
          <CardBody>Engagement</CardBody>
          <CardBody className="flex justify-between pt-0">
            <div>
              <h3 className="text-2xl">32%</h3>
              <p>Engaged in the last 30 days</p>
            </div>
            <div>
              <h3 className="text-2xl">12%</h3>
              <p>Engaged in the last 7 days</p>
            </div>
            <div>
              <h3 className="text-2xl">120</h3>
              <p>Subscribers</p>
            </div>
          </CardBody>
        </Card>
        <RegisteredUsersBar></RegisteredUsersBar>
        <PopularCategoriesDoughnut></PopularCategoriesDoughnut>
        <Card>
          <CardBody>Most active writers</CardBody>
          <CardBody>
            <ul className="flex flex-col gap-3">
              {activeWriters.map((writer) => (
                <li className="flex justify-between" key={writer.name}>
                  <span>{writer.name}</span>
                  <span>{writer.articles} articles</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
