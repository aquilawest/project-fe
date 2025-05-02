import { Payment, columns } from "@/components/product/productColumn"
import { DataTable } from "@/components/ui/DataTable"

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            productName:'pen',

            status: "pending",
        },

        {
            id: "728d52f",
            amount: 100,
            productName:'juice',

            status: "pending",
        }, {
            id: "728ed2f",
            amount: 100,
            productName:'pencil',

            status: "pending",
        }, {
            id: "728ed52",
            amount: 100,
            productName:'biro',
            status: "pending",
        }, {
            id: "728e2f",
            productName:'book',

            amount: 100,
            status: "pending",
        }, {
            id: "7282f",
            productName:'bicycle',
            amount: 100,
            status: "pending",
        },
    ]
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10 px-4">
            <DataTable columns={columns} data={data}   buttonTitle={'Add product'} route={'/dashboard/product/add-product'} title={'Products'}/>
        </div>
    )
}
