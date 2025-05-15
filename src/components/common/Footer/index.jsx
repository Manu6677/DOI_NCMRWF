import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { headings, links } from '../../../data/footer-data';
import { useSelector } from 'react-redux';
import SocialMediaLinks from '../SocialMediaLinks';
import ncmrwfLogo from '../../../assets/images/NCMRWF_Logo_Hindi-English.png';
import {
  logVisitor,
  fetchVisitorCount,
} from '../../../services/operations/visitorApi';

const Footer = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  const [visitorCount, setVisitorCount] = useState(3031501);
  const currentDate = new Date();

  useEffect(() => {
    logVisitor(); // Log visit on load

    const getCount = async () => {
      const count = await fetchVisitorCount();
      setVisitorCount(count);
    };

    getCount();
  }, []);

  return (
    <div className="">
      <div className="max-w-maxContent relative mx-auto flex w-11/12 items-center justify-between gap-8 py-8 leading-6 text-richblack-400 lg:flex-row">
        <div className="flex w-[100%] flex-col border-b border-richblack-700 pb-2 lg:flex-row">
          {/* Section 1 */}
          <div className="flex flex-row flex-wrap justify-evenly gap-3 pl-3 lg:w-[50%] lg:border-r lg:border-richblack-700 lg:pr-5">
            <div className="mb-7 flex w-[30%] flex-col items-start gap-3 lg:w-[30%] lg:pl-0">
              <img
                src={ncmrwfLogo}
                alt="footer-logo"
                loading="lazy"
                width={70}
                className=""
              />

              <h1 className="text-[16px] font-semibold text-blue-700">
                {headings.organization[locale]}
              </h1>
              <div className="flex flex-col gap-2">
                {links.organization.map((ele, i) => (
                  <div
                    key={i}
                    className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                  >
                    <Link to={ele.path}>{ele.title[locale]}</Link>
                  </div>
                ))}
              </div>

              <SocialMediaLinks />
            </div>

            <div className="mb-7 flex w-[30%] flex-col gap-3 lg:w-[30%] lg:pl-0">
              <h1 className="text-[16px] font-semibold text-blue-700">
                {headings.resources[locale]}
              </h1>
              <div className="flex flex-col gap-2">
                {links.resources.map((ele, i) => (
                  <div
                    key={i}
                    className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                  >
                    <Link to={ele.path}>{ele.title[locale]}</Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-7 w-[48%] lg:w-[30%] lg:pl-0">
              <h1 className="text-[16px] font-semibold text-blue-700">
                {headings.womenAndCitizenSupport[locale]}
              </h1>
              <div className="mt-2 flex flex-col gap-2">
                {links.womenAndCitizenSupport.map((ele, index) => (
                  <div
                    key={index}
                    className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                  >
                    <Link to={ele.path}>{ele.title[locale]}</Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-7 w-[48%] lg:w-[30%] lg:pl-0">
              <h1 className="text-[16px] font-semibold text-blue-700">
                {headings.portalsAndForms[locale]}
              </h1>
              <div className="mt-2 flex flex-col gap-2">
                {links.portalsAndForms.map((ele, index) => (
                  <div
                    key={index}
                    className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                  >
                    <Link to={ele.path}>{ele.title[locale]}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Additional Links */}
          <div className="flex flex-row flex-wrap justify-evenly gap-3 pl-3 lg:w-[50%] lg:pl-5">
            <div className="mb-7 w-[48%] lg:w-[30%] lg:pl-0">
              <h1 className="text-[16px] font-semibold text-blue-700">
                {headings.communication[locale]}
              </h1>
              <div className="mt-2 flex flex-col gap-2">
                {links.communication.map((ele, index) => (
                  <div
                    key={index}
                    className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                  >
                    <Link to={ele.path}>{ele.title[locale]}</Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-7 w-[48%] lg:w-[30%] lg:pl-0">
              <h1 className="text-[16px] font-semibold text-blue-700">
                {headings.additionalLinks[locale]}
              </h1>
              <div className="mt-2 flex flex-col gap-2">
                {links.additionalLinks.map((ele, index) => (
                  <div
                    key={index}
                    className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                  >
                    <Link to={ele.path}>{ele.title[locale]}</Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-7 w-[48%] lg:w-[30%] lg:pl-0">
              <h1 className="text-[16px] font-semibold text-blue-700">
                {headings.opportunities[locale]}
              </h1>
              <div className="mt-2 flex flex-col gap-2">
                {links.opportunities.map((ele, index) => (
                  <div
                    key={index}
                    className="cursor-pointer text-[14px] transition-all duration-200 hover:text-richblack-50"
                  >
                    <Link to={ele.path}>{ele.title[locale]}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-maxContent mx-auto flex w-11/12 flex-row items-center justify-end pb-8 text-sm text-richblack-400">
        {/* Section 1 */}
        {/* <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {["Privacy Policy", "Cookie Policy", "Terms of Use"].map((ele, i) => (
              <div
                key={i}
                className={` ${
                  i === 2 ? "" : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                } px-3 `}
              >
                <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
              </div>
            ))}
          </div>
        </div> */}

        <div className="mb-4 mt-2 flex w-full flex-row items-center justify-between">
          <p className="text-sm text-slate-600">
            Visitors: <span className="font-semibold">{visitorCount}</span>
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-4 mt-2 flex w-full flex-row items-center justify-between">
          <h1 className="text-sm text-blue-700">
            © {`${currentDate.getFullYear()}`} NCMRWF
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
