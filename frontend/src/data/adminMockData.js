// Comprehensive mock data store for Sanjeevani Mesh Admin Portal / Disaster Command Centre

export const initialIncidents = [
  {
    id: 'INC-2026-0891',
    type: 'Flood Rescue',
    category: 'flood',
    location: 'Tapi River Basin, Surat Lowlands',
    coordinates: { x: 220, y: 140, lat: 21.1702, lng: 72.8311 },
    severity: 'critical', // 'critical' | 'high' | 'medium' | 'low'
    severityLabel: 'Critical',
    timeReported: '6 mins ago',
    reportedAt: '2026-08-29T08:45:00+05:30',
    description: 'Flash flooding breached embankment near low-lying residential sectors. Rapid water rise trapped multiple families on ground and first floors. Immediate boat evacuation required.',
    sosRequestsCount: 18,
    affectedCitizensCount: 142,
    status: 'In Progress', // 'Reported' | 'Verified' | 'Responding' | 'In Progress' | 'Resolved'
    assignedTeam: 'NDRF Team 07 — Surat',
    assignedTeamId: 'TEAM-NDRF-07',
    zone: 'Zone A - West Basin',
    criticalityScore: 94
  },
  {
    id: 'INC-2026-0884',
    type: 'Building Collapse',
    category: 'earthquake',
    location: 'Sector 4, Industrial Area, Zone B',
    coordinates: { x: 380, y: 280, lat: 21.1852, lng: 72.8450 },
    severity: 'critical',
    severityLabel: 'Critical',
    timeReported: '14 mins ago',
    reportedAt: '2026-08-29T08:37:00+05:30',
    description: 'Structural failure in a 3-storey commercial unit following earth tremors. 9 workers trapped in basement and ground levels. Extrication equipment and search dogs required.',
    sosRequestsCount: 9,
    affectedCitizensCount: 38,
    status: 'Responding',
    assignedTeam: 'SDRF Extrication Unit 02',
    assignedTeamId: 'TEAM-SDRF-02',
    zone: 'Zone B - East Sector',
    criticalityScore: 89
  },
  {
    id: 'INC-2026-0879',
    type: 'Cyclone Surge & Power Grid Failure',
    category: 'cyclone',
    location: 'Coastal Belt, Dumas Road',
    coordinates: { x: 180, y: 320, lat: 21.1120, lng: 72.7840 },
    severity: 'high',
    severityLabel: 'High Attention',
    timeReported: '28 mins ago',
    reportedAt: '2026-08-29T08:23:00+05:30',
    description: 'High tidal surge flooded substation causing transformer explosion and grid outage. Critical oxygen concentrators at local primary health clinic need emergency generator power.',
    sosRequestsCount: 12,
    affectedCitizensCount: 210,
    status: 'Responding',
    assignedTeam: 'Quick Response Medics 01',
    assignedTeamId: 'TEAM-QRM-01',
    zone: 'Zone C - Coastal Belt',
    criticalityScore: 78
  },
  {
    id: 'INC-2026-0872',
    type: 'Landslide Road Blockade',
    category: 'landslide',
    location: 'North Ghats Bypass, Hill Route KM-14',
    coordinates: { x: 520, y: 120, lat: 21.2300, lng: 72.9100 },
    severity: 'high',
    severityLabel: 'High Attention',
    timeReported: '45 mins ago',
    reportedAt: '2026-08-29T08:06:00+05:30',
    description: 'Heavy rain triggered debris flow covering 200m of dual carriageway. Three supply trucks and 8 passenger vehicles stranded. Heavy bulldozers en route.',
    sosRequestsCount: 5,
    affectedCitizensCount: 46,
    status: 'In Progress',
    assignedTeam: 'SMC Heavy Rescue & Clearance',
    assignedTeamId: 'TEAM-SMC-01',
    zone: 'Zone D - North Highway',
    criticalityScore: 72
  },
  {
    id: 'INC-2026-0865',
    type: 'Chemical Depot Hazmat Warning',
    category: 'fire',
    location: 'Pandesara Industrial Estate',
    coordinates: { x: 440, y: 220, lat: 21.1550, lng: 72.8250 },
    severity: 'medium',
    severityLabel: 'Moderate',
    timeReported: '1 hour ago',
    reportedAt: '2026-08-29T07:51:00+05:30',
    description: 'Minor chlorine gas leakage reported in storage yard after rainwater seepage. Perimeter evacuated up to 300 meters. Neutralization foam applied.',
    sosRequestsCount: 3,
    affectedCitizensCount: 65,
    status: 'Verified',
    assignedTeam: 'Fire Rescue Hazmat Unit 3',
    assignedTeamId: 'TEAM-FRU-03',
    zone: 'Zone E - Industrial South',
    criticalityScore: 61
  },
  {
    id: 'INC-2026-0850',
    type: 'Waterlogging & Transformer Spark',
    category: 'flood',
    location: 'Adajan Main Market, Near Clock Tower',
    coordinates: { x: 290, y: 190, lat: 21.1800, lng: 72.8100 },
    severity: 'low',
    severityLabel: 'Monitoring',
    timeReported: '2 hours ago',
    reportedAt: '2026-08-29T06:50:00+05:30',
    description: 'Knee-deep water stagnation on market street. Electricity department isolated local feeder. Pumps deployed to drain water toward canal.',
    sosRequestsCount: 1,
    affectedCitizensCount: 25,
    status: 'Resolved',
    assignedTeam: 'Civil Defense Volunteer Group 04',
    assignedTeamId: 'TEAM-CIV-04',
    zone: 'Zone A - West Basin',
    criticalityScore: 32
  }
];

