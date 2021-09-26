export const AppointmentType = {
  ALL: "All",
  FITNESS: "Fitness",
  NUTRITION: "Nutrition",
  DOCTOR: "Doctor",
};

export const AppointmentStatus = {
  COMPLETE: "Complete",
  PENDING: "Pending",
};

export const ENV_VARS = {
  BASE_API: process.env.BASE_API || "http://localhost:4000",
};
