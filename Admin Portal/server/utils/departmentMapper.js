// utils/departmentMapper.js

const departmentMap = {
  // Road & Transport
  "potholes": "PWD",
  "broken_roads": "PWD",
  "road_markings": "PWD",
  "speed_breakers": "PWD",
  "broken_traffic_signals": "Traffic Police",
  "damaged_street_signs": "Traffic Police",
  "street_light_not_working": "Municipal Lighting Division",

  // Sanitation & Waste
  "overflowing_garbage_bins": "Sanitation Dept",
  "uncollected_waste": "Sanitation Dept",
  "illegal_dumping": "Health/Sanitation Wing",
  "blocked_drains": "Stormwater Drainage Dept",
  "waterlogging": "Stormwater Drainage Dept",

  // Water & Sewerage
  "leaking_pipes": "Water Supply Board",
  "contaminated_supply": "Water Supply Board",
  "sewage_overflow": "Sewerage Dept",
  "blocked_sewers": "Sewerage Dept",

  // Add all other mappings from your image here...
};

const getDepartmentForIssue = (issueClassification) => {
  // Find a key that matches the classification (case-insensitive)
  const key = Object.keys(departmentMap).find(
    (k) => k.toLowerCase() === issueClassification.toLowerCase().replace(/\s+/g, '_')
  );
  return key ? departmentMap[key] : "General Grievance"; // Default if not found
};

module.exports = { getDepartmentForIssue };