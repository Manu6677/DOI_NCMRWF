import {
  FiBarChart2,
  FiEye,
  FiDatabase,
  FiBriefcase,
  FiCloudLightning,
  FiThermometer,
  FiCheckSquare,
  FiTool,
  FiArchive,
  FiMapPin,
  FiFileText,
  FiGitBranch,
  FiHardDrive,
  FiTrendingUp,
  FiCloud,
  FiActivity,
  FiWind,
  FiTrendingDown,
  FiBarChart,
  FiCalendar,
  FiRefreshCcw,
  FiZap,
  FiCheckCircle,
  FiClock,
} from 'react-icons/fi'; // Example icons

export const ncmnetMenuItems = [
  {
    id: 'mvr',
    label: 'Monthly Verification Reports',
    icon: FiBarChart2,
    children: [
      {
        id: 'mvr-global',
        label: 'Global',
        path: '/ncmnet/monthly-reports/global',
      },
      {
        id: 'mvr-regional',
        label: 'Regional',
        path: '/ncmnet/monthly-reports/regional',
      },
    ],
  },
  // {
  //   id: 'omr',
  //   label: 'Observation Monitoring Report',
  //   icon: FiEye,
  //   // path: '/ncmnet/observation-monitoring-report',
  //   children: [
  //     {
  //       id: 'omr-recv-vol',
  //       label: 'Received Data Volume',
  //       icon: FiDatabase, // Example icon
  //       path: '/ncmnet/observation-monitoring/received-data-volume',
  //     },
  //     {
  //       id: 'omr-assim-obs',
  //       label: 'Assimilated Observations',
  //       icon: FiCheckSquare, // Example icon
  //       path: '/ncmnet/observation-monitoring/assimilated-observations',
  //     },
  //     {
  //       id: 'omr-sat-rad',
  //       label: 'Satellite Radiance Summary',
  //       icon: FiBarChart2, // Example icon
  //       path: '/ncmnet/observation-monitoring/satellite-radiance-summary',
  //     },
  //     {
  //       id: 'omr-dump-size',
  //       label: 'Dump Size Monitoring',
  //       // Use FiHardDrive if imported and suitable, otherwise another icon
  //       icon: FiHardDrive, // or FiDatabase
  //       path: '/ncmnet/observation-monitoring/dump-size-monitoring',
  //     },
  //     {
  //       id: 'omr-aws-arg-qc',
  //       label: 'AWS-ARG-QC',
  //       icon: FiTool, // Example icon
  //       path: '/ncmnet/observation-monitoring/aws-arg-qc',
  //     },
  //   ],
  // },
  {
    id: 'dar',
    label: 'Data Assimilation Report',
    icon: FiDatabase,
    path: '/ncmnet/data-assimilation-report',
  },
  {
    id: 'met',
    label: 'MET',
    icon: FiMapPin,
    path: '/ncmnet/met',
    children: [
      { id: 'about-met', label: 'About MET', path: '/ncmnet/met/about-met' },
      {
        id: 'mode',
        label: 'Mode',
        path: '/ncmnet/met/mode',
      },
      {
        id: 'point-stat',
        label: 'Point STAT',
        children: [
          {
            id: 'rmse',
            label: 'RMSE',
            icon: FiBarChart2,
            path: '/ncmnet/met/point-stat/rmse',
          },
          {
            id: 'mpr',
            label: 'Matched Pair Plot',
            icon: FiTrendingUp,
            children: [
              {
                id: '850',
                label: '850hpa',
                icon: FiCloud, // or FiArrowUpRight for abstract pressure level
                path: '/ncmnet/met/point-stat/mpr/850',
              },
              {
                id: '700',
                label: '700hpa',
                icon: FiCloud,
                path: '/ncmnet/met/point-stat/mpr/700',
              },
              {
                id: '500',
                label: '500hpa',
                icon: FiCloud,
                path: '/ncmnet/met/point-stat/mpr/500',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'incomp',
    label: 'Incompass',
    icon: FiTool,
    children: [
      {
        id: 'vimo-conv',
        label: 'Vertically-Integrated-Moisture-Convergence',
        path: '/ncmnet/incompass/vimc',
      },
      {
        id: 'vimo-trans',
        label: 'Vertically-Integrated-Moisture-Transport',
        path: '/ncmnet/incompass/vimt',
      },
      {
        id: 'precip-water',
        label: 'Precipitable-Water',
        path: '/ncmnet/incompass/pwc',
      },
      {
        id: 'moist-trans',
        label: 'Moisture-Transport',
        path: '/ncmnet/incompass/mt',
      },
    ],
  },
  {
    id: 'neps',
    label: 'NEPS_plume',
    icon: FiGitBranch,
    path: '/ncmnet/neps-plume',
  },
  // {
  //   id: 'prodchange',
  //   label: 'Production Change',
  //   icon: FiTool,
  //   path: '/ncmnet/production-change',
  // },
  // {
  //   id: 'products',
  //   label: 'Products',
  //   icon: FiArchive,
  //   path: '/ncmnet/products',
  //   children: [
  //     {
  //       id: 'prod-sub1',
  //       label: 'Product Category A',
  //       path: '/ncmnet/products/category-a',
  //     },
  //     {
  //       id: 'prod-sub2',
  //       label: 'Product Category B',
  //       path: '/ncmnet/products/category-b',
  //     },
  //   ],
  // },
  {
    id: 'ncmrwf-av',
    label: 'NCMRWF Analysis Verification',
    icon: FiCheckSquare,
    path: '/ncmnet/ncmrwf-analysis-verification',
    children: [
      {
        id: 'daily',
        label: 'Daily',
        path: '/ncmnet/ncmrwf-analysis-verification/daily',
      },
      {
        id: 'weekly',
        label: 'weekly',
        path: '/ncmnet/ncmrwf-analysis-verification/weekly',
      },
    ],
  },
  {
    id: 'gfs-bias',
    label: 'GFS Bias Corrected Temperatures',
    icon: FiThermometer,
    path: '/ncmnet/gfs-bias-corrected-temperatures',
    children: [
      {
        id: 'forecast',
        label: 'Forecast',
        path: '/ncmnet/gfs-bias-corrected-temperatures/forecast',
      },
      {
        id: 'verification',
        label: 'verification',
        path: '/ncmnet/gfs-bias-corrected-temperatures/verification',
      },
    ],
  },
  // {
  //   id: 'forecast-v',
  //   label: 'Forecast-Verification',
  //   icon: FiCheckSquare,
  //   path: '/ncmnet/forecast-verification',
  //   children: [
  //     {
  //       id: 'ac',
  //       label: 'AC (Anomaly Correlation)',
  //       icon: FiActivity,
  //       children: [
  //         {
  //           id: 'ac-height',
  //           label: 'Height',
  //           icon: FiBarChart2,
  //           path: '/ncmnet/forecast-verification/ac/height',
  //         },
  //         {
  //           id: 'ac-wind',
  //           label: 'Vector-wind',
  //           icon: FiWind,
  //           path: '/ncmnet/forecast-verification/ac/vector-wind',
  //         },
  //         {
  //           id: 'ac-temp',
  //           label: 'Temperature',
  //           icon: FiThermometer,
  //           path: '/ncmnet/forecast-verification/ac/temperature',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'rmse',
  //       label: 'RMSE (Root Mean Square Error)',
  //       icon: FiTrendingDown,
  //       children: [
  //         {
  //           id: 'rmse-height',
  //           label: 'Height',
  //           icon: FiBarChart,
  //           path: '/ncmnet/forecast-verification/rmse/height',
  //         },
  //         {
  //           id: 'rmse-wind',
  //           label: 'Vector-wind',
  //           icon: FiWind,
  //           path: '/ncmnet/forecast-verification/rmse/vector-wind',
  //         },
  //         {
  //           id: 'rmse-temp',
  //           label: 'Temperature',
  //           icon: FiThermometer,
  //           path: '/ncmnet/forecast-verification/rmse/temperature',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'temp-verification',
  //       label: 'Temperature Verification',
  //       icon: FiThermometer,
  //       children: [
  //         {
  //           id: 'ncum-seasonwise',
  //           label: 'NCUM-Seasonwise',
  //           icon: FiCalendar,
  //           path: '/ncmnet/forecast-verification/temp/ncum-seasonwise',
  //         },
  //         {
  //           id: 'ncum-monthwise',
  //           label: 'NCUM-Monthwise',
  //           icon: FiCalendar,
  //           path: '/ncmnet/forecast-verification/temp/ncum-monthwise',
  //         },
  //         {
  //           id: 'ncum-vs-gfs-monthwise',
  //           label: 'NCUM-Vs-GFS-Monthwise',
  //           icon: FiRefreshCcw,
  //           path: '/ncmnet/forecast-verification/temp/ncum-vs-gfs-monthwise',
  //         },
  //         {
  //           id: 'ncum-vs-gfs-seasonwise',
  //           label: 'NCUM-Vs-GFS-Seasonwise',
  //           icon: FiRefreshCcw,
  //           path: '/ncmnet/forecast-verification/temp/ncum-vs-gfs-seasonwise',
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    id: 'rtm',
    label: 'RTM Portal',
    icon: FiBriefcase,
    path: '/ncmnet/rtm-portal',
  },
  {
    id: 'datamon',
    label: 'Data-Monitoring',
    icon: FiEye,
    path: '/ncmnet/data-monitoring',
  },
  {
    id: 'gmltp',
    label: 'Global Model Lightning Threat Product',
    icon: FiZap,
    children: [
      {
        id: 'forecast',
        label: 'Forecast',
        icon: FiClock,
        path: '/ncmnet/global-model-lightning-threat-product/forecast',
      },
      {
        id: 'verification',
        label: 'Verification',
        icon: FiCheckCircle,
        path: '/ncmnet/global-model-lightning-threat-product/verification',
      },
    ],
  },
  {
    id: 'orders',
    label: 'Office Orders',
    icon: FiFileText,
    path: '/ncmnet/office-orders',
  },
];