export const initialResponseTeams = [
  {
    id: 'TEAM-NDRF-07',
    name: 'NDRF Battalion 07 (Alpha)',
    type: 'Specialized Water Rescue & Evacuation',
    leadOfficer: 'Commander Rajiv Nair',
    contact: '+91 94450 12891',
    personnel: 24,
    location: 'Tapi River Basin, Sector 2',
    status: 'On Site', // 'Available' | 'Assigned' | 'En Route' | 'On Site' | 'Completed'
    currentAssignment: 'INC-2026-0891 (Flood Rescue)',
    vehicles: '4 Inflatable Motor Boats, 2 All-Terrain Amphibious Trucks',
    lastUpdate: '3 mins ago',
    eta: 'On Site'
  },
  {
    id: 'TEAM-SDRF-02',
    name: 'SDRF Heavy Extrication Unit 02',
    type: 'Collapsed Structure Search & Rescue',
    leadOfficer: 'Inspector Anita Deshmukh',
    contact: '+91 94450 12892',
    personnel: 18,
    location: 'En Route - Ring Road Corridor',
    status: 'En Route',
    currentAssignment: 'INC-2026-0884 (Building Collapse)',
    vehicles: '2 Hydraulic Rescue Cranes, 1 K9 Search Unit',
    lastUpdate: '5 mins ago',
    eta: '6 mins'
  },
  {
    id: 'TEAM-QRM-01',
    name: 'Quick Response Medical Squad 01',
    type: 'Mobile Trauma & Critical Triage',
    leadOfficer: 'Dr. Siddharth Sen',
    contact: '+91 94450 12893',
    personnel: 12,
    location: 'Coastal Belt, Dumas Road PHC',
    status: 'On Site',
    currentAssignment: 'INC-2026-0879 (Cyclone Surge)',
    vehicles: '3 Advanced Life Support (ALS) Ambulances, 1 Mobile Clinic',
    lastUpdate: '11 mins ago',
    eta: 'On Site'
  },
  {
    id: 'TEAM-FRU-03',
    name: 'Fire & Hazmat Unit 03',
    type: 'Hazardous Materials & Fire Containment',
    leadOfficer: 'Chief Marshal K. R. Solanki',
    contact: '+91 94450 12894',
    personnel: 16,
    location: 'Pandesara Fire Station Base',
    status: 'Assigned',
    currentAssignment: 'INC-2026-0865 (Chemical Depot Hazmat)',
    vehicles: '2 Hazmat Tender Units, 1 Chemical Neutralization Tanker',
    lastUpdate: '18 mins ago',
    eta: '12 mins'
  },
  {
    id: 'TEAM-SMC-01',
    name: 'SMC Heavy Clearance & Road Gang',
    type: 'Debris Removal & Route Restoration',
    leadOfficer: 'Eng. Vijay Patil',
    contact: '+91 94450 12895',
    personnel: 20,
    location: 'North Ghats Bypass KM-12',
    status: 'En Route',
    currentAssignment: 'INC-2026-0872 (Landslide Road Blockade)',
    vehicles: '3 Earth Movers (JCB), 4 Heavy Tipper Trucks',
    lastUpdate: '22 mins ago',
    eta: '15 mins'
  },
  {
    id: 'TEAM-CGU-01',
    name: 'Coast Guard Coastal Patrol Unit 01',
    type: 'Maritime Search & Shoreline Defense',
    leadOfficer: 'Lt. Cdr. Rohan Verma',
    contact: '+91 94450 12896',
    personnel: 14,
    location: 'Surat Port Base Station',
    status: 'Available',
    currentAssignment: 'None (Standby for Coastal Surge)',
    vehicles: '2 Interceptor Crafts, 1 Hovercraft',
    lastUpdate: '25 mins ago',
    eta: 'Standby'
  },
  {
    id: 'TEAM-CIV-04',
    name: 'Civil Defense Volunteer Group 04',
    type: 'Community Relief & Perimeter Control',
    leadOfficer: 'Coordinator Meera Kothari',
    contact: '+91 94450 12897',
    personnel: 30,
    location: 'Adajan Ward Center',
    status: 'Available',
    currentAssignment: 'None (Ready for redeployment)',
    vehicles: '3 Utility Vans, Handheld LoRa Mesh Transceivers',
    lastUpdate: '30 mins ago',
    eta: 'Ready'
  }
];

