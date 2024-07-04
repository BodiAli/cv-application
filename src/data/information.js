const formInformation = [
  {
    title: "Personal Details",
    fields: [
      { id: crypto.randomUUID(), label: "Full Name", value: "John Doe", type: "text", autoComplete: "name" },
      {
        id: crypto.randomUUID(),
        label: "Email",
        value: "john.doe@gmail.com",
        type: "email",
        autoComplete: "email",
      },
      {
        id: crypto.randomUUID(),
        label: "Phone Number",
        value: "+1 (555) 123-4567",
        type: "tel",
        autoComplete: "tel",
      },
      {
        id: crypto.randomUUID(),
        label: "Address",
        value: "New York, USA",
        type: "text",
        autoComplete: "address-level1",
      },
    ],
    id: crypto.randomUUID(),
  },
  {
    title: "Education",
    fields: [
      {
        id: crypto.randomUUID(),
        label: "School",
        value: "New York University",
        type: "text",
        autoComplete: "organization",
      },
      {
        id: crypto.randomUUID(),
        label: "Title of Study",
        value: "Bachelor of Arts in Economics",
        type: "text",
      },
      {
        id: crypto.randomUUID(),
        label: "Date Of Study",
        value: "September 2015 - June 2017",
        type: "text",
        autoComplete: "section-date-of-study",
      },
      {
        id: crypto.randomUUID(),
        label: "Major Achievements or Honors",
        value: "Graduated Magna Cum Laude",
        type: "text",
        autoComplete: "section-achievements",
        canAdd: true,
      },
    ],
    id: crypto.randomUUID(),
  },
  {
    title: "Experience",
    fields: [
      {
        id: crypto.randomUUID(),
        label: "Company Name",
        value: "Enter Company Name",
        type: "text",
        autoComplete: "organization",
      },
      {
        id: crypto.randomUUID(),
        label: "Position Title",
        value: "Enter Position Title",
        type: "text",
        autoComplete: "organization-title",
      },
      {
        id: crypto.randomUUID(),
        label: "Date",
        value: "Date from and until when you worked for that company (e.g., September 2018 - December 2020)",
        type: "text",
        autoComplete: "section-date",
      },
      {
        id: crypto.randomUUID(),
        label: "Main Responsibilities",
        value: "Enter Responsibilities",
        type: "text",
        autoComplete: "section-responsibilities",
        canAdd: true,
      },
    ],
    id: crypto.randomUUID(),
  },
];

export default formInformation;
