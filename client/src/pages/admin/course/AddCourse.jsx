import { useGetAllCategoryQuery } from "@/api/categorySlice";
import { useAddCourseMutation } from "@/api/courseSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState(""); // Added state for category

  const { data: categories, isLoading: categoryLoading } = useGetAllCategoryQuery();
  const [addCourse, { data, isLoading, error, isSuccess }] = useAddCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value); // Correctly set the category
  };

  const createCourseHandler = async () => {
    if (!courseTitle || !category) {
      Swal.fire("Error", "Please fill in all fields!", "error");
      return;
    }

    await addCourse({ courseTitle, category });
  };

  // Show success or error messages
  useEffect(() => {
    if (isSuccess) {
      Swal.fire("Success", "Course added successfully!", "success");
      navigate("/admin/course");
    }
    if (error) {
      Swal.fire("Error", "Failed to add course!", "error");
    }
  }, [isSuccess, error, navigate]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add a course: add some basic course details for your new course
        </h1>
        <p className="text-sm">
          Provide a title and select the appropriate category for your course.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          {categoryLoading ? (
            <p>Loading categories...</p>
          ) : (
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories?.map((cat) => (
                    <SelectItem value={cat._id} key={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