export const initialVolunteers = [
  {
    id: 'VOL-801',
    name: 'Siddharth Rao',
    skills: ['Boat Rescue', 'Water Safety', 'First Aid'],
    phone: '+91 98765 43210',
    zone: 'Zone A - West Basin',
    status: 'Assigned',
    availability: 'On Duty',
    assignedIncidentId: 'INC-2026-0891',
    rating: 4.9,
    hoursContributed: 48
  },
  {
    id: 'VOL-802',
    name: 'Dr. Shruti Sharma',
    skills: ['Paramedic / Trauma', 'Triage Assessment', 'Pediatric Care'],
    phone: '+91 98765 43211',
    zone: 'Zone A - West Basin',
    status: 'Assigned',
    availability: 'On Duty',
    assignedIncidentId: 'INC-2026-0891',
    rating: 5.0,
    hoursContributed: 64
  },
  {
    id: 'VOL-803',
    name: 'Faizan Ahmed',
    skills: ['Ham Radio Operator', 'LoRa Mesh Relay', 'Logistics'],
    phone: '+91 98765 43212',
    zone: 'Zone B - East Sector',
    status: 'Available',
    availability: 'Available',
    assignedIncidentId: null,
    rating: 4.8,
    hoursContributed: 32
  },
  {
    id: 'VOL-804',
    name: 'Pooja Iyer',
    skills: ['Search & Rescue', 'Drone Reconnaissance', 'GIS Mapping'],
    phone: '+91 98765 43213',
    zone: 'Zone B - East Sector',
    status: 'Assigned',
    availability: 'On Duty',
    assignedIncidentId: 'INC-2026-0884',
    rating: 4.9,
    hoursContributed: 52
  },
  {
    id: 'VOL-805',
    name: 'Karan Dave',
    skills: ['Heavy Vehicle Driver', 'Food & Ration Logistics', 'Shelter Mgmt'],
    phone: '+91 98765 43214',
    zone: 'Zone C - Coastal Belt',
    status: 'Available',
    availability: 'Available',
    assignedIncidentId: null,
    rating: 4.7,
    hoursContributed: 28
  },
  {
    id: 'VOL-806',
    name: 'Nisha Varma',
    skills: ['Counseling / Mental Health', 'Community Aid', 'Elderly Support'],
    phone: '+91 98765 43215',
    zone: 'Zone A - West Basin',
    status: 'Available',
    availability: 'Available',
    assignedIncidentId: null,
    rating: 4.9,
    hoursContributed: 36
  },
  {
    id: 'VOL-807',
    name: 'Rameshwar Lal',
    skills: ['Electrical Wiring', 'Emergency Generator Setup', 'Plumbing'],
    phone: '+91 98765 43216',
    zone: 'Zone C - Coastal Belt',
    status: 'Assigned',
    availability: 'On Duty',
    assignedIncidentId: 'INC-2026-0879',
    rating: 4.8,
    hoursContributed: 44
  },
  {
    id: 'VOL-808',
    name: 'Tanvi Joshi',
    skills: ['First Aid', 'Supply Inventory Tracking', 'Food Distribution'],
    phone: '+91 98765 43217',
    zone: 'Zone D - North Highway',
    status: 'Available',
    availability: 'Available',
    assignedIncidentId: null,
    rating: 4.6,
    hoursContributed: 20
  }
];

export const initialNGOs = [
  {
    id: 'NGO-001',
    name: 'Red Cross Disaster Relief Society',
    area: 'Zone A & Zone B (Surat City)',
    contactPerson: 'Director Harish Kulkarni',
    phone: '+91 261 224488',
    activeVolunteers: 65,
    resourcesSummary: '4,500 Meals, 1,200 Medical Kits, 800 Blankets',
    supportStatus: 'Active Dispatch',
    activeMissions: [
      { targetZone: 'Tapi River Basin', items: '2,000 Meal Kits & Drinking Water', status: 'Dispatched', eta: '10 mins' },
      { targetZone: 'Sector 4 Collapse', items: 'Emergency Medical Tents & First Aid', status: 'Delivered', eta: 'Arrived' }
    ]
  },
  {
    id: 'NGO-002',
    name: 'Goonj Relief & Rehabilitation',
    area: 'Zone C - Coastal Belt & Dumas',
    contactPerson: 'Zonal Lead Meera V.',
    phone: '+91 261 235599',
    activeVolunteers: 42,
    resourcesSummary: '3,200 Clothing Kits, 500 Tarpaulin Sheets, 1,000 Water Cans',
    supportStatus: 'Mobilizing',
    activeMissions: [
      { targetZone: 'Dumas Coastal Shelter', items: '500 Tarpaulins & 1,500 Dry Rations', status: 'Preparing', eta: '45 mins' }
    ]
  },
  {
    id: 'NGO-003',
    name: 'Disaster Care India Foundation',
    area: 'Zone D - North Highway & Rural Outskirts',
    contactPerson: 'Capt. Arjan Singh',
    phone: '+91 261 246611',
    activeVolunteers: 38,
    resourcesSummary: 'Heavy Earth Removal Support, 2 Mobile Generators, 800 Emergency Food Packs',
    supportStatus: 'Active Dispatch',
    activeMissions: [
      { targetZone: 'North Ghats Bypass', items: 'Hot Meals & High-Visibility Rainwear', status: 'En Route', eta: '20 mins' }
    ]
  },
  {
    id: 'NGO-004',
    name: 'Seva Bharati Emergency Wing',
    area: 'City-wide Community Kitchens',
    contactPerson: 'Coordinator Bhavesh Patel',
    phone: '+91 261 257722',
    activeVolunteers: 80,
    resourcesSummary: '10,000 Hot Meals / day capacity, 5 Tanker Water Dispatches',
    supportStatus: 'On Site',
    activeMissions: [
      { targetZone: 'Relief Camp High School', items: '3,000 Fresh Meal Packets', status: 'Delivered', eta: 'Delivered' }
    ]
  }
];

export const initialShelters = [
  {
    id: 'SHELTER-001',
    name: 'Government Model High School Camp',
    zone: 'Zone A - West Basin',
    address: 'Near Collectorate Road, Surat — 395001',
    totalCapacity: 500,
    currentOccupancy: 342,
    status: 'Open - Moderate Space',
    statusType: 'available',
    contact: '0261-2471234',
    facilities: ['Hot Food & Milk', 'Clean RO Water', 'Doctor on Call (24x7)', 'Power Backup Generator', 'Sanitary Kits'],
    distanceFromHQ: '1.2 km'
  },
  {
    id: 'SHELTER-002',
    name: 'Community Hall — Ward 12 Complex',
    zone: 'Zone A - West Basin',
    address: 'Udhna Main Road, Surat — 394210',
    totalCapacity: 200,
    currentOccupancy: 188,
    status: 'Near Full (94%)',
    statusType: 'near_full',
    contact: '0261-2482345',
    facilities: ['Hot Food', 'Drinking Water', 'Emergency Beds', 'First Aid Station'],
    distanceFromHQ: '2.4 km'
  },
  {
    id: 'SHELTER-003',
    name: 'NDRF Athwa Stadium Emergency Shelter',
    zone: 'Zone A / B Border',
    address: 'Athwa Lines Complex, Surat — 395007',
    totalCapacity: 800,
    currentOccupancy: 290,
    status: 'Open - High Capacity',
    statusType: 'available',
    contact: '0261-2455678',
    facilities: ['Dedicated Tents', 'Paramedic Unit', 'Helipad Access', 'Blankets', 'Solar Lighting'],
    distanceFromHQ: '3.1 km'
  },
  {
    id: 'SHELTER-004',
    name: 'Red Cross Majura Relief Pavilion',
    zone: 'Zone B - East Sector',
    address: 'Majura Gate, Surat — 395002',
    totalCapacity: 350,
    currentOccupancy: 350,
    status: 'Full Capacity (100%)',
    statusType: 'full',
    contact: '0261-2463456',
    facilities: ['Full Medical Post', 'Trauma Ward', 'Kitchen', 'Child Care Room'],
    distanceFromHQ: '4.5 km'
  },
  {
    id: 'SHELTER-005',
    name: 'Municipal Indoor Sports Arena',
    zone: 'Zone C - Coastal Belt',
    address: 'Adajan-Dumas Link Road, Surat — 395009',
    totalCapacity: 1000,
    currentOccupancy: 420,
    status: 'Open - High Capacity',
    statusType: 'available',
    contact: '0261-2490111',
    facilities: ['Spacious Hall', 'Air Circulation', 'Clean Water', 'Medical Team', 'Security Guards'],
    distanceFromHQ: '5.2 km'
  }
];

