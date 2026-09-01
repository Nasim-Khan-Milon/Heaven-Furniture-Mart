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
import cutSofaRoyal from '../assets/cut-sofa-royal.webp'
import cutBedWhite from '../assets/cut-bed-white.webp'
import cutDiningCream from '../assets/cut-dining-cream.webp'
import cutSofaBeige from '../assets/cut-sofa-beige.webp'
import cutVanity from '../assets/cut-vanity.webp'
import craftShowcase from '../assets/craft-showcase.webp'

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

/** Builds a wa.me link with a pre-written first message. */
export const wa = (message) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`

export const heroPieces = [
  { id: 'royal',  image: cutSofaRoyal,   w: 935, h: 667, caption: 'pieceRoyal',  alt: 'pieceRoyalAlt' },
  { id: 'bed',    image: cutBedWhite,    w: 861, h: 421, caption: 'pieceBed',    alt: 'pieceBedAlt' },
  { id: 'dining', image: cutDiningCream, w: 950, h: 581, caption: 'pieceDining', alt: 'pieceDiningAlt' },
  { id: 'beige',  image: cutSofaBeige,   w: 950, h: 597, caption: 'pieceBeige',  alt: 'pieceBeigeAlt' },
  { id: 'vanity', image: cutVanity,      w: 557, h: 642, caption: 'pieceVanity', alt: 'pieceVanityAlt' },
]

export const nav = [
  { label: 'navWhy', href: '#why' },
  { label: 'navCollections', href: '#collections' },
  { label: 'navBespoke', href: '#bespoke' },
  { label: 'navRange', href: '#range' },
  { label: 'navProcess', href: '#process' },
  { label: 'navFaq', href: '#faq' },
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
  // TODO — confirm actual lead times with Heaven Furniture Mart before going live.
  { q: 'faq2q', a: 'faq2a' },
  { q: 'faq3q', a: 'faq3a' },
  // TODO — confirm delivery coverage beyond Chattogram before going live.
  { q: 'faq4q', a: 'faq4a' },
  { q: 'faq5q', a: 'faq5a' },
  { q: 'faq6q', a: 'faq6a' },
]

export { showroomLiving, craftShowcase, diningMarble, sofaEmbroidery, swingChair, officeConference }
