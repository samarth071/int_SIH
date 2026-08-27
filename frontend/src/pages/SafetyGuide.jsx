import { useState } from 'react';
import {
  WavesIcon,
  MountainIcon,
  FlameIcon,
  WindIcon,
  ZapIcon,
  ShieldIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '../components/icons.jsx';
import './SafetyGuide.css';

const DISASTER_CATEGORIES = [
  { id: 'flood', label: 'Flood', Icon: WavesIcon, color: '#0891B2', bg: '#ECFEFF' },
  { id: 'earthquake', label: 'Earthquake', Icon: MountainIcon, color: '#D97706', bg: '#FFFBEB' },
  { id: 'landslide', label: 'Landslide', Icon: MountainIcon, color: '#92400E', bg: '#FEF3C7' },
  { id: 'fire', label: 'Fire', Icon: FlameIcon, color: '#DC2626', bg: '#FEF2F2' },
  { id: 'cyclone', label: 'Cyclone / Storm', Icon: WindIcon, color: '#7C3AED', bg: '#F5F3FF' },
  { id: 'lightning', label: 'Lightning', Icon: ZapIcon, color: '#F59E0B', bg: '#FFFBEB' },
];

const GUIDE_CONTENT = {
  flood: {
    before: [
      'Learn about flood-prone areas in your district.',
      'Keep a go-bag ready with essential documents, medicines, food & water.',
      'Know your nearest shelter or higher ground.',
      'Waterproof important documents and store them safely.',
      'Disconnect electrical appliances if a flood warning is issued.',
      'Monitor IMD and local authority alerts regularly.',
    ],
    during: [
      'Move immediately to higher ground if flooding begins.',
      'Never walk or drive through flooded areas — 15 cm of water can knock you down.',
      'Stay away from drainage canals, rivers, and low-lying areas.',
      'Turn off electricity at the main switch if water enters.',
      'Avoid contact with floodwater — it may be contaminated.',
      'If trapped, signal for help. Use a torch or bright cloth on a high point.',
    ],
    after: [
      'Return home only when authorities declare it safe.',
      'Document damage to property with photographs before cleaning.',
      'Disinfect all surfaces and boil water before drinking.',
      'Seek medical help for injuries or exposure to floodwater.',
      'Do not consume food that has been in contact with floodwater.',
      'Report damage to local authorities for relief assistance.',
    ],
    donts: [
      'Do not ignore flood warnings or early alerts.',
      'Do not try to swim or drive through floodwater.',
      'Do not touch downed power lines.',
      'Do not enter damaged buildings without clearance.',
    ],
  },
  earthquake: {
    before: [
      'Identify safe spots in each room (under sturdy tables, against interior walls).',
      'Secure heavy furniture, bookshelves, and appliances to walls.',
      'Know how to turn off gas, electricity, and water at the main switch.',
      'Keep a 72-hour emergency kit (water, food, first aid, torch, battery radio).',
      'Discuss and practice the Drop-Cover-Hold On action with your family.',
      'Know your local assembly point and evacuation routes.',
    ],
    during: [
      'Drop, Cover, and Hold On — get under a sturdy table or desk.',
      'Stay away from windows, exterior walls, and heavy objects.',
      'If outdoors, move away from buildings, trees, and power lines.',
      'If in a vehicle, pull over away from overpasses. Stay inside.',
      'Do not run outside during shaking — most injuries occur from falling debris at exits.',
      'Stay calm and wait for shaking to stop before moving.',
    ],
    after: [
      'Expect aftershocks — use Drop-Cover-Hold On each time.',
      'Check yourself and others for injuries before moving.',
      'Check for gas leaks — if you smell gas, open windows and leave immediately.',
      'Do not use elevators.',
      'Inspect your home for structural damage before re-entering.',
      'Listen to emergency broadcasts for official instructions.',
    ],
    donts: [
      'Do not run outside during the earthquake — most deaths occur near exits.',
      'Do not use candles or open flames after — gas may be leaking.',
      'Do not use elevators.',
      'Do not re-enter a damaged building.',
    ],
  },
  fire: {
    before: [
      'Install smoke detectors on every floor and test them monthly.',
      'Keep fire extinguishers in the kitchen and check them annually.',
      'Plan and practice at least two exit routes from every room.',
      'Never leave cooking or candles unattended.',
      'Store flammable liquids safely away from heat sources.',
    ],
    during: [
      'Alert everyone in the building immediately.',
      'Call 101 (Fire) or 112.',
      'Use the nearest exit — do not use lifts or elevators.',
      'Feel doors before opening — if hot, use another exit.',
      'Stay low if there is smoke — crawl if needed.',
      'If trapped, close doors to slow fire and signal from a window.',
      'Stop, Drop, and Roll if clothes catch fire.',
    ],
    after: [
      'Do not re-enter the building until fire department declares it safe.',
      'Seek medical care for burns or smoke inhalation.',
      'Contact insurance and local authorities to report damage.',
      'Arrange alternative shelter if home is damaged.',
    ],
    donts: [
      'Do not use lifts during a fire.',
      'Do not open a door if the handle is hot.',
      'Do not go back inside a burning building.',
      'Do not throw water on an electrical fire — use dry powder extinguisher.',
    ],
  },
  cyclone: {
    before: [
      'Monitor IMD cyclone warnings — know the category system.',
      'Evacuate coastal and low-lying areas when advised.',
      'Secure or bring inside loose outdoor items (furniture, tools).',
      'Reinforce windows and doors with plywood or shutters.',
      'Stock at least 3 days of food, water, medicines, and batteries.',
      'Know the location of your nearest cyclone shelter.',
    ],
    during: [
      'Stay indoors in the strongest part of the building (interior room).',
      'Stay away from windows.',
      'Do not go out during the "eye" of the cyclone — it is a false calm.',
      'Disconnect electrical appliances.',
      'Listen to battery-powered radio for official updates.',
      'If in a mobile structure or coastal area — evacuate before the cyclone strikes.',
    ],
    after: [
      'Do not go out immediately after — wait for official all-clear.',
      'Beware of debris, downed power lines, and damaged roads.',
      'Report injured people or structural damage to authorities.',
      'Do not drink tap water until cleared — use stored or boiled water.',
    ],
    donts: [
      'Do not ignore evacuation orders.',
      'Do not go outside during the eye of the storm.',
      'Do not touch downed electrical wires.',
    ],
  },
  lightning: {
    before: [
      'Monitor weather forecasts for thunderstorm warnings.',
      'Identify safe indoor locations (avoid open fields, trees, hilltops).',
      'Unplug electronics and avoid using corded phones during storms.',
      'Stay weather aware — lightning can strike before rain starts.',
    ],
    during: [
      'Seek shelter in a sturdy building or hard-topped metal vehicle immediately.',
      'Stay away from tall trees, metal fences, hilltops, and open fields.',
      'If indoors, stay off corded phones and away from windows.',
      'Avoid contact with plumbing — do not shower or wash dishes.',
      'If caught outdoors — crouch low (feet together, head down), do not lie flat.',
      'Stay away from water bodies.',
    ],
    after: [
      'Wait 30 minutes after the last thunder before going outside.',
      'Call for help immediately if someone is struck — lightning victims are safe to touch.',
      'Begin CPR if the victim is not breathing.',
      'Check for burns or other injuries.',
    ],
    donts: [
      'Do not shelter under isolated trees.',
      'Do not use open umbrellas or hold metal objects.',
      'Do not stand near water bodies.',
      'Do not use landline phones during a storm.',
    ],
  },
  landslide: {
    before: [
      'Know if you live in a landslide-prone area (steep slopes, recent heavy rain).',
      'Identify evacuation routes to higher, stable ground.',
      'Watch for warning signs: new cracks, tilting trees, doors jamming, sudden drainage changes.',
      'Avoid building on steep slopes or near natural drainage channels.',
    ],
    during: [
      'Move quickly away from the path of the landslide.',
      'If escape is impossible, curl into a ball and protect your head.',
      'Stay alert for rushing water or mud following the slide.',
      'Listen for unusual sounds — cracking trees, rumbling, sudden increase in water flow.',
    ],
    after: [
      'Stay away from the landslide area — secondary slides are common.',
      'Check for injured or trapped persons — report to rescue teams.',
      'Avoid driving through affected areas — roads may be undermined.',
      'Watch for flooding — slides can block streams and cause sudden floods.',
      'Contact authorities to assess building safety before re-entering.',
    ],
    donts: [
      'Do not cross a slide area to check on property.',
      'Do not enter a building that has been affected by the slide.',
      'Do not ignore unusual sounds from hill slopes.',
    ],
  },
};

const PHASE_CONFIG = [
  { id: 'before', label: 'Before', color: '#1A56DB', bg: '#EFF6FF' },
  { id: 'during', label: 'During', color: '#D97706', bg: '#FFFBEB' },
  { id: 'after', label: 'After', color: '#059669', bg: '#ECFDF5' },
  { id: 'donts', label: "Don'ts", color: '#DC2626', bg: '#FEF2F2' },
];

function AccordionSection({ phase, items }) {
  const [open, setOpen] = useState(phase.id === 'during');
  if (!items || items.length === 0) return null;

  return (
    <div className="sg-accordion">
      <button
        className="sg-accordion-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{ background: open ? phase.bg : undefined }}
      >
        <span className="sg-phase-label" style={{ color: phase.color }}>
          {phase.label}
        </span>
        {open ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
      </button>
      {open && (
        <div className="sg-accordion-body">
          <ul className="sg-guide-list">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function SafetyGuide() {
  const [selected, setSelected] = useState(null);
  const guide = selected ? GUIDE_CONTENT[selected] : null;

  return (
    <div className="cp-page sg-page">
      <div className="cp-page-header">
        <h1 className="cp-page-title">Disaster Safety Guide</h1>
        <p className="cp-page-subtitle">
          Learn how to stay safe before, during, and after any disaster. Select a category to get started.
        </p>
      </div>

      {/* Category selector */}
      <div className="sg-categories">
        {DISASTER_CATEGORIES.map(({ id, label, Icon, color, bg }) => (
          <button
            key={id}
            className={`sg-cat-btn ${selected === id ? 'active' : ''}`}
            onClick={() => setSelected(selected === id ? null : id)}
            style={selected === id ? { background: bg, borderColor: color, color } : {}}
            aria-pressed={selected === id}
          >
            <Icon size={22} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Guide content */}
      {!selected && (
        <div className="cp-empty sg-empty">
          <ShieldIcon size={40} />
          <p>Select a disaster type above to view the safety guide.</p>
          <p className="cp-text-sm cp-text-muted">
            Each guide covers Before, During, After, and Important Don'ts.
          </p>
        </div>
      )}

      {selected && guide && (
        <div className="sg-guide">
          <h2 className="sg-guide-title">
            {DISASTER_CATEGORIES.find((c) => c.id === selected)?.label} Safety Guide
          </h2>
          <div className="sg-accordions">
            {PHASE_CONFIG.map((phase) => (
              <AccordionSection
                key={phase.id}
                phase={phase}
                items={guide[phase.id]}
              />
            ))}
          </div>
          <div className="cp-banner cp-banner-info" style={{ marginTop: '8px' }}>
            <ShieldIcon size={16} />
            <span>
              Information sourced from NDMA, SDMA, and IMD guidelines. Always follow official instructions from local authorities during an active emergency.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
