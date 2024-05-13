import React from 'react';
import EnrolledCourseCard from './components/EnrolledCourseCard';
import CustomSlider from "@/components/shared/CustomSlider";
import { enrolledCourse } from "@/@types/enrolledCourse.interface";
import Progress from '@/components/ui/Progress'
import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

// this demo image 
const imageUrl = 'https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2022_08_MicrosoftTeams-image-13-2-1.jpg'

const EnrolledCourses: React.FC = () => {

  // fake api response
  const courses: enrolledCourse[] = [
    {
      courseOverview: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore odio excepturi animi sequi, vel voluptatibus dolor doloribus id soluta commodi beatae eligendi unde facilis vero non consequuntur cumque! Facilis, aspernatur!</p>",
      createdAt: "2024-02-16T08:24:02.850Z",
      duration: "dgfhgj",
      image: imageUrl,
      modality: "fghjhkj",
      objectivesTitle: "fdghjvh",
      postTitle: "gfghj",
      price: 4567,
      title: "title1",
      topic: "gfhgjh",
      updatedAt: "2024-02-16T08:24:02.850Z",
      videoUrl: "https://www.youtube.com/watch?v=C4ib5pbwexQ",
      __v: 0,
      _id: "65cf1ba254766f845198e4b5"
    },
    {
      courseOverview: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore odio excepturi animi sequi, vel voluptatibus dolor doloribus id soluta commodi beatae eligendi unde facilis vero non consequuntur cumque! Facilis, aspernatur!</p>",
      createdAt: "2024-02-16T08:24:02.850Z",
      duration: "dgfhgj",
      image: imageUrl,
      modality: "fghjhkj",
      objectivesTitle: "fdghjvh",
      postTitle: "gfghj",
      price: 4567,
      title: "title2",
      topic: "gfhgjh",
      updatedAt: "2024-02-16T08:24:02.850Z",
      videoUrl: "https://www.youtube.com/watch?v=C4ib5pbwexQ",
      __v: 0,
      _id: "65cf1ba254766f845198e4b5"
    },
    {
      courseOverview: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore odio excepturi animi sequi, vel voluptatibus dolor doloribus id soluta commodi beatae eligendi unde facilis vero non consequuntur cumque! Facilis, aspernatur!</p>",
      createdAt: "2024-02-16T08:24:02.850Z",
      duration: "dgfhgj",
      image: imageUrl,
      modality: "fghjhkj",
      objectivesTitle: "fdghjvh",
      postTitle: "gfghj",
      price: 4567,
      title: "title3",
      topic: "gfhgjh",
      updatedAt: "2024-02-16T08:24:02.850Z",
      videoUrl: "https://www.youtube.com/watch?v=C4ib5pbwexQ",
      __v: 0,
      _id: "65cf1ba254766f845198e4b5"
    },
    {
      courseOverview: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore odio excepturi animi sequi, vel voluptatibus dolor doloribus id soluta commodi beatae eligendi unde facilis vero non consequuntur cumque! Facilis, aspernatur!</p>",
      createdAt: "2024-02-16T08:24:02.850Z",
      duration: "dgfhgj",
      image: imageUrl,
      modality: "fghjhkj",
      objectivesTitle: "fdghjvh",
      postTitle: "gfghj",
      price: 4567,
      title: "title4",
      topic: "gfhgjh",
      updatedAt: "2024-02-16T08:24:02.850Z",
      videoUrl: "https://www.youtube.com/watch?v=C4ib5pbwexQ",
      __v: 0,
      _id: "65cf1ba254766f845198e4b5"
    }

];
  const customSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2
  };
  return (
    <div>
      <h3 className='pb-4'>Enrolled Courses</h3>
      <div className='py-4'>
          {/* <Progress percent={25} /> */}
          <h4>Hello User_name</h4>
          <Chart
            options={{
                colors: COLORS,
                labels: ['Inprogress','Not started','Completed'],
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                    }
                ],
                legend:{
                  position:'left'
                }
            }}
            series={[45,25,30]}
            height={300}
            type="donut"
        />
      </div>
      <CustomSlider
        items={courses}
        renderCard={(course: enrolledCourse) => (
          <EnrolledCourseCard key={course._id} course={course} />
        )}
        settings={customSliderSettings}
      />

      <div className="py-5">
        <h3 className='pb-4'>Similar Courses for you</h3>
        <CustomSlider
        items={courses}
        renderCard={(course: enrolledCourse) => (
          <EnrolledCourseCard key={course._id} course={course} />
        )}
        settings={customSliderSettings}
      />
      </div>
    </div>
  );
};

export default EnrolledCourses;
