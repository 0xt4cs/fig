/**
 * Comprehensive Philippine Data Configuration
 * Accurate and region-specific data for authentic Filipino information generation
 */

// Philippine Network Prefixes for Mobile Numbers
export const PHILIPPINES_MOBILE_PREFIXES = {
  globe: ['0917', '0916', '0915', '0906', '0905', '0945', '0955', '0956', '0965', '0966', '0967', '0975', '0976', '0977', '0979', '0995', '0996', '0997'],
  smart: ['0918', '0919', '0920', '0921', '0928', '0929', '0939', '0949', '0989', '0999'],
  tnt: ['0907', '0909', '0910', '0912', '0930', '0938', '0946', '0948', '0950'],
  sun: ['0922', '0923', '0924', '0925', '0931', '0932', '0933', '0934', '0940', '0941', '0942', '0943', '0944'],
  dito: ['0991', '0992', '0993', '0994']
};

// Area Codes for Landlines by Region
export const PHILIPPINES_AREA_CODES = {
  'Metro Manila': ['02'],
  'Cordillera Administrative Region': ['074'],
  'Ilocos Region': ['077', '078'],
  'Cagayan Valley': ['078'],
  'Central Luzon': ['045', '047', '044'],
  'CALABARZON': ['043', '049', '046', '042'],
  'MIMAROPA': ['043', '048'],
  'Bicol Region': ['054', '056', '052'],
  'Western Visayas': ['033', '036'],
  'Central Visayas': ['032', '038', '035'],
  'Eastern Visayas': ['053', '055'],
  'Zamboanga Peninsula': ['062', '065'],
  'Northern Mindanao': ['088', '063', '064'],
  'Davao Region': ['082', '084', '087'],
  'SOCCSKSARGEN': ['083', '064'],
  'Caraga': ['085', '086'],
  'BARMM': ['064', '068']
};

// Real Philippine ZIP Codes by Major Cities
export const PHILIPPINES_ZIP_CODES = {
  'Manila': ['1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018'],
  'Quezon City': ['1100', '1101', '1102', '1103', '1104', '1105', '1106', '1107', '1108', '1109', '1110', '1111', '1112', '1113', '1114', '1115', '1116', '1117', '1118', '1119', '1120', '1121', '1122', '1123', '1124', '1125', '1126', '1127', '1128'],
  'Makati': ['1200', '1201', '1202', '1203', '1204', '1205', '1206', '1207', '1208', '1209', '1210', '1211', '1212', '1213', '1214', '1215', '1216', '1217', '1218', '1219', '1220', '1221', '1222', '1223', '1224', '1225', '1226', '1227', '1228', '1229', '1230', '1231'],
  'Pasig': ['1600', '1601', '1602', '1603', '1604', '1605', '1606', '1607', '1608', '1609', '1610', '1611'],
  'Taguig': ['1630', '1631', '1632', '1633', '1634', '1635'],
  'Cebu City': ['6000', '6001', '6002', '6003', '6004', '6005', '6006', '6007', '6008', '6009', '6010', '6011', '6012', '6013', '6014', '6015', '6016', '6017', '6018', '6019', '6020', '6021', '6022', '6023', '6024', '6025', '6026', '6027', '6028', '6029', '6030'],
  'Davao City': ['8000', '8001', '8002', '8003', '8004', '8005', '8006', '8007', '8008', '8009', '8010', '8011', '8012', '8013', '8014', '8015', '8016', '8017', '8018', '8019', '8020'],
  'Iloilo City': ['5000', '5001', '5002', '5003', '5004', '5005', '5006', '5007', '5008', '5009', '5010', '5011', '5012', '5013', '5014', '5015', '5016', '5017', '5018', '5019', '5020'],
  'Bacolod': ['6100', '6101', '6102', '6103', '6104', '6105', '6106', '6107', '6108', '6109', '6110', '6111', '6112', '6113', '6114', '6115'],
  'Cagayan de Oro': ['9000', '9001', '9002', '9003', '9004', '9005', '9006', '9007', '9008', '9009', '9010', '9011', '9012', '9013', '9014', '9015'],
  'Zamboanga City': ['7000', '7001', '7002', '7003', '7004', '7005', '7006', '7007', '7008', '7009', '7010', '7011', '7012', '7013', '7014', '7015']
};

