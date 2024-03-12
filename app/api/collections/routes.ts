import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const {userId} = auth()

    if(!userId){
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await connectToDB()

    const {title, description, image} = await req.json()

    const existingCollection = await Collection.findOne({title})

    if(existingCollection){
      return new NextResponse("Collection already exists", { status: 400 })  
    }

    if (!title || !description || !image) {
      return new NextResponse("title and image are required", { status: 400 })
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    })

    return NextResponse.json(newCollection, {status: 200})
  } catch (err){
    console.log("[collections_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}