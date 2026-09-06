import livingSofa from '../assets/living-sofa.webp'
import bedroomBed from '../assets/bedroom-bed.webp'
import diningSet from '../assets/dining-set.webp'
import storageCabinet from '../assets/storage-cabinet.webp'
import diningMarble from '../assets/dining-marble.webp'
import sofaEmbroidery from '../assets/sofa-embroidery.webp'
import showroomLiving from '../assets/showroom-living.webp'
import officeDesk from '../assets/office-desk.webp'
import officeConference from '../assets/office-conference.webp'
import modernBedroom from '../assets/modern-bedroom.webp'
import modernVanity from '../assets/modern-vanity.webp'
import modernSofa from '../assets/modern-sofa.webp'
import swingChair from '../assets/swing-chair.webp'
import craftShowcase from '../assets/craft-showcase.webp'
import heroBed from '../assets/hero-bed.webp'
import heroArmchairs from '../assets/hero-armchairs.webp'
import heroSofaGreen from '../assets/hero-sofa-green.webp'
import heroBedGrey from '../assets/hero-bed-grey.webp'
import heroDiningClassic from '../assets/hero-dining-classic.webp'
import heroOutdoorTeak from '../assets/hero-outdoor-teak.webp'
import officeDirector from '../assets/office-director.webp'
import founderPortrait from '../assets/founder.webp'

export const messenger = 'https://m.me/HeavenFurnitureMart'

export const contact = {
  phoneDisplay: '+880 1960-481983',
  phoneRaw: '+8801960481983',
  whatsapp: '8801960481983',
  email: 'heavenfurnituremart@gmail.com',
  address: 'Agrabad Access Road, Chattogram, Bangladesh',
  mapUrl: 'https://maps.google.com/?q=Agrabad+Access+Road+Chattogram',
  facebook: 'https://www.facebook.com/HeavenFurnitureMart',
  instagram: 'https://www.instagram.com/heaven_furniture_ltd',
  youtube: 'https://www.youtube.com/@HeavenFurnitureMart',
}

