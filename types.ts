
export enum Category {
  GENERAL = 'General Check-up',
  CARDIOLOGY = 'Cardiology',
  NEUROLOGY = 'Neurology',
  GYNECOLOGY = 'Gynecology',
  ORTHOPEDICS = 'Orthopedics'
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  category: Category;
  photo: string;
  experience: number;
  availableTimings: string[];
  consultationFee: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  address: string;
  categoryId: Category;
  doctorId: string;
  doctorName: string;
  timeSlot: string;
  amount: number;
  bookingDate: string;
  qrCodeData: string;
}

export interface CategoryData {
  id: Category;
  title: string;
  description: string;
  icon: string;
}
