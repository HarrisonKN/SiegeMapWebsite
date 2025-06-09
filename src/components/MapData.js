const mapsData = [
  { id: 1, 
    name: 'Lair',
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/423IqxUqD6yfPEy6CissY0/b97de350094cd300c911ec53915d0c9a/r6s-maps-lair.jpg',
    floors: [
      {name: 'Labs/Support', image: '/images/Sites/Lair-BLab-BSupport.jpg'},
      {name: 'Armory/Maintenance', image: '/images/Sites/Lair-1FArmory-1FMaintenance.jpg'},
      {name: 'Bunks/Briefing', image: 'images/Sites/Lair-1FBunks-1FBriefing.jpg'},
      {name: 'Master/R6', image: 'images/Sites/Lair-2FMaster-2FR6Room.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5NiPXavipZgr5lAQ1RrMu2/b9e0778fe50f6f8c6af1644432c87ede/r6-maps-lair-blueprint-4.jpg'},

    ]},
  
  { id: 2,
    name: 'Labs',
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/57i2PyuzpgVFzOvLUSAItO/636e57b198377a5a5d1d35492b52b808/Nighthaven_labs_screen.jpg',
    floors: [
      {name: 'Tank/Assembly', image: '/images/Sites/Labs-BTank-BAssembly.jpg'},
      {name: 'Control/Storage', image: '/images/Sites/Labs-1FControl-1FStorage.jpg'},
      {name: 'Kitchen/Cafe', image: '/images/Sites/Labs-1FKitchen-1FCafe.jpg'},
      {name: 'CC/Servers', image: '/images/Sites/Labs-2FCC-2FServers.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6pVV3IwBrEkwtzyoeD1C5K/51da4b9380bdbff1b2d9e0eafac2e981/r6-maps-nighthavenlabs-blueprint-4.jpg'},
      
    ]},
  
  { id: 3,
    name: 'Plains',
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1IGW5GG24TGEv3q8bRc9aJ/a73e0dc1fd385b4afd32cd3a2592a294/r6s_maps_emeraldplains__1_.jpg',
    floors: [
      {name: 'Bar/Lounge', image: '/images/Sites/Plains-1FBar-1FLounge.jpg'},
      {name: 'Dining/Kitchen', image: '/images/Sites/Plains-1FDining-1FKitchen.jpg'},
      {name: 'Admin/CEO', image: '/images/Sites/Plains-2FAdmin-2FCEO.jpg'},
      {name: 'Gallery/Meeting', image: '/images/Sites/Plains-2FGallery-2FMeeting.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5gCmYTC5VTYuGG4T499nQ9/cb239179bcc029ea961a0f9d1d125fa4/r6-maps-emeraldplains-blueprint-3.jpg'},
    ]},
  
  { id: 4,
    name: 'Bank' , 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6ilgtuzucX7hEu2MvjhRtp/0bb6e106d78625ea218a572fbb7a5157/r6-maps-bank.jpg',
    floors: [
      {name: 'Lockers/CCTV', image: '/images/Sites/Bank-BLockers-BCCTV.jpg'},
      {name: 'Staff/Open', image: '/images/Sites/Bank-1FStaff-1FOpen.jpg'},
      {name: 'Tellers/Archives', image: '/images/Sites/Bank-1FTellers-1FArchives.jpg'},
      {name: 'Exec/CEO', image: '/images/Sites/Bank-2FExec-2FCEO.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3iRfs8bs7ZDzQLiXtWH5sk/faffda675d754e148bb0ab2c249239ae/r6-maps-bank-blueprint-4.jpg'}
    ]},
  
  { id: 5,
    name: 'Border' , 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4hqsrL3cokFqedkfjiEaGf/c73f6714b535263a18e4de2ca2405dd1/r6-maps-border__1_.jpg',
    floors: [
      {name: 'Bath/Tellers', image: '/images/Sites/Border-1FBath-1FTellers.jpg'},
      {name: 'Customs/Supply', image: '/images/Sites/Border-1FCustoms-1FSupply.jpg'},
      {name: 'Ventilation/Workshop', image: '/images/Sites/Border-1FVentil-1FWorkshop.jpg'},
      {name: 'Armory/Archives', image: '/images/Sites/Border-2FArmory-2FArchives.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7KjYpqMzBlBDHY1Vbwtz55/d87fe5e00d1623434a9499d485d6d196/r6-maps-border-blueprint-3.jpg'}
    ]}, 

  { id: 6,
    name: 'Chalet',
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Km3ZJUM7ZMVbGsi6gad5Y/be2827fa6fbe0577001229effb914a27/rainbow6_maps_chalet_thumbnail.jpg',
    floors: [
      {name: 'Cellar/Garage', image: '/images/Sites/Chalet-BCellar-BGarage.jpg'},
      {name: 'Bar/Dining', image: '/images/Sites/Chalet-1FBar-1FDining.jpg'},
      {name: 'Kitchen/Dining', image: '/images/Sites/Chalet-1FKitchen-1FDining.jpg'},
      {name: 'Master/Office', image: '/images/Sites/Chalet-2FMaster-2FOffice.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6zyfk9G5oTn9iGjKmKqzEc/2fe9ed710db46bac51213373df14e4db/r6-maps-chalet-blueprint-4.jpg'},
    ]},
    
  { id: 7,
    name: 'Clubhouse', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1vCw5eD2XzxZlv6Au1gtui/baeebaa75cd672e0af8f9f624cf61bde/r6-maps-clubhouse.jpg',
    floors: [
      {name: 'Church/Arsenal', image: '/images/Sites/Clubhouse-BChurch-BArsenal.jpg'},
      {name: 'Bar/Stage', image: '/images/Sites/Clubhouse-1FBar-1FStage.jpg'},
      {name: 'Bedroom/Gym', image: '/images/Sites/Clubhouse-2FBedroom-2FGym.jpg'},
      {name: 'Cash/CCTV', image: '/images/Sites/Clubhouse-2FCash-2FCCTV.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5tP8wrsOiDBfa7NzkUUCQQ/b5e27ccd5b145ce59f8886b004e32c8e/r6-maps-clubhouse-blueprint-4.jpg'}
    ]},

  { id: 8,
    name: 'Coastline', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5GfAQ3pXCJnDqiqaDH3Zic/db1722cd699bb864ee8f7b0db951b0c3/r6-maps-coastline.jpg',
    floors: [
      {name: 'Blue/Sunrise', image: '/images/Sites/Coastline-1FBlue-1FSunrise.jpg'},
      {name: 'Kitchen/Service', image: '/images/Sites/Coastline-1FKitchen-1FService.jpg'},
      {name: 'Billiards/Hookah', image: '/images/Sites/Coastline-2FBilliards-2FHookah.jpg'},
      {name: 'Theather/Penthouse', image: '/images/Sites/Coastline-2FTheater-2FPenthouse.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2F2dvGQqZQk0AzfTN4VbT5/7fbb95687a759f3bd9e0ece51d667e8e/r6-maps-coastline-blueprint-3.jpg'}
    ]},

  { id: 9,
    name: 'Consulate', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6PR2sBla9E6TNurVUfJ0mc/9a58f08dca1c465787e5a1b6cf6a136b/CONSULATE_REWORK_PREVIEW_03_960x540.jpg',
    floors: [
      {name: 'Cafe/Garage', image: '/images/Sites/Consulate-BCafe-BGarage.jpg'},
      {name: 'Servers/Tellers' , image: '/images/Sites/Consulate-BServers-1FTellers.jpg'},
      {name: 'Expos/Piano', image: '/images/Sites/Consulate-1FExpos-1FPiano.jpg'},
      {name: 'Consul/Meeting', image: '/images/Sites/Consulate-2FConsul-2FMeeting.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7fTsFMVeL4crvNABSGRMxJ/680ea0834826726ef5901a5d200f9c6a/r6-maps-consulate-blueprint-4.jpg'}
    ]},
  
  { id: 10, 
    name: 'Kafe Dostoyevsky', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2nIuPSHvbM57TK90VSwBEm/70144ada56cf1ba72103aeb4ece9ed1a/r6-maps-kafe.jpg',
    floors: [
      {name: 'Cooking/Service', image: '/images/Sites/Kafe-1FCooking-1FService.jpg'},
      {name: 'Fireplace/Mining', image: '/images/Sites/Kafe-2FFireplace-2FMining.jpg'},
      {name: 'Fireplace/Reading', image: '/images/Sites/Kafe-2FFireplace-2FReading.jpg'},
      {name: 'Cocktail/Bar', image: '/images/Sites/Kafe-3FCocktail-3FBar.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3DdjeKrUij0wzjVlF4FML3/6d74c067b57490ccdc7dc7b180618811/r6-maps-kafe-blueprint-4.jpg'}
    ]},

  { id: 11,
    name: 'Kanal',
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4VHR8uZRGkHqvtZxtmibtc/da988c2cab37f1cb186535fc9ba40bea/r6-maps-kanal.jpg',
    floors: [
      {name: 'Supply/Kayaks', image: '/images/Sites/Kanal-BSupply-BKayaks.jpg'},
      {name: 'Coast/Lounge', image: '/images/Sites/Kanal-1FCoast-1FLounge.jpg'},
      {name: 'Map/Security', image: '/images/Sites/Kanal-1FMap-1FSecurity.jpg'},
      {name: 'Radar/Servers', image: '/images/Sites/Kanal-2FRadar-2FServer.jpg'},
      {name: 'Roof', image: ''}
    ]},
  
  { id: 12, 
    name: 'Oregon', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Z9a0gU7iR0vfcbXtoJUOW/42ad6aabbd189fbcd74c497627f1624e/r6-maps-oregon.jpg',
    floors: [
      {name: 'Laundry/Supply', image: '/images/Sites/Oregon-BLaundry-BSupply.jpg'},
      {name: 'Kitchen/Dining', image: '/images/Sites/Oregon-1FKitchen-1FDining.jpg'},
      {name: 'Meeting/Kitchen', image: '/images/Sites/Oregon-1FMeeting-1FKitchen.jpg'},
      {name: 'Kids/Dorms', image: '/images/Sites/Oregon-2FKids-2FDorms.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4eUlLOqpfR70gM7miuIIuT/082b5df86be7b17b2931b4c4e6fbe0bb/r6-maps-oregon-blueprint-5.jpg'}
    ]},

  { id: 13,
    name: 'Outback',
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1vqGVW6pqBZlLKp4h86NnB/08a7e337c0cfa604cde79e755fedb397/r6-maps-outback.jpg',
    floors: [
      {name: 'Green/Red', image: 'images/Sites/Outback-1FGreen-1FRed.jpg'},
      {name: 'Mechanic/Kitchen', image: 'images/Sites/Outback-1FMechanic-1FKitchen.jpg'},
      {name: 'Laundry/Piano', image: 'images/Sites/Outback-2FLaundry-2FPiano.jpg'},
      {name: 'Party/Office', image: 'images/Sites/Outback-2FParty-2FOffice.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3gAUdgvuYfrVPahwetBbGZ/661ee97059469bfcfd46b2c6c6aefc29/r6-maps-outback-blueprint-3.jpg'},
    ]},
  
  { id: 13, 
    name: 'Skyscraper', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7vblsbhmSPLsI3pQJ5Dqx9/f213af09981f5c8ec9b71fb0c3f9dcdd/r6-maps-skyscraper.jpg',
    floors: [
      {name: 'Bathroom/Bedroom', image:'/images/Sites/Skyscraper-1FBathroom-1FBedroom.jpg'},
      {name: 'BBQ/Kitchen', image: '/images/Sites/Skyscraper-1FBBQ-1FKitchen.jpg'},
      {name: 'Exhibition/Office', image: '/images/Sites/Skyscraper-2FExhibition-2FOffice.jpg'},
      {name: 'Karaoke/Tea', image: '/images/Sites/Skyscraper-2FKaraoke-2FTea.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6gdx6cZMOzGaVLn5T4tSzv/7099853a4831478ba36d1444fb358c8a/r6-maps-skyscraper-blueprint-3.jpg'}
    ]},
  
  { id: 14,
    name: 'Theme Park',
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2immPCOZj6tTHMM9zeBg5B/e88428d55e970fd080e14489fbffeb06/rainbow6_maps_theme-park_thumbnail.jpg',
    floors: [
      {name: 'Armory/Throne', image:'/images/Sites/Theme-1FArmory-1FThrone.jpg'},
      {name: 'Lab/Storage: ', image: '/images/Sites/Theme-1FLab-1FStorage.jpg'},
      {name: 'Bunk/DayCare', image: '/images/Sites/Theme-2FBunk-2FDaycare.jpg'},
      {name: 'Initiation/Office', image: '/images/Sites/Theme-2FInitiation-2FOffice.jpg'},

      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4LsnAuElC7lVo8H3HYXvSr/a326abb326eb1b64edb7a957001a625d/r6-maps-themepark-blueprint-4.jpg'},
    ]},

  { id: 15, 
    name: 'Villa', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Io6dxNeHbCbJoF9WLJf9s/ebf89b009affba37df84dcf1934c74e0/r6-maps-villa.jpg',
    floors: [
      {name: 'Dining/Kitchen', image: '/images/Sites/Villa-1FDining-1FKitchen.jpg'},
      {name: 'Living/Library', image: '/images/Sites/Villa-1FLiving-1FLibrary.jpg'},
      {name: 'Games/Aviator', image: '/images/Sites/Villa-2FGames-2FAviator.jpg'},
      {name: 'Statuary/Trophy', image: '/images/Sites/Villa-2FStatuary-2FTrophy.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2ZnV8AUq0FtZ8T3XxaYGwK/038468ed870ffc0075f6ade04808d7d2/r6-maps-villa-blueprint-5.jpg'},
    ]},
];

export default mapsData;