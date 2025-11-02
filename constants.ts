import { Service, WhyChooseUsPoint, Testimonial, AmcBenefit, GalleryImage } from './types';
import { BoltIcon } from './components/icons/BoltIcon';
import { ShieldCheckIcon } from './components/icons/ShieldCheckIcon';
import { CogIcon } from './components/icons/CogIcon';
import { RefrigeratorIcon } from './components/icons/RefrigeratorIcon';
import { WashingMachineIcon } from './components/icons/WashingMachineIcon';
import { AcIcon } from './components/icons/AcIcon';
import { MicrowaveIcon } from './components/icons/MicrowaveIcon';
import { GeyserIcon } from './components/icons/GeyserIcon';
import { RoIcon } from './components/icons/RoIcon';
import { CalendarIcon } from './components/icons/CalendarIcon';
import { StarIcon } from './components/icons/StarIcon';
import { PiggyBankIcon } from './components/icons/PiggyBankIcon';
import { HeartIcon } from './components/icons/HeartIcon';

export const SERVICES: Service[] = [
  {
    icon: RefrigeratorIcon,
    title: 'Refrigerator Repair',
    description: 'From cooling issues to strange noises, we fix all models of refrigerators and freezers.',
    features: ['All Major Brands', 'Compressor Issues', 'Gas Refilling', 'Door Seal Replacement'],
  },
  {
    icon: WashingMachineIcon,
    title: 'Washing Machine Repair',
    description: 'We handle everything from drum problems to electronic failures in all types of washing machines.',
    features: ['Top & Front Load', 'Drainage Problems', 'Motor Repair', 'Panel Issues'],
  },
  {
    icon: AcIcon,
    title: 'Air Conditioner Repair',
    description: 'Stay cool with our expert AC repair services, including gas charging and regular maintenance.',
    features: ['Split & Window ACs', 'Cooling Problems', 'Gas Leakage', 'Annual Maintenance'],
  },
  {
    icon: MicrowaveIcon,
    title: 'Microwave Oven Repair',
    description: 'Whether it\'s not heating or the turntable is stuck, our technicians can fix it quickly.',
    features: ['Solo & Convection', 'Heating Issues', 'Magnetron Repair', 'Display Faults'],
  },
  {
    icon: GeyserIcon,
    title: 'Geyser Repair',
    description: 'We ensure you have hot water when you need it with our reliable geyser repair services.',
    features: ['Instant & Storage', 'Heating Element', 'Thermostat Issues', 'Tank Leakage'],
  },
  {
    icon: RoIcon,
    title: 'RO Water Purifier',
    description: 'Get safe and pure drinking water with our RO service, including filter and membrane changes.',
    features: ['All Brands', 'Filter Replacement', 'Low Water Flow', 'TDS Adjustment'],
  },
];

export const WHY_CHOOSE_US_POINTS: WhyChooseUsPoint[] = [
  {
    icon: BoltIcon,
    title: 'Quick Response',
    description: 'We understand the urgency. Our team is committed to providing same-day service across Mumbai.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Expert Technicians',
    description: 'Our technicians are certified, experienced, and trained to handle all major appliance brands.',
  },
  {
    icon: CogIcon,
    title: 'Genuine Parts',
    description: 'We use only genuine, high-quality spare parts to ensure the longevity of your appliances.',
  },
];

export const AMC_BENEFITS: AmcBenefit[] = [
    {
        icon: PiggyBankIcon,
        title: 'Save Money',
        description: 'Enjoy discounted rates on services and spare parts, avoiding costly unexpected repairs with regular check-ups.'
    },
    {
        icon: StarIcon,
        title: 'Priority Service',
        description: 'As an AMC customer, your service requests are prioritized, ensuring you get the fastest possible response time.'
    },
    {
        icon: HeartIcon,
        title: 'Longer Lifespan',
        description: 'Regular maintenance helps in the early detection of issues, extending the life and efficiency of your appliances.'
    },
    {
        icon: CalendarIcon,
        title: 'Peace of Mind',
        description: 'With scheduled maintenance and our expert team on call, you can relax knowing your appliances are in good hands.'
    }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Care Refrigeration was a lifesaver! My AC broke down during a heatwave, and they had it fixed within hours of my call. Professional, fast, and reasonably priced.',
    name: 'Priya Sharma',
    location: 'Andheri, Mumbai',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    quote: 'The technician was very knowledgeable and quickly diagnosed the issue with my washing machine. He explained the problem clearly and fixed it on the spot. Highly recommend!',
    name: 'Rohan Mehta',
    location: 'Bandra, Mumbai',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    quote: 'I\'ve used their service for both my fridge and microwave. Each time, the experience has been excellent. Punctual, polite, and they get the job done right the first time.',
    name: 'Anjali Desai',
    location: 'Juhu, Mumbai',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
  },
];


export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: 'https://images.pexels.com/photos/8111353/pexels-photo-8111353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'AC Unit Servicing',
    alt: 'Technician servicing an air conditioner unit on a wall.'
  },
  {
    src: 'https://images.pexels.com/photos/713297/pexels-photo-713297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Refrigerator Diagnostics',
    alt: 'Close-up of a technician examining the back of a refrigerator.'
  },
  {
    src: 'https://images.pexels.com/photos/5591662/pexels-photo-5591662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Washing Machine Repair',
    alt: 'Technician with a toolbox repairing a washing machine.'
  },
  {
    src: 'https://images.pexels.com/photos/8474810/pexels-photo-8474810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Microwave Inspection',
    alt: 'Engineer inspecting the internal components of a microwave oven.'
  },
  {
    src: 'https://images.pexels.com/photos/8961341/pexels-photo-8961341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Geyser Installation',
    alt: 'Plumber installing a new water heater geyser in a bathroom.'
  },
  {
    src: 'https://images.pexels.com/photos/8463510/pexels-photo-8463510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'RO Filter Replacement',
    alt: 'Technician replacing the filters on an RO water purifier system.'
  }
];