import "react";

const AboutUs = () => {
  return (
    <div
      id="aboutUS"
      className="min-h-screen bg-gray-100 text-gray-800 px-6 py-12"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-amber-500">About CodeSwayam</h1>
        <p className="mt-4 text-lg text-gray-600">
          Bridging the gap between students and coding education, empowering the
          next generation of developers.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">
          Our Mission & Vision
        </h2>
        <p className="mt-4 text-gray-600">
          Our mission is to make coding education accessible to all students,
          providing them with the tools, mentorship, and resources to become
          successful developers. Our vision is to empower students from diverse
          backgrounds by offering a platform that promotes hands-on learning,
          real-world projects, and career opportunities in the tech industry.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Our Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-amber-500">
              Accessible Education
            </h3>
            <p className="mt-2 text-gray-600">
              We aim to bring quality coding education to students of all
              backgrounds, ensuring equal opportunities for growth in tech.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-amber-500">
              Hands-on Learning
            </h3>
            <p className="mt-2 text-gray-600">
              Interactive lessons and real-world projects to help students gain
              practical skills for a successful career in tech.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-amber-500">
              Career Advancement
            </h3>
            <p className="mt-2 text-gray-600">
              Equipping students with the right tools, mentorship, and resources
              to help them land internships, jobs, and career opportunities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Meet Our Team</h2>
        <p className="mt-4 text-gray-600">
          Our team is a diverse group of educators, tech experts, and industry
          professionals who work together to provide the best learning
          experience for students.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
            <img
              src="./images/dipika.jpg"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="font-semibold text-xl text-gray-800">Dipika</h3>
            <p className="text-gray-600">Developer</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
            <img
              src="./images/shiv.jpg"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="font-semibold text-xl text-gray-800">Shivprasad</h3>
            <p className="text-gray-600">Developer</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
            <img
              src="./images/tanuja.jpg"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="font-semibold text-xl text-gray-800">Tanuja</h3>
            <p className="text-gray-600">Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
