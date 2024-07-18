"use client";

import React, { useState } from "react";
import Spinner from "@/components/ui/spinner";
import RatingInput from "./components/ratingInput";
import UploadImagesReview from "./components/uploadImages";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { CreateReviewService, UploadFileService } from "@/+core/services";
import { CreateReviewInput } from "@/+core/interfaces";
import { ToastAction } from "@radix-ui/react-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a title",
  }),
  content: z.string().min(1, {
    message: "Content must be valid",
  }),
});

interface CreateReviewProps {
  productId: string;
  onReviewCreated: () => void;
}

export default function CreateReview({
  productId,
  onReviewCreated,
}: CreateReviewProps) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [rating, setRating] = useState<number | undefined>(undefined);
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!session) {
        return toast({
          variant: "destructive",
          title: "Please Sign in first!",
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      }
      const validationResult = formSchema.safeParse(formData);
      if (!validationResult.success) {
        setNotification(validationResult.error.errors[0].message);
        return;
      }

      if (!rating) {
        setNotification("Please rating");
        return;
      }

      setIsLoading(true);
      let images = [];

      if (files) {
        for (let file of files) {
          images.push(await UploadFileService(file));
        }
      }

      const createReviewInput: CreateReviewInput = {
        productId: productId,
        content: formData.content,
        images: images,
        rate: rating,
        title: formData.title,
      };

      const { errors } = await CreateReviewService(
        session?.accessToken as string,
        createReviewInput
      );

      if (errors) {
        return toast({
          variant: "destructive",
          title: "Somethings went wrong!",
          description: errors[0].message,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      }

      console.log("Form data:", formData);
      setFormData({
        title: "",
        content: "",
      });
      setRating(0);
      setFiles(undefined);
      toast({
        title: "Review Success!",
        description: new Date().toDateString(),
        action: <ToastAction altText="Close">Close</ToastAction>,
      });

      onReviewCreated();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error submitting review. Please try again later!",
        description: error?.message,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-auto  rounded-none text-start">
      <CardHeader className="text-start">
        <CardTitle className="text-3xl">Write A Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div>
            <Label>Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="rounded-none h-12"
              placeholder="Enter title"
            />
          </div>

          <div className="mt-4">
            <Label>Content</Label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="rounded-none h-48"
              placeholder="Enter your content"
            />
          </div>

          <div className="mt-4">
            <Label>Rating</Label>
            <div>
              <RatingInput onChange={handleRatingChange} />
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-xl">Upload Images</Label>
            <div>
              <UploadImagesReview getFile={handleFileUpload} />
            </div>
          </div>

          <p className="mt-2 text-red-500 text-sm">{notification}</p>

          {isLoading ? (
            <Spinner size={30} />
          ) : (
            <Button
              type="submit"
              className="w-full mb-3 h-12 rounded-none mt-2"
            >
              Review
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
