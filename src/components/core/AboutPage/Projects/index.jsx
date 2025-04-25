import React from 'react';
import { projectData } from '../../../../data/project-data';
import { useSelector } from 'react-redux';
import '../../../../styles/projects.css';
import { Link } from 'react-router-dom';

const Projects = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  return (
    <div className="bg-blue-700 py-4">
      <div className="container mx-auto mb-12 w-9/12 px-6">
        {/* Projects Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-center text-4xl font-semibold text-white">
            {locale === 'hi' ? 'हमारे प्रोजेक्ट्स' : 'Our Projects'}
          </h2>
          <p className="mb-8 text-center text-lg text-white">
            {locale === 'hi'
              ? 'यहां हमारे प्रमुख प्रोजेक्ट्स की जानकारी दी गई है, जो हमारे संगठन के लिए महत्वपूर्ण हैं।'
              : 'Here are some of our key projects that are crucial for our organization’s growth and development'}
          </p>

          <div className="grid grid-cols-1 justify-center justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
            {projectData.slice(0, 4).map((project, index) => (
              <div className="transform-rotate-3d cursor-pointer" key={index}>
                <div className="card-inner relative h-96 w-60 rounded-2xl border border-richblack-5 bg-white p-6">
                  {/* Front */}
                  <div className="card-front backface-hidden absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h3 className="text-2xl font-semibold text-slate-800">
                      {locale === 'hi' ? project.name.hi : project.name.en}
                    </h3>
                    <p className="mt-2 text-lg text-slate-600">
                      {locale === 'hi'
                        ? project.implementedBy.hi
                        : project.implementedBy.en}
                    </p>
                  </div>

                  {/* Back - Short Summary */}
                  <div className="card-back backface-hidden rotateY-180 absolute inset-0 flex transform flex-col items-start justify-center p-4 text-left">
                    <h3 className="mb-2 text-xl font-semibold text-slate-800">
                      Key Highlights:
                    </h3>
                    <ul className="list-inside list-disc overflow-scroll text-sm text-slate-600">
                      {project.objectives
                        .slice(0, 5)
                        .map((objective, objIndex) => (
                          <li key={objIndex}>
                            {locale === 'hi' ? objective.hi : objective.en}
                          </li>
                        ))}
                    </ul>
                    <div className="mx-auto mt-4">
                      <Link
                        to={`/all-projects`}
                        className="mb-2 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        {locale === 'hi'
                          ? 'प्रोजेक्ट विवरण देखें'
                          : 'Project Details'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See All Projects Button */}
          <div className="mt-6 text-center">
            <Link
              to={'/all-projects'}
              className="rounded-lg bg-white px-6 py-2 text-blue-700 transition-all duration-200 hover:bg-blue-600 hover:text-white"
            >
              {locale === 'hi' ? 'सभी प्रोजेक्ट्स देखें' : 'See All Projects'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
