import collabImg from '../../../../assets/images/collab.png';

const Collaborators = () => {
  return (
    <div className="bg-slate-950 flex min-h-screen flex-col items-center justify-center p-10 text-white">
      <div className="w-full max-w-6xl text-center">
        <img
          src={collabImg}
          alt="Collaboration"
          className="mx-auto rounded-xl object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <h2 className="mt-12 text-5xl font-extrabold text-blue-400">
          NCMRWF Collaborations
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-300">
          NCMRWF actively collaborates with global and domestic R&D and
          operational agencies to advance NWP capabilities.
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Momentum Partnership',
            description:
              'NCMRWF, through MoES, is a core partner in the Momentum Partnership with the UK and other countries, enhancing NWP capabilities.',
          },
          {
            title: 'WCSSP-India Project',
            description:
              'A major collaboration with the UK Met Office, promoting innovation and shared infrastructure for Unified Model development.',
          },
          {
            title: 'NOAA Collaboration',
            description:
              'A MoU with NOAA provides a framework for studying Indian Summer Monsoon Rainfall across timescales.',
          },
          {
            title: 'National Monsoon Mission',
            description:
              'In partnership with IMD, IITM, and INCOIS, NCMRWF improves monsoon forecasting and provides high-resolution NWP datasets.',
          },
          {
            title: 'Training & Capacity Building',
            description:
              'NCMRWF trains government agencies, including defence forces, and provides NWP training for BIMSTEC-region meteorological agencies.',
          },
          {
            title: 'Public Engagement & Awareness',
            description:
              'As part of Azadi ka Amrit Mahotsav, NCMRWF hosts student industrial visits and environmental awareness workshops.',
          },
        ].map((collab, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 p-6 text-center text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-blue-400">
              {collab.title}
            </h3>
            <p className="mt-2 text-slate-300">{collab.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaborators;
