import { Category, Doctor, CategoryData } from './types';

export const categories: CategoryData[] = [
  {
    id: Category.GENERAL,
    title: 'General Check-up',
    description: 'Routine wellness examinations and non-specific symptoms.',
    icon: 'Stethoscope'
  },
  {
    id: Category.CARDIOLOGY,
    title: 'Cardiology',
    description: 'Specialized care for heart and cardiovascular health.',
    icon: 'HeartPulse'
  },
  {
    id: Category.NEUROLOGY,
    title: 'Neurology (Brain)',
    description: 'Expert treatment for neurological disorders and brain health.',
    icon: 'Brain'
  },
  {
    id: Category.GYNECOLOGY,
    title: 'Gynecology',
    description: 'Comprehensive care for women’s reproductive health.',
    icon: 'UserRound'
  },
  {
    id: Category.ORTHOPEDICS,
    title: 'Orthopedics',
    description: 'Bone, joint, and musculoskeletal system specializations.',
    icon: 'Bone'
  }
];

export const doctors: Doctor[] = [
  {
    id: 'dr1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Senior General Physician',
    category: Category.GENERAL,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    experience: 12,
    availableTimings: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'],
    consultationFee: 500
  },
  {
    id: 'dr6',
    name: 'Dr. David Smith',
    specialization: 'Family Medicine',
    category: Category.GENERAL,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    experience: 7,
    availableTimings: ['11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
    consultationFee: 400
  },
  {
    id: 'dr2',
    name: 'Dr. Michael Chen',
    specialization: 'Senior Cardiologist',
    category: Category.CARDIOLOGY,
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    experience: 15,
    availableTimings: ['11:00 AM', '01:00 PM', '03:30 PM', '05:00 PM'],
    consultationFee: 800
  },
  {
    id: 'dr7',
    name: 'Dr. James Wilson',
    specialization: 'Interventional Cardiologist',
    category: Category.CARDIOLOGY,
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    experience: 11,
    availableTimings: ['09:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'],
    consultationFee: 750
  },
  {
    id: 'dr3',
    name: 'Dr. Emily Williams',
    specialization: 'Neurologist',
    category: Category.NEUROLOGY,
    photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400',
    experience: 10,
    availableTimings: ['10:00 AM', '12:00 PM', '04:00 PM'],
    consultationFee: 800
  },
  {
    id: 'dr8',
    name: 'Dr. Robert Miller',
    specialization: 'Neurosurgeon',
    category: Category.NEUROLOGY,
    photo: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=400',
    experience: 18,
    availableTimings: ['08:00 AM', '11:00 AM', '03:00 PM'],
    consultationFee: 800
  },
  {
    id: 'dr4',
    name: 'Dr. Anita Desai',
    specialization: 'OB-GYN Specialist',
    category: Category.GYNECOLOGY,
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    experience: 8,
    availableTimings: ['09:30 AM', '11:30 AM', '02:30 PM'],
    consultationFee: 600
  },
  {
    id: 'dr9',
    name: 'Dr. Linda Taylor',
    specialization: 'Reproductive Specialist',
    category: Category.GYNECOLOGY,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    experience: 14,
    availableTimings: ['10:00 AM', '12:00 PM', '04:00 PM'],
    consultationFee: 700
  },
  {
    id: 'dr5',
    name: 'Dr. Robert Brown',
    specialization: 'Orthopedic Surgeon',
    category: Category.ORTHOPEDICS,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    experience: 20,
    availableTimings: ['08:00 AM', '10:00 AM', '03:00 PM', '06:00 PM'],
    consultationFee: 800
  },
  {
    id: 'dr10',
    name: 'Dr. Steven King',
    specialization: 'Joint Replacement Expert',
    category: Category.ORTHOPEDICS,
    photo: 'https://images.unsplash.com/photo-1622902046580-2b47f47f0871?auto=format&fit=crop&q=80&w=400',
    experience: 12,
    availableTimings: ['09:00 AM', '11:00 AM', '02:00 PM', '05:00 PM'],
    consultationFee: 750
  }
];