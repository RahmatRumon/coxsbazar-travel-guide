// coxsbazar-guide/js/app.js

// ══════════════════════════════════════════
//  কক্সবাজার ট্রাভেল গাইড — app.js
// ══════════════════════════════════════════

const CATEGORY_CONFIG = {
  beach:   { label: 'সৈকত',    color: '#0A7A5E', emoji: '🌊' },
  nature:  { label: 'প্রকৃতি',  color: '#2D6A2D', emoji: '🌿' },
  island:  { label: 'দ্বীপ',    color: '#1A5FA8', emoji: '🏝️' },
  heritage:{ label: 'ঐতিহ্য',  color: '#B5630A', emoji: '🏛️' },
};

// LocalStorage key
const LS_CENTER_KEY = 'cbg_center_id';

// ──────────────────────────────────────────
//  স্পট ডেটা (২৭টি স্পট, সঠিক লোকেশন ও আপনার দেওয়া কাস্টম লিংকসহ)
// ──────────────────────────────────────────
const SPOTS = [
  {
    id: 1, name: 'লাবণী পয়েন্ট সৈকত', category: 'beach',
    lat: 21.4276, lon: 91.9693, fee: 'বিনামূল্যে', distFromCox: 0,
    transport: 'রিকশা / হাঁটাপথ', hours: 'সার্বক্ষণিক',
    desc: 'কক্সবাজারের প্রধান সমুদ্র সৈকত ও পর্যটনের কেন্দ্রবিন্দু। শামুক-ঝিনুকের বিপণি বিতান, রেস্তোরাঁ এবং সব ধরনের পর্যটন সুবিধা এখানেই সবচেয়ে বেশি।',
    tip: 'ভোরে সূর্যোদয় দেখতে হলে ৫টার মধ্যে সৈকতে পৌঁছান।',
    mapLink: 'https://maps.google.com/?cid=1091063740798664300'
  },
  {
    id: 2, name: 'সুগন্ধা পয়েন্ট সৈকত', category: 'beach',
    lat: 21.4185, lon: 91.9744, fee: 'বিনামূল্যে', distFromCox: 1.5,
    transport: 'রিকশা / হাঁটাপথ', hours: 'সার্বক্ষণিক',
    desc: 'লাবণী পয়েন্ট থেকে সামান্য দক্ষিণে। তুলনামূলক কম ভিড়, এখানে সি-গাল পাখির দল বেশি দেখা যায়।',
    tip: 'সন্ধ্যায় সূর্যাস্ত দেখার জন্য আদর্শ পয়েন্ট।',
    mapLink: 'https://maps.google.com/?cid=4923603051574973055'
  },
  {
    id: 3, name: 'কলাতলী বিচ পয়েন্ট', category: 'beach',
    lat: 21.4136, lon: 91.9805, fee: 'বিনামূল্যে', distFromCox: 2.5,
    transport: 'রিকশা / সিএনজি', hours: 'সার্বক্ষণিক',
    desc: 'কক্সবাজার সৈকতের দক্ষিণ অংশ। অনেক ভালো মানের হোটেল ও রিসোর্ট এই পয়েন্টের আশেপাশে। তুলনামূলক পরিষ্কার ও প্রশস্ত।',
    tip: 'অধিকাংশ ভালো হোটেল কলাতলী এলাকায় অবস্থিত।',
    mapLink: 'https://maps.google.com/?cid=562714166581475555'
  },
  {
    id: 4, name: 'দরিয়ানগর সানসেট পয়েন্ট', category: 'beach',
    lat: 21.3970, lon: 91.9965, fee: 'বিনামূল্যে', distFromCox: 6,
    transport: 'সিএনজি / অটোরিকশা', hours: 'সার্বক্ষণিক',
    desc: 'পাহাড় ও সমুদ্রের সংগমস্থলে সূর্যাস্ত দেখার অন্যতম সেরা জায়গা। সন্ধ্যার লালাভ আকাশ ও সোনালী ঢেউ এখান থেকে অসাধারণ।',
    tip: 'বিকাল ৫টার আগে পৌঁছালে সেরা সূর্যাস্ত উপভোগ করা যায়।',
    mapLink: 'https://maps.google.com/?cid=14196602480504825590'
  },
  {
    id: 5, name: 'হিমছড়ি জাতীয় উদ্যান ও ঝরনা', category: 'nature',
    lat: 21.3556, lon: 92.0350, fee: '৫ টাকা/জন', distFromCox: 12,
    transport: 'সিএনজি / মেরিন ড্রাইভ', hours: 'সকাল ৮টা – বিকাল ৫টা',
    desc: '১৭২৯ হেক্টর বনভূমিতে পাহাড়, ঝরনা ও সমুদ্র একসাথে উপভোগ করা যায়। ২৮৬ প্রজাতির পাখি ও ৫৫ প্রজাতির স্তন্যপায়ী প্রাণীর আবাস।',
    tip: 'বর্ষাকালে (জুন–সেপ্টেম্বর) ঝরনার পূর্ণ রূপ দেখা যায়।',
    mapLink: 'https://maps.google.com/?cid=11517660900664399729'
  },
  {
    id: 6, name: 'ইনানী সমুদ্র সৈকত', category: 'beach',
    lat: 21.1925, lon: 92.0485, fee: 'বিনামূল্যে', distFromCox: 28,
    transport: 'সিএনজি / মেরিন ড্রাইভ', hours: 'সার্বক্ষণিক',
    desc: 'প্রবালপাথর ও স্বচ্ছ নীল পানির জন্য বিখ্যাত। ভাটার সময় বিশাল প্রবালপাথরের সমাহার দেখা যায়। পানি শান্ত থাকায় সমুদ্রস্নানের জন্য আদর্শ।',
    tip: 'ভাটার সময় ভোর বা বিকালে গেলে প্রবালপাথর সবচেয়ে ভালো দেখা যায়।',
    mapLink: 'https://maps.google.com/?cid=1985750910748076891'
  },
  {
    id: 7, name: 'মহেশখালী — আদিনাথ মন্দির', category: 'island',
    lat: 21.5265, lon: 91.9664, fee: 'নৌভাড়া ৩০–৫০ টাকা/জন; মন্দির বিনামূল্যে', distFromCox: 15,
    transport: 'স্পিডবোট / ট্রলার (সদর ঘাট থেকে)', hours: 'সারাদিন (সকাল – সন্ধ্যা)',
    desc: 'বাংলাদেশের একমাত্র পাহাড়ি দ্বীপ। মৈনাক পাহাড়ের চূড়ায় ঐতিহাসিক আদিনাথ মন্দির। পান বাগান, শুঁটকি পল্লী ও মনোরম পাহাড়ি দৃশ্য।',
    tip: 'সকালে রওনা দিলে সারাদিন ঘুরে বিকালে ফিরতে পারবেন।',
    mapLink: 'https://maps.google.com/?cid=15619864611165134526'
  },
  {
    id: 8, name: 'সোনাদিয়া দ্বীপ', category: 'island',
    lat: 21.4920, lon: 91.8790, fee: 'নৌভাড়া প্রযোজ্য', distFromCox: 18,
    transport: 'নৌকা / ট্রলার', hours: 'সারাদিন',
    desc: '৯ বর্গ কি.মি. আয়তনের নির্জন দ্বীপ। শীতকালে হাজারো অতিথি পাখির আগমন হয়। ম্যানগ্রোভ বন ও নির্জন সৈকতে শান্তিময় প্রকৃতির অভিজ্ঞতা।',
    tip: 'শীতকালে (নভেম্বর–ফেব্রুয়ারি) পাখির মেলা দেখার সেরা সময়।',
    mapLink: 'https://maps.google.com/?cid=5640412319846393888'
  },
  {
    id: 9, name: 'ডুলাহাজরা বঙ্গবন্ধু সাফারি পার্ক', category: 'nature',
    lat: 21.6660, lon: 92.0830, fee: '৫০ টাকা/জন', distFromCox: 45,
    transport: 'বাস / সিএনজি (চট্টগ্রাম মহাসড়ক)', hours: 'সকাল ৯টা – বিকাল ৫টা (মঙ্গল ও বুধবার বন্ধ)',
    desc: 'বাংলাদেশের একমাত্র সাফারি পার্ক। ৯০০ হেক্টর বনে বাঘ, সিংহ, হাতি, হিপো সহ ১৬৫ প্রজাতির প্রায় ৪,০০০ প্রাণী রয়েছে।',
    tip: 'সকালে গেলে প্রাণীরা বেশি সক্রিয় থাকে। মঙ্গল-বুধবার বন্ধ!',
    mapLink: 'https://maps.google.com/?cid=15067328678287937834'
  },
  {
    id: 10, name: 'রামু বৌদ্ধ বিহার ও প্যাগোডা', category: 'heritage',
    lat: 21.4363, lon: 92.1287, fee: 'বিনামূল্যে', distFromCox: 18,
    transport: 'বাস / সিএনজি / রিকশা', hours: 'সকাল থেকে সন্ধ্যা',
    desc: 'বৌদ্ধ সংস্কৃতির কেন্দ্র রামুতে একাধিক মন্দির, বিহার ও ব্রোঞ্জ বুদ্ধমূর্তি। বাকখালী নদীর তীরে লামাপাড়া খিয়াং বিশেষ আকর্ষণীয়।',
    tip: 'রামু রাবার বাগানও এখান থেকে সহজে দেখা যায়।',
    mapLink: 'https://maps.google.com/?cid=10667391465351562151'
  },
  {
    id: 11, name: 'অগ্গমেধা খিয়াং', category: 'heritage',
    lat: 21.4429, lon: 91.9762, fee: 'বিনামূল্যে', distFromCox: 2,
    transport: 'রিকশা / হাঁটাপথ', hours: 'সকাল ৯টা – সন্ধ্যা ৭টা',
    desc: 'কক্সবাজার শহরে অবস্থিত ঐতিহ্যবাহী বৌদ্ধ মন্দির। সোনালি বুদ্ধমূর্তি ও নান্দনিক স্থাপত্যের জন্য পরিচিত।',
    tip: 'শহরের কাছে হওয়ায় যেকোনো দিন বিকালে দেখে আসা যায়।',
    mapLink: 'https://maps.google.com/?cid=13326928918389404167'
  },
  {
    id: 12, name: 'কুতুবদিয়া দ্বীপ ও বাতিঘর', category: 'island',
    lat: 21.8235, lon: 91.8445, fee: 'নৌভাড়া প্রযোজ্য', distFromCox: 80,
    transport: 'বাস (মগনামা ঘাট) + নৌকা', hours: 'সারাদিন',
    desc: 'ঐতিহাসিক বাতিঘরের জন্য বিখ্যাত। বায়ু বিদ্যুৎ কেন্দ্র, লবণ চাষ ও নির্জন সৈকত এই দ্বীপের বিশেষ আকর্ষণ।',
    tip: 'মগনামা ঘাট থেকে নৌকায়। সারাদিনের পরিকল্পনা রাখুন।',
    mapLink: 'https://maps.google.com/?cid=4003446566372035224'
  },
  {
    id: 13, name: 'শাহপরীর দ্বীপ', category: 'island',
    lat: 20.7700, lon: 92.3200, fee: 'বিনামূল্যে', distFromCox: 90,
    transport: 'বাস/সিএনজি (টেকনাফ) + নৌকা', hours: 'সারাদিন',
    desc: 'বাংলাদেশের মূল ভূখণ্ডের একেবারে দক্ষিণ প্রান্তে। নাফ নদী ও বঙ্গোপসাগরের মিলনস্থল। অসাধারণ প্রাকৃতিক পরিবেশ।',
    tip: 'টেকনাফ থেকে নৌকায় মাত্র ১৫–২০ মিনিটের পথ।',
    mapLink: 'https://maps.google.com/?cid=10616265260758880500'
  },
  {
    id: 14, name: 'মাথিনের কূপ, টেকনাফ', category: 'heritage',
    lat: 20.8643, lon: 92.2987, fee: 'বিনামূল্যে', distFromCox: 85,
    transport: 'বাস / মেরিন ড্রাইভ', hours: 'সার্বক্ষণিক',
    desc: 'নাফ নদীর কূলে টেকনাফ থানা চত্বরে ব্রিটিশ কর্মকর্তা ওয়াটসন ও রাজকন্যা মাথিনের করুণ প্রেমের গল্পের সাক্ষী এই ঐতিহাসিক কূপ।',
    tip: 'মেরিন ড্রাইভে যাওয়ার পথে দেখে আসা যায়।',
    mapLink: 'https://maps.google.com/?cid=15061933153733749544'
  },
  {
    id: 15, name: 'টেকনাফ সমুদ্র সৈকত', category: 'beach',
    lat: 20.8350, lon: 92.2630, fee: 'বিনামূল্যে', distFromCox: 87,
    transport: 'বাস / মেরিন ড্রাইভ', hours: 'সার্বক্ষণিক',
    desc: 'মেরিন ড্রাইভের শেষ প্রান্তে। নাফ নদী ও বঙ্গোপসাগরের মিলনস্থল থেকে মিয়ানমারের সাজা পাহাড় স্পষ্ট দেখা যায়।',
    tip: 'দিগন্তে মিয়ানমারের পাহাড় দেখতে ভোরে আসুন।',
    mapLink: 'https://maps.google.com/?cid=13602690787942698075'
  },
  {
    id: 16, name: 'নুনিয়াছড়া সমুদ্র সৈকত', category: 'beach',
    lat: 21.4760, lon: 91.9650, fee: 'বিনামূল্যে', distFromCox: 5,
    transport: 'সিএনজি / অটো', hours: 'সার্বক্ষণিক',
    desc: 'কক্সবাজার শহরের উত্তর দিকে অবস্থিত তুলনামূলক নির্জন এই সৈকত। ভিড় এড়িয়ে শান্ত পরিবেশে সময় কাটানোর জন্য আদর্শ।',
    tip: 'এয়ারপোর্টের কাছাকাছি হওয়ায় যাতায়াত সহজ।',
    mapLink: 'https://maps.google.com/?cid=6474330919134508793'
  },
  {
    id: 17, name: 'বাকখালী নদী ও সূর্যাস্ত ঘাট', category: 'heritage',
    lat: 21.4520, lon: 91.9730, fee: 'বিনামূল্যে', distFromCox: 3,
    transport: 'রিকশা / সিএনজি', hours: 'সার্বক্ষণিক',
    desc: 'কক্সবাজার শহরের পাশ দিয়ে বয়ে যাওয়া বাকখালী নদীর ঘাট। নদীপথে মহেশখালী যাওয়ার প্রধান ঘাট। সন্ধ্যায় নদীর পাড়ে সূর্যাস্ত দেখা চমৎকার।',
    tip: 'মহেশখালীগামী স্পিডবোট এই ঘাট থেকে ছাড়ে।',
    mapLink: 'https://maps.google.com/?cid=11607139065294629469'
  },
  {
    id: 18, name: 'সেন্ট মার্টিন দ্বীপ', category: 'island',
    lat: 20.6275, lon: 92.3215, fee: 'শিপ/ট্রলার ভাড়া প্রযোজ্য', distFromCox: 120,
    transport: 'শিপ / স্পিডবোট (টেকনাফ থেকে)', hours: 'সারাদিন',
    desc: 'বাংলাদেশের একমাত্র প্রবাল দ্বীপ। স্বচ্ছ নীল জলরাশি, নারিকেল গাছ এবং কোরাল পাথরের জন্য এটি পর্যটকদের অন্যতম প্রিয় গন্তব্য।',
    tip: 'শীতকালে (নভেম্বর-মার্চ) সমুদ্র শান্ত থাকে, তাই এটি সেন্ট মার্টিন ভ্রমণের সেরা সময়।',
    mapLink: 'https://maps.google.com/?cid=12778165215399126363'
  },
  {
    id: 19, name: 'ছেঁড়া দ্বীপ', category: 'island',
    lat: 20.5960, lon: 92.3320, fee: 'নৌকা ভাড়া প্রযোজ্য', distFromCox: 125,
    transport: 'নৌকা / সাইকেল / হাঁটাপথ', hours: 'সারাদিন (ভাটায় যাওয়া নিরাপদ)',
    desc: 'সেন্ট মার্টিন দ্বীপের বিচ্ছিন্ন একটি অংশ এবং বাংলাদেশের সর্বদক্ষিণ ভূখণ্ড। চারদিকে প্রবাল পাথর আর নীল জলের অপূর্ব সৌন্দর্য।',
    tip: 'ভাটার সময় হেঁটে বা সাইকেলে যাওয়া যায়। জোয়ারের সময় নৌকা লাগে।',
    mapLink: 'https://maps.google.com/?cid=17626103647808831381'
  },

  // ══════════════════════════════════════════
  // নতুন যুক্ত করা ৮টি লোকেশন
  // ══════════════════════════════════════════
  {
    id: 20, name: 'শামলাপুর সৈকত', category: 'beach',
    lat: 21.0739125, lon: 92.1338281, fee: 'বিনামূল্যে', distFromCox: 45,
    transport: 'সিএনজি / মেরিন ড্রাইভ', hours: 'সার্বক্ষণিক',
    desc: 'মেরিন ড্রাইভের পাশে অবস্থিত একটি অপেক্ষাকৃত নির্জন সৈকত। রঙিন ফিশিং বোট এবং জেলেদের জীবনযাত্রা খুব কাছ থেকে দেখার জন্য দারুণ জায়গা।',
    tip: 'এখানে তাজা সামুদ্রিক মাছ খুব সস্তায় কেনা ও ভেজে খাওয়ার সুযোগ আছে।',
    mapLink: 'https://maps.google.com/?cid=2277153351613458172'
  },
  {
    id: 21, name: 'হলিউড পাহাড়', category: 'nature',
    lat: 20.9052875, lon: 92.2500469, fee: 'বিনামূল্যে', distFromCox: 75,
    transport: 'বাস / সিএনজি / মেরিন ড্রাইভ', hours: 'দিনের বেলা',
    desc: 'টেকনাফ মেরিন ড্রাইভের কাছাকাছি অবস্থিত একটি মনোরম পাহাড়। এখান থেকে একদিকে বিশাল সমুদ্র এবং অন্যদিকে পাহাড়ের অপূর্ব দৃশ্য উপভোগ করা যায়।',
    tip: 'পাহাড়ে ওঠার সময় আরামদায়ক জুতো পরুন এবং সাথে পর্যাপ্ত পানি রাখুন।',
    mapLink: 'https://maps.google.com/?cid=4853978378970507624'
  },
  {
    id: 22, name: 'উইন্ডমিল ভিউ পয়েন্ট', category: 'nature',
    lat: 21.508478, lon: 92.004636, fee: 'বিনামূল্যে', distFromCox: 10,
    transport: 'অটোরিকশা / সিএনজি', hours: 'সকাল থেকে সন্ধ্যা',
    desc: 'খুরুশকুল এলাকায় বাঁকখালী নদীর তীরে অবস্থিত বিশাল বায়ুবিদ্যুৎ কেন্দ্র। নদীর তীরের শান্ত পরিবেশ ও উইন্ডমিলের দৃশ্য পর্যটকদের দারুণ আকর্ষণ করে।',
    tip: 'পড়ন্ত বিকেলে গেলে নদীর শান্ত বাতাস এবং অসাধারণ সূর্যাস্ত উপভোগ করতে পারবেন।',
    mapLink: 'https://maps.google.com/?cid=4051542222092881449'
  },
  {
    id: 23, name: 'লাল কাঁকড়া বিচ', category: 'beach',
    lat: 21.3751625, lon: 92.0124844, fee: 'বিনামূল্যে', distFromCox: 8,
    transport: 'অটোরিকশা / মেরিন ড্রাইভ', hours: 'সার্বক্ষণিক',
    desc: 'সৈকতে ছড়িয়ে থাকা অসংখ্য লাল কাঁকড়ার জন্য এই বিচ বিখ্যাত। মানুষের উপস্থিতি টের পেলেই কাঁকড়ারা দ্রুত গর্তে লুকিয়ে পড়ে।',
    tip: 'কাঁকড়াদের খুব কাছ থেকে দেখতে চাইলে শান্তভাবে ও নিঃশব্দে হাঁটুন।',
    mapLink: 'https://maps.google.com/?cid=9278880687513127402'
  },
  {
    id: 24, name: 'ইকো ভিলেজ (Coco Valley)', category: 'nature',
    lat: 21.3243125, lon: 92.0375625, fee: 'রিসোর্ট ফি প্রযোজ্য', distFromCox: 15,
    transport: 'সিএনজি / জিপ (মেরিন ড্রাইভ)', hours: 'সকাল থেকে সন্ধ্যা',
    desc: 'মেরিন ড্রাইভের পাশে পাহাড়ের কোলে অবস্থিত চমৎকার একটি ইকো রিসোর্ট। নারকেল বাগান ও প্রাকৃতিক পরিবেশে নিরিবিলি সময় কাটানোর জন্য আদর্শ।',
    tip: 'আগে থেকে বুকিং করে গেলে লাঞ্চ বা ডে-ট্যুরের সুবিধা পাওয়া যায়।',
    mapLink: 'https://maps.google.com/?cid=18274469501416841615'
  },
  {
    id: 25, name: 'দরিয়ানগর সী ভিউ পার্ক', category: 'nature',
    lat: 21.3951875, lon: 92.0001875, fee: 'প্রবেশ মূল্য প্রযোজ্য', distFromCox: 6,
    transport: 'অটোরিকশা / সিএনজি', hours: 'সকাল ৮টা – সন্ধ্যা ৬টা',
    desc: 'পাহাড়ের চূড়া থেকে বিস্তীর্ণ সমুদ্র দেখার এক দারুণ স্পট। এখানে ছোট ছোট গুহা ও ট্রেইল রয়েছে যা অ্যাডভেঞ্চারপ্রেমীদের ভালো লাগবে।',
    tip: 'পাহাড়ের চূড়া থেকে প্যারাসেলিং করার সুযোগ রয়েছে (আবহাওয়া সাপেক্ষে)।',
    mapLink: 'https://maps.google.com/?cid=14196602480504825590'
  },
  {
    id: 26, name: 'রেডিয়েন্ট ফিশ ওয়ার্ল্ড', category: 'nature',
    lat: 21.4423125, lon: 91.9700625, fee: '৩০০–৪০০ টাকা/জন', distFromCox: 2,
    transport: 'রিকশা / হাঁটাপথ', hours: 'সকাল ১০টা – রাত ৯টা',
    desc: 'বাংলাদেশের প্রথম বিশ্বমানের ফিশ অ্যাকুরিয়াম। বঙ্গোপসাগরের শত প্রজাতির মাছ ও সামুদ্রিক প্রাণী খুব কাছ থেকে দেখার সুযোগ রয়েছে এখানে।',
    tip: 'পরিবার ও শিশুদের নিয়ে সময় কাটানোর জন্য শহরের ভেতরের অন্যতম সেরা জায়গা।',
    mapLink: 'https://maps.google.com/?cid=15827414888805467636'
  },
  {
    id: 27, name: 'বাঘঘোনা গিরিপথ ঝর্না', category: 'nature',
    lat: 20.9245625, lon: 92.2352031, fee: 'বিনামূল্যে', distFromCox: 72,
    transport: 'মেরিন ড্রাইভ হয়ে সিএনজি + ট্রেকিং', hours: 'দিনের বেলা',
    desc: 'টেকনাফের গহিন পাহাড়ে অবস্থিত একটি চমৎকার ট্রেকিং ট্রেইল ও ঝরনা। পাথুরে গিরিপথ ধরে হেঁটে ঝরনায় পৌঁছানোর অভিজ্ঞতা বেশ রোমাঞ্চকর।',
    tip: 'বৃষ্টির দিনে পথ বেশ পিচ্ছিল থাকে, তাই ভালো গ্রিপের জুতো পরা অত্যাবশ্যক।',
    mapLink: 'https://maps.google.com/?cid=5871088476272185254'
  }
];

