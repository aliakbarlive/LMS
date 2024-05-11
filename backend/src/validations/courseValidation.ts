import * as yup from "yup";
export const querySchema = yup.object().shape({
  isPublished: yup.boolean().required(),
});
export const feedbackValidation = yup.object().shape({
  comment: yup.string().required(),
  rating: yup.number().required(),
});

const courseValidation = yup.object().shape({
  title: yup.string().required(),
  topic: yup.string().required(),
  duration: yup.string().required(),
  modality: yup.string().required(),
  price: yup.number().required(),
  // pageContent: yup.object({
  postTitle: yup.string().required(),
  videoUrl: yup.string().url().required(),
  objectivesTitle: yup.string().required(),
  courseOverview: yup.string().required(),
  // image: yup.mixed().test("fileType", "Invalid file type", (value:any) => {
  //   if (value) {
  //     return value && ["image/jpeg", "image/png"].includes(value.type);
  //   }
  // }).required(),
  // }),
});

export default courseValidation;
