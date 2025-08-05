export type Doctor = {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  price: number;
  image: string;
};

export const doctors: Doctor[] = Array.from({ length: 20 }, (_, i) => {
  // Expanded arrays of names for more diversity
  const maleNames = [
    "John",
    "Michael",
    "David",
    "James",
    "Robert",
    "William",
    "Christopher",
    "Joseph",
    "Thomas",
    "Charles",
    "Daniel",
    "Matthew",
    "Anthony",
    "Mark",
    "Donald",
    "Steven",
    "Paul",
    "Andrew",
    "Joshua",
    "Kenneth",
  ];

  const femaleNames = [
    "Emily",
    "Sophia",
    "Olivia",
    "Emma",
    "Sarah",
    "Jennifer",
    "Lisa",
    "Jessica",
    "Ashley",
    "Amanda",
    "Michelle",
    "Samantha",
    "Rachel",
    "Amy",
    "Angela",
    "Nicole",
    "Katherine",
    "Maria",
    "Rebecca",
    "Laura",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Martinez",
    "Robinson",
    "Clark",
    "Rodriguez",
    "Lewis",
    "Lee",
  ];

  // Male doctor images
  const maleImages = [
    "/images/doctor1.webp",
    "/images/doctor2.webp",
    "/images/doctor3.webp",
    "/images/doctor4.webp",
    "/images/doctor5.webp",
    "/images/doctor6.webp",
    "/images/doctor7.webp",
    "/images/doctor8.webp",
    "/images/doctor9.webp",
    "/images/doctor10.webp",
    "/images/doctor19.webp",
    "/images/doctor20.webp",
  ];

  // Female doctor images
  const femaleImages = [
    "/images/doctor_female16.webp",
    "/images/doctor_female_black_mid20_with_tool.webp",
    "/images/doctor_female_mid20.webp",
    "/images/doctor_female_mid30_with_tool.webp",
    "/images/doctor_female_mid40.webp",
    "/images/doctor_female_mid40_india.webp",
    "/images/doctor_female_mid50.webp",
    "/images/doctor_white_female_mid30_with_tool_square.webp",
  ];

  // Determine if this doctor should be male or female based on image availability
  const isMale = i < maleImages.length;

  const firstName = isMale
    ? maleNames[i % maleNames.length]
    : femaleNames[(i - maleImages.length) % femaleNames.length];

  const image = isMale
    ? maleImages[i % maleImages.length]
    : femaleImages[(i - maleImages.length) % femaleImages.length];

  return {
    id: i + 1,
    name: `Dr. ${firstName} ${lastNames[i % lastNames.length]}`,
    specialty: [
      "Cardiology",
      "Neurology",
      "Dermatology",
      "Dentistry",
      "Nephrology",
      "Pulmonology",
      "Gynecology",
      "Orthopedics",
    ][i % 8],
    experience: Math.floor(Math.random() * 15) + 5,
    rating: Math.round((Math.random() * 1 + 4) * 10) / 10, // between 4.0 - 5.0
    price: Math.floor(Math.random() * 100) + 100,
    image: image,
  };
});