// ──────────────────────────────────────────
//  মেরিন ড্রাইভ পথ
// ──────────────────────────────────────────
const MARINE_DRIVE_PATH = [
  [21.4293,91.9684],[21.4153,91.9810],[21.3920,91.9997],[21.3700,92.0200],
  [21.3497,92.0420],[21.3300,92.0440],[21.3100,92.0450],[21.2900,92.0460],
  [21.2297,92.0475],[21.1900,92.0550],[21.1500,92.0800],[21.1000,92.1300],
  [21.0500,92.1800],[21.0000,92.2100],[20.9500,92.2400],[20.9000,92.2700],
  [20.8647,92.3006],
];

// ──────────────────────────────────────────
//  State
// ──────────────────────────────────────────
let map;
let osmLayer, satelliteLayer;
const markers    = {};
let markerGroup;
let distanceLine = null;
let routeLayer   = null;
let activeFilter = 'all';
let distPanelOpen = true;

// কেন্দ্র: localStorage থেকে পড়ো, না থাকলে ডিফল্ট ইনানী (id=6)
let centerId = (() => {
  try {
    const saved = localStorage.getItem(LS_CENTER_KEY);
    if (saved) {
      const id = parseInt(saved, 10);
      if (SPOTS.some(s => s.id === id)) return id;
    }
  } catch (_) {}
  return 6; 
})();

