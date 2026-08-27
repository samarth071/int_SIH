export const DISASTER_TYPES = [
  { id: 'flood', label: 'Flood' },
  { id: 'earthquake', label: 'Earthquake' },
  { id: 'fire', label: 'Fire' },
  { id: 'cyclone', label: 'Cyclone / Storm' },
  { id: 'landslide', label: 'Landslide' },
  { id: 'lightning', label: 'Lightning' },
  { id: 'drought', label: 'Drought' },
  { id: 'tsunami', label: 'Tsunami' },
  { id: 'building_collapse', label: 'Building Collapse' },
  { id: 'other', label: 'Other' },
];

export const SEVERITY_LEVELS = [
  { id: 'low', label: 'Low', color: '#059669', bg: '#ECFDF5' },
  { id: 'medium', label: 'Medium', color: '#D97706', bg: '#FFFBEB' },
  { id: 'high', label: 'High', color: '#DC2626', bg: '#FEF2F2' },
  { id: 'critical', label: 'Critical', color: '#7C3AED', bg: '#F5F3FF' },
];

export const HELP_TYPES = [
  { id: 'rescue', label: 'Rescue & Evacuation' },
  { id: 'medical', label: 'Medical Aid' },
  { id: 'food', label: 'Food & Water' },
  { id: 'shelter', label: 'Emergency Shelter' },
  { id: 'search', label: 'Search & Rescue' },
  { id: 'other', label: 'Other Assistance' },
];

export const SOS_STEPS = [
  { id: 'confirm', label: 'Confirm SOS' },
  { id: 'type', label: 'Emergency Type' },
  { id: 'details', label: 'Add Details' },
  { id: 'location', label: 'Location' },
  { id: 'success', label: 'Submitted' },
];

export const REQUEST_STATUSES = [
  {
    id: 'sent',
    label: 'SOS Sent',
    description: 'Your emergency request has been submitted',
    color: '#1A56DB',
  },
  {
    id: 'received',
    label: 'Received',
    description: 'Request received by the control center',
    color: '#0891B2',
  },
  {
    id: 'verified',
    label: 'Verified',
    description: 'Emergency verified by authorities',
    color: '#D97706',
  },
  {
    id: 'assigned',
    label: 'Help Assigned',
    description: 'A response team has been assigned to you',
    color: '#7C3AED',
  },
  {
    id: 'in_progress',
    label: 'In Progress',
    description: 'Help is on its way to your location',
    color: '#EA580C',
  },
  {
    id: 'resolved',
    label: 'Resolved',
    description: 'The emergency has been resolved',
    color: '#059669',
  },
];

export const MEDICAL_EMERGENCY_TYPES = [
  { id: 'trauma', label: 'Trauma / Injury' },
  { id: 'cardiac', label: 'Cardiac Emergency' },
  { id: 'drowning', label: 'Drowning' },
  { id: 'burns', label: 'Burns' },
  { id: 'crush', label: 'Crush Injury' },
  { id: 'fracture', label: 'Fracture / Dislocation' },
  { id: 'unconscious', label: 'Unconscious Person' },
  { id: 'respiratory', label: 'Breathing Difficulty' },
  { id: 'snake_bite', label: 'Snake Bite / Poisoning' },
  { id: 'other', label: 'Other' },
];
