// Image paths (files live in /public/images).
const Images = {
  hero: "/images/hero.jpg",
  mission: "/images/mission.jpg",
  team: "/images/team.jpg",
  ctaLaptop: "/images/cta-laptop.jpg",

  about: {
    hero: "/images/about/hero.jpg",
    missionWeb: "/images/about/mission-web.jpg",
    missionStrategy: "/images/about/mission-strategy.jpg",
    serve: [
      "/images/about/serve-1.jpg",
      "/images/about/serve-2.jpg",
      "/images/about/serve-3.jpg",
      "/images/about/serve-4.jpg",
      "/images/about/serve-5.jpg",
    ],
  },

  services: {
    hero: "/images/services/hero.jpg",
    approachTeam: "/images/services/approach-team.jpg",
    approachDesk: "/images/services/approach-desk.jpg",
    pillars: [
      "/images/services/pillar-marketing.jpg",
      "/images/services/pillar-strategy.jpg",
      "/images/services/pillar-design.jpg",
      "/images/services/pillar-technology.jpg",
      "/images/services/pillar-production.jpg",
    ],
    strategyChess: "/images/services/strategy-chess.webp",
    locationCity: "/images/services/location-city.jpg",
    ctaHandshake: "/images/services/cta-handshake.jpg",
  },

  clients: {
    fab: "/images/clients/fab.png",
    saaz: "/images/clients/saaz.png",
    emphz: "/images/clients/emphz.svg",
    swaahJuniors: "/images/clients/swaah-juniors.png",
    introlines: "/images/clients/introlines.png",
  },
} as const;

export default Images;