let centerDistances = {};

function saveCenter(id) {
  centerId = id;
  try { localStorage.setItem(LS_CENTER_KEY, String(id)); } catch (_) {}
}

// ──────────────────────────────────────────
//  Init
// ──────────────────────────────────────────
function init() {
  initMap();
  renderSidebar(SPOTS);
  updateTabCounts();
  initFilters();
  populateDistanceSelects();
  bindDistanceCalc();
  bindDistPanelToggle();
  initSidebarMobile();
  loadCenterDistances(centerId);
}

// ──────────────────────────────────────────
//  Map init
// ──────────────────────────────────────────
function initMap() {
  const coxBounds = L.latLngBounds([19.50, 91.00], [23.00, 93.50]);

  map = L.map('map', {
    center: [21.28, 92.02],
    zoom: 9,
    minZoom: 9,              
    maxBounds: coxBounds,    
    maxBoundsViscosity: 1.0, 
    zoomControl: false,      
  });

  osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    maxZoom: 19,
    keepBuffer: 12,      
    updateWhenIdle: true 
  });

  satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri',
    maxZoom: 19,
    keepBuffer: 12,
    updateWhenIdle: true
  });

  osmLayer.addTo(map);

  L.polyline(MARINE_DRIVE_PATH, {
    color: '#D05000', weight: 3, opacity: 0.8, dashArray: '10 6',
  }).addTo(map).bindTooltip('🛣️ মেরিন ড্রাইভ — কক্সবাজার থেকে টেকনাফ (৮৫ কি.মি.)', {
    sticky: true, className: 'marine-tooltip',
  });

  markerGroup = L.layerGroup().addTo(map);
  
  SPOTS.forEach(spot => {
    const marker = L.marker([spot.lat, spot.lon], { icon: makeIcon(spot) });
    
    // Auto-Pan বন্ধ করা হলো কারণ 3D তে এটি ভুল দিকে প্যান করে
    marker.bindPopup(makePopup(spot), { 
      maxWidth: 220, // সাইজ কমানো হলো
      minWidth: 200, // সাইজ কমানো হলো
      className: 'custom-popup',
      autoPan: false 
    });
    
    marker.on('click', () => {
      activateCard(spot.id);
      
      const currentZoom = map.getZoom(); // বর্তমানে যে জুম আছে ঠিক সেটাই নেবে

      // জুমের উপর ভিত্তি করে ডাইনামিক অফসেট (যাতে যেকোনো জুমে পপআপ স্ক্রিনের সঠিক জায়গায় থাকে)
      const offsetDist = 0.005 * Math.pow(2, 15 - currentZoom); 
      const rad = mapBearing * (Math.PI / 180);
      const centerLat = spot.lat + (offsetDist * Math.cos(rad));
      const centerLon = spot.lon + (offsetDist * Math.sin(rad));

      // targetZoom এর বদলে currentZoom বসানো হলো, ফলে জুম কমবে বা বাড়বে না
      map.flyTo([centerLat, centerLon], currentZoom, {
        animate: true,
        duration: 0.6
      });
      
      closeSidebarMobile();
    });
    
    markers[spot.id] = marker;
    markerGroup.addLayer(marker);
  });

  document.getElementById('zoomIn').addEventListener('click',  () => map.zoomIn());
  document.getElementById('zoomOut').addEventListener('click', () => map.zoomOut());

  let isSatellite = false;
  const btnLayer = document.getElementById('btnLayer');
  if(btnLayer) {
    btnLayer.addEventListener('click', () => {
      if (isSatellite) {
        map.removeLayer(satelliteLayer);
        map.addLayer(osmLayer);
        btnLayer.title = "স্যাটেলাইট ভিউ";
        btnLayer.textContent = "🌍";
      } else {
        map.removeLayer(osmLayer);
        map.addLayer(satelliteLayer);
        btnLayer.title = "ডিফল্ট ভিউ";
        btnLayer.textContent = "🗺️";
      }
      isSatellite = !isSatellite;
    });
  }

  const btnResetView = document.getElementById('btnResetView');
  if(btnResetView) {
    btnResetView.addEventListener('click', () => {
      mapBearing = 0;
      mapTilt = 0;
      applyMapTransform();
      updateCompass();   
      showToast("রোটেশন রিসেট করা হয়েছে");
    });
  }

  const btnLocate = document.getElementById('btnLocate');
  if(btnLocate) {
    btnLocate.addEventListener('click', () => {
      showToast("আপনার অবস্থান খোঁজা হচ্ছে...");
      map.locate({setView: false, maxZoom: 14}); 
    });
  }

  map.on('locationfound', e => {
    if (!coxBounds.contains(e.latlng)) {
      showToast("আপনার অবস্থান উক্ত এরিয়াতে পাওয়া যাচ্ছেনা");
      return; 
    }
    map.flyTo(e.latlng, 14);
    L.circleMarker(e.latlng, {
      color: '#1A5FA8', fillColor: '#1A5FA8', fillOpacity: 0.5, radius: 8
    }).addTo(map).bindPopup("📍 আপনি এখানে আছেন").openPopup();
    showToast("অবস্থান পাওয়া গেছে!");
  });

  map.on('locationerror', () => {
    showToast("লোকেশন পাওয়া যায়নি। ব্রাউজারের লোকেশন পারমিশন চেক করুন।");
  });

  initMapRotateAndTilt();
  map.on('move zoom', updateCompass);
}

