import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Products";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { orderId: string } }) => {
  try{
    await connectToDB()

    const orderDetails = await Order.findById(params.orderId).populate({
      path: "products.product",
      model: Product
    })
    if(!orderDetails){
      return new NextResponse(JSON.stringify({message: "Not found"}), { status: 404 })
    }

    const customer = await Customer.findOne({clerkId: orderDetails.customerClerkId})

    return NextResponse.json({orderDetails, customer}, {status: 200})
  }catch(err){
    console.log("[ordersId_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 