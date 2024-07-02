const formInformation = [
  {
    title: "Personal Details",
    fields: [
      { label: "Full Name", value: "John Doe" },
      { label: "Email", value: "john.doe@gmail.com" },
      { label: "Phone Number", value: "+1 (555) 123-4567" },
      { label: "Address", value: "New York, USA" },
    ],
    id: crypto.randomUUID(),
  },
  {
    title: "Education",
    fields: [
      { label: "School", value: "New York University" },
      { label: "Title of Study", value: "Bachelor of Arts in Economics" },
      { label: "Date Of Study", value: "September 2015 - June 2017" },
      {
        label: "Major Achievements or Honors",
        value: [
          "Graduated Magna Cum Laude",
          "Dean's List for 4 consecutive years",
          "President of the Economics Club",
        ],
      },
    ],
    id: crypto.randomUUID(),
  },
  {
    title: "Experience",
    fields: [
      { label: "Company Name", value: "Enter Company Name" },
      { label: "Position Title", value: "Enter Position Title" },
      { label: "Main Responsibilities", value: [] },
      {
        label: "Date",
        value: "Date from and until when you worked for that company (e.g., September 2018 - December 2020)",
      },
    ],
    id: crypto.randomUUID(),
  },
];

export default formInformation;
