/**
 * Unified Country Configuration and Data
 * Follows Single Responsibility Principle (SRP) and DRY principles
 * Contains both basic config and enhanced data in a single, structured format
 */

// Utility function for random selection
export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Postal code generation function
export function generatePostalCode(country, state = null) {
  const patterns = {
    usa: () => String(Math.floor(Math.random() * 90000) + 10000),
    canada: () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const digits = '0123456789';
      return `${letters[Math.floor(Math.random() * letters.length)]}${digits[Math.floor(Math.random() * digits.length)]}${letters[Math.floor(Math.random() * letters.length)]} ${digits[Math.floor(Math.random() * digits.length)]}${letters[Math.floor(Math.random() * letters.length)]}${digits[Math.floor(Math.random() * digits.length)]}`;
    },
    uk: () => {
      const areas = ['SW', 'SE', 'E', 'W', 'WC', 'N', 'NW', 'M', 'B', 'L'];
      const area = getRandomItem(areas);
      const number = Math.floor(Math.random() * 99) + 1;
      const letters = 'ABDEFGHJLNPQRSTUWXYZ';
      const letter1 = letters[Math.floor(Math.random() * letters.length)];
      const letter2 = letters[Math.floor(Math.random() * letters.length)];
      return `${area}${number} ${number}${letter1}${letter2}`;
    },
    australia: () => {
      if (state && COUNTRIES_CONFIG.australia.enhancedData?.postcodeRanges?.[state]) {
        const range = COUNTRIES_CONFIG.australia.enhancedData.postcodeRanges[state];
        return String(Math.floor(Math.random() * (range[1] - range[0])) + range[0]);
      }
      return String(Math.floor(Math.random() * 9000) + 1000);
    },
    default: () => String(Math.floor(Math.random() * 90000) + 10000)
  };
  
  return (patterns[country] || patterns.default)();
}