export const initialReliefSupplies = [
  {
    id: 'REL-01',
    category: 'Food & Nutrition',
    name: 'Ready-to-Eat Food Packets (MRE)',
    quantity: 14500,
    unit: 'Packets',
    allocated: 9200,
    available: 5300,
    status: 'Dispatched',
    lastDispatchedTo: 'Tapi River Basin Flood Zone',
    dispatchedBy: 'Seva Bharati & District Civil Supply'
  },
  {
    id: 'REL-02',
    category: 'Clean Water',
    name: '20L Filtered Water Cans & 1L Bottles',
    quantity: 18000,
    unit: 'Litres',
    allocated: 12500,
    available: 5500,
    status: 'Delivered',
    lastDispatchedTo: 'Govt High School Shelter & Dumas PHC',
    dispatchedBy: 'Surat Municipal Corporation'
  },
  {
    id: 'REL-03',
    category: 'Medical Supplies',
    name: 'Emergency Trauma & First Aid Kits',
    quantity: 850,
    unit: 'Kits',
    allocated: 620,
    available: 230,
    status: 'Dispatched',
    lastDispatchedTo: 'Sector 4 Collapse & Coastal Medical Squad',
    dispatchedBy: 'Red Cross Disaster Society'
  },
  {
    id: 'REL-04',
    category: 'Bedding & Shelter',
    name: 'Waterproof Tarpaulins & Woolen Blankets',
    quantity: 3200,
    unit: 'Units',
    allocated: 1800,
    available: 1400,
    status: 'Preparing',
    lastDispatchedTo: 'NDRF Athwa Stadium Base',
    dispatchedBy: 'Goonj Relief'
  },
  {
    id: 'REL-05',
    category: 'Infant & Hygiene',
    name: 'Baby Food, Milk Powder & Sanitary Packs',
    quantity: 2100,
    unit: 'Packs',
    allocated: 1450,
    available: 650,
    status: 'Available',
    lastDispatchedTo: 'Majura Gate Shelter Pavilion',
    dispatchedBy: 'District Women & Child Relief'
  }
];