// ──────────────────────────────────────────
//  পপআপ আপডেট ফাংশন
// ──────────────────────────────────────────
function updateAllPopups() {
  SPOTS.forEach(spot => {
    if (markers[spot.id]) {
      markers[spot.id].setPopupContent(makePopup(spot));
    }
  });
}

// ──────────────────────────────────────────
//  Toast Notification Function
// ──────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toastMsg');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ──────────────────────────────────────────
//  Map Rotate + Tilt
// ──────────────────────────────────────────
let mapBearing = 0;   
let mapTilt    = 0;   
let lastAngle  = null;
let lastMidY   = null;
let rotating   = false;

function initMapRotateAndTilt() {
  const mapEl = document.getElementById('map');
  mapEl.addEventListener('touchstart', onTouchStart, { passive: false });
  mapEl.addEventListener('touchmove',  onTouchMove,  { passive: false });
  mapEl.addEventListener('touchend',   onTouchEnd,   { passive: false });

  let shiftDragStart = null;
  mapEl.addEventListener('mousedown', e => {
    if (!e.shiftKey) return;
    e.preventDefault();
    shiftDragStart = { x: e.clientX, y: e.clientY, bearing: mapBearing };
  });
  window.addEventListener('mousemove', e => {
    if (!shiftDragStart) return;
    const dx = e.clientX - shiftDragStart.x;
    mapBearing = (shiftDragStart.bearing + dx * 0.4) % 360;
    applyMapTransform();
    updateCompass();
  });
  window.addEventListener('mouseup', () => { shiftDragStart = null; });
}