export const COUNTRIES_CONFIG = {
  international: {
    value: 'international',
    label: '🌍 International',
    flag: '🌍',
    nationality: 'International',
    coordinates: {
      lat: { min: -90, max: 90 },
      lng: { min: -180, max: 180 }
    },
    phoneFormat: 'international'
  },

  philippines: {
    value: 'philippines',
    label: '🇵🇭 Philippines',
    flag: '🇵🇭',
    nationality: 'Filipino',
    coordinates: {
      lat: { min: 4.5, max: 21.0 },
      lng: { min: 116.0, max: 127.0 }
    },
    phoneFormat: '+63 ### ### ####',
    provinces: [
      'Metro Manila', 'Cebu', 'Davao', 'Iloilo', 'Cagayan de Oro', 'General Santos',
      'Bacolod', 'Tacloban', 'Iloilo', 'Zamboanga', 'Antipolo', 'Taguig', 'Pasig',
      'Quezon City', 'Manila', 'Caloocan', 'Las Piñas', 'Makati', 'Pasay', 'Parañaque',
      'Valenzuela', 'Marikina', 'Malabon', 'Navotas', 'San Juan', 'Mandaluyong', 'Muntinlupa'
    ],
    regions: [
      'National Capital Region (NCR)', 'Cordillera Administrative Region (CAR)', 
      'Ilocos Region (Region I)', 'Cagayan Valley (Region II)', 'Central Luzon (Region III)',
      'Calabarzon (Region IV-A)', 'Mimaropa (Region IV-B)', 'Bicol Region (Region V)',
      'Western Visayas (Region VI)', 'Central Visayas (Region VII)', 'Eastern Visayas (Region VIII)',
      'Zamboanga Peninsula (Region IX)', 'Northern Mindanao (Region X)', 'Davao Region (Region XI)',
      'Soccsksargen (Region XII)', 'Caraga (Region XIII)', 'Bangsamoro (BARMM)'
    ]
  },

  usa: {
    value: 'usa',
    label: '🇺🇸 United States',
    flag: '🇺🇸',
    nationality: 'American',
    coordinates: {
      lat: { min: 24.0, max: 49.0 },
      lng: { min: -125.0, max: -66.0 }
    },
    phoneFormat: '+1 (###) ###-####',
    enhancedData: {
      states: [
        { name: 'California', abbr: 'CA', cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose'] },
        { name: 'New York', abbr: 'NY', cities: ['New York City', 'Albany', 'Buffalo', 'Rochester', 'Syracuse'] },
        { name: 'Texas', abbr: 'TX', cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'] },
        { name: 'Florida', abbr: 'FL', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee'] },
        { name: 'Illinois', abbr: 'IL', cities: ['Chicago', 'Springfield', 'Rockford', 'Peoria', 'Elgin'] },
        { name: 'Pennsylvania', abbr: 'PA', cities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'] },
        { name: 'Ohio', abbr: 'OH', cities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'] },
        { name: 'Georgia', abbr: 'GA', cities: ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens'] }
      ],
      streetSuffixes: ['Street', 'Avenue', 'Boulevard', 'Drive', 'Lane', 'Road', 'Way', 'Court', 'Place'],
      phoneAreaCodes: ['212', '310', '415', 'Bethesdas713', '312', '305', '404', '617', '206', '602'],
      companies: ['Microsoft', 'Apple', 'Google', 'Amazon', 'Meta', 'Tesla', 'IBM', 'Oracle', 'Salesforce', 'Netflix'],
      maleNames: ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher'],
      femaleNames: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'],
      surnames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
    }
  },

  canada: {
    value: 'canada',
    label: '🇨🇦 Canada',
    flag: '🇨🇦',
    nationality: 'Canadian',
    coordinates: {
      lat: { min: 42.0, max: 83.0 },
      lng: { min: -141.0, max: -52.0 }
    },
    phoneFormat: '+1 (###) ###-####',
    enhancedData: {
      provinces: [
        { name: 'Ontario', abbr: 'ON', cities: ['Toronto', 'Ottawa', 'Hamilton', 'London', 'Kitchener'] },
        { name: 'Quebec', abbr: 'QC', cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil'] },
        { name: 'British Columbia', abbr: 'BC', cities: ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Richmond'] },
        { name: 'Alberta', abbr: 'AB', cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'Medicine Hat'] },
        { name: 'Manitoba', abbr: 'MB', cities: ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie'] },
        { name: 'Saskatchewan', abbr: 'SK', cities: ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current'] }
      ],
      phoneAreaCodes: ['416', '514', '604', '403', '204', '306', '902', '506'],
      companies: ['Shopify', 'Royal Bank of Canada', 'Canadian National Railway', 'Brookfield Asset Management', 'Rogers Communications'],
      maleNames: ['Liam', 'Noah', 'William', 'James', 'Oliver', 'Benjamin', 'Elijah', 'Lucas', 'Mason', 'Logan'],
      femaleNames: ['Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Charlotte', 'Mia', 'Amelia', 'Harper', 'Evelyn'],
      surnames: ['Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Wilson', 'MacDonald', 'Taylor', 'Johnson', 'Anderson']
    }
  },

  uk: {
    value: 'uk',
    label: '🇬🇧 United Kingdom',
    flag: '🇬🇧',
    nationality: 'British',
    coordinates: {
      lat: { min: 49.9, max: 58.7 },
      lng: { min: -8.0, max: 2.0 }
    },
    phoneFormat: '+44 #### ######',
    enhancedData: {
      countries: [
        { name: 'England', cities: ['London', 'Birmingham', 'Manchester', 'Leeds', 'Liverpool', 'Sheffield', 'Bristol', 'Newcastle'] },
        { name: 'Scotland', cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Stirling', 'Perth', 'Inverness'] },
        { name: 'Wales', cities: ['Cardiff', 'Swansea', 'Newport', 'Wrexham', 'Barry', 'Caerphilly', 'Rhondda'] },
        { name: 'Northern Ireland', cities: ['Belfast', 'Derry', 'Lisburn', 'Newtownabbey', 'Bangor', 'Craigavon'] }
      ],
      phoneAreaCodes: ['020', '0121', '0161', '0113', '0151', '0114', '0117', '0191'],
      companies: ['Tesco', 'BP', 'Royal Dutch Shell', 'HSBC', 'Vodafone', 'British Telecom', 'Unilever', 'AstraZeneca'],
      maleNames: ['Oliver', 'George', 'Harry', 'Jack', 'Jacob', 'Noah', 'Charlie', 'Muhammad', 'Thomas', 'Oscar'],
      femaleNames: ['Olivia', 'Amelia', 'Isla', 'Ava', 'Mia', 'Isabella', 'Sophia', 'Grace', 'Lily', 'Freya'],
      surnames: ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Robinson', 'Wright']
    }
  },

  australia: {
    value: 'australia',
    label: '🇦🇺 Australia',
    flag: '🇦🇺',
    nationality: 'Australian',
    coordinates: {
      lat: { min: -44.0, max: -10.0 },
      lng: { min: 113.0, max: 154.0 }
    },
    phoneFormat: '+61 # #### ####',
    enhancedData: {
      states: [
        { name: 'New South Wales', abbr: 'NSW', cities: ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast', 'Maitland'] },
        { name: 'Victoria', abbr: 'VIC', cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'Frankston'] },
        { name: 'Queensland', abbr: 'QLD', cities: ['Brisbane', 'Gold Coast', 'Townsville', 'Cairns', 'Toowoomba'] },
        { name: 'Western Australia', abbr: 'WA', cities: ['Perth', 'Fremantle', 'Bunbury', 'Geraldton', 'Kalgoorlie'] },
        { name: 'South Australia', abbr: 'SA', cities: ['Adelaide', 'Mount Gambier', 'Whyalla', 'Murray Bridge', 'Port Pirie'] },
        { name: 'Tasmania', abbr: 'TAS', cities: ['Hobart', 'Launceston', 'Devonport', 'Burnie', 'Somerset'] }
      ],
      phoneAreaCodes: ['02', '03', '07', '08'],
      postcodeRanges: { 'NSW': [1000, 2999], 'VIC': [3000, 3999], 'QLD': [4000, 4999], 'WA': [6000, 6999], 'SA': [5000, 5999], 'TAS': [7000, 7999] },
      companies: ['BHP', 'Commonwealth Bank', 'Westpac', 'ANZ', 'Woolworths', 'Wesfarmers', 'Telstra', 'Qantas'],
      maleNames: ['Oliver', 'William', 'Jack', 'Noah', 'Thomas', 'James', 'Lucas', 'Henry', 'Mason', 'Ethan'],
      femaleNames: ['Charlotte', 'Olivia', 'Amelia', 'Isla', 'Mia', 'Grace', 'Ava', 'Ella', 'Zoe', 'Sophie'],
      surnames: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Martin', 'Anderson']
    }
  },

  japan: {
    value: 'japan',
    label: '🇯🇵 Japan',
    flag: '🇯🇵',
    nationality: 'Japanese',
    coordinates: {
      lat: { min: 24.0, max: 46.0 },
      lng: { min: 123.0, max: 146.0 }
    },
    phoneFormat: '+81 ##-####-####',
    enhancedData: {
      prefectures: [
        { name: 'Tokyo', cities: ['Shibuya', 'Shinjuku', 'Harajuku', 'Ginza', 'Akihabara'] },
        { name: 'Osaka', cities: ['Osaka', 'Sakai', 'Higashiosaka', 'Hirakata', 'Toyonaka'] },
        { name: 'Kanagawa', cities: ['Yokohama', 'Kawasaki', 'Sagamihara', 'Fujisawa', 'Chigasaki'] },
        { name: 'Aichi', cities: ['Nagoya', 'Toyota', 'Okazaki', 'Ichinomiya', 'Kasugai'] },
        { name: 'Hokkaido', cities: ['Sapporo', 'Asahikawa', 'Hakodate', 'Kushiro', 'Tomakomai'] }
      ],
      phoneAreaCodes: ['03', '06', '045', '052', '011', '075', '092', '022'],
      companies: ['Toyota', 'Sony', 'Honda', 'Nintendo', 'SoftBank', 'Panasonic', 'Canon', 'Nissan'],
      surnames: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura'],
      maleNames: ['Hiroshi', 'Takeshi', 'Kazuo', 'Akira', 'Taro', 'Satoshi', 'Kenji', 'Yuki'],
      femaleNames: ['Yuki', 'Keiko', 'Akiko', 'Michiko', 'Hanako', 'Naoko', 'Sachiko', 'Hiroko']
    }
  },

  'south-korea': {
    value: 'south-korea',
    label: '🇰🇷 South Korea',
    flag: '🇰🇷',
    nationality: 'South Korean',
    coordinates: {
      lat: { min: 33.1, max: 38.6 },
      lng: { min: 125.0, max: 131.9 }
    },
    phoneFormat: '+82 ##-####-####',
    enhancedData: {
      provinces: [
        { name: 'Seoul', cities: ['Gangnam', 'Hongdae', 'Myeongdong', 'Itaewon', 'Jongno'] },
        { name: 'Busan', cities: ['Haeundae', 'Seomyeon', 'Nampo', 'Sasang', 'Suyeong'] },
        { name: 'Incheon', cities: ['Bupyeong', 'Namdong', 'Yeonsu', 'Seo', 'Jung'] },
        { name: 'Daegu', cities: ['Jung', 'Dong', 'Seo', 'Nam', 'Buk'] },
        { name: 'Daejeon', cities: ['Yuseong', 'Seo', 'Jung', 'Dong', 'Daedeok'] }
      ],
      phoneAreaCodes: ['02', '051', '032', '053', '042', '031', '033', '041'],
      companies: ['Samsung', 'LG', 'Hyundai', 'SK Group', 'POSCO', 'Lotte', 'Hanwha', 'Doosan'],
      surnames: ['Kim', 'Lee', 'Park', 'Choi', 'Jung', 'Kang', 'Cho', 'Yoon'],
      maleNames: ['Minho', 'Seungho', 'Jinho', 'Junho', 'Woosung', 'Hyunwoo', 'Donghyun', 'Kyungsoo'],
      femaleNames: ['Minseo', 'Soeun', 'Jiyoon', 'Seoyeon', 'Chaeyoung', 'Jiwon', 'Yuna', 'Eunji']
    }
  },

  singapore: {
    value: 'singapore',
    label: '🇸🇬 Singapore',
    flag: '🇸🇬',
    nationality: 'Singaporean',
    coordinates: {
      lat: { min: 1.2, max: 1.5 },
      lng: { min: 103.6, max: 104.0 }
    },
    phoneFormat: '+65 #### ####',
    enhancedData: {
      districts: [
        'Central Area', 'Orchard', 'Marina Bay', 'Chinatown', 'Little India', 'Kampong Glam',
        'Sentosa', 'Jurong', 'Tampines', 'Woodlands', 'Ang Mo Kio', 'Bishan', 'Clementi'
      ],
      phonePrefix: ['8', '9', '6'],
      companies: ['DBS Bank', 'OCBC Bank', 'Singapore Airlines', 'CapitaLand', 'Wilmar International', 'Genting Singapore'],
      ethnicGroups: {
        chinese: { surnames: ['Tan', 'Lim', 'Lee', 'Ng', 'Ong', 'Wong', 'Goh', 'Teo'], percentage: 74, maleNames: ['Wei Ming', 'Jun Hao', 'Kai Ming', 'Zhi Wei', 'Jia Jun'], femaleNames: ['Li Ying', 'Xin Yi', 'Hui Min', 'Jia Yi', 'Mei Lin'] },
        malay: { surnames: ['Ahmad', 'Rahman', 'Hassan', 'Ali', 'Ibrahim', 'Ismail', 'Omar', 'Abdullah'], percentage: 13, maleNames: ['Ahmad', 'Muhammad', 'Hafiz', 'Rizki', 'Faizal'], femaleNames: ['Siti', 'Nur', 'Aishah', 'Fatimah', 'Nadia'] },
        indian: { surnames: ['Singh', 'Kumar', 'Raj', 'Devi', 'Lal', 'Kaur', 'Sharma', 'Patel'], percentage: 9, maleNames: ['Arjun', 'Karthik', 'Ravi', 'Suresh', 'Dinesh'], femaleNames: ['Priya', 'Meera', 'Kavitha', 'Deepa', 'Shanti'] },
        others: { surnames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'], percentage: 4, maleNames: ['David', 'Michael', 'John', 'Andrew', 'Daniel'], femaleNames: ['Sarah', 'Michelle', 'Jessica', 'Amanda', 'Rachel'] }
      }
    }
  },

  thailand: {
    value: 'thailand',
    label: '🇹🇭 Thailand',
    flag: '🇹🇭',
    nationality: 'Thai',
    coordinates: {
      lat: { min: 5.6, max: 20.5 },
      lng: { min: 97.3, max: 105.6 }
    },
    phoneFormat: '+66 ## ### ####',
    enhancedData: {
      provinces: [
        { name: 'Bangkok', cities: ['Chatuchak', 'Watthana', 'Huai Khwang', 'Din Daeng', 'Ratchathewi'] },
        { name: 'Chiang Mai', cities: ['Mueang Chiang Mai', 'San Sai', 'San Kamphaeng', 'Hang Dong', 'Mae Rim'] },
        { name: 'Phuket', cities: ['Mueang Phuket', 'Kathu', 'Thalang'] },
        { name: 'Chonburi', cities: ['Pattaya', 'Chonburi', 'Bang Lamung', 'Si Racha', 'Sattahip'] }
      ],
      phoneAreaCodes: ['02', '053', '076', '038', '032', '044', '043', '042'],
      companies: ['CP Group', 'PTT', 'Siam Cement Group', 'Bangkok Bank', 'Kasikornbank', 'Advanced Info Service'],
      maleNames: ['Somchai', 'Somsak', 'Niran', 'Kamon', 'Wichai', 'Prasert', 'Surachai', 'Thana'],
      femaleNames: ['Siri', 'Malee', 'Pensri', 'Siriporn', 'Chanida', 'Pornthip', 'Kultida', 'Waranya'],
      surnames: ['Suksomboon', 'Jaidee', 'Sombat', 'Saengtong', 'Rojana', 'Thongsuk', 'Mahachai', 'Boonsong']
    }
  },

  vietnam: {
    value: 'vietnam',
    label: '🇻🇳 Vietnam',
    flag: '🇻🇳',
    nationality: 'Vietnamese',
    coordinates: {
      lat: { min: 8.6, max: 23.4 },
      lng: { min: 102.1, max: 109.5 }
    },
    phoneFormat: '+84 ### ### ####',
    enhancedData: {
      provinces: [
        { name: 'Ho Chi Minh City', cities: ['District 1', 'District 3', 'District 7', 'Binh Thanh', 'Thu Duc'] },
        { name: 'Hanoi', cities: ['Hoan Kiem', 'Ba Dinh', 'Dong Da', 'Hai Ba Trung', 'Cau Giay'] },
        { name: 'Da Nang', cities: ['Hai Chau', 'Thanh Khe', 'Son Tra', 'Ngu Hanh Son', 'Lien Chieu'] },
        { name: 'Can Tho', cities: ['Ninh Kieu', 'Binh Thuy', 'Cai Rang', 'O Mon', 'Thot Not'] }
      ],
      phoneAreaCodes: ['028', '024', '0236', '0292', '0254', '0274', '0232', '0239'],
      companies: ['Vingroup', 'Vietcombank', 'BIDV', 'Vietinbank', 'FPT Corporation', 'Techcombank'],
      maleNames: ['Nguyen', 'Hoang', 'Pham', 'Le', 'Vu', 'Dang', 'Bui', 'Do'],
      femaleNames: ['Linh', 'Huong', 'Anh', 'Hoa', 'Lan', 'Mai', 'Nga', 'Thuy'],
      surnames: ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Phan', 'Vu', 'Dang']
    }
  },

  malaysia: {
    value: 'malaysia',
    label: '🇲🇾 Malaysia',
    flag: '🇲🇾',
    nationality: 'Malaysian',
    coordinates: {
      lat: { min: 0.9, max: 7.4 },
      lng: { min: 99.6, max: 119.3 }
    },
    phoneFormat: '+60 ##-### ####',
    enhancedData: {
      states: [
        { name: 'Kuala Lumpur', cities: ['KLCC', 'Bukit Bintang', 'Chow Kit', 'Bangsar', 'Mont Kiara'] },
        { name: 'Selangor', cities: ['Shah Alam', 'Petaling Jaya', 'Subang Jaya', 'Klang', 'Kajang'] },
        { name: 'Penang', cities: ['George Town', 'Butterworth', 'Bukit Mertajam', 'Nibong Tebal', 'Permatang Pauh'] },
        { name: 'Johor', cities: ['Johor Bahru', 'Iskandar Puteri', 'Pasir Gudang', 'Skudai', 'Kulai'] }
      ],
      phoneAreaCodes: ['03', '04', '05', '06', '07', '09', '082', '083'],
      companies: ['Maybank', 'Public Bank', 'Genting', 'IOI Corporation', 'Sime Darby', 'CIMB Group'],
      ethnicGroups: {
        malay: { surnames: ['Abdullah', 'Ahmad', 'Ali', 'Hassan', 'Ibrahim', 'Ismail', 'Omar', 'Rahman'], percentage: 69, maleNames: ['Ahmad', 'Muhammad', 'Abdul', 'Mohd', 'Ali'], femaleNames: ['Siti', 'Nur', 'Aishah', 'Fatimah', 'Noraini'] },
        chinese: { surnames: ['Tan', 'Lim', 'Lee', 'Ng', 'Ong', 'Wong', 'Goh', 'Teo'], percentage: 23, maleNames: ['Wei Liang', 'Jun Wei', 'Kai Yang', 'Zhi Hao', 'Jian Ming'], femaleNames: ['Li Wen', 'Xin Yu', 'Hui Ling', 'Jia Ling', 'Mei Hui'] },
        indian: { surnames: ['Singh', 'Kumar', 'Raj', 'Devi', 'Lal', 'Kaur', 'Sharma', 'Patel'], percentage: 7, maleNames: ['Suresh', 'Ravi', 'Kumar', 'Raj', 'Vimal'], femaleNames: ['Priya', 'Kavitha', 'Shanti', 'Meera', 'Devi'] }
      }
    }
  },

  indonesia: {
    value: 'indonesia',
    label: '🇮🇩 Indonesia',
    flag: '🇮🇩',
    nationality: 'Indonesian',
    coordinates: {
      lat: { min: -11.0, max: 6.1 },
      lng: { min: 95.0, max: 141.0 }
    },
    phoneFormat: '+62 ###-####-####',
    enhancedData: {
      provinces: [
        { name: 'Jakarta', cities: ['Central Jakarta', 'West Jakarta', 'South Jakarta', 'East Jakarta', 'North Jakarta'] },
        { name: 'West Java', cities: ['Bandung', 'Bekasi', 'Depok', 'Bogor', 'Cimahi'] },
        { name: 'East Java', cities: ['Surabaya', 'Malang', 'Kediri', 'Blitar', 'Madiun'] },
        { name: 'Central Java', cities: ['Semarang', 'Solo', 'Yogyakarta', 'Pekalongan', 'Tegal'] }
      ],
      phoneAreaCodes: ['021', '022', '024', '031', '0274', '0341', '0361', '0511'],
      companies: ['Bank Central Asia', 'Bank Mandiri', 'Telkom Indonesia', 'Astra International', 'Bank Rakyat Indonesia'],
      maleNames: ['Budi', 'Andi', 'Agus', 'Bambang', 'Dedi', 'Eko', 'Hadi', 'Indra'],
      femaleNames: ['Sari', 'Dewi', 'Rina', 'Maya', 'Lestari', 'Indah', 'Fitri', 'Wati'],
      surnames: ['Santoso', 'Wijaya', 'Kusuma', 'Pratama', 'Sari', 'Putra', 'Utama', 'Jaya']
    }
  },

  // Standard countries without enhanced data
  germany: {
    value: 'germany',
    label: '🇩🇪 Germany',
    flag: '🇩🇪',
    nationality: 'German',
    coordinates: {
      lat: { min: 47.3, max: 55.1 },
      lng: { min: 5.9, max: 15.0 }
    },
    phoneFormat: '+49 ### #######'
  },

  france: {
    value: 'france',
    label: '🇫🇷 France',
    flag: '🇫🇷',
    nationality: 'French',
    coordinates: {
      lat: { min: 41.3, max: 51.1 },
      lng: { min: -5.1, max: 9.6 }
    },
    phoneFormat: '+33 # ## ## ## ##'
  },

  italy: {
    value: 'italy',
    label: '🇮🇹 Italy',
    flag: '🇮🇹',
    nationality: 'Italian',
    coordinates: {
      lat: { min: 35.5, max: 47.1 },
      lng: { min: 6.6, max: 18.5 }
    },
    phoneFormat: '+39 ### ### ####'
  },

  spain: {
    value: 'spain',
    label: '🇪🇸 Spain',
    flag: '🇪🇸',
    nationality: 'Spanish',
    coordinates: {
      lat: { min: 35.2, max: 43.8 },
      lng: { min: -9.3, max: 3.3 }
    },
    phoneFormat: '+34 ### ### ###'
  },

  brazil: {
    value: 'brazil',
    label: '🇧🇷 Brazil',
    flag: '🇧🇷',
    nationality: 'Brazilian',
    coordinates: {
      lat: { min: -33.7, max: 5.3 },
      lng: { min: -74.0, max: -28.8 }
    },
    phoneFormat: '+55 (##) #####-####'
  },

  mexico: {
    value: 'mexico',
    label: '🇲🇽 Mexico',
    flag: '🇲🇽',
    nationality: 'Mexican',
    coordinates: {
      lat: { min: 14.5, max: 32.7 },
      lng: { min: -118.4, max: -86.7 }
    },
    phoneFormat: '+52 (###) ###-####'
  },

  india: {
    value: 'india',
    label: '🇮🇳 India',
    flag: '🇮🇳',
    nationality: 'Indian',
    coordinates: {
      lat: { min: 6.0, max: 37.1 },
      lng: { min: 68.0, max: 97.4 }
    },
    phoneFormat: '+91 ##### #####'
  },
  china: {
    value: 'china',
    label: '🇨🇳 China',
    flag: '🇨🇳',
    nationality: 'Chinese',
    coordinates: {
      lat: { min: 18.2, max: 53.6 },
      lng: { min: 73.5, max: 135.1 }
    },
    phoneFormat: '+86 ### #### ####'
  }
};

// Helper functions for country data access
// === Philippines-specific data ===
// This data was moved from philippines.js for consolidation

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

// Philippines utility functions
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

// === End Philippines-specific data ===

export const getCountriesList = () => Object.values(COUNTRIES_CONFIG);
export const getCountryConfig = (countryCode) => COUNTRIES_CONFIG[countryCode];
export const getCountryNames = () => Object.keys(COUNTRIES_CONFIG);

// Check if country has enhanced data
export const hasEnhancedData = (countryCode) => {
  const config = COUNTRIES_CONFIG[countryCode];
  return config && config.enhancedData !== undefined;
};

// Get enhanced data for a country
export const getEnhancedData = (countryCode) => {
  const config = COUNTRIES_CONFIG[countryCode];
  return config?.enhancedData || null;
};