export const initialEarlyWarnings = [
  {
    id: 'WARN-2026-041',
    title: 'Flash Flood & River Swell Advisory',
    zone: 'Tapi River Basin & Low-lying Sectors',
    severity: 'red',
    severityLabel: 'Critical Emergency Alert',
    source: 'India Meteorological Department (IMD) + Central Water Commission',
    issuedAt: '2026-08-29T07:30:00+05:30',
    validUntil: 'Next 24 Hours',
    affectedRadiusKm: 5.0,
    estimatedTargetCitizens: 48000,
    summary: 'Extreme rainfall (>140mm) upstream caused dam discharge. Tapi river levels projected 1.8m above danger mark.',
    safetyInstructions: [
      'Immediately evacuate basement and ground-floor residences in identified flood zones.',
      'Do not attempt to cross submerged roads or underpasses by vehicle or foot.',
      'Turn off main electricity breakers if water enters living premises.',
      'Keep emergency go-bag ready with drinking water, medicines, and ID cards.'
    ],
    recommendedAction: 'Mandatory evacuation of wards 3, 5, 8 to designated municipal shelters.',
    channels: ['In-App Broadcast', 'Push Notifications', 'High-Audio Strobe', 'Haptic Vibration', 'Cellular SMS Fallback'],
    status: 'Active Broadcast'
  },
  {
    id: 'WARN-2026-039',
    title: 'Severe Cyclone Wind & Storm Surge Warning',
    zone: 'Coastal Districts & Dumas Seafront',
    severity: 'orange',
    severityLabel: 'Warning / High Attention',
    source: 'National Disaster Management Authority (NDMA)',
    issuedAt: '2026-08-28T18:00:00+05:30',
    validUntil: '2026-08-30T12:00:00+05:30',
    affectedRadiusKm: 12.0,
    estimatedTargetCitizens: 110000,
    summary: 'Cyclonic storm system approaching Gulf of Khambhat. Wind gusts up to 95 km/h and tidal surges expected.',
    safetyInstructions: [
      'Complete suspension of all marine and fishing activities.',
      'Secure loose rooftop sheet structures, billboards, and antennas.',
      'Stay indoors in sturdy buildings away from glass windows.'
    ],
    recommendedAction: 'Relocate temporary beach dwellings and fishermen hamlets 2km inland.',
    channels: ['In-App Broadcast', 'Push Notifications', 'SMS Broadcast'],
    status: 'Active Monitoring'
  },
  {
    id: 'WARN-2026-035',
    title: 'Thunderstorm & Lightning Awareness',
    zone: 'Eastern Urban Fringe & Industrial Belt',
    severity: 'green',
    severityLabel: 'Awareness / Advisory',
    source: 'State Disaster Management Authority (SDMA)',
    issuedAt: '2026-08-28T12:00:00+05:30',
    validUntil: '2026-08-29T18:00:00+05:30',
    affectedRadiusKm: 8.0,
    estimatedTargetCitizens: 65000,
    summary: 'Moderate convective cloud formation. Lightning strikes likely during afternoon convective activity.',
    safetyInstructions: [
      'Seek shelter in enclosed building when thunder roars.',
      'Avoid standing under isolated tall trees or near high-tension pylons.'
    ],
    recommendedAction: 'General public awareness bulletin; keep outdoor events on alert.',
    channels: ['In-App Advisory', 'Push Notification'],
    status: 'Informational'
  }
];

export const initialRecentActivities = [
  {
    id: 'ACT-1',
    time: '2 mins ago',
    type: 'sos',
    title: 'New Critical SOS Received',
    desc: 'Family of 5 trapped near Tapi River Basin embankment. Coordinates forwarded to NDRF Team 07.',
    badge: 'Critical SOS',
    color: '#ef4444'
  },
  {
    id: 'ACT-2',
    time: '8 mins ago',
    type: 'team',
    title: 'Response Team Deployed',
    desc: 'SDRF Extrication Unit 02 dispatched to Sector 4 Building Collapse site with hydraulic gear.',
    badge: 'Team Deployed',
    color: '#3b82f6'
  },
  {
    id: 'ACT-3',
    time: '18 mins ago',
    type: 'ngo',
    title: 'NGO Relief Dispatched',
    desc: 'Red Cross Society dispatched 2,000 hot meal kits and drinking water tankers to Zone A.',
    badge: 'Relief Dispatched',
    color: '#10b981'
  },
  {
    id: 'ACT-4',
    time: '32 mins ago',
    type: 'shelter',
    title: 'Shelter Capacity Updated',
    desc: 'Govt Model High School Camp reached 342 / 500 capacity. Additional mattresses requested.',
    badge: 'Capacity Alert',
    color: '#f97316'
  },
  {
    id: 'ACT-5',
    time: '45 mins ago',
    type: 'alert',
    title: 'Early Warning Broadcast',
    desc: 'NDMA Flash Flood Level 3 warning pushed to 48,000 citizens in Tapi low-lying zones.',
    badge: 'Warning Pushed',
    color: '#ef4444'
  }
];

export const initialNotifications = [
  {
    id: 'NOTIF-01',
    category: 'sos',
    title: 'High Priority SOS: Evacuation Needed',
    message: 'Water level reached 1.2m at Tapi Basin Sector 2. Elderly patient and infant require boat rescue.',
    timestamp: '3 mins ago',
    read: false,
    severity: 'critical',
    targetType: 'incident',
    targetId: 'INC-2026-0891'
  },
  {
    id: 'NOTIF-02',
    category: 'incident',
    title: 'Building Collapse — Extrication in Progress',
    message: 'SDRF Unit 02 arrived on scene at Sector 4. Search & rescue dogs deployed inside basement.',
    timestamp: '12 mins ago',
    read: false,
    severity: 'critical',
    targetType: 'incident',
    targetId: 'INC-2026-0884'
  },
  {
    id: 'NOTIF-03',
    category: 'team',
    title: 'Team Status: On Site Arrival',
    message: 'Quick Response Medics 01 reached Dumas coastal clinic and established emergency power.',
    timestamp: '25 mins ago',
    read: false,
    severity: 'info',
    targetType: 'team',
    targetId: 'TEAM-QRM-01'
  },
  {
    id: 'NOTIF-04',
    category: 'ngo',
    title: 'Relief Delivery Completed',
    message: 'Seva Bharati delivered 3,000 fresh hot meal packets to Government Model High School Camp.',
    timestamp: '40 mins ago',
    read: true,
    severity: 'success',
    targetType: 'shelter',
    targetId: 'SHELTER-001'
  },
  {
    id: 'NOTIF-05',
    category: 'alert',
    title: 'Meteorological Risk Escalation',
    message: 'IMD upgraded rainfall warning to RED category for Surat coastal and riparian corridors.',
    timestamp: '1 hour ago',
    read: true,
    severity: 'warning',
    targetType: 'alert',
    targetId: 'WARN-2026-041'
  }
];

