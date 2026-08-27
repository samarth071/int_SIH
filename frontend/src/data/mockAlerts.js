export const mockAlerts = [
  {
    id: 'alert-001',
    type: 'flood',
    severity: 'high',
    title: 'Flash Flood Warning',
    area: 'Low-lying areas of Surat, Gujarat',
    message:
      'Heavy rainfall expected in the next 24 hours. Residents in low-lying areas near Tapi River should evacuate immediately. Avoid crossing flooded roads.',
    safetyTip: 'Move to higher ground immediately. Do not attempt to walk or drive through floodwaters.',
    issuedBy: 'India Meteorological Department (IMD)',
    updatedAt: '2026-08-27T14:30:00+05:30',
    isActive: true,
  },
  {
    id: 'alert-002',
    type: 'cyclone',
    severity: 'critical',
    title: 'Cyclone Alert — Category 3',
    area: 'Coastal Districts of Odisha',
    message:
      'Cyclone Manohar is approaching the coast. Expected landfall near Puri between 27–28 August. Wind speeds up to 165 km/h anticipated. All fishing activities suspended.',
    safetyTip: 'Evacuate coastal areas immediately. Seek shelter in designated cyclone shelters. Stock up on food and water.',
    issuedBy: 'National Disaster Management Authority (NDMA)',
    updatedAt: '2026-08-27T12:00:00+05:30',
    isActive: true,
  },
  {
    id: 'alert-003',
    type: 'earthquake',
    severity: 'medium',
    title: 'Earthquake Advisory',
    area: 'Uttarakhand — Chamoli District',
    message:
      'A 4.8 magnitude earthquake was recorded 22 km NW of Joshimath. Aftershocks are possible. Residents in vulnerable structures advised to remain cautious.',
    safetyTip: 'Stay away from damaged buildings. Be prepared for aftershocks. Keep emergency kit ready.',
    issuedBy: 'National Centre for Seismology (NCS)',
    updatedAt: '2026-08-27T09:15:00+05:30',
    isActive: true,
  },
  {
    id: 'alert-004',
    type: 'landslide',
    severity: 'high',
    title: 'Landslide Risk Warning',
    area: 'NH-7 — Manali to Leh Highway, Himachal Pradesh',
    message:
      'Heavy rainfall has destabilised hill slopes along the Manali-Leh highway. Landslide risk is very high. Do not travel on this route until further notice.',
    safetyTip: 'Avoid hill roads. Do not park vehicles near slopes. Listen for unusual sounds like cracking or rumbling.',
    issuedBy: 'State Disaster Management Authority (SDMA)',
    updatedAt: '2026-08-27T08:00:00+05:30',
    isActive: true,
  },
  {
    id: 'alert-005',
    type: 'fire',
    severity: 'medium',
    title: 'Forest Fire Alert',
    area: 'Mudumalai Tiger Reserve, Tamil Nadu',
    message:
      'Forest fire reported in the northern zone of Mudumalai. Fire fighting teams deployed. Visitors and tourists advised to avoid the area.',
    safetyTip: 'Stay away from the affected forest area. Report any new fire sightings to local authorities immediately.',
    issuedBy: 'Tamil Nadu Forest Department',
    updatedAt: '2026-08-26T18:45:00+05:30',
    isActive: false,
  },
  {
    id: 'alert-006',
    type: 'lightning',
    severity: 'low',
    title: 'Thunderstorm & Lightning Warning',
    area: 'Eastern UP — Varanasi, Allahabad, Lucknow',
    message:
      'Thunderstorms with lightning likely between 3 PM and 9 PM. Stay indoors. Avoid open fields, tall trees, and metal structures.',
    safetyTip: 'If outside, seek shelter in a sturdy building. Avoid using corded phones. Stay away from water bodies.',
    issuedBy: 'IMD Regional Centre, Lucknow',
    updatedAt: '2026-08-27T11:30:00+05:30',
    isActive: true,
  },
];

export const getActiveAlerts = () => mockAlerts.filter((a) => a.isActive);
export const getAlertById = (id) => mockAlerts.find((a) => a.id === id);
