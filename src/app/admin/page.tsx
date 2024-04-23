import Card from "@/components/Card";
import CardBody from "@/components/CardBody";

export default function Admin() {
  return (
    <section className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl">Dashboard</h2>
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-2">
          <CardBody>Views</CardBody>
        </Card>
        <Card className="col-span-2">
          <CardBody>Reads</CardBody>
        </Card>
        <Card className="col-span-2">
          <CardBody>Registered Users</CardBody>
        </Card>
        <Card>
          <CardBody>More popular categories</CardBody>
        </Card>
        <Card>
          <CardBody>Most active writers</CardBody>
        </Card>
        <Card className="col-span-2">
          <CardBody>Top read Posts</CardBody>
        </Card>
        <Card className="col-span-2">
          <CardBody>New Posts</CardBody>
        </Card>
      </div>
    </section>
  );
}