// Real Filipino Street Names by Category
export const PHILIPPINES_STREET_NAMES = {
  heroes: [
    'Jose Rizal', 'Andres Bonifacio', 'Apolinario Mabini', 'Marcelo H. del Pilar', 'Graciano Lopez Jaena',
    'Juan Luna', 'Antonio Luna', 'Emilio Jacinto', 'Melchora Aquino', 'Gabriela Silang',
    'Diego Silang', 'Francisco Dagohoy', 'Rajah Sulayman', 'Lapu-Lapu', 'Datu Piang'
  ],
  presidents: [
    'Emilio Aguinaldo', 'Manuel L. Quezon', 'Jose P. Laurel', 'Sergio Osmeña', 'Manuel Roxas',
    'Elpidio Quirino', 'Ramon Magsaysay', 'Carlos P. Garcia', 'Diosdado Macapagal', 'Ferdinand Marcos',
    'Corazon Aquino', 'Fidel V. Ramos', 'Joseph Estrada', 'Gloria Macapagal-Arroyo', 'Benigno Aquino III'
  ],
  saints: [
    'San Miguel', 'San Juan', 'San Pedro', 'San Antonio', 'San Jose', 'San Rafael', 'San Gabriel',
    'Santa Ana', 'Santa Cruz', 'Santa Rosa', 'Santa Maria', 'Santa Monica', 'Santo Domingo', 'Santo Niño'
  ],
  common: [
    'Acacia', 'Bamboo', 'Camia', 'Dama de Noche', 'Everlasting', 'Fortune', 'General', 'Happy',
    'Independence', 'Justice', 'Kamagong', 'Liberty', 'Mahogany', 'Narra', 'Oak', 'Peace',
    'Quiet', 'Republic', 'Sampaguita', 'Tanguile', 'Unity', 'Victory', 'Wisdom', 'Yakal'
  ]
};

// Filipino Middle Names (Usually mother's maiden name)
export const PHILIPPINES_COMMON_MAIDEN_NAMES = [
  'Dela Cruz', 'Garcia', 'Reyes', 'Santos', 'Flores', 'Gonzales', 'Bautista', 'Manalo', 'Castro', 'Torres',
  'Villanueva', 'Aquino', 'Rivera', 'Morales', 'Perez', 'Tan', 'Fernandez', 'Rodriguez', 'Martinez', 'Lopez',
  'Pascual', 'Mercado', 'Valdez', 'Aguilar', 'Castillo', 'Francisco', 'Navarro', 'Gutierrez', 'Salazar', 'Vargas'
];

// Regional Names by Major Language Groups
export const PHILIPPINES_REGIONAL_NAMES = {
  tagalog: {
    male: ['Jose', 'Juan', 'Pedro', 'Antonio', 'Manuel', 'Francisco', 'Miguel', 'Rafael', 'Carlos', 'Eduardo'],
    female: ['Maria', 'Ana', 'Carmen', 'Luz', 'Rosa', 'Elena', 'Teresa', 'Gloria', 'Esperanza', 'Corazon']
  },
  cebuano: {
    male: ['Ramon', 'Sergio', 'Ricardo', 'Roberto', 'Mario', 'Dante', 'Leonardo', 'Paolo', 'Angelo', 'Marco'],
    female: ['Cristina', 'Maricel', 'Catherine', 'Michelle', 'Jennifer', 'Jessica', 'Angelica', 'Grace', 'Joy', 'Mae']
  },
  ilocano: {
    male: ['Rodrigo', 'Ferdinand', 'Benigno', 'Emilio', 'Andres', 'Luis', 'Alfredo', 'Vicente', 'Gregorio', 'Mariano'],
    female: ['Remedios', 'Dolores', 'Soledad', 'Lourdes', 'Pilar', 'Aurora', 'Milagros', 'Leonor', 'Alma', 'Ruby']
  },
  hiligaynon: {
    male: ['Salvador', 'Alejandro', 'Teodoro', 'Enrique', 'Arturo', 'Vincent', 'Joshua', 'Christian', 'John', 'Michael'],
    female: ['Stephanie', 'Nicole', 'Kristine', 'Melissa', 'Karen', 'Sarah', 'Princess', 'Angel', 'Rica', 'Lovely']
  }
};

// Filipino Nicknames
export const PHILIPPINES_NICKNAMES = {
  male: [
    'Jun', 'Boy', 'Nonoy', 'Junjun', 'Bong', 'Dodong', 'Totoy', 'Toto', 'Bogs', 'Boyet',
    'Bimbo', 'Bambi', 'Bamba', 'Tonton', 'Kuya', 'Manong', 'Tatay', 'Papa', 'Daddy', 'Dada'
  ],
  female: [
    'Baby', 'Ate', 'Nene', 'Inday', 'Aling', 'Tita', 'Tete', 'Diding', 'Bebe', 'Ging',
    'Ching', 'Len', 'Len-len', 'Sweet', 'Honey', 'Princess', 'Angel', 'Precious', 'Heart', 'Love'
  ]
};

