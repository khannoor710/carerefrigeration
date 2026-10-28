import { Service, WhyChooseUsPoint, AmcBenefit } from './types';
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
    description: 'Tell us the issue and your neighbourhood. We will contact you to discuss visit availability.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Expert Technicians',
    description: 'We handle enquiries for ACs, washing machines, refrigerators and other home appliances.',
  },
  {
    icon: CogIcon,
    title: 'Clear Repair Discussion',
    description: 'Ask about the diagnosis, parts, charges and any applicable warranty before approving work.',
  },
];

export const AMC_BENEFITS: AmcBenefit[] = [
    {
        icon: PiggyBankIcon,
        title: 'Discuss Maintenance',
        description: 'Ask whether planned maintenance is suitable for your appliance and usage.'
    },
    {
        icon: StarIcon,
        title: 'Understand the Plan',
        description: 'Check the covered work, visit schedule and charges before choosing a plan.'
    },
    {
        icon: HeartIcon,
        title: 'Regular Checks',
        description: 'Maintenance visits can help identify issues before they disrupt use.'
    },
    {
        icon: CalendarIcon,
        title: 'Ask Questions',
        description: 'Discuss the plan terms and any applicable warranty with our team.'
    }
];