export const wa = (message) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`

// Hero carousel. Every image is a transparent-background cut-out so the piece
// sits directly on the gold wave with nothing boxed around it.
export const heroPieces = [
  {
    id: 'armchairs',
    image: heroArmchairs,
    w: 1400,
    h: 620,
    ref: 'HFM-AC2',
    name: 'pieceArmchairs',
    room: 'collLiving',
    caption: 'pieceArmchairsC',
    alt: 'pieceArmchairsAlt',
  },
  {
    id: 'sofa-green',
    image: heroSofaGreen,
    w: 1400,
    h: 739,
    ref: 'HFM-SF2',
    name: 'pieceSofaGreen',
    room: 'collLiving',
    caption: 'pieceSofaGreenC',
    alt: 'pieceSofaGreenAlt',
  },
  {
    id: 'bed-grey',
    image: heroBedGrey,
    w: 1400,
    h: 723,
    ref: 'HFM-BD1',
    name: 'pieceBedGrey',
    room: 'collBedroom',
    caption: 'pieceBedGreyC',
    alt: 'pieceBedGreyAlt',
  },
  {
    id: 'dining-classic',
    image: heroDiningClassic,
    w: 1400,
    h: 979,
    ref: 'HFM-DN4',
    name: 'pieceDiningClassic',
    room: 'collDining',
    caption: 'pieceDiningClassicC',
    alt: 'pieceDiningClassicAlt',
  },
  {
    id: 'outdoor-teak',
    image: heroOutdoorTeak,
    w: 1400,
    h: 936,
    ref: 'HFM-TK9',
    name: 'pieceOutdoorTeak',
    room: 'roomOutdoor',
    caption: 'pieceOutdoorTeakC',
    alt: 'pieceOutdoorTeakAlt',
  },
]

export const nav = [
  { label: 'navWhy', href: '#why' },
  { label: 'navCollections', href: '#collections' },
  { label: 'navBespoke', href: '#bespoke' },
  { label: 'navRange', href: '#range' },
  { label: 'navProcess', href: '#process' },
  { label: 'navFaq', href: '#faq' },
  { label: 'navQuote', href: '#quote' },
  { label: 'navVisit', href: '#visit' },
]

export const assurances = ['assurance1', 'assurance2', 'assurance3', 'assurance4']

export const collections = [
  { name: 'collLiving',  pieces: 'collLivingP',  note: 'collLivingN',  image: livingSofa,  w: 1024, h: 1024 },
  { name: 'collBedroom', pieces: 'collBedroomP', note: 'collBedroomN', image: bedroomBed,  w: 1100, h: 1375 },
  { name: 'collDining',  pieces: 'collDiningP',  note: 'collDiningN',  image: diningSet,   w: 1100, h: 1454 },
  { name: 'collOffice',  pieces: 'collOfficeP',  note: 'collOfficeN',  image: officeDesk,  w: 1080, h: 930 },
]

export const process = [
  { title: 'proc1', body: 'proc1b' },
  { title: 'proc2', body: 'proc2b' },
  { title: 'proc3', body: 'proc3b' },
  { title: 'proc4', body: 'proc4b' },
]

export const milestones = [
  { year: '2020', text: 'ms2020' },
  { year: '2021', text: 'ms2021' },
  { year: '2024', text: 'ms2024' },
  { year: '2025', text: 'ms2025' },
  { year: '2026', text: 'ms2026' },
]

export const gallery = [
  { src: sofaEmbroidery,  alt: 'galSofa',     w: 1024, h: 1024 },
  { src: diningMarble,    alt: 'galDining',   w: 1087, h: 1447 },
  { src: showroomLiving,  alt: 'galShowroom', w: 1448, h: 1086 },
  { src: craftShowcase,   alt: 'galCabinet',  w: 1024, h: 1024 },
  { src: bedroomBed,      alt: 'galBed',      w: 1100, h: 1375 },
  { src: diningSet,       alt: 'galSet',      w: 1100, h: 1454 },
]

export const range = [
  {
    room: 'roomLiving',
    classic: {
      image: livingSofa,
      w: 1024,
      h: 1024,
      label: 'labClassicLiving',
      alt: '',
    },
    modern: {
      image: modernSofa,
      w: 1080,
      h: 547,
      label: 'labModernLiving',
      alt: '',
    },
  },
  {
    room: 'roomBedroom',
    classic: {
      image: bedroomBed,
      w: 1100,
      h: 1375,
      label: 'labClassicBed',
      alt: '',
    },
    modern: {
      image: modernBedroom,
      w: 1080,
      h: 601,
      label: 'labModernBed',
      alt: '',
    },
  },
  {
    room: 'roomStorage',
    classic: {
      image: craftShowcase,
      w: 1024,
      h: 1024,
      label: 'labClassicStore',
      alt: '',
    },
    modern: {
      image: modernVanity,
      w: 1080,
      h: 702,
      label: 'labModernStore',
      alt: '',
    },
  },
  {
    room: 'roomWorkspace',
    classic: {
      image: diningMarble,
      w: 1087,
      h: 1447,
      label: 'labClassicWork',
      alt: '',
    },
    modern: {
      image: officeConference,
      w: 1080,
      h: 930,
      label: 'labModernWork',
      alt: '',
    },
  },
]

export const reasons = [
  { title: 'reason1', body: 'reason1b' },
  { title: 'reason2', body: 'reason2b' },
  { title: 'reason3', body: 'reason3b' },
  { title: 'reason4', body: 'reason4b' },
  { title: 'reason5', body: 'reason5b' },
  { title: 'reason6', body: 'reason6b' },
  { title: 'reason7', body: 'reason7b' },
  { title: 'reason8', body: 'reason8b' },
]

export const materials = [
  { name: 'matTeak',   note: 'matTeakN',   swatch: 'linear-gradient(140deg,#9c6b3f,#6f4522)' },
  { name: 'matWalnut', note: 'matWalnutN', swatch: 'linear-gradient(140deg,#6b4630,#3a2418)' },
  { name: 'matOak',    note: 'matOakN',    swatch: 'linear-gradient(140deg,#d3b184,#a8814f)' },
  { name: 'matVelvet', note: 'matVelvetN', swatch: 'linear-gradient(140deg,#1f5b4a,#0e3128)' },
  { name: 'matMarble', note: 'matMarbleN', swatch: 'linear-gradient(140deg,#f2ece0,#cdc2ae)' },
  { name: 'matBrass',  note: 'matBrassN',  swatch: 'linear-gradient(140deg,#e6bb5c,#a87b1c)' },
]

export const styling = [
  { title: 'sty1', body: 'sty1b' },
  { title: 'sty2', body: 'sty2b' },
  { title: 'sty3', body: 'sty3b' },
]

export const faqs = [
  { q: 'faq1q', a: 'faq1a' },

  { q: 'faq2q', a: 'faq2a' },
  { q: 'faq3q', a: 'faq3a' },

  { q: 'faq4q', a: 'faq4a' },
  { q: 'faq5q', a: 'faq5a' },
  { q: 'faq6q', a: 'faq6a' },
]

export const work = [
  { src: sofaEmbroidery, alt: 'galSofa',     w: 1024, h: 1024 },
  { src: officeDirector, alt: 'galOffice',   w: 1080, h: 930 },
  { src: showroomLiving, alt: 'galShowroom', w: 1448, h: 1086 },
  { src: craftShowcase,  alt: 'galCabinet',  w: 1024, h: 1024 },
  { src: heroBed,        alt: 'galBed',      w: 1100, h: 1375 },
]

export const stats = [
  { value: 6,   suffix: '',  label: 'stat1',  note: 'stat1n' },
  { value: 5,   suffix: '',  label: 'stat2',  note: 'stat2n' },
  { value: 100, suffix: '%', label: 'stat3',  note: 'stat3n' },
  { value: 0,   suffix: '৳', label: 'stat4',  note: 'stat4n' },
]

export const founder = {
  image: founderPortrait,
  w: 900,
  h: 1125,
  alt: 'storyPortraitAlt',
  name: 'storyName',
  role: 'storyRole',
}

export const testimonials = [
  {
    id: 'sharmin',
    quote: 'testi1',
    name: 'testi1Name',
    place: 'testi1Place',
    bought: 'testi1Bought',
    initial: 'testi1Initial',
    photo: null,
  },
  {
    id: 'rifat',
    quote: 'testi2',
    name: 'testi2Name',
    place: 'testi2Place',
    bought: 'testi2Bought',
    initial: 'testi2Initial',
    photo: null,
  },
  {
    id: 'tanvir',
    quote: 'testi3',
    name: 'testi3Name',
    place: 'testi3Place',
    bought: 'testi3Bought',
    initial: 'testi3Initial',
    photo: null,
  },
]

export const quoteRooms = [
  { value: 'Living room', label: 'collLiving' },
  { value: 'Bedroom',     label: 'collBedroom' },
  { value: 'Dining',      label: 'collDining' },
  { value: 'Office',      label: 'collOffice' },
  { value: 'Fully custom', label: 'quoteCustom' },
]

export { showroomLiving, craftShowcase, diningMarble, sofaEmbroidery, swingChair, officeConference }
