import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/api/courseSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
// import { Input } from 'postcss'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const LectureTab = () => {

  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true)

  // extract courseId and lectureId
  const { courseId, lectureId } = useParams()


  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture
  const navigate = useNavigate()

  const [editLecture, { data, isLoading, isSuccess, error }] = useEditLectureMutation();
  const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveLectureMutation();



  // Media api 
  const MEDIA_API = `${import.meta.env.VITE_BACKEND_BASE_URL}/media`;


  // prefill lecture data if exist
  useEffect(
    () => {
      if (lecture) {
        setLectureTitle(lecture.lectureTitle);
        setIsFree(lecture.isPreviewFree)
        setUploadVideoInfo(lecture.videoUrl)
      }
    }, [lecture]
  )

  // file change handler
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true)
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total))
          }
        })

        if (res.data.success) {
          console.log(res)
          setUploadVideoInfo({
            videoUrl: res.data.data
          });
          setBtnDisable(false);
          Swal.fire("Success", `${res.data.message}`,"success")
        }
      } catch (error) {
        console.log(error)
        Swal.fire("Error", "Video upload failed","error")
      } finally {
        setMediaProgress(false)
      }
    }
  }


  const editLectureHandler = async () => {
    console.log({ lectureTitle, uploadVideoInfo, isFree, courseId, lectureId });

    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("Success", `${data.message}`, 'success')
    }
    if (error) {
      Swal.fire("Error", `${error.data.message}`, 'error')
    }
  }, [isSuccess, error]);

  const removeLectureHandler = async (lectureId) => {
    await removeLecture(lectureId);
  }

  useEffect(() => {
    if (removeSuccess) {
      Swal.fire("Success",`${removeData.message}`,"success");
      navigate(`/admin/course/editCourse/${courseId}/lecture`)
    }
  }, [removeSuccess])


  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className='fles items-center gap-2'>
          <Button variant="destructive" onClick={() => { removeLectureHandler(lectureId) }}>Remove Lecture</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Ex. Introduction to Javascript"

          />
        </div>
        <div>
          <Label>Video <span className='text-red-500'>*</span></Label>
          <Input
            type="file"
            accept="video/*"
            placeholder="Ex. Introduction to Javascript"
            className="w-fit"
            onChange={fileChangeHandler}
          />
        </div>

        <div>
          <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>

        {
          mediaProgress && (
            <div className='my-4'>
              <Progress value={uploadProgress} />
              <p>{uploadProgress}% uploaded</p>
            </div>
          )
        }

        <div className="mt-4">
          <Button onClick={editLectureHandler} disabled={isLoading} >
            {
              isLoading ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </> : "Update Lecture"
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LectureTab