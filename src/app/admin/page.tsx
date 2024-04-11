import Card from "@/components/Card";
import CardBody from "@/components/CardBody";

export default function Admin() {
  return (
    <section className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl">Dashboard</h2>
      <Card>
        <CardBody>Some body</CardBody>
      </Card>
    </section>
  );
}