// Subdivision and Village Names
export const PHILIPPINES_SUBDIVISIONS = [
  'BF Homes', 'Ayala Alabang', 'Greenmeadows', 'White Plains', 'Blue Ridge', 'Vista Verde',
  'Loyola Grand Villas', 'Corinthian Gardens', 'Forbes Park', 'Dasmariñas Village', 'San Lorenzo Village',
  'Magallanes Village', 'Valle Verde', 'La Vista', 'Greenhills', 'New Manila', 'Filinvest',
  'Alabang Hills', 'Portofino', 'McKinley Hill', 'Serendra', 'High Street', 'Eastwood',
  'Ortigas Center', 'Rockwell Center', 'Bonifacio Global City', 'Kapitolyo', 'Ugong'
];

// Real Barangay Names by Region
export const PHILIPPINES_BARANGAYS_BY_REGION = {
  'Metro Manila': [
    'Bagong Pag-asa', 'Holy Spirit', 'Commonwealth', 'Batasan Hills', 'Payatas', 'Fairview',
    'Novaliches', 'Kamuning', 'Central', 'Pinyahan', 'Ugong Norte', 'Bagumbayan', 'Bambang',
    'Santa Cruz', 'Sampaloc', 'Tondo', 'Binondo', 'Ermita', 'Malate', 'San Nicolas'
  ],
  'Central Luzon': [
    'San Fernando', 'Angeles', 'Mabalacat', 'Porac', 'Floridablanca', 'Guagua', 'Lubao',
    'Sasmuan', 'Macabebe', 'Masantol', 'Mexico', 'Santa Rita', 'Arayat', 'Candaba',
    'San Luis', 'San Simon', 'Santo Tomas', 'Minalin', 'Apalit', 'Cabanatuan'
  ],
  'Central Visayas': [
    'Lahug', 'Banilad', 'Talamban', 'Mabolo', 'Guadalupe', 'Poblacion', 'Carreta', 'Zapatera',
    'Cogon Ramos', 'San Nicolas', 'Duljo Fatima', 'Pahina Central', 'Tejero', 'Capitol Site',
    'Kamputhaw', 'Kasambagan', 'Lorega San Miguel', 'Pasil', 'Suba', 'Tinago'
  ],
  'Davao Region': [
    'Poblacion', 'Agdao', 'Buhangin', 'Bunawan', 'Calinan', 'Marilog', 'Paquibato', 'Talomo',
    'Toril', 'Tugbok', 'Baguio', 'Catanice', 'Dumoy', 'Kabacan', 'Lacson', 'Mintal',
    'Mudiang', 'Mulig', 'Salinog', 'Sibulan'
  ]
};

// Filipino Company Types and Suffixes
export const PHILIPPINES_COMPANY_SUFFIXES = [
  'Corporation', 'Corp.', 'Inc.', 'Company', 'Co.', 'Enterprises', 'Holdings', 'Group',
  'Industries', 'Services', 'Solutions', 'Systems', 'Technologies', 'Trading', 'Construction',
  'Development', 'Properties', 'Realty', 'Marketing', 'Manufacturing'
];

// Filipino Business Names
export const PHILIPPINES_BUSINESS_NAMES = [
  'Kalaw', 'Mabini', 'Taft', 'Espana', 'Aurora', 'Commonwealth', 'Katipunan', 'Maginhawa',
  'Magsaysay', 'Quezon', 'Roxas', 'Osmeña', 'Rizal', 'Bonifacio', 'Luna', 'Del Pilar',
  'Aguinaldo', 'Laurel', 'Garcia', 'Santos', 'Cruz', 'Reyes', 'Flores', 'Bautista'
];

// Government ID Patterns (for format reference only)
export const PHILIPPINES_ID_PATTERNS = {
  sss: '##-#######-#', // Social Security System
  tin: '###-###-###-###', // Tax Identification Number
  philhealth: '##-#########-#', // PhilHealth
  pagibig: '####-####-####', // Pag-IBIG
  voters: '####-####-####-####', // Voter's ID
  postal: '#### #### ####', // Postal ID
  nbi: '##-##-######', // NBI Clearance
  police: 'PC##-##-######', // Police Clearance
  passport: '####### or P######', // Philippine Passport
  drivers: '###-##-######' // Driver's License
};

export function getRandomPhilippineItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomByRegion(region, dataType) {
  const regionData = PHILIPPINES_BARANGAYS_BY_REGION[region];
  if (regionData && dataType === 'barangay') {
    return getRandomPhilippineItem(regionData);
  }
  return null;
}
