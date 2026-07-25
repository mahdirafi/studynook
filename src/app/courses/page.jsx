import CourseCard from "../Components/CourseCard";

const CoursePage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/course`, {
    cache: "no-store",
  });
  const courses = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="relative mx-auto mb-12 max-w-2xl text-center sm:mb-16">
  {/* Decorative glow */}
  <div className="absolute left-1/2 top-0 -z-10 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl sm:h-48 sm:w-48" />

  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm sm:text-sm">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
    </span>
    Explore & Learn
  </span>

  <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:mt-5 sm:text-5xl md:text-6xl">
    Discover Our{' '}
    <span className="bg-gradient-to-t from-primary to-blue-700 bg-clip-text text-transparent">
      Courses
    </span>
  </h2>

  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
    Learn from industry experts, master new skills, and start your
    journey to success today.
  </p>
</div>

        {/* Course Grid */}
        {courses?.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-gray-400">
              No courses available right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;