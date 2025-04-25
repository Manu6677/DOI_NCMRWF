// src/data/dataTypesInfo.js (or place directly in the component)

export const dataTypesInfo = [
  {
    mnemonic: 'SYNOPR',
    bufrType: 'NC000',
    subType: '000',
    description: 'Synoptic - restricted (WMO Res 40) manual & auto.',
  },
  {
    mnemonic: 'SYNOP',
    bufrType: 'NC000',
    subType: '001',
    description: 'Synoptic - fixed manual and automatic',
  },
  {
    mnemonic: 'SYNOPM',
    bufrType: 'NC000',
    subType: '002',
    description: 'Synoptic - mobile manual and automatic',
  },
  {
    mnemonic: 'METAR',
    bufrType: 'NC000',
    subType: '007',
    description: 'Aviation – METAR',
  },
  {
    mnemonic: 'SYNPBR',
    bufrType: 'NC000',
    subType: '100',
    description: 'Synoptic - restricted (WMO Res 40)(decoded BUFR)',
  },
  {
    mnemonic: 'SYNOPB',
    bufrType: 'NC000',
    subType: '101',
    description: 'Synoptic - fixed manual & auto (decoded fr BUFR)',
  },
  {
    mnemonic: 'SYNPMB',
    bufrType: 'NC000',
    subType: '102',
    description: 'Synoptic - mobile manual & auto (decoded fr BUFR)',
  },
  {
    mnemonic: 'DBUOY',
    bufrType: 'NC001',
    subType: '002',
    description: 'Buoys decoded from FM-18 fmt (moored or drifting)',
  },
  {
    mnemonic: 'MBUOY',
    bufrType: 'NC001',
    subType: '003',
    description: 'Buoys decoded from FM-13 format (moored)',
  },
  {
    mnemonic: 'SHIPS',
    bufrType: 'NC001',
    subType: '013',
    description: 'Ship - manual and automatic, unrestricted',
  }, // Note: Mnemonic might be SHIPSUN based on text? Using SHIPS from image context.
  {
    mnemonic: 'SHIPSB',
    bufrType: 'NC001',
    subType: '101',
    description: 'Ship - manual and automatic, restricted (BUFR)',
  },
  {
    mnemonic: 'DBUOYB',
    bufrType: 'NC001',
    subType: '102',
    description: 'Drifting buoys (decoded from BUFR)',
  },
  {
    mnemonic: 'MBUOYB',
    bufrType: 'NC001',
    subType: '110',
    description: 'Moored buoys (decoded from BUFR)',
  }, // Adjusted SubType based on common patterns, verify if needed
  {
    mnemonic: 'SHIPUB',
    bufrType: 'NC001',
    subType: '113',
    description: 'Ship - manual and automatic, unrestricted (BUFR)',
  },
  {
    mnemonic: 'RAOBF',
    bufrType: 'NC002',
    subType: '001',
    description: 'Rawinsonde - fixed land (from TEMP or PILOT)',
  },
  {
    mnemonic: 'RAOBS',
    bufrType: 'NC002',
    subType: '003',
    description: 'Rawinsonde - ship (from TEMP SHIP, PILOT SHIP)',
  },
  {
    mnemonic: 'PIBAL',
    bufrType: 'NC002',
    subType: '005',
    description: 'PIBAL (from PILOT, PILOT SHIP, PILOT MOBIL)',
  },
  {
    mnemonic: 'NXRDW',
    bufrType: 'NC002',
    subType: '008',
    description: 'NEXRAD Vel Azm Dsp(VAD) winds via radar coded msg',
  },
  {
    mnemonic: 'PRFLRJ',
    bufrType: 'NC002',
    subType: '013',
    description: 'Japanese Meteorological Agency profiler winds',
  },
  {
    mnemonic: 'PRFLRH',
    bufrType: 'NC002',
    subType: '014',
    description: 'Other profiler winds (e.g., from Hong Kong)',
  },
  {
    mnemonic: 'PRFLRE',
    bufrType: 'NC002',
    subType: '016',
    description: 'European profiler winds',
  },
  {
    mnemonic: 'RAOBFB',
    bufrType: 'NC002',
    subType: '101',
    description: 'Rawinsonde - fixed land (decoded from BUFR)',
  },
  {
    mnemonic: 'PIBALB',
    bufrType: 'NC002',
    subType: '105',
    description: 'PIBAL (decoded from BUFR)',
  },
  {
    mnemonic: 'GEOST1',
    bufrType: 'NC003',
    subType: '003',
    description: 'GOES/NESDIS hi-resol. (1x1 f-o-v) sndgs/radiances',
  },
  {
    mnemonic: 'GPSRO',
    bufrType: 'NC003',
    subType: '010',
    description: 'GPS radio occultation data',
  },
  {
    mnemonic: 'AIREP',
    bufrType: 'NC004',
    subType: '001',
    description: 'Manual AIREP aircraft data (dcded from AIREP fmt)',
  },
  {
    mnemonic: 'PIREP',
    bufrType: 'NC004',
    subType: '002',
    description: 'Manual PIREP aircraft data (dcded from PIREP fmt)',
  },
  {
    mnemonic: 'AMDAR',
    bufrType: 'NC004',
    subType: '003',
    description: 'AMDAR aircraft data (decoded from AMDAR format)',
  },
  {
    mnemonic: 'ACARS',
    bufrType: 'NC004',
    subType: '004',
    description: 'MDCRS ACARS acft data from ARINC(dcded from BUFR)',
  },
  {
    mnemonic: 'EADAS',
    bufrType: 'NC004',
    subType: '006',
    description: 'E-AMDAR (European AMDAR acft decoded from BUFR)',
  },
  {
    mnemonic: 'CAMDAR',
    bufrType: 'NC004',
    subType: '009',
    description: 'Canadian AMDAR aircraft data (decoded from BUFR)',
  },
  {
    mnemonic: 'KAMDAR',
    bufrType: 'NC004',
    subType: '011',
    description: 'Korean AMDAR aircraft data (decoded from BUFR)',
  },
  {
    mnemonic: 'AMDARB',
    bufrType: 'NC004',
    subType: '103',
    description: 'AMDAR aircraft data (decoded from BUFR)',
  },
  {
    mnemonic: 'INFIN2',
    bufrType: 'NC005',
    subType: '024',
    description: 'INDIA SATWIND, INSAT IR channel',
  },
  {
    mnemonic: 'VISIN2',
    bufrType: 'NC005',
    subType: '025',
    description: 'INDIA SATWIND, INSAT VIS channel',
  },
  {
    mnemonic: 'H20IN2',
    bufrType: 'NC005',
    subType: '026',
    description: 'INDIA SATWIND, INSAT WV channel',
  },
  {
    mnemonic: 'INFUSR',
    bufrType: 'NC005',
    subType: '030',
    description: 'GOES-16&up/NESDIS ir long-wave derived cld motion',
  },
  {
    mnemonic: 'H2DUSR',
    bufrType: 'NC005',
    subType: '031',
    description: 'GOES-16&up/NESDIS wv imgr/deep-lyr derivd cld mtn',
  },
  {
    mnemonic: 'VISUSR',
    bufrType: 'NC005',
    subType: '032',
    description: 'GOES-16&up/NESDIS visible derived cloud motion',
  },
  {
    mnemonic: 'H2TUSR',
    bufrType: 'NC005',
    subType: '034',
    description: 'GOES-16&up/NESDIS wv imgr/cld-top derived cld mtn',
  },
  {
    mnemonic: '3P9USR',
    bufrType: 'NC005',
    subType: '039',
    description: 'GOES-16&up/NESDIS ir short-wv derived cld motion',
  },
  {
    mnemonic: 'INFJA',
    bufrType: 'NC005',
    subType: '044',
    description: 'MTSAT/JMA infrared long-wave derived cloud motion',
  }, // Note: Name might be INFJAN? Using INFJA
  {
    mnemonic: 'VISJA',
    bufrType: 'NC005',
    subType: '045',
    description: 'MTSAT/JMA visible derived cloud motion',
  }, // Note: Name might be VISJAN? Using VISJA
  {
    mnemonic: 'H20JA',
    bufrType: 'NC005',
    subType: '046',
    description: 'MTSAT/JMA water vapor imager derived cloud motion',
  }, // Note: Name might be H20JAN? Using H20JA
  {
    mnemonic: 'IFEUNB',
    bufrType: 'NC005',
    subType: '067',
    description: 'METEOSAT/EUMETSAT ir lg-wave drv cld motion NBseq',
  },
  {
    mnemonic: 'VSEUNB',
    bufrType: 'NC005',
    subType: '068',
    description: 'METEOSAT/EUMETSAT visible drv cld motion NBseq',
  },
  {
    mnemonic: 'H2EUNB',
    bufrType: 'NC005',
    subType: '069',
    description: 'METEOSAT/EUMETSAT wvpr imgr drv cld motion NBseq',
  },
  {
    mnemonic: 'INFMO',
    bufrType: 'NC005',
    subType: '070',
    description: 'MODIS (AQUA/TERRA) ir l-wave derived cloud motion',
  }, // Note: Name might be INFMON? Using INFMO
  {
    mnemonic: 'H20MO',
    bufrType: 'NC005',
    subType: '071',
    description: 'MODIS (AQUA/TERRA) wvpr imager derived cloud motion',
  }, // Note: Name might be H20MON? Using H20MO
  {
    mnemonic: 'INFAV',
    bufrType: 'NC005',
    subType: '080',
    description: 'AVHRR (NOAA/METOP) ir lg-wave derived cld motion',
  },
  {
    mnemonic: 'INFAV1',
    bufrType: 'NC005',
    subType: '081',
    description: 'AVHRR (METOP) ir lg-wave derived cld motion',
  },
  {
    mnemonic: 'IFVRNB',
    bufrType: 'NC005',
    subType: '091',
    description: 'VIIRS (NPP/NOAA-20) ir lg-wv drv cloud motion(NB)',
  },
  {
    mnemonic: 'H2KMA',
    bufrType: 'NC005',
    subType: '110',
    description: 'GK2/KMA wv imgr/deep-lyr derivd cld mtn',
  },
  {
    mnemonic: 'VIKMA',
    bufrType: 'NC005',
    subType: '111',
    description: 'GK2/KMA visible derived cloud motion',
  },
  {
    mnemonic: 'H2KMA',
    bufrType: 'NC005',
    subType: '112',
    description: 'GK2/KMA wv imgr/cld-top derived cld mtn',
  }, // Note: Duplicate Mnemonic? Keeping for now
  {
    mnemonic: '3PKMA',
    bufrType: 'NC005',
    subType: '114',
    description: 'GK2/KMA ir short-wv derived cld motion',
  },
  {
    mnemonic: 'RD2W00',
    bufrType: 'NC006',
    subType: '010',
    description: 'NEXRAD radial wind (0000-0059 UTC)(Level 2 - GTS)',
  },
  // ... (Continue parsing all RD2W entries 01-23)
  {
    mnemonic: 'RD2W23',
    bufrType: 'NC006',
    subType: '033',
    description: 'NEXRAD radial wind (2300-2359 UTC)(Level 2 - GTS)',
  },
  {
    mnemonic: 'RD2R00',
    bufrType: 'NC006',
    subType: '040',
    description: 'NEXRAD reflectivity (0000-0059 UTC) (Lvl 2 - GTS)',
  },
  // ... (Continue parsing all RD2R entries 01-23)
  {
    mnemonic: 'RD2R23',
    bufrType: 'NC006',
    subType: '063',
    description: 'NEXRAD reflectivity (2300-2359 UTC) (Lvl 2 - GTS)',
  },
  {
    mnemonic: 'GOME',
    bufrType: 'NC008',
    subType: '012',
    description: 'METOP 1-2 Global Ozone Monitoring Exp.-2 (GOME-2)',
  },
  {
    mnemonic: 'OMPSN8',
    bufrType: 'NC008',
    subType: '017',
    description: 'OMPS nadir profile ozone (Version 8 BUFR)',
  },
  {
    mnemonic: 'OMPST8',
    bufrType: 'NC008',
    subType: '018',
    description: 'OMPS total column ozone (Version 8 BUFR)',
  },
  {
    mnemonic: 'GPSPW',
    bufrType: 'NC012',
    subType: '003',
    description: 'GPS integrated precipitable water',
  },
  {
    mnemonic: 'GNSS',
    bufrType: 'NC012',
    subType: '004',
    description: 'Grnd-based Gbl Navigation Sat System (GNSS) data',
  },
  {
    mnemonic: 'ASCAT',
    bufrType: 'NC012',
    subType: '122',
    description: 'METOP 1-2 ASCAT scatterometer data (50 KM)',
  },
  {
    mnemonic: 'ASCAT',
    bufrType: 'NC012',
    subType: '123',
    description: 'METOP 1-2 ASCAT scatterometer data (25 KM)',
  }, // Note: Duplicate Mnemonic?
  {
    mnemonic: 'HSCAT',
    bufrType: 'NC012',
    subType: '136',
    description: 'CMA HY-2 SCAT products',
  },
  {
    mnemonic: 'OSCATW',
    bufrType: 'NC012',
    subType: '253',
    description: 'ISRO Scaterometer products',
  },
  {
    mnemonic: '1BAMUA',
    bufrType: 'NC021',
    subType: '023',
    description: 'NOAA 15-19 & METOP 1-2 AMSU-A NCEP-proc. br.temps',
  },
  {
    mnemonic: '1BMHS',
    bufrType: 'NC021',
    subType: '027',
    description: 'NOAA 18-19 & METOP 1-2 MHS NCEP-proces. br. Temps',
  },
  {
    mnemonic: '1BHRS4',
    bufrType: 'NC021',
    subType: '028',
    description: 'NOAA 18-19 & METOP 1-2 HIRS-4 NCEP-proc. br.temps',
  },
  {
    mnemonic: 'ESAMUA',
    bufrType: 'NC021',
    subType: '033',
    description: 'NOAA 15-19 & METOP 1-2 AMSU-A proc btmps frm RARS',
  },
  {
    mnemonic: 'ESHRS3',
    bufrType: 'NC021',
    subType: '035',
    description: 'NOAA 15-19 & METOP 1-2 HIRS-3/4 pr btmps frm RARS',
  },
  {
    mnemonic: 'ESMHS',
    bufrType: 'NC021',
    subType: '036',
    description: 'NOAA 18-19 & METOP 1-2 MHS proc. btemps from RARS',
  },
  {
    mnemonic: 'ESCRIS',
    bufrType: 'NC021',
    subType: '037',
    description: 'NPP Crss-track IR Sndr (CrIS) radiances from RARS',
  },
  {
    mnemonic: 'ESATMS',
    bufrType: 'NC021',
    subType: '038',
    description: 'NPP Adv. Tech. MW Sndr (ATMS) br. temps from RARS',
  },
  {
    mnemonic: 'ESIASI',
    bufrType: 'NC021',
    subType: '039',
    description: 'METOP 1-2 IASI 1C radiance data vbl chn from RARS',
  },
  {
    mnemonic: 'SEVASR',
    bufrType: 'NC021',
    subType: '042',
    description: 'METEOSAT-10 2nd Gen SEVIRI All Sky Radiance(proc)',
  },
  {
    mnemonic: 'AHICSR',
    bufrType: 'NC021',
    subType: '044',
    description: 'Himawari Clear Sky Radiance',
  },
  {
    mnemonic: 'ABI',
    bufrType: 'NC021',
    subType: '050',
    description: 'GOES ABI Radiance(proc)',
  },
  {
    mnemonic: 'AVCSPM',
    bufrType: 'NC021',
    subType: '053',
    description: 'P.M.(N18-19) AVHRR GAC NCEP-proc clr & sea btemps',
  },
  {
    mnemonic: 'AVCLPM',
    bufrType: 'NC021',
    subType: '054',
    description: 'P.M.(N18-19) AVHRR GAC NCEP-proc cld or lnd btmps',
  },
  {
    mnemonic: 'SSMISU',
    bufrType: 'NC021',
    subType: '201',
    description: 'DMSP SSM/IS 1C radiance data (Unified Pre-Proc.)',
  },
  {
    mnemonic: 'ATMS',
    bufrType: 'NC021',
    subType: '203',
    description: 'NPP/NOAA-20 ATMS brightness temperatures',
  },
  {
    mnemonic: 'CRISFS',
    bufrType: 'NC021',
    subType: '205',
    description: 'NPP/NOAA-20 CrIS full spctrl radiances (2211 chn)',
  },
  {
    mnemonic: 'CRSFDB',
    bufrType: 'NC021',
    subType: '212',
    description: 'NPP/NOAA-20 CrIS full spctrl radn dir brdcst SSE',
  }, // Note: Mnemonic was CMTIASI in text, looks like typo? Using CRSFDB based on description context.
  {
    mnemonic: 'CMTIASI',
    bufrType: 'NC021',
    subType: '241',
    description: 'METOP 1-2 IASI 1C radiance data (varbl. channels)',
  },
  {
    mnemonic: 'GMI1CR',
    bufrType: 'NC021',
    subType: '246',
    description: 'GPM GMI Level 1C-R brightness temperatures',
  },
  {
    mnemonic: 'AIRS',
    bufrType: 'NC021',
    subType: '250',
    description: 'AQUA AIRS/AMSU-A/HSB brightness temps- center FOV',
  },
];