function getTouchAngle(t1, t2) { return Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * 180 / Math.PI; }
function getTouchMidY(t1, t2) { return (t1.clientY + t2.clientY) / 2; }

function onTouchStart(e) {
  if (e.touches.length === 2) {
    lastAngle = getTouchAngle(e.touches[0], e.touches[1]);
    lastMidY  = getTouchMidY(e.touches[0], e.touches[1]);
    rotating  = true;
  } else { rotating = false; }
}
function onTouchMove(e) {
  if (!rotating || e.touches.length !== 2) return;
  e.preventDefault();
  const angle = getTouchAngle(e.touches[0], e.touches[1]);
  const midY  = getTouchMidY(e.touches[0], e.touches[1]);
  if (lastAngle !== null) { mapBearing = (mapBearing + (angle - lastAngle)) % 360; }
  if (lastMidY !== null) {
    const dy = midY - lastMidY;
    mapTilt = Math.max(0, Math.min(22, mapTilt - dy * 0.12));
  }
  lastAngle = angle; lastMidY  = midY;
  applyMapTransform(); updateCompass();
}
function onTouchEnd(e) {
  if (e.touches.length < 2) { rotating = false; lastAngle = null; lastMidY = null; }
}
function applyMapTransform() {
  const mapEl = document.getElementById('map');
  mapEl.style.transform = `perspective(900px) rotateX(${mapTilt}deg) rotateZ(${mapBearing}deg)`;
  mapEl.style.transformOrigin = 'center center';
}
function updateCompass() {
  const needle = document.getElementById('compassNeedle');
  if (needle) needle.style.transform = `rotate(${-mapBearing}deg)`;
}

