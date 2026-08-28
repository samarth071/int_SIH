export const mockMyRequests = [];

export const mockMissingPersons = [];

export const mockAIResponses = {
  trauma: {
    title: 'Trauma / Physical Injury — First-Aid Guidance',
    steps: [
      'Ensure the scene is safe before approaching the injured person.',
      'Call emergency services (112) immediately for serious injuries.',
      'Do not move the person if spinal injury is suspected.',
      'Control visible bleeding by applying firm, direct pressure with a clean cloth.',
      'Keep the person warm and calm. Do not give food or water.',
      'If unconscious but breathing, place in recovery position (on side).',
      'Monitor breathing and pulse until help arrives.',
    ],
    doNots: [
      'Do not remove embedded objects — stabilise them in place.',
      'Do not apply tourniquet unless trained.',
      'Do not give aspirin to children.',
    ],
    urgency: 'high',
    disclaimer: true,
  },
  cardiac: {
    title: 'Cardiac Emergency — First-Aid Guidance',
    steps: [
      'Call emergency services (112) immediately.',
      'Ask the person to sit or lie down in a comfortable position.',
      'If the person becomes unconscious and stops breathing normally, begin CPR.',
      'CPR: 30 chest compressions followed by 2 rescue breaths. Repeat.',
      'If an Automated External Defibrillator (AED) is available, use it.',
      'Do not leave the person alone.',
    ],
    doNots: [
      'Do not delay calling emergency services.',
      'Do not give water or food.',
    ],
    urgency: 'critical',
    disclaimer: true,
  },
  burns: {
    title: 'Burns — First-Aid Guidance',
    steps: [
      'Remove the person from the source of burn immediately.',
      'Cool the burn with cool (not cold/ice) running water for at least 10-20 minutes.',
      'Remove jewellery or tight items near the burn (before swelling starts).',
      'Cover the burn loosely with a clean, non-fluffy material or cling wrap.',
      'Call 112 for serious burns (larger than palm size, face/hands/joints).',
    ],
    doNots: [
      'Do not apply ice, butter, toothpaste, or oil on burns.',
      'Do not burst blisters.',
      'Do not remove clothing stuck to the burn.',
    ],
    urgency: 'medium',
    disclaimer: true,
  },
  drowning: {
    title: 'Drowning — First-Aid Guidance',
    steps: [
      'Do not enter water unless trained — throw a rope, float, or reach with a stick.',
      'Once out of water, check for breathing.',
      'If not breathing, begin CPR immediately — 30 compressions + 2 breaths.',
      'Call 112 at once.',
      'Keep the person warm and in recovery position if breathing resumes.',
    ],
    doNots: [
      'Do not attempt to drain water from lungs — focus on CPR.',
      'Do not leave the person alone.',
    ],
    urgency: 'critical',
    disclaimer: true,
  },
  default: {
    title: 'General Emergency Guidance',
    steps: [
      'Call emergency services (112) immediately.',
      'Ensure the scene is safe.',
      'Keep the person calm and still.',
      'Monitor breathing and consciousness.',
      'Follow instructions from emergency dispatcher.',
    ],
    doNots: [
      'Do not delay calling for professional help.',
    ],
    urgency: 'high',
    disclaimer: true,
  },
};