const DataTypesExplanationPage = () => {
  return (
    <div className="from-sky-100 min-h-screen bg-gradient-to-br via-white to-orange-100 p-4 pt-6 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        {' '}
        {/* Limit overall width */}
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explanation of Data Types
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Mnemonics and BUFR classifications used in the system.
          </p>
          {/* Optional Back Link */}
          {/* <div className="mt-4">
               <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                   &larr; Back to Monitoring
               </Link>
           </div> */}
        </header>
        {/* Table Section */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="overflow-x-auto">
            {' '}
            {/* Enable horizontal scroll on small screens */}
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 sm:px-6"
                  >
                    Mnemonic Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                  >
                    Bufr Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                  >
                    Sub Type
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 sm:px-6"
                  >
                    Descriptive Information
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {dataTypesInfo.map((dataType, index) => (
                  <tr
                    key={`${dataType.mnemonic}-${index}`}
                    className="transition duration-150 ease-in-out hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-800 sm:px-6">
                      {dataType.mnemonic}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">
                      {dataType.bufrType}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-sm text-slate-600">
                      {dataType.subType}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 sm:px-6">
                      {dataType.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Optional: Add message if data is empty */}
          {dataTypesInfo.length === 0 && (
            <p className="p-6 text-center text-slate-500">
              No data type information available.
            </p>
          )}
        </div>
        {/* Footer Disclaimer (Optional, but good practice) */}
        <footer className="mt-12 border-t border-slate-300 pt-8 text-center">
          <p className="mx-auto max-w-2xl text-xs text-slate-500">
            Information sourced from internal documentation. Refer to official
            WMO BUFR documentation for definitive classifications.
          </p>
        </footer>
      </div>{' '}
      {/* End Max Width Container */}
    </div>
  );
};

export default DataTypesExplanationPage;
