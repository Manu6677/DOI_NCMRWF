const BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

export const documents = [
  {
    category: 'Library Membership Form',
    items: [
      { subcategory: 'LIBRARY RULES' },
      {
        description: { en: 'Membership to Central Government Employees' },
        link: `${BASE_URL}/Documents/Forms/Membership Form_govtemp.pdf`,
      },
      {
        description: { en: 'Special Members' },
        link: `${BASE_URL}/Documents/Forms/Membership Form_spl.pdf`,
      },
      {
        description: { en: 'Corporate Members' },
        link: `${BASE_URL}/Documents/Forms/Membership Form_corp.pdf`,
      },
    ],
  },
  {
    category: 'ADVANCE / REFUND FORMS',
    items: [
      { subcategory: 'Leave' },
      {
        description: {
          en: 'Casual Leave / Restricted Leave / Compensatory Leave',
        },
        link: `${BASE_URL}/Documents/Forms/casual leave.pdf`,
      },
      {
        description: { en: 'Earned Leave / Medical Leave' },
        link: `${BASE_URL}/Documents/Forms/EL Form.pdf`,
      },
      {
        description: { en: 'Joining Report' },
        link: `${BASE_URL}/Documents/Forms/joining report after leave.pdf`,
      },
      {
        description: {
          en: 'Application for CL/RH/Comp. Leave/EL/Medical/Joining Report',
        },
        link: `${BASE_URL}/Documents/Forms/Application_Leave.pdf`,
      },

      { subcategory: 'Traveling' },
      {
        description: { en: 'Traveling Allowance Bill for Official Tour Form' },
        link: `${BASE_URL}/Documents/Forms/TA Bill for Official Tour.pdf`,
      },
      {
        description: { en: 'Transfer TA Claim' },
        link: `${BASE_URL}/Documents/Forms/transfer_ta.doc`,
      },

      { subcategory: 'LTC' },
      {
        description: { en: 'Leave Travel Concession Advance' },
        link: `${BASE_URL}/Documents/Forms/LTC Advance Form.pdf`,
      },
      {
        description: { en: 'Home Town Declaration Form for Home LTC' },
        link: `${BASE_URL}/Documents/Forms/hometwn.pdf`,
      },
      {
        description: {
          en: 'Leave Travel Concession Bill for Home Town / All India Form',
        },
        link: `${BASE_URL}/Documents/Documents/Forms/LTCApp.pdf`,
      },

      { subcategory: 'GPF' },
      {
        description: { en: 'GPF Advance Form' },
        link: `${BASE_URL}/Documents/Forms/GPFAdvanceForm.pdf`,
      },
      {
        description: { en: 'GPF Withdrawal Form' },
        link: `${BASE_URL}/Documents/Forms/GPFWithdrawalForm.pdf`,
      },
      {
        description: { en: 'GPF Nomination Form' },
        link: `${BASE_URL}/Documents/Forms/GPFNominationForm.pdf`,
      },
      {
        description: {
          en: 'Form for Conversion OF GPF Advance into a Final Withdrawal',
        },
        link: `${BASE_URL}/Documents/Forms/Conversion_GPFAdvanceintoWithdrawal.pdf`,
      },
      {
        description: { en: 'GPF Final Payment' },
        link: `${BASE_URL}/Documents/Forms/GPFFinalPayment.pdf`,
      },

      { subcategory: 'CGHS' },
      {
        description: { en: 'Medical Reimbursement Claim Forms' },
        link: `${BASE_URL}/Documents/Forms/File86.pdf`,
      },
      {
        description: { en: 'Application Form for Plastic Cards' },
        link: `${BASE_URL}/Documents/Forms/File87.pdf`,
      },
      {
        description: { en: 'Application Form for CGHS Card for PENSIONERS' },
        link: `${BASE_URL}/Documents/Forms/File91.pdf`,
      },
      {
        description: {
          en: 'Application Form for CGHS Card for AUTONOMOUS BODIES',
        },
        link: `${BASE_URL}/Documents/Forms/File92.pdf`,
      },
      {
        description: { en: 'CGHS – Addition / Deletion of family members' },
        link: `${BASE_URL}/Documents/Forms/CGHS-addition.pdf`,
      },
      {
        description: { en: 'Medical – Essential Certificate – A' },
        link: `${BASE_URL}/Documents/Forms/medical essential certificate-A.pdf`,
      },
      {
        description: { en: 'Medical – Essential Certificate – B' },
        link: `${BASE_URL}/Documents/Forms/medical essential certificate-B.pdf`,
      },
      {
        description: { en: 'Application for change of CGHS Dispensary' },
        link: `${BASE_URL}/Documents/Forms/cghs-change-of-dispensary.pdf`,
      },
      {
        description: {
          en: 'Medical – application for claiming refund of medical expenses incurred',
        },
        link: `${BASE_URL}/Documents/Forms/medical.pdf`,
      },

      { subcategory: 'HBA' },
      {
        description: { en: 'HBA All forms' },
        link: `${BASE_URL}/Documents/Forms/HBA All Forms.pdf`,
      },
      {
        description: { en: 'HBA Agreement' },
        link: `${BASE_URL}/Documents/Forms/HBA-agreement.pdf`,
      },
      {
        description: { en: 'HBA Mortgage form' },
        link: `${BASE_URL}/Documents/Forms/HBA-Mortgage form.pdf`,
      },
      {
        description: { en: 'House building Advance-Initial Application' },
        link: `${BASE_URL}/Documents/Forms/admin-forms-house-building-advance-application.pdf`,
      },

      { subcategory: 'CGEGIS' },
      {
        description: { en: 'CGEGIS- GAR 44 form' },
        link: `${BASE_URL}/Documents/Forms/CGEGIS-GAR44.pdf`,
      },
      {
        description: { en: 'Nomination – CGEGIS' },
        link: `${BASE_URL}/Documents/Forms/nomicgegis.pdf`,
      },
      {
        description: { en: 'Nomination – CGEGIS - Family' },
        link: `${BASE_URL}/Documents/Forms/nomicgegisfamily.pdf`,
      },
      {
        description: { en: 'Nomination form for Group Insurance Scheme' },
        link: `${BASE_URL}/Documents/Forms/admin-forms-cgegis-nomination-form.pdf`,
      },

      { subcategory: 'Intimations and Permissions' },
      {
        description: { en: 'Declaration to visit abroad' },
        link: `${BASE_URL}/Documents/Forms/Declaration to visit abroad.pdf`,
      },
      {
        description: { en: 'Deputation to Abroad' },
        link: `${BASE_URL}/Documents/Forms/Deputation Abroad.pdf`,
      },
      {
        description: {
          en: 'Application for approval/intimation of transaction in Immovable property',
        },
        link: `${BASE_URL}/Documents/Forms/transaction-immovable-property-intimation-18(3).pdf`,
      },
      {
        description: {
          en: 'Application for intimation of transaction in Movable property',
        },
        link: `${BASE_URL}/Documents/Forms/movable-property-intimation-18(3).pdf`,
      },
      {
        description: { en: 'No Objection Certificate for Higher Studies' },
        link: `${BASE_URL}/Documents/Forms/nocHigherStudies.pdf`,
      },
      {
        description: { en: 'Application for NOC for taking passport/Visa' },
        link: `${BASE_URL}/Documents/Forms/appln-noc-for-passport-visa.pdf`,
      },

      { subcategory: 'Education Allowance' },
      {
        description: { en: 'Tuition Fees Reimbursement Form' },
        link: `${BASE_URL}/Documents/Forms/TutionFees Rembersment.pdf`,
      },
      {
        description: {
          en: 'Children Education Allowance – Hostel Subsidy Claim Form',
        },
        link: `${BASE_URL}/Documents/Forms/hostel_subsidy.doc`,
      },

      { subcategory: 'Advance / Loan' },
      {
        description: { en: 'Car loan' },
        link: `${BASE_URL}/Documents/Forms/carloan.pdf`,
      },
      {
        description: {
          en: 'Application for sanction of Motor Cycle / Motor Car advance',
        },
        link: `${BASE_URL}/Documents/Forms/motorcycle-car-advance.pdf`,
      },
      {
        description: { en: 'Form of mortgage bond for MCA/PC advance' },
        link: `${BASE_URL}/Documents/Forms/mortgage-bond-motorcar-pc-loan.pdf`,
      },
      {
        description: { en: 'Vehicle – Computer – Mortgage form' },
        link: `${BASE_URL}/Documents/Forms/vehicle-computer-mortgage form.pdf`,
      },
      {
        description: { en: 'Uniform Allowance' },
        link: `${BASE_URL}/Documents/Forms/Uniform Allowance.doc`,
      },
      {
        description: { en: 'Festival Advance' },
        link: `${BASE_URL}/Documents/Forms/Festival Advance.pdf`,
      },

      { subcategory: 'Service' },
      {
        description: { en: 'Statement of Immovable Property Form' },
        link: `${BASE_URL}/Documents/Forms/property_dec.pdf`,
      },
      {
        description: { en: 'Application for Fresh / Renewal of Identity Card' },
        link: `${BASE_URL}/Documents/Forms/ID Card MHA Form.pdf`,
      },
      {
        description: { en: 'Application for Parking Label' },
        link: `${BASE_URL}/Documents/Forms/Applicaiton for Parking Label.pdf`,
      },

      { subcategory: 'Others' },
      {
        description: { en: 'Nomination – Death / Retirement Gratuity' },
        link: `${BASE_URL}/Documents/Forms/dcrg-nomination-form.pdf`,
      },
      {
        description: { en: 'Retirement Forms' },
        link: `${BASE_URL}/Documents/Forms/retireforms.pdf`,
      },
      {
        description: { en: 'Application for increment for small family norms' },
        link: `${BASE_URL}/Documents/Forms/small-family-norms-increment.pdf`,
      },
      {
        description: {
          en: 'Format of application for compassionate appointment',
        },
        link: `${BASE_URL}/Documents/Forms/appln-compassionate-appointment.pdf`,
      },
      {
        description: { en: 'Form for nomination for DCR Gratuity' },
        link: `${BASE_URL}/Documents/Forms/dcrg-nomination-form.pdf`,
      },
      {
        description: {
          en: 'Form of nomination for arrears of pension/revised pension',
        },
        link: `${BASE_URL}/Documents/Forms/arrear-pension-nomination.pdf`,
      },
      {
        description: { en: 'Form of nomination for commuted pension' },
        link: `${BASE_URL}/Documents/Forms/commuted-pension-nomination.pdf`,
      },
      {
        description: { en: 'Form for Home Town Declaration' },
        link: `${BASE_URL}/Documents/Forms/home-town-declaration.pdf`,
      },
      {
        description: { en: 'Declaration of Family details' },
        link: `${BASE_URL}/Documents/Forms/declaration-of-family-details.pdf`,
      },
      {
        description: {
          en: 'Application for allotment of Permanent Retirement Account Number (PRAN)',
        },
        link: `${BASE_URL}/Documents/Forms/Forms/pran.pdf`,
      },
      {
        description: {
          en: 'Application for Salary ECS (Electronic Clearing Service)',
        },
        link: `${BASE_URL}/Documents/Forms/Proforma_ecs.pdf`,
      },
    ],
  },
];
