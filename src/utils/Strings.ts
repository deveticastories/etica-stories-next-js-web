// All text content for the site, taken from the Etica Figma design.
const Strings = {
  appName: "Etica Stories",
  appDescription:
    "A full-service branding, digital marketing and software development agency in Kerala and UAE.",

  nav: {
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "#" },
      { label: "Our work", href: "#" },
      { label: "About", href: "#" },
      { label: "Insights", href: "#" },
    ],
    cta: "Let's Talk",
  },

  hero: {
    eyebrow: "Creative Stratergy · Digital Experiences",
    titleLine1: "Where Brands Find Their",
    titleLine2: "Voice & Vision",
    statValue: "360°",
    statLabel: "Creative Thinking",
    description:
      "Strategy-Led Creativity. Thoughtful Design. Digital Experiences Built To Connect.",
    cta: "Start a Project",
    trustedBy: "Trusted By Brands. Driven By Ideas",
  },

  about: {
    highlight:
      "No Matter Which Industry You Belong To, Only Your Success Matters. We Are A Full-Service Branding And Digital Marketing Agency In Kerala",
    rest: "And UAE  Helping Startups, SMEs, And Growth-Focused Businesses Build Powerful Brands, Launch Smarter Marketing Strategies, And Develop Technology That Drives Real Results. From Creative Brand Storytelling To Custom Software Development, Our Team Of Experts Brings 10+ Years Of Experience To Every Project. Whether You Are In Kochi, Calicut, Dubai, Or Abu Dhabi — We Are Built To Grow With You.",
  },

  mission: {
    watermark: "OUR MISSION",
    blocks: [
      {
        title: "Turning Ideas Into Measurable Growth",
        body: "We Combine Creativity, Content, And Technology To Help Businesses Build Stronger Brands, Connect With Their Audiences, And Achieve Meaningful, Measurable Growth.",
      },
      {
        title: "Empowering Businesses to Grow Without Limits",
        body: "We Envision A Digital Landscape Where Every Business Has Access To Smarter, More Effective, And Cost-Efficient Solutions That Unlock New Opportunities And Long-Term Success.",
      },
    ],
  },

  process: [
    {
      title: "Analysis & Planning",
      body: "Every Successful Project Starts With Understanding. We Take The Time To Analyse Your Business Needs, Study Your Market, And Map Out The Right Technology And Marketing Solutions Before A Single Line Of Code Is Written. This Stage Ensures Your Investment Is Always Moving In The Right Direction.",
    },
    {
      title: "Develop & Deploy",
      body: "With A Clear Plan In Place, Our Integrated Team Of Developers, Designers, And Strategists Gets To Work. We Build And Deploy Your Custom Solutions Using The Latest Technologies And Industry Best Practices — Delivering Clean, Tested, Production-Ready Products On Schedule.",
    },
    {
      title: "Support & Optimize",
      body: "Launching Is Just The Beginning. We Provide Ongoing Support, Monitor Performance Metrics, And Continuously Optimise Your Solutions To Keep Them Sharp, Fast, And Effective. Your Growth Does Not Stop At Go-Live — And Neither Do We.",
    },
  ],

  // Scroll story around the process cards: headline → gradient → cards → desktop window → monitor.
  processStory: {
    titleLine1: "We keep our",
    titleLine2: "focus on",
    titleItalic: "what truly matters",
    label: "Our process",
    noteTitle: "Quality is non-negotiable.",
    noteBody:
      "Every project is planned, built and supported by one integrated team — tested, optimised and ready to grow with you.",
    windowTitle: "Process.html",
    desktopIcons: [
      { label: "Moodboard.png", kind: "image" },
      { label: "Brand.png", kind: "image" },
      { label: "Campaign.png", kind: "image" },
      { label: "Projects", kind: "folder" },
      { label: "Roadmap.md", kind: "doc" },
    ],
  },

  whyChoose: {
    titleStart: "Why choose ",
    titleBrand: "Etica",
    titleEnd: "over everyone else?",
    subtitle:
      "We Unite Strategy, Creativity, And Technology To Grow Your Business Without Stretching Your Budget.",
    otherCompaniesLabel: "Other Companies",
    watermark: "Why Choose",
    others: [
      "Generic template solutions that look like everyone else",
      "Limited technical expertise beyond basic services",
      "Separate teams for branding, tech, and marketing",
      "High overhead costs passed on to you",
      "One-size-fits-all approach with no real strategy",
    ],
    etica: [
      "Custom solutions built around your specific business goals",
      "10+ years of deep software and technology expertise",
      "Branding, tech, and marketing fully integrated under one roof",
      "Cost-efficient delivery with premium-quality output",
      "Strategies crafted specifically for your industry and audience",
    ],
  },

  team: {
    title: "The Team Behind Your Growth",
    body: "Meet The Creative Thinkers And Technology Experts Turning Bold Ideas Into Meaningful Impact.",
    cta: "Let's Talk",
    badge: "JOIN OUR TEAM · JOIN OUR TEAM · ",
  },

  faq: {
    title: "Frequently Asked Questions",
    subtitle:
      "Everything You Need To Know About Etica Stories . A Full-Service Branding, Digital Marketing, And Software Development Agency Serving Kerala And UAE.",
    // Only the first answer appears in the Figma design; the rest are drafts to review.
    items: [
      {
        question: "What Does A Digital Marketing And Branding Agency Do?",
        answer:
          "A Digital Marketing And Branding Agency Helps Businesses Build Their Brand, Reach The Right Audience, Increase Online Visibility, And Drive Growth.",
      },
      {
        question:
          "Which Is The Best Branding And Digital Marketing Agency In Kerala And UAE?",
        answer:
          "Etica Stories Combines Branding, Digital Marketing, And Technology Under One Roof, Helping Businesses Across Kerala And The UAE Grow With Strategy-Led Creativity.",
      },
      {
        question: "How Is Etica Stories Different From Other Agencies?",
        answer:
          "We Build Custom Solutions Around Your Goals, Bring 10+ Years Of Technology Expertise, And Keep Branding, Tech, And Marketing Fully Integrated — Without Stretching Your Budget.",
      },
      {
        question: "What Services Does Etica Stories Offer?",
        answer:
          "Branding & Identity, Digital Marketing, Web Design & Development, Technology Solutions, And Content & Creative.",
      },
      {
        question:
          "Do You Offer Software Development Services In Kerala And UAE?",
        answer:
          "Yes. Our Team Designs, Builds, And Deploys Custom Software, Websites, And Applications For Businesses In Kerala And The UAE.",
      },
      {
        question: "What Is Brand Storytelling And Why Does It Matter?",
        answer:
          "Brand Storytelling Shapes How People Feel About Your Business. A Clear, Consistent Story Builds Trust, Sets You Apart, And Turns Audiences Into Loyal Customers.",
      },
      {
        question: "Can You Handle SEO And Performance Marketing For My Business?",
        answer:
          "Yes. We Plan And Run SEO And Performance Marketing Campaigns, Track The Results, And Keep Optimising For Measurable Growth.",
      },
      {
        question: "Do You Offer Technology Consulting For Businesses?",
        answer:
          "Yes. We Analyse Your Business Needs And Recommend The Right Technology And Marketing Solutions Before Any Development Begins.",
      },
      {
        question: "Does Etica Stories Work With UAE Clients?",
        answer:
          "Yes. We Work With Clients Across The UAE, Including Dubai And Abu Dhabi.",
      },
      {
        question: "Which Cities In Kerala Do You Serve?",
        answer:
          "We Serve Businesses Across Kerala, Including Kochi And Calicut.",
      },
    ],
  },

  cta: {
    title: "Let’s Build Something That Moves You Forward",
    body: "We Bring Branding, Creativity, And Technology Together To Help Your Business Grow.",
    button: "Let's Talk",
  },

  footer: {
    tagline: [
      "Building Stronger Brands Through Creativity.",
      "Driving Meaningful Growth Through Technology.",
    ],
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "Services", href: "#" },
      { label: "Our work", href: "#" },
      { label: "About", href: "#" },
      { label: "Insights", href: "#" },
    ],
    servicesTitle: "Our Services",
    services: [
      "Branding & Identity",
      "Digital Marketing",
      "Web Design & Development",
      "Technology Solutions",
      "Content & Creative",
    ],
    contactTitle: "Get In Touch",
    email: "info@eticastories.com",
    phone: "+91 97456 30104",
    languageLabel: "LANGUAGE",
    languages: ["English"],
    copyright: "© 2025 Etica Stories",
    watermark: "ETICA STORIES",
  },
} as const;

export default Strings;