// ──────────────────────────────────────────
//  Marker Icon
// ──────────────────────────────────────────
function makeIcon(spot) {
  const { color, emoji } = CATEGORY_CONFIG[spot.category];
  return L.divIcon({
    className: '',
    html: `<div class="m-pin" style="--pin-color:${color}" title="${spot.name}">
             <span class="m-emoji">${emoji}</span>
           </div>`,
    iconSize: [36,36], iconAnchor: [18,18], popupAnchor: [0,-20],
  });
}

// ──────────────────────────────────────────
//  Google Maps URLs 
// ──────────────────────────────────────────
function getViewUrl(spot) {
  return spot.mapLink;
}

function getDirUrl(spot) {
  return spot.mapLink;
}

// ──────────────────────────────────────────
//  Popup HTML
// ──────────────────────────────────────────
function makePopup(spot) {
  const { color, emoji, label } = CATEGORY_CONFIG[spot.category];
  const centerSpot = SPOTS.find(s => s.id === centerId);
  const roadKm     = centerDistances[spot.id];
  
  let distLine = '';
  if (spot.id === centerId) {
    distLine = `<li><span>📍</span>নির্বাচিত কেন্দ্র</li>`;
  } else if (roadKm != null) {
    distLine = `<li><span>🛣️</span>${centerSpot.name} থেকে ${roadKm} কি.মি. (সড়কপথ)</li>`;
  } else {
    const airKm = haversine(centerSpot.lat, centerSpot.lon, spot.lat, spot.lon).toFixed(1);
    distLine = `<li><span>📏</span>${centerSpot.name} থেকে আনুমানিক ${airKm} কি.মি. (আকাশপথে)</li>`;
  }

  return `<div class="spop">
    <p class="spop-name">${spot.name}</p>
    <span class="spop-badge" style="background:${color}18;color:${color};border:1px solid ${color}40">${emoji} ${label}</span>
    <p class="spop-desc">${spot.desc}</p>
    <ul class="spop-meta">
      <li><span>💰</span>${spot.fee}</li>
      <li><span>🚌</span>${spot.transport}</li>
      ${distLine}
      <li><span>🕒</span>${spot.hours}</li>
    </ul>
    ${spot.tip ? `<div class="spop-tip"><span>💡</span>${spot.tip}</div>` : ''}
    <div class="spop-btns">
      <a href="${getViewUrl(spot)}" target="_blank" rel="noopener" class="btn-view">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        গুগল ম্যাপে দেখুন
      </a>
      <a href="${getDirUrl(spot)}" target="_blank" rel="noopener" class="btn-dir">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
        দিকনির্দেশনা
      </a>
    </div>
  </div>`;
}

// ──────────────────────────────────────────
//  Sidebar Cards
// ──────────────────────────────────────────
function renderSidebar(spots) {
  const list = document.getElementById('spotList');
  const centerSpot = SPOTS.find(s => s.id === centerId);
  
  if (!spots.length) {
    list.innerHTML = '<p class="no-result">এই ক্যাটাগরিতে কোনো স্থান নেই।</p>';
    return;
  }
  
  list.innerHTML = spots.map(spot => {
    const { color, emoji, label } = CATEGORY_CONFIG[spot.category];
    const roadKm = centerDistances[spot.id];
    let kmLabel;
    
    if (spot.id === centerId) {
      kmLabel = '<span class="scard-km road">কেন্দ্র ⭐</span>';
    } else if (roadKm != null) {
      kmLabel = `<span class="scard-km road">🛣️ ${roadKm} কি.মি.</span>`;
    } else {
      const airKm = haversine(centerSpot.lat, centerSpot.lon, spot.lat, spot.lon).toFixed(1);
      kmLabel = `<span class="scard-km">📏 ${airKm} কি.মি.</span>`;
    }
    
    return `<div class="scard" data-id="${spot.id}" onclick="onCardClick(${spot.id})">
      <span class="scard-bar" style="background:${color}"></span>
      <div class="scard-body">
        <div class="scard-top">
          <strong class="scard-name">${spot.name}</strong>
          ${kmLabel}
        </div>
        <div class="scard-tags">
          <span class="stag" style="background:${color}18;color:${color}">${emoji} ${label}</span>
          <span class="sfee">${truncate(spot.fee, 20)}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

function truncate(s, n) { return s.length > n ? s.slice(0, n) + '…' : s; }

function onCardClick(id) {
  const spot = SPOTS.find(s => s.id === id);
  if (!spot) return;
  activateCard(id);
  
  const currentZoom = map.getZoom(); 

  const offsetDist = 0.005 * Math.pow(2, 15 - currentZoom); 
  const rad = mapBearing * (Math.PI / 180);
  const centerLat = spot.lat + (offsetDist * Math.cos(rad));
  const centerLon = spot.lon + (offsetDist * Math.sin(rad));

  // targetZoom এর বদলে currentZoom বসানো হলো
  map.flyTo([centerLat, centerLon], currentZoom, { duration: 0.9 });
  
  closeSidebarMobile();
  markers[id].setPopupContent(makePopup(spot));
  markers[id].openPopup();
}

function activateCard(id) {
  document.querySelectorAll('.scard').forEach(c => c.classList.remove('active'));
  const card = document.querySelector(`.scard[data-id="${id}"]`);
  if (card) { card.classList.add('active'); card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}

// ──────────────────────────────────────────
//  Filters
// ──────────────────────────────────────────
function initFilters() {
  document.querySelectorAll('.ftab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.cat;
      const filtered = activeFilter === 'all' ? SPOTS : SPOTS.filter(s => s.category === activeFilter);
      renderSidebar(filtered);
      markerGroup.clearLayers();
      filtered.forEach(s => markerGroup.addLayer(markers[s.id]));
    });
  });
}

function updateTabCounts() {
  const counts = SPOTS.reduce((a, s) => { a[s.category] = (a[s.category] || 0) + 1; return a; }, {});
  const allTab = document.querySelector('.ftab[data-cat="all"]');
  if (allTab) allTab.textContent = `সব (${SPOTS.length})`;
  Object.entries(CATEGORY_CONFIG).forEach(([cat, cfg]) => {
    const tab = document.querySelector(`.ftab[data-cat="${cat}"]`);
    if (tab) tab.innerHTML = `${cfg.emoji} ${cfg.label} (${counts[cat] || 0})`;
  });
}

// ──────────────────────────────────────────
//  Mobile Sidebar
// ──────────────────────────────────────────
function initSidebarMobile() {
  const toggle  = document.getElementById('sidebarToggle');
  const close   = document.getElementById('sidebarClose');
  const overlay = document.getElementById('sidebarOverlay');

  toggle.addEventListener('click', openSidebarMobile);
  close.addEventListener('click',  closeSidebarMobile);
  overlay.addEventListener('click', closeSidebarMobile);
}

function openSidebarMobile() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('visible');
}
function closeSidebarMobile() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('visible');
}

// ──────────────────────────────────────────
//  Distance Panel Toggle
// ──────────────────────────────────────────
function bindDistPanelToggle() {
  const header = document.getElementById('distPanelHeader');
  const body   = document.getElementById('distPanelBody');
  const btn    = document.getElementById('distPanelToggleBtn');
  header.addEventListener('click', () => {
    distPanelOpen = !distPanelOpen;
    body.classList.toggle('collapsed', !distPanelOpen);
    btn.textContent = distPanelOpen ? '▲ লুকান' : '▼ দেখুন';
  });
}

// ──────────────────────────────────────────
//  Center Selection + Distance Selects
// ──────────────────────────────────────────
function populateDistanceSelects() {
  const cSel = document.getElementById('centerSel');
  cSel.innerHTML = '';
  SPOTS.forEach(s => cSel.add(new Option(s.name, s.id)));
  cSel.value = centerId;
  cSel.addEventListener('change', () => {
    saveCenter(+cSel.value);
    centerDistances = {};
    renderSidebar(getFiltered());
    updateAllPopups(); 
    loadCenterDistances(centerId);
    const fromSel = document.getElementById('fromSel');
    if (fromSel) fromSel.value = centerId;
    calcDistance();
  });

  const fromEl = document.getElementById('fromSel');
  const toEl   = document.getElementById('toSel');
  SPOTS.forEach(s => { fromEl.add(new Option(s.name, s.id)); toEl.add(new Option(s.name, s.id)); });
  fromEl.value = centerId;   
  toEl.value   = centerId === 1 ? 6 : 1;  
}

function getFiltered() {
  return activeFilter === 'all' ? SPOTS : SPOTS.filter(s => s.category === activeFilter);
}

function bindDistanceCalc() {
  document.getElementById('fromSel').addEventListener('change', calcDistance);
  document.getElementById('toSel').addEventListener('change',   calcDistance);
  calcDistance();
}

// ──────────────────────────────────────────
//  OSRM — কেন্দ্র থেকে সব স্পটের দূরত্ব
// ──────────────────────────────────────────
async function loadCenterDistances(fromId) {
  const origin = SPOTS.find(s => s.id === fromId);
  if (!origin) return;

  const coords   = SPOTS.map(s => `${s.lon},${s.lat}`).join(';');
  const srcIdx   = SPOTS.findIndex(s => s.id === fromId);
  const url      = `https://router.project-osrm.org/table/v1/driving/${coords}?sources=${srcIdx}&annotations=distance`;

  try {
    const res  = await fetch(url);
    const data = await res.json();
    if (data.code === 'Ok' && data.distances) {
      const dists = data.distances[0];
      SPOTS.forEach((s, i) => {
        const m = dists[i];
        centerDistances[s.id] = (m != null && m > 0) ? parseFloat((m / 1000).toFixed(1)) : (s.id === fromId ? 0 : null);
      });
      centerDistances[fromId] = 0;
    }
  } catch (_) {
    SPOTS.forEach(s => {
      centerDistances[s.id] = s.id === fromId ? 0 : parseFloat(haversine(origin.lat, origin.lon, s.lat, s.lon).toFixed(1));
    });
  }

  renderSidebar(getFiltered());
  updateAllPopups(); 
}

// ──────────────────────────────────────────
//  A → B Distance (road route + map draw)
// ──────────────────────────────────────────
async function calcDistance() {
  const fromId = +document.getElementById('fromSel').value;
  const toId   = +document.getElementById('toSel').value;
  const a = SPOTS.find(s => s.id === fromId);
  const b = SPOTS.find(s => s.id === toId);
  const el = document.getElementById('distRes');
  if (!a || !b) return;

  if (a.id === b.id) {
    el.innerHTML = '<span class="dist-warn">একই স্থান নির্বাচিত!</span>';
    el.style.display = 'block';
    return;
  }

  el.innerHTML = '<span class="dist-loading">সড়কপথ হিসাব করা হচ্ছে…</span>';
  el.style.display = 'block';

  if (routeLayer)   { map.removeLayer(routeLayer);   routeLayer   = null; }
  if (distanceLine) { map.removeLayer(distanceLine); distanceLine = null; }

  const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=full&geometries=geojson`;

  try {
    const res  = await fetch(osrmUrl);
    const data = await res.json();
    if (data.code !== 'Ok' || !data.routes?.length) throw new Error('no route');

    const route   = data.routes[0];
    const km      = (route.distance / 1000).toFixed(1);
    const mins    = Math.round(route.duration / 60);
    const hrs     = Math.floor(mins / 60);
    const remMins = mins % 60;
    const time    = hrs > 0 ? `${hrs} ঘণ্টা ${remMins} মিনিট` : `${remMins} মিনিট`;

    el.innerHTML = `<div class="dist-num">${km}<span class="dist-unit"> কি.মি.</span></div>
      <div class="dist-sub">🛣️ সড়কপথে · আনুমানিক সময় ${time}</div>
      <div class="dist-path">${a.name} → ${b.name}</div>`;
    el.style.display = 'block';

    const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
    routeLayer = L.polyline(coords, { color: '#1A5FA8', weight: 4, opacity: 0.85 })
      .addTo(map)
      .bindTooltip(`🛣️ ${km} কি.মি. · ${time}`, { sticky: true, className: 'dist-tooltip' });
    map.fitBounds(routeLayer.getBounds(), { padding: [50, 70] });

  } catch (_) {
    showToast("সড়কপথের সার্ভার ব্যস্ত! আকাশপথের দূরত্ব দেখানো হচ্ছে।");

    const km = haversine(a.lat, a.lon, b.lat, b.lon).toFixed(1);
    el.innerHTML = `<div class="dist-num">${km}<span class="dist-unit"> কি.মি.</span></div>
      <div class="dist-sub">আকাশপথে দূরত্ব (সড়কপথ পাওয়া যায়নি)</div>
      <div class="dist-path">${a.name} → ${b.name}</div>`;
    el.style.display = 'block';
    distanceLine = L.polyline([[a.lat,a.lon],[b.lat,b.lon]], {
      color:'#6340C0', weight:2.5, opacity:0.9, dashArray:'8 5',
    }).addTo(map).bindTooltip(`📏 ${km} কি.মি. (সরাসরি)`, { sticky:true, className:'dist-tooltip' });
    map.fitBounds([[a.lat,a.lon],[b.lat,b.lon]], { padding:[60,80] });
  }
}

// ──────────────────────────────────────────
//  Haversine fallback
// ──────────────────────────────────────────
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371, r = Math.PI/180;
  const dLat = (lat2-lat1)*r, dLon = (lon2-lon1)*r;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*r)*Math.cos(lat2*r)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ──────────────────────────────────────────
//  Boot
// ──────────────────────────────────────────

window.addEventListener('load', () => {
  if (typeof L === 'undefined') {
    showToast("ম্যাপ লাইব্রেরি লোড হতে পারেনি! দয়া করে ইন্টারনেট কানেকশন চেক করুন।");
    return;
  }
  init();
});