/**
 * Dynamic Situational Analysis generator by radius (500m, 1km, 2km)
 * Calculates realistic, scaled, localized metrics around an incident point.
 */
export function getRadiusSituationalData(incident, radiusOption = '1km') {
  const is500m = radiusOption === '500m' || radiusOption === '0.5km';
  const is1km = radiusOption === '1km';
  const is2km = radiusOption === '2km';

  // Multiplier scale
  const scale = is500m ? 0.4 : is1km ? 1.0 : 2.2;
  const radiusDistanceText = is500m ? '500 metres' : is1km ? '1 kilometre' : '2 kilometres';

  // Base values tailored to incident severity and type
  const baseCitizens = incident?.affectedCitizensCount || 100;
  const baseSOS = incident?.sosRequestsCount || 10;
  const loc = incident?.location || 'Surat Disaster Sector';

  const totalRegistered = Math.round(baseCitizens * 8.5 * scale);
  const potentiallyAffected = Math.round(baseCitizens * scale);
  const activeSOS = Math.max(1, Math.round(baseSOS * scale));
  const missingReports = is500m ? 2 : is1km ? 4 : 8;

  // Citizens list in radius
  const mockCitizensList = [
    {
      id: 'CIT-101',
      name: 'Rameshwar Parikh & Family',
      people: is500m ? 4 : 5,
      location: `${loc} — Plot 12`,
      distance: is500m ? '180m NW' : is1km ? '420m NW' : '1.2km NW',
      status: 'SOS Active: Trapped on 1st Floor',
      priority: 'Critical',
      contact: '+91 98251 00211',
      time: '5 min ago'
    },
    {
      id: 'CIT-102',
      name: 'Priya & Devansh Dave',
      people: 2,
      location: `${loc} — Apartment 3B`,
      distance: is500m ? '310m East' : is1km ? '680m East' : '1.4km East',
      status: 'SOS Active: Medical / Oxygen Supply Needed',
      priority: 'Critical',
      contact: '+91 98251 00212',
      time: '12 min ago'
    },
    {
      id: 'CIT-103',
      name: 'Suresh Patel (Elderly Resident)',
      people: 1,
      location: `${loc} — House 45`,
      distance: is500m ? '420m South' : is1km ? '890m South' : '1.8km South',
      status: 'Missing Person Report Filed',
      priority: 'High',
      contact: '+91 98251 00213',
      time: '24 min ago'
    }
  ];

  if (!is500m) {
    mockCitizensList.push({
      id: 'CIT-104',
      name: 'Kavita Mehta & 8 Neighbors',
      people: 9,
      location: `Perimeter of ${loc}`,
      distance: is1km ? '950m NE' : '1.6km NE',
      status: 'Shelter Transfer Requested',
      priority: 'Medium',
      contact: '+91 98251 00214',
      time: '35 min ago'
    });
  }

  // Response Teams in radius
  const nearbyTeams = [
    {
      id: incident?.assignedTeamId || 'TEAM-NDRF-07',
      name: incident?.assignedTeam || 'NDRF Battalion 07',
      status: 'On Site',
      lead: 'Cmdr. Rajiv Nair',
      personnel: 24,
      distance: is500m ? 'On Site (0m)' : '250m from center',
      specialty: 'Water Extrication & Medical Evacuation'
    },
    {
      id: 'TEAM-QRM-01',
      name: 'Quick Response Medics 01',
      status: is500m ? 'Assigned' : 'En Route',
      lead: 'Dr. Siddharth Sen',
      personnel: 12,
      distance: is500m ? '350m (ETA 4 min)' : is1km ? '850m (ETA 7 min)' : '1.6km (ETA 12 min)',
      specialty: 'Trauma Care & Mobile ICU'
    }
  ];

  if (is2km) {
    nearbyTeams.push({
      id: 'TEAM-CIV-04',
      name: 'Civil Defense Volunteer Group 04',
      status: 'Available',
      lead: 'Meera Kothari',
      personnel: 30,
      distance: '1.7km away',
      specialty: 'Perimeter Control & Food Supply'
    });
  }

  // Volunteers in radius
  const nearbyVolunteers = [
    {
      id: 'VOL-801',
      name: 'Siddharth Rao',
      skills: 'Boat Rescue, Water Safety',
      status: 'Assigned',
      availability: 'On Duty',
      distance: is500m ? '150m' : '350m',
      phone: '+91 98765 43210'
    },
    {
      id: 'VOL-802',
      name: 'Dr. Shruti Sharma',
      skills: 'Paramedic / Trauma Triage',
      status: 'Assigned',
      availability: 'On Duty',
      distance: is500m ? '280m' : '520m',
      phone: '+91 98765 43211'
    }
  ];

  if (!is500m) {
    nearbyVolunteers.push({
      id: 'VOL-803',
      name: 'Faizan Ahmed',
      skills: 'Ham Radio & LoRa Node Support',
      status: 'Available',
      availability: 'Available',
      distance: is1km ? '720m' : '1.1km',
      phone: '+91 98765 43212'
    });
  }

  if (is2km) {
    nearbyVolunteers.push({
      id: 'VOL-804',
      name: 'Pooja Iyer',
      skills: 'Drone Reconnaissance & GIS Mapping',
      status: 'Available',
      availability: 'Available',
      distance: '1.5km',
      phone: '+91 98765 43213'
    });
  }

  const volunteerStats = {
    totalNearby: is500m ? 6 : is1km ? 14 : 32,
    available: is500m ? 2 : is1km ? 8 : 21,
    assigned: is500m ? 4 : is1km ? 6 : 11,
    skills: ['Boat Rescue', 'First Aid / Trauma', 'Ham Radio Comms', 'Drone Recon', 'Logistics']
  };

  // Nearby Shelters in radius
  const nearbyShelters = [
    {
      id: 'SHELTER-001',
      name: 'Government Model High School Camp',
      distance: is500m ? '480m' : is1km ? '750m' : '1.2km',
      totalCapacity: 500,
      currentOccupancy: 342,
      availableCapacity: 158,
      status: 'Open - Moderate Space',
      facilities: ['Food', 'Clean Water', '24x7 Doctor', 'Backup Power']
    }
  ];

  if (!is500m) {
    nearbyShelters.push({
      id: 'SHELTER-002',
      name: 'Community Hall — Ward 12 Complex',
      distance: is1km ? '980m' : '1.8km',
      totalCapacity: 200,
      currentOccupancy: 188,
      availableCapacity: 12,
      status: 'Near Full (94%)',
      facilities: ['Hot Meals', 'Emergency Beds', 'First Aid']
    });
  }

  if (is2km) {
    nearbyShelters.push({
      id: 'SHELTER-003',
      name: 'NDRF Athwa Stadium Emergency Camp',
      distance: '1.9km',
      totalCapacity: 800,
      currentOccupancy: 290,
      availableCapacity: 510,
      status: 'Open - High Capacity',
      facilities: ['Tents', 'Helipad', 'Paramedic Unit', 'Blankets']
    });
  }

  // Relief Resources & NGOs in radius
  const reliefData = {
    supportingNGOs: [
      { name: 'Red Cross Disaster Relief', role: 'Medical Triage & Clean Water', status: 'Active On Site' },
      { name: 'Seva Bharati Kitchens', role: 'Hot Meal Packets', status: 'Delivering' }
    ],
    resources: {
      foodMealsAvailable: is500m ? 1800 : is1km ? 4200 : 8500,
      waterLitresAvailable: is500m ? 2400 : is1km ? 6500 : 14000,
      medicalKitsAvailable: is500m ? 120 : is1km ? 340 : 680,
      blanketsAvailable: is500m ? 450 : is1km ? 1100 : 2500,
      deliveryStatus: is500m ? 'On Site & Actively Distributing' : is1km ? 'Dispatched / In Transit' : 'Regional Depot Available'
    }
  };

  return {
    radiusOption,
    radiusDistanceText,
    totalRegistered,
    potentiallyAffected,
    activeSOS,
    missingReports,
    mockCitizensList,
    nearbyTeams,
    nearbyVolunteers,
    volunteerStats,
    nearbyShelters,
    reliefData
  };
}
