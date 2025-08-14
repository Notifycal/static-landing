import { humanize } from '@/lib/utils/textConverter';
import type { JSX } from 'react';
import * as Icon from 'react-feather';

interface Project {
  icon: string;
  title: string;
  content: string;
}

interface ProjectsProps {
  projects: Array<Project>;
}

const Projects = ({ projects }: ProjectsProps): JSX.Element => {
  return (
    <div className="col-12">
      <div className="row">
        {projects.map((item, index) => {
          const FeatherIcon = Icon[humanize(item.icon) as keyof typeof Icon];
          return (
            <div key={`item-${index}`} className="lg:col-6">
              <div
                className={`flex items-center space-x-4 rounded-lg bg-[#fafafa] px-6 py-8 lg:mt-6 ${
                  projects.length - 1 === index ? 'mb-0' : 'mb-6'
                } `}
              >
                <div className="relative inline-flex h-24 w-24 items-center justify-center p-3">
                  <span className="project-icon text-[#FA7398]">
                    {' '}
                    <FeatherIcon className="font-semibold" />
                  </span>
                  <svg
                    className="absolute top-0 left-0 h-full w-full"
                    fill="none"
                    height="90"
                    viewBox="0 0 90 90"
                    width="90"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M42.8833 0.00928958C63.2143 -0.38584 82.2759 11.853 88.3264 31.1979C94.1797 49.9121 84.027 68.9907 68.0244 80.3913C52.4387 91.4948 31.5679 93.9094 16.0849 82.6642C0.66775 71.4667 -3.27813 50.9537 2.58684 32.8642C8.48561 14.6704 23.699 0.382132 42.8833 0.00928958Z"
                      fill="#FFCC99"
                      fillRule="evenodd"
                      opacity="0.1"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="h5 font-primary">{item.title}</h3>
                  <p className="mt-4">{item.content} </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
