// All text content for the site, taken from the Etica Figma design.
const Strings = {
  appName: "Etica Stories",
  appDescription:
    "A full-service branding, digital marketing and software development agency in Kerala and UAE.",

  nav: {
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      // { label: "Our work", href: "#" },
      { label: "About", href: "/about" },
      // { label: "Insights", href: "#" },
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
        question:
          "Can You Handle SEO And Performance Marketing For My Business?",
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

  aboutPage: {
    metaTitle: "About Us | Etica Stories",
    hero: {
      titleLine1: "We Turn Bold Ideas Into",
      titleLine2: "Meaningful Growth.",
      body: "We Bring Branding, Creativity, And Technology Together To Help Businesses Build Stronger Brands, Connect With Their Audiences, And Move Forward With Confidence.",
      primaryCta: "Let's Talk",
      secondaryCta: "Explore Our Work",
    },

    whoWeAre: {
      watermark: "WHO WE ARE",
      label: "WHO WE ARE",
      // Split so the first line breaks after "Marketing" on desktop, as in the design.
      highlightLine1:
        "Etica Stories Is A Full-Service Branding And Digital Marketing",
      highlightLine2: "Agency Serving Businesses Across Kerala And The UAE.",
      rest: "We Are Strategists, Creatives, And Technology Experts United By One Mission: Turning Your Content Chaos Into Consistent, Measurable Growth.",
      bodyStart: "Founded on the belief that ",
      bodyHighlight: "every business deserves solutions that actually work,",
      bodyEnd:
        " we bring together over a decade of expertise in brand identity design, social media marketing, software development, SEO services, web development, and technology consulting. Whether you are a startup in Kochi looking to make your first impression or an established brand in Dubai aiming for a refresh, Etica Stories delivers strategies that are built around your goals not a one size fits all template.",
      creatorsTitle: "Grown Alongside 176+ Creators",
      creatorsBody:
        "Creators, businesses, and brands across Kerala and the UAE.",
    },

    mission: {
      label: "OUR MISSION",
      titleLine1: "Turning Content Chaos",
      titleLine2: "Into Consistent Growth",
      paragraphs: [
        "We Work With Businesses Every Day To Transform Their Marketing Into Clear, Consistent, And Measurable Results. From Strategic Planning To Compelling Content, We Help You Build A Stronger Brand And Make The Most Of Your Digital Presence.",
        "Our Approach Combines Creativity With Data-Driven Thinking, Ensuring Every Digital Marketing Strategy, Website, And Brand Experience Is Purposeful, Relevant, And Aligned With Your Business Goals.",
        "Our Purpose Is Simple: To Help Businesses Grow With Confidence Through Meaningful Communication, Smart Strategy, And Effective Digital Solutions.",
      ],
      badges: {
        web: "Web Solutions",
        strategy: "Digital Strategy",
        growth: "Growth Marketing",
      },
    },

    whatWeDo: {
      label: "WHAT WE DO",
      titleLine1: "Everything Your",
      titleLine2: "Brand Needs to Grow",
      body: "We provide a complete range of branding, marketing, and technology services to help businesses strengthen their presence, connect with their audiences, and achieve meaningful growth.",
      services: [
        {
          icon: "branding",
          title: "Branding & Brand Identity Design",
          body: "Build A Brand That Stands Out. From Strategy And Positioning To Visual Identity, We Create Distinctive Brand Experiences That Communicate Your Values, Connect With Your Audience, And Set You Apart In A Competitive Market.",
        },
        {
          icon: "growth",
          title: "Growth Marketing & Digital Presence",
          body: "Turn Your Digital Presence Into A Growth Engine. We Combine Strategic Planning, Performance Marketing, And Data-Driven Insights To Improve Visibility, Attract The Right Audience, And Support Measurable Business Growth.",
        },
        {
          icon: "social",
          title: "Social Media Marketing",
          body: "Make Every Interaction Count. We Create Engaging Social Media Strategies And Content That Strengthen Your Brand, Build Meaningful Connections, And Keep Your Business Relevant Across The Right Platforms.",
        },
        {
          icon: "seo",
          title: "SEO Services & Web Development",
          body: "Build A Stronger Foundation For Digital Growth. We Develop Search-Optimised Websites And Implement SEO Strategies That Improve Visibility, Enhance User Experience, And Help Your Business Reach The Right Audience.",
        },
        {
          icon: "software",
          title: "Software Development &\nTechnology Consulting",
          body: "Turn Ideas Into Practical Digital Solutions. We Provide Software Development And Technology Consulting To Help Businesses Streamline Operations, Solve Challenges, And Build Technology That Supports Long-Term Growth.",
        },
      ],
    },

    advantage: {
      label: "OUR ADVANTAGE",
      titleLine1: "A Smarter Approach",
      titleLine2: "to Business Growth",
      body: "Businesses across Kerala and the UAE come to us because they need more than individual marketing services. They need a partner who understands their business, respects their goals, and brings both creative and strategic thinking to the table.",
      items: [
        {
          title: "Local Expertise. Global Standards",
          body: "We understand the cultural nuances of Kerala and the UAE marketplace. This means campaigns that resonate with local audiences while meeting the quality benchmark of global brands.",
        },
        {
          title: "Strategy First, Always",
          body: "Every project starts with a clear understanding of your goals. We build focused strategies that connect creative thinking, execution, and measurable outcomes.",
        },
        {
          title: "One Agency. Complete Digital Solutions",
          body: "From brand identity and marketing to websites and technology consulting, our integrated approach brings your digital needs together under one roof.",
        },
        {
          title: "Built For Growth",
          body: "We develop solutions that evolve with your business, helping you strengthen your presence, attract opportunities, and progress with confidence.",
        },
        {
          title: "Transparency And Collaboration",
          body: "We believe the best work comes from working together. Clear communication, shared goals, and an open approach keep every project aligned with your vision.",
        },
      ],
    },

    whoWeServe: {
      label: "WHO WE SERVE",
      titleLine1: "Solutions for Startups, SMEs",
      titleLine2: "& Established Brands",
      body: "We work with businesses at different stages of growth, creating branding, marketing, and technology solutions tailored to their goals, audiences, and business needs.",
      audiences: [
        {
          title: "Small Businesses & Startups In Kerala And Kochi",
          body: "Establish A Strong Foundation With Clear Branding, Effective Digital Marketing, And Practical Solutions Designed To Support Your Business From The Start.",
        },
        {
          title: "E-Commerce Brands",
          body: "Build A Stronger Online Presence With Digital Strategies, Performance Marketing, And Technology Solutions That Support Your E-Commerce Goals.",
        },
        {
          title: "Service-Based Businesses And Professionals",
          body: "Strengthen Your Credibility, Communicate Your Expertise, And Connect With The Right Audience Through Strategic Branding And Digital Presence.",
        },
        {
          title: "Growing Businesses In Dubai And The UAE",
          body: "Expand Your Reach With Marketing, Branding, And Digital Solutions Tailored To The Needs Of Businesses Operating In A Competitive Market.",
        },
        {
          title: "Companies Across The Gulf",
          body: "Build A Consistent Brand Presence And Strengthen Your Digital Visibility With Solutions Designed To Support Your Evolving Business Needs.",
        },
      ],
    },

    cta: {
      eyebrow: "LET’S GET STARTED",
      title: "Let’s Build Something That Moves Your Business Forward",
      body: "If You’re Ready To Grow With Intention, Strengthen Your Brand, And Create Lasting Business Impact, We’re Here To Help. Let’s Turn Your Ideas Into Meaningful Progress With The Right Strategy, Creative Thinking, And Digital Solutions.",
      button: "Let's Talk",
    },
  },

  servicesPage: {
    metaTitle: "Services | Etica Stories",
    hero: {
      titleLine1: "Your next stage of",
      titleLine2: "growth starts here.",
      subtitle: "Complete Digital Solutions For Every Business",
      body: "From Building A Brand People Remember To Creating Digital Experiences That Convert, We Bring Strategy, Creativity And Technology Together To Move Your Business Forward.",
      bodyNote: "Discuss Your Project Explore Our Services",
      primaryCta: "Let's Talk",
      secondaryCta: "Explore Our Work",
    },

    intro: {
      label: "ABOUT SERVICES",
      titleLine1: "A Smarter Approach",
      titleLine2: "to Business Growth",
      body: "You don't need disconnected solutions. You need the right people, ideas and tools working together. Etica Stories helps businesses across Kerala, India and the UAE build stronger brands, reach the right audiences and create digital experiences designed for growth.",
      quoteLead: "Our Goal Is Simple",
      quoteRest:
        ": To Offer Premium Technology Solutions And Services That Improve Performance Whilst Increasing Cost-Efficiency For Your Business.",
    },

    pillars: {
      label: "CAPABILITIES FOR GROWTH",
      title: "Our Core Pillars of Growth",
      servicesIncluded: "Services Included:",
      cta: "Explore more",
      items: [
        {
          number: "01",
          title: "Digital Marketing",
          body: "Data-driven marketing strategies that connect your brand with the right audience across Kerala, UAE and beyond. We design and execute innovative campaigns that make you a successful entrepreneur in the digital space.",
          services: [
            "Social Media Marketing",
            "Influencer Management",
            "Performance Marketing",
            "Amazon Management Services",
          ],
        },
        {
          number: "02",
          title: "Strategy",
          body: "Intelligent go-to-market planning, brand communication frameworks and in-depth market research that put your business ahead of the competition. We look before we take off — always.",
          services: [
            "Product Feasibility Study",
            "Brand Communication",
            "Go-To-Market Strategy",
            "Marketing Roadmap",
            "Brand / Product Launch",
            "Brand Strategy Consulting",
            "Market Research",
          ],
        },
        {
          number: "03",
          title: "Design",
          body: "Creative design solutions that tell your brand story with impact. From brand identity to user experience, we create distinctive visuals that your audience will never forget.",
          services: [
            "Brand Design",
            "UI/UX Design",
            "Communication Design",
            "Packaging Design",
          ],
        },
        {
          number: "04",
          title: "Technology",
          body: "Future-ready technology solutions built by expert developers. From e-commerce platforms to custom enterprise software, we power businesses across Kerala and UAE with cutting-edge tech.",
          // "\n" marks the line breaks used in the design.
          services: [
            "E-Commerce Development",
            "Website Creation",
            "Custom Software\nDevelopment",
            "Search Engine\nOptimisation (SEO)",
          ],
        },
        {
          number: "05",
          title: "Production",
          body: "High-quality visual content production that brings your brand to life. Videos, photography and motion content engineered for engagement and brand recall.",
          services: [
            "Brand Visual Production",
            "Short Video Content\nCreation",
            "Long Video Content\nCreation",
            "Photography",
          ],
        },
      ],
    },

    strategy: {
      titleLine1: "Ideas into impact",
      titleLine2: "Strategy into action",
      watermark: "STRATEGY",
    },

    approach: {
      label: "OUR APPROACH",
      titleLine1: "More than a service",
      titleLine2: "provider. A partner in",
      titleLine3: "your growth",
      body: "We combine the right expertise, a collaborative approach, and a deep understanding of your goals to create solutions that move your business forward.",
      cta: "Let's Talk",
      cards: [
        {
          icon: "team",
          title: "One connected team",
          body: "Bring strategy, design, marketing and technology together under one roof.",
        },
        {
          icon: "target",
          title: "Solutions built around you",
          body: "Choose services aligned with your goals, audience and business needs.",
        },
        {
          icon: "location",
          title: "Regional understanding",
          body: "Work with a team serving businesses across Kerala and the UAE.",
        },
        {
          icon: "growth",
          title: "Growth with purpose",
          body: "Focus on meaningful business outcomes, not just deliverables.",
        },
      ],
    },

    locations: {
      label: "WHERE WE SERVE",
      titleLine1: "Global Reach, Local",
      titleLine2: "Expertise",
      headquarters: {
        label: "HEADQUARTERS",
        title: "Kochi, Kerala",
        body: "5th Floor, HiLite Platino,\nShankar Nagar, Jaya Nagar,\nMaradu, Ernakulam, Kerala 682304",
      },
      kerala: {
        label: "REGIONAL COVERAGE",
        title: "Kerala",
        body: "Digital marketing, branding and software services across all of Kerala.",
      },
      dubai: {
        label: "INTERNATIONAL OFFICE",
        title: "Dubai & UAE",
        body: "Branding, digital marketing and software development services in Dubai and across the UAE.",
      },
      global: {
        label: "REMOTE EXECUTION",
        title: "Global",
        body: "Remote-first delivery for clients across India and the Middle East.",
      },
    },

    cta: {
      eyebrow: "LET'S BUILD WHAT'S NEXT",
      title: "Have a goal in mind? Let’s make it happen.",
      body: "Whether You're Launching Something New, Improving What Exists Or Planning Your Next Stage Of Growth, Let's Find The Right Solution For Your Business.",
      button: "Let's Talk",
    },
  },

  footer: {
    tagline: [
      "Building Stronger Brands Through Creativity.",
      "Driving Meaningful Growth Through Technology.",
    ],
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "Services", href: "/services" },
      { label: "Our work", href: "#" },
      { label: "About", href: "/about" },
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
