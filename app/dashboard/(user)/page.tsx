import { columns } from "@/components/user/UserColumn";
import { DataTable } from "@/components/ui/DataTable";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      name: "david oluwatayo",
    },

    {
      id: "728d52f",
      amount: 100,
      status: "pending",
      email: "a@example.com",
      name: "esther julius",
    },
    {
      id: "728ed2f",
      amount: 100,
      status: "pending",
      email: "r@example.com",
      name: "mathew james",
    },
    {
      id: "728ed52",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      name: "isiah king",
    },
    {
      id: "728e2f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      name: "david oluwatayo",
    },
    {
      id: "7282f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      name: "daniel john",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 px-4">
      <DataTable
        columns={columns}
        data={data}
        buttonTitle={"Add user"}
        route={"/dashboard/add-user"}
        title={"Users"}
      />
    </div>
  );
}
