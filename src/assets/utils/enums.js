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
  API: process.env.api || "http://localhost:4000",
};
