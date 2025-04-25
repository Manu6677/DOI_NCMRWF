import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsThunk } from '../../../../../slices/openingSlice';
import JobCard from '../AllJobsPage/JobCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.css';

const Openings = () => {
  const dispatch = useDispatch();

  const { jobs, status, error } = useSelector((state) => state.openings);

  console.log('Redux jobs state:', jobs, status, error);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched && jobs.length === 0) {
      dispatch(fetchJobsThunk());
      setHasFetched(true);
    }
  }, [dispatch, jobs.length, hasFetched]);

  return (
    <section className="relative mt-56 flex h-32 justify-center bg-richblack-5 py-12">
      <div className="absolute -top-56 flex w-10/12 flex-col">
        <h1 className="mb-8 text-center text-3xl font-semibold text-blue-700">
          Latest Openings
        </h1>

        {jobs.length == 0 && (
          <p className="mb-8 text-2xl text-blue-700">Openings coming soon...</p>
        )}

        {/* Swiper Carousel for showcasing job cards */}
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={4}
          slidesPerGroup={1}
          spaceBetween={20}
        >
          {jobs.map((job) => (
            <SwiperSlide key={job.id}>
              <JobCard
                job={job}
                containerStyles={
                  'flex max-h-52 min-h-52 flex-col items-start justify-between overflow-hidden rounded-lg border border-richblack-100 bg-white shadow-lg transition-transform duration-200'
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Openings;
