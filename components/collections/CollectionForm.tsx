"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "../ui/separator"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import ImageUpload from "../custom ui/ImageUpload"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import Delete from "../custom ui/Delete"

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string()
})

interface CollectionFormProps {
  initialData?: CollectionType | null // Must have ? to make it optional
}

const CollectionForm: React.FC<CollectionFormProps> = ({initialData}) => {
  const router = useRouter();
  //const params = useParams();

  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? initialData : {
      title: "",
      description: "",
      image: "",
    },
  })

   // 2. Define a submit handler.
   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log(values)
    try{
      setLoading(true);
      const url = initialData ? `/api/collections/${initialData._id}` : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      })
      if(res.ok){
        setLoading(false);
        toast.success(`Collection ${initialData ? "updated" : "created"}.`);
        window.location.href = "/collections";
        router.push("/collections");
      }
    }catch(err){
      console.log("[collections_POST]", err);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className='p-10'>
    {initialData ? (
    <div className="flex items-center justify-between">
      <p className="text-heading2-bold">Edit Collection</p>
      <Delete id={initialData._id} />
    </div>) 
    : (<p className="text-heading2-bold">Create Collection</p>)}
      <Separator className="bg-grey-1 my-4 mb-7"/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>
                  The title of the collection.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} rows={5}/>
                </FormControl>
                <FormDescription>
                  The description of the collection.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload 
                    value={field.value ? [field.value] : []} 
                    onChange={(url) => field.onChange(url)} 
                    onRemove={() => field.onChange("")} />
                </FormControl>
                <FormDescription>
                  The image of the collection.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">Submit</Button>
            <Button type="button" onClick={() => router.push("/collections")} className="bg-blue-1 text-white">Discard</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CollectionForm