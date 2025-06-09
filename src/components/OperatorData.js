const OperatorData = [
  {
    name: 'Rauora',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/T2BrSyMgBBSjM7rs8T53b/0f8d6842d4440fc06d450789c273381b/r6s-operators-badge-rauora.png',
    uniqueAbility: { name: 'D.O.M. Panel Launcher', quantity: 1 },
    secondaryGadgets: [
      { name: 'Smoke Grenade', quantity: 2 },
      { name: 'Breach Charge', quantity: 2 }
    ]
  },
  {
    name: 'Skopós',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/k0AOat3ISkt7WMR6X4dJg/aa4596095d3861f7de24e007730e3f89/r6s-operators-badge-skopos.png',
    uniqueAbility: { name: 'V10 Pantheon Shells', quantity: 1 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Proximity Alarm', quantity: 3 }
    ]
  },
  {
    name: 'Sentry',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3RhB8rT969t71r0b3iiiQo/3bf85d17ade85b4e5943712b664b6166/r6s-operators-badge-sentry.png',
    uniqueAbility: { name: 'Gadget Kit', quantity: 1 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Bulletproof Camera', quantity: 1 },
      { name: 'Deployable Shield', quantity: 1 },
      { name: 'Observation Blocker', quantity: 3 },
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Proximity Alarm', quantity: 3 },
      { name: 'Nitro Cell', quantity: 2 }
    ]
  },
  {
    name: 'Striker',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2ZC6qMkmnam9bLc1fZJJ0C/fd0719a5b03789e65aa7f41e7c2dc49c/r6s-operators-badge-striker.png',
    uniqueAbility: { name: 'Gadget Kit', quantity: 1 },
    secondaryGadgets: [
      { name: 'Breach Charge', quantity: 2},
      { name: 'Claymore', quantity: 2 },
      { name: 'Frag Grenade', quantity: 2 },
      { name: 'Hard Breach Charge', quantity: 2 },
      { name: 'Smoke Grenade', quantity: 2 },
      { name: 'Stun Grenade', quantity: 2 },
      { name: 'Impact EMP Grenade', quantity: 2 }
    ]
  },
  {
    name: 'Deimos',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/18uYWtYnEjmMQBTTdkIfWF/ba8c07729ff3c6de5872ffbcdc7956fb/r6s-operators-badge-deimos.png',
    uniqueAbility: { name: 'Deathmark Tracker', quantity: 1 },
    secondaryGadgets: [
      { name: 'Frag Grenade', quantity: 2 },
      { name: 'Hard Breach Charge', quantity: 2 }
    ]
  },
  {
    name: 'Tubarão',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/43VtYmfmTtLwwKDGhalSCO/9673bb50e981ba2684cd649534f00de7/r6s-operators-badge-tubarao.png',
    uniqueAbility: { name: 'Zoto Canister', quantity: 3 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Ram',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3YQiStwC1Qo4wKWmgK6XCH/ac8a0fea30f2996f96ca31b17a0039fa/r6s-operators-badge-ram.png',
    uniqueAbility: { name: 'BU-GI Auto Breacher', quantity: 2 },
    secondaryGadgets: [
      { name: 'Smoke Grenade', quantity: 2 },
      { name: 'Stun Grenade', quantity: 2 }
    ]
  },
  {
    name: 'Fenrir',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4vtvBhY56S2slW3y0eKsMp/6a0f41807549ad1aa503112d4ad05a52/r6s-operators-badge-fenrir.png',
    uniqueAbility: { name: 'F-NATT Dread Mine', quantity: 5 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Bulletproof Camera', quantity: 1 }
    ]
  },
  {
    name: 'Brava',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1JTzualMKZVGfdROg4XKh8/7989454e62b7972bfd88f09097cc148f/r6s-operators-badge-brava.png',
    uniqueAbility: { name: 'Kludge Drone', quantity: 2 },
    secondaryGadgets: [
      { name: 'Smoke Grenade', quantity: 2 },
      { name: 'Claymore', quantity: 2 }
    ]
  },
  {
    name: 'Solis',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6YOBUP5JMskklFx9nDJQ49/d9d4b0968f581597feaa0ef4ec0891f3/r6s-operators-badge-solis.png',
    uniqueAbility: { name: 'SPEC-IO Electro-Sensor', quantity: 'Unlimited' },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Bulletproof Camera', quantity: 1 }
    ]
  },
  {
    name: 'Grim',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5VoAYPvRZXIwjcwTD3PWaZ/b9748f007c0c116ca1bcd77b0f91e766/r6s-operators-badge-grim.png',
    uniqueAbility: { name: 'Kawan Hive Launcher', quantity: 3 },
    secondaryGadgets: [
      { name: 'Claymore', quantity: 2 },
      { name: 'Hard Breach Charge', quantity: 2 },
      { name: 'Impact EMP Grenade', quantity: 2 },
    ]
  },
  {
    name: 'Sens',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7pqZFaPgQwaLi1pFKuAv7e/d3d9af214737fe6a069e5346c50bfd20/r6s-operators-badge-sens.png',
    uniqueAbility: { name: 'R.O.U. Projector System', quantity: 0 },
    secondaryGadgets: [
      { name: 'Claymore', quantity: 2 },
      { name: 'Frag Grenade', quantity: 2 },
      { name: 'Hard Breach Charge', quantity: 2 }
    ]
  },
  {
    name: 'Azami',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7KWTXHTk8rxLS5qtyX4Xu4/b51f8691b932fd2b83260ef3fbcd1154/r6s-operators-badge-azami.png',
    uniqueAbility: { name: 'Kiba Barrier', quantity: 5 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Barbed Wire', quantity: 2 }
    ]
  },
  {
    name: 'Thorn',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1pzBJsbL1vQT8is7B0Xjxz/440335c080e54ca28eba24858361a03a/r6s-operators-badge-thorn.png',
    uniqueAbility: { name: 'Razorbloom Shell', quantity: 3 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Osa',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5tt27EFHYjiDLo2qbYEgXG/2f1acbb8209e45b136ca7b0e2e5eb1f9/r6s-operators-badge-osa.png',
    uniqueAbility: { name: 'Talon-8 Clear Shield', quantity: 1 },
    secondaryGadgets: [
      { name: 'Claymore', quantity: 2 },
      { name: 'Frag Grenade', quantity: 2 },
      { name: 'Impact EMP Grenade', quantity: 2}
    ]
  },
  {
    name: 'Thunderbird',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/YQfDJ42B2IKcKnb0lRaXq/0cedb53c439b0fe448be95713a836b29/r6s-operators-badge-thunderbird.png',
    uniqueAbility: { name: 'Kona Station', quantity: 3 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'C4', quantity: 1 }
    ]
  },
  {
    name: 'Flores',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/75vqJXXKCM2EDO0iiNqRDe/d6289dc9a4fed72ef72b9c1e11738456/Y6S1_BADGE_Flores_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Aruni',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5rOLCYQOh5HH0Nv6NHe38H/29681f901ff71ae5decb5ccb1b9f8a29/Y5S4_BADGE_Aruni_L.png',
    uniqueAbility: { name: 'Surya Gate', quantity: 3 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Bulletproof Camera', quantity: 1 }
    ]
  },
  {
    name: 'Zero',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4ZbzOZt1Sur77RZTFwYVJ4/30037e84b2948449652547f06df146e0/Y5S3_BADGE_Zero_L.png',
    uniqueAbility: { name: 'Argus Launcher', quantity: 3 },
    secondaryGadgets: [
      { name: 'Hard Breach Charge', quantity: 2 },
      { name: 'Claymore', quantity: 2 }
    ]
  },
  {
    name: 'Ace',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/dgG7GmXY1HgfeEE2gI1H9/06bd3917c8fc19f61654490019ef25fb/Y5S2_BADGE_Ace_L.png',
    uniqueAbility: { name: 'S.E.L.M.A. Aqua Breacher', quantity: 3 },
    secondaryGadgets: [
      { name: 'Breach Charge', quantity: 2},
      { name: 'Claymore', quantity: 2 }
    ]
  },
  {
    name: 'Melusi',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/74H52a9GMql8wamIy6WqH5/9fddba49258152835da7cdac8c566663/Y5S2_BADGE_Melusi_L.png',
    uniqueAbility: { name: 'Banshee Sonic Defense', quantity: 3 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Oryx',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7mLA8GY9ZKlUfDXrfo9Nek/e3dfd0759414f36866a8c80b61a67722/Y5S1_BADGE_Oryx_L.png',
    uniqueAbility: { name: 'Remah Dash', quantity: 'Unlimited' },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Bulletproof Camera', quantity: 1 }
    ]
  },
  {
    name: 'Iana',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6deSi1vse5iJTkErFksrGq/75bf1038e9698b6b2be75aa0493b092d/Y5S1_BADGE_Iana_L.png',
    uniqueAbility: { name: 'Gemini Projector', quantity: 0 },
    secondaryGadgets: [
      { name: 'Impact EMP Grenade', quantity: 2 },
      { name: 'Smoke Grenade', quantity: 2 }
    ]
  },
  {
    name: 'Wamai',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1vQZ4WsAjhc6M7qNOS4ahQ/92fc4d89632fb87aec0f102d7adbfe26/Y4S4_BADGE_Wamai_L.png',
    uniqueAbility: { name: 'Mag-NET System', quantity: 5 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Kali',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6r1hk1EunQirF1IcY4TG8T/0d3fbb7508a7747fd51249b1b8ea9779/Y4S4_BADGE_Kali_L.png',
    uniqueAbility: { name: 'LV Explosive Lance', quantity: 2 },
    secondaryGadgets: [
      { name: 'Breach Charge', quantity: 2 },
      { name: 'Claymore', quantity: 2 },
      { name: 'Smoke Grenade', quantity: 2 }
    ]
  },
  {
    name: 'Amaru',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2K1uxROLvHGxOIOMpNRFeU/7b4afc5ded3d1b9a937d1b504b5d4d0d/Y4S3_BADGE_Amaru_L.png',
    uniqueAbility: { name: 'Garra Hook', quantity: 1 },
    secondaryGadgets: [
      { name: 'Stun Grenade ', quantity: 2 },
      { name: 'Hard Breach Grenade', quantity: 2 }
    ]
  },
  {
    name: 'Goyo',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6AAY4FZt5piHdabOdDokE4/f7f8bd90c20b8a429c78a08684b75aca/Y4S3_BADGE_Goyo_L.png',
    uniqueAbility: { name: 'Volcán Shield', quantity: 2 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'C4', quantity: 1 }
    ]
  },
  {
    name: 'NØKK',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2qfSHHTdCRVhx9EWycVDNr/9e361e73fb91e571f7470de21edf5c7a/Y4S2_BADGE_Nokk_L.png',
    uniqueAbility: { name: 'HEL Presence Reduction', quantity: 1},
    secondaryGadgets: [
      { name: 'Hard Breach Charge', quantity: 2 },
      { name: 'Frag Grenade', quantity: 2 },
      { name: 'Impact EMP Grenade', quantity: 2 }
    ]
  },
  {
    name: 'Warden',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/hx1Ljf1qIWbjpgCNmfJbu/2217283b569ef316dc12b93e86649f8f/Y4S2_BADGE_Warden_L.png',
    uniqueAbility: { name: 'Glance Smart Glasses', quantity: 'Unlimited' },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Mozzie',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/15hUu2PsypX2c1LIJFQNUT/8538c52057420dbf3995cf3117b155c5/Y4S1_BADGE_Mozzie_L.png',
    uniqueAbility: { name: 'Pest Launcher', quantity: 3 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'C4', quantity: 1 }
    ]
  },
  {
    name: 'Gridlock',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5LIyheUROsdMDkX6o0zh6R/f201ce65af771459c374ef71c89827b4/Y4S1_BADGE_Gridlock_LL.png',
    uniqueAbility: { name: 'Trax Stingers', quantity: 2 },
    secondaryGadgets: [
      { name: 'Smoke Grenade', quantity: 2 },
      { name: 'Frag Grenade', quantity: 2 },
      { name: 'Impact EMP Grenade', quantity: 2 }
    ]
  },
  {
    name: 'Nomad',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/UxfU1gJDoZGDrzT3iBsIp/b1aa522cc08e4631b9a857b52afa4f99/Y3S4_BADGE_Nomad_L.png',
    uniqueAbility: { name: 'AirJab Launcher', quantity: 3 },
    secondaryGadgets: [
      { name: 'Breach Charge', quantity: 2 },
      { name: 'Stun Grenade', quantity: 2 }
    ]
  },
  {
    name: 'Kaid',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5Qblb1ZqAqkN3Wa0Qw5qBq/05630c80672105a1195282d276e8eb05/Y3S4_BADGE_L.png',
    uniqueAbility: { name: 'Electroclaw', quantity: 2 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Impact Grenade', quantity: 2 }
    ]
  },
  {
    name: 'Clash',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7G4lGl5HPLFTTUdcZW8UOK/3901b44cf2a9423486ffd78531e42f87/Y3S3_BADGE_Clash_L.png',
    uniqueAbility: { name: 'CCE Shield', quantity: 'Unlimited' },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Impact Grenade', quantity: 2 }
    ]
  },
  {
    name: 'Maverick',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3DXiYgVT71qGscYmFMgayj/d6c40a7dabdfecb92b637bec83003a58/Y3S3_BADGE_Maverick_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Maestro',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/XK43imgD0tc0xrk0tgTCQ/0402cc95cbd525debafa1aab0fdd8385/Y3S2_BADGE_Maestro_L.png',
    uniqueAbility: { name: 'Evil Eye', quantity: 2 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Alibi',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3DgGV3hETnXiEvVFOYZrbm/55a6be47761b5cf2c7ff8aaa7991cc7f/Y3S2_BADGE_Alibi_L.png',
    uniqueAbility: { name: 'Prisma', quantity: 3 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Lion',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3gfdjXFezusaerCakMpfQ2/4565b28edd241b7fd3b0eba9c97d54f2/Y3S1_BADGE_Lion_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Finka',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6CzQHWePD3Mi8HE5bdx5ic/2a6b5a6cc653ebf99d062725368eae2a/Y3S1_BADGE_Finka_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Vigil',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/56A3hXhWZdwO623g3ejeku/a40a0582a7841abfeed723d8fbe238d3/Y2S4_BADGE_Vigil_L.png',
    uniqueAbility: { name: 'ERC-7', quantity: 'Unlimited' },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Bulletproof Camera', quantity: 1 }
    ]
  },
  {
    name: 'Dokkaebi',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/aoQeHLohcuqvubBoyrzsM/d4a230ecba495c58c5521e10d5d84baa/Y2S4_BADGE_Dokkaebi_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Zofia',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1k09nbCCu2avlIWpK3cJz9/35d60746d67750230f2a020a7be78795/Y2S3_BADGE_Zofia_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Ela',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7zbkJJWMCOj04DNhYDz994/d2cba213d30d7b8cf2ba8cd568c78f20/Y2S3_BADGE_Ela_L.png',
    uniqueAbility: { name: 'Grzmot Mine', quantity: 3 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Ying',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6ZVB1OJxNgs0pR0Fd7Kzt0/74721fe9fd743167508f98dc280a17a3/Y2S2_BADGE_Ying_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Lesion',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2CWYSySnPAhsOHdq2OLSjv/f9e54debcfa0c8fe76012d9097b98e6e/Y2S2_BADGE_Lesion_L.png',
    uniqueAbility: { name: 'Gu Mines', quantity: 8 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Bulletproof Camera', quantity: 1 }
    ]
  },
  {
    name: 'Mira',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/u1KR6aogjLncAtaVOciTc/ba730583f9c20cad6d3ca996d366a707/Y2S1_BADGE_Mira_L.png',
    uniqueAbility: { name: 'Black Mirror', quantity: 2 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'C4', quantity: 1 }
    ]
  },
  {
    name: 'Jackal',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/28k7LKWK70lxib7CimPJaZ/f34b2065811df8f0339838922f8c94b1/Y2S1_BADGE_Jackal_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Hibana',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1TSA4pMR58vgfrEai69REl/f82b1eba6694b4aa77259d3d0fe8cc08/Y1S4_BADGE_Hibana_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Echo',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3MRqAdUybJ7GR9gX4wPAI4/992938a70a4e53b91478358634e77ca7/Y1S4_BADGE_Echo_L.png',
    uniqueAbility: { name: 'Yokai Drone', quantity: 2 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Caveira',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4H1dOkcdZIKblKkAWjD390/10e57f4829eabda30f4aa1044e49893d/Y1S3_BADGE_Caveira_L.png',
    uniqueAbility: { name: 'Silent Step', quantity: 'Unlimited' },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Bulletproof Camera', quantity: 1 }
    ]
  },
  {
    name: 'Capitão',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/73R4IrWJyn0xdkJ0fjOODA/fc70d200a7530dccae2847ab7962e394/Y1S3_BADGE_Capitao_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Blackbeard',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4BTbmcs1EtoUbnpk5Am22Y/b7bd4d0708245c78b98455505c0d51a8/Y1S2_BADGE_Blackbeard_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Valkyrie',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/44qXJmZmAwaD4w44JnPuOx/c54c8b9d3a6813ab8ce3e3f1dd4ef408/Y1S2_BADGE_Valkyrie_L.png',
    uniqueAbility: { name: 'Black Eye', quantity: 3 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'C4', quantity: 1 }
    ]
  },
  {
    name: 'Buck',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2oZZBEZzVLFpRY7Mp85MWq/f62287872dd61b4e0697a93d703b2beb/Y1S1_BADGE_Buck_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Frost',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1OWFtfiEXleLSENciCSQQR/8fcced59c0125073e506f2dee0201015/Y1S1_BADGE_Frost_L.png',
    uniqueAbility: { name: 'Welcome Mat', quantity: 3 },
    secondaryGadgets: [
      { name: 'Bulletproof Camera', quantity: 1 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Mute',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3exeHnxH1tmUmQTequWRKa/e1b6c6f057eb24722dd7860af0276316/Y0R6_BADGE_Mute_L.png',
    uniqueAbility: { name: 'Signal Disruptor', quantity: 4 },
    secondaryGadgets: [
      { name: 'Bulletproof Camera', quantity: 1 },
      { name: 'C4', quantity: 1 }
    ]
  },
  {
    name: 'Sledge',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4lgK1mOTVAoBhoj5qjYuyd/83c83d56e977f96ac0e9621c0d1c07d2/Y0R6_BADGE_Sledge_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Smoke',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6mOMxoc3t27R9Gr9wFtt6T/f5f90a6be6a6710bee686ce69df29906/Y0R6_BADGE_Smoke_L.png',
    uniqueAbility: { name: 'Remote Gas Grenade', quantity: 3 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Thatcher',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5NbqTdEPmYy9qOZmN9StVT/f75b0f2610a37f9e5bdcb8ba9d551a38/Y0R6_BADGE_Thatcher_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Ash',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/58Y4Q2x7msL8uQUoiA7LGM/b204acc9c5a015029140723ef2e435bb/Y0R6_BADGE_Ash_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Castle',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/kzznLctjOsXJZAg0F2HPB/dea28fa008515d6ddaa0d2659f4dc253/Y0R6_BADGE_Castle_L.png',
    uniqueAbility: { name: 'Armor Panels', quantity: 3 },
    secondaryGadgets: [
      { name: 'Bulletproof Camera', quantity: 1 },
      { name: 'Proximity Alarm', quantity: 2 }
    ]
  },
  {
    name: 'Pulse',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/ChAeJzdmwxuvhZTrV81rK/8c16116f4c719a3df864df6639e2f52e/Y0R6_BADGE_Pulse_L.png',
    uniqueAbility: { name: 'Heartbeat Sensor', quantity: 'Unlimited' },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'C4', quantity: 1 }
    ]
  },
  {
    name: 'Thermite',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6tow5mqLao5TrJVL52csSc/46aa934c9f3f02189e9c04df0114a081/Y0R6_BADGE_Thermite_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Montagne',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7qWONT0mrNYtUZVTVVT8Yj/e0da552d6bb6548ddf74cf4cc44d75c5/Y0R6_BADGE_Montagne_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Twitch',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3YgCpOSM2R4SDgExstxm7P/ff84e6ac53bd9f690deee78870f9c23b/Y0R6_BADGE_Twitch_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Doc',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/71Nl3v0LqHyo9eXV6xTFQd/1ba4f057b6acad3ec700ca9e60b53d6c/Y0R6_BADGE_Doc_L.png',
    uniqueAbility: { name: 'Stim Pistol', quantity: 3 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Bulletproof Camera', quantity: 1 }
    ]
  },
  {
    name: 'Rook',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3Yk1noMd9re0RLlrXJSWtR/7a55e80593c487827293a114835dba63/Y0R6_BADGE_Rook_L.png',
    uniqueAbility: { name: 'Armor Pack', quantity: 1 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Jäger',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1cCvTmKwnnovVmpZmDyPkA/b064f5ad6b9e7398d820d9ea90ff9366/Y0R6_BADGE_Jager_L.png',
    uniqueAbility: { name: 'Active Defense System (ADS)', quantity: 3 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Bulletproof Camera', quantity: 1 }
    ]
  },
  {
    name: 'Bandit',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4Vasjq82J1TNjNE38J7LmV/e1725f8d9ea2b85565e40b54faac85b8/Y0R6_BADGE_Bandit_L.png',
    uniqueAbility: { name: 'Shock Wire', quantity: 4 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'C4', quantity: 1 }
    ]
  },
  {
    name: 'Blitz',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2YTGfm1Df9PtldLcGodcTV/9a235b550cdf5066d686cef750eba090/Y0R6_BADGE_Blitz_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'IQ',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4xnVj2iZB8Otchiw7j69UO/13c864a4e2eb976c1978dc79411b450c/Y0R6_BADGE_IQ_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Fuze',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1wkdQ0viuTEguji14qXMJG/5858418baa8cca04a6e42a2d6256c093/Y0R6_BADGE_Fuze_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Glaz',
    role: 'Attacker',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5UAZVgyOutPh6bLTV3fGXf/c59d484fd599d09a947ec423b2119620/Y0R6_BADGE_Glaz_L.png',
    uniqueAbility: { name: 'placeholder', quantity: 0 },
    secondaryGadgets: [
      { name: 'placeholder', quantity: 0 },
      { name: 'placeholder', quantity: 0 }
    ]
  },
  {
    name: 'Tachanka',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7hpI2mcmvyjC2vG6ieltLo/f217b1dc449c0514b55e471193a38c91/Y0R6_BADGE_Tachanka_L.png',
    uniqueAbility: { name: 'Shumikha Launcher', quantity: 10 },
    secondaryGadgets: [
      { name: 'Barbed Wire', quantity: 2 },
      { name: 'Deployable Shield', quantity: 1 }
    ]
  },
  {
    name: 'Kapkan',
    role: 'Defender',
    image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/797q7C5YA89eFqw4RB40ka/f9435d1b4d13d41472e22d305c961cb9/Y0R6_BADGE_Kapkan_L.png',
    uniqueAbility: { name: 'Entry Denial Device', quantity: 5 },
    secondaryGadgets: [
      { name: 'Impact Grenade', quantity: 2 },
      { name: 'C4', quantity: 1 }
    ]
  },
];

export default OperatorData;
