/**
 * Bilingual copy (BG / EN).
 * Every feature claim is grounded in Wolf.Desktop/PROJECT_OVERVIEW.md.
 * BG is the primary market language; EN is for commercial appraisal.
 */

export type Locale = "bg" | "en";

export const FEATURE_KEYS = [
  "orders",
  "titleChain",
  "calendar",
  "filters",
  "reports",
  "realtime",
  "clients",
  "dashboard",
] as const;

const bg = {
  meta: {
    title: "Wolf — Софтуер за геодезия, кадастър и правна документация",
    description:
      "Wolf е многопотребителска система за управление на геодезическа, кадастрална и правна практика — поръчки, дейности, имоти, документи за собственост, фактуриране и отчети в реално време.",
  },
  nav: {
    product: "Продукт",
    features: "Възможности",
    architecture: "Как работи",
    pricing: "Цени",
    docs: "Документация",
    cta: "Заявете демо",
    menu: "Меню",
  },
  hero: {
    eyebrow: "Система за управление на геодезическа практика",
    titleA: "Цялата ви практика",
    titleB: "в една система —",
    titleC: "в реално време.",
    lead: "Wolf събира поръчките, имотите, документите за собственост, фактурите и задачите на практиката на едно място — и целият екип вижда всяка промяна в мига, в който се случи.",
    ctaPrimary: "Заявете демо",
    ctaSecondary: "Разгледайте възможностите",
    note: "Изградено за геодезически, кадастрални и правни практики в България.",
    floatA: "Поръчка → дейности → задачи",
    floatB: "Имот → документ → собственик",
    docChips: [
      { title: "Проект № 2418", meta: "Имот 68134.905.211" },
      { title: "Проект № 2431", meta: "Имот 68134.902.77" },
    ],
    coord: "42.6977° N · 23.3219° E",
    scroll: "Скролирайте",
  },
  trust: {
    title: "Една система за целия жизнен цикъл на поръчката",
    subtitle:
      "От възлагането на клиента до фактурата и отчета — без таблици, без дублиране, без чакане.",
    stats: [
      { value: "20+", label: "работни екрана" },
      { value: "5", label: "готови справки в Excel" },
      { value: "100%", label: "реално време на всеки екран" },
      { value: "1", label: "система вместо папки и таблици" },
    ],
  },
  pillars: {
    eyebrow: "Защо Wolf",
    title: "Специализирана, не обща CRM система",
    subtitle:
      "Моделирането на собствеността — имот ↔ документ ↔ собственик ↔ пълномощно с дробни идеални части — е същината, която общите инструменти не покриват.",
    featured: {
      title: "Всеки отчита своята работа",
      body: "Wolf се различава от другите системи по това, че всеки служител отчита работата си поотделно. Виждате не само общото производство на практиката, а и самостоятелния принос на всеки — основа за по-коректно разпределение на възнагражденията спрямо труда и за по-точна отчетност на фирмата.",
      points: [
        "Цветни звезди и задачи по служител",
        "Месечна справка по служител в Excel",
        "Класация на служителите на таблото",
      ],
    },
    items: [
      {
        title: "Всички виждат едно и също",
        body: "Промяната на колегата се появява на вашия екран в секундата, в която е направена — без презареждане и без „кой има последната версия“.",
      },
      {
        title: "Без чакане",
        body: "Търсене, филтри и списъци реагират мигновено — дори с хиляди поръчки, имоти и задачи.",
      },
      {
        title: "Грижи се само за себе си",
        body: "Обикновено Windows приложение: инсталира се за минути и се обновява автоматично при нова версия.",
      },
      {
        title: "Справки, готови за счетоводителя",
        body: "Финансовите и оперативните справки излизат директно като .xlsx файлове — отварят се навсякъде, без инсталиран Office.",
      },
    ],
  },
  features: {
    eyebrow: "Обиколка на продукта",
    title: "Всеки екран, изграден за реалната работа",
    subtitle:
      "Заснемане, трасиране, делба, кадастрален проект — работните потоци на проектантската практика, дигитализирани.",
    zoomHint: "Увеличи",
    items: {
      orders: {
        tag: "Поръчки",
        title: "Поръчки — централният екран",
        body: "Всички поръчки на практиката в една таблица: статус, плащане, цена, аванс, имоти и създател. Създаване, редакция, архивиране, търсене в реално време, цветни звезди по служител и автоматично изчислен статус на плащане.",
        bullets: [
          "Звезди по служител с палитра и цветови филтър",
          "Статус на плащане: платено / аванс / неплатено",
          "Панел с детайли: дейности, клиенти, имоти, фактури",
        ],
      },
      titleChain: {
        tag: "Имоти и документи",
        title: "Веригата на собствеността",
        body: "Тройната връзка имот ↔ документ ↔ собственик ↔ пълномощно записва идеалните части, начина на придобиване и типа собственост. Това е специализираното сърце на кадастралния модел.",
        bullets: [
          "Пълни кадастрални данни: КИ, УПИ, местност, община",
          "Нотариални актове, договори, завещания, актове за собственост",
          "Идеални части (дробна собственост) и пълномощни",
        ],
      },
      calendar: {
        tag: "Календар",
        title: "Календар и планиране",
        body: "Месечна решетка с групиране на задачите по краен срок, маркиране на просрочените и бърз преход към поръчката. Администраторите превключват между служители.",
        bullets: [
          "Подчертаване на днес и просрочени задачи",
          "Камбана „задачи за днес“ с брояч",
          "Превключвател на служители за администратори",
        ],
      },
      filters: {
        tag: "Филтри",
        title: "Разширени филтри за поръчки",
        body: "Бързи превключватели (маркирани, просрочени, лични, за днес, за седмицата), падащи менюта по статус и текстови търсения по номер, име, населено място, имот и УПИ.",
        bullets: [
          "Множествен избор: клиенти, собственици, служители",
          "Филтри по статус на архив, задача и плащане",
          "Индикатор за активни филтри и нулиране",
        ],
      },
      reports: {
        tag: "Справки",
        title: "Аналитични отчети в Excel",
        body: "Готови справки с богато филтриране, експортирани като форматирани .xlsx файлове: всички задачи, задължения, плащания по тип задача и месечни справки по служител.",
        bullets: [
          "Йерархия служител → поръчка → дейност → задача",
          "Многолистови справки, по един лист на служител",
          "Експорт на статистика на клиента",
        ],
      },
      realtime: {
        tag: "Екипна работа",
        title: "Целият екип върху едни и същи данни",
        body: "Работите едновременно с колегите си по едни и същи поръчки. Промените се появяват при всички веднага, а ако двама редактират един запис, системата предупреждава — вместо да губи данни.",
        bullets: [
          "Връзката се възстановява сама след прекъсване",
          "Защита от взаимно презаписване на промени",
          "Дневник кой какво е променил и кога",
        ],
      },
      clients: {
        tag: "Клиенти",
        title: "Клиенти и статистика",
        body: "Пълен списък на клиентите с търсене и финансово обобщение за цялото време: платено, неплатено, общо, брой поръчки и разбивка по поръчка с експорт в Excel.",
        bullets: [
          "Правен тип: физическо лице / фирма / държава / община",
          "Преход към поръчка от справката",
          "Статистика, съобразена с режима активни/архив",
        ],
      },
      dashboard: {
        tag: "Табло",
        title: "Табло за управление",
        body: "Обобщаващи карти, финансов преглед, разбивка по статус, топ 5 служители и последни поръчки — с интерактивен филтър и плавно обновяване при масови промени.",
        bullets: [
          "Приходи, аванси, неплатени, общо фактурирано",
          "Брой поръчки, клиенти, дейности, уникални имоти",
          "Достъп само за администратори",
        ],
      },
    },
  },
  titleChain: {
    eyebrow: "Специализираният модул",
    title: "Веригата на собствеността, моделирана коректно",
    body: "Един имот има множество документи. Един документ свързва множество собственици. Всеки собственик държи идеална част и може да бъде представляван чрез пълномощно. Wolf записва точно тази тройна връзка.",
    steps: [
      { label: "Имот", value: "КИ · УПИ · местност" },
      { label: "Документ", value: "акт · номер · издател" },
      { label: "Собственик", value: "идеална част 1/3" },
      { label: "Пълномощно", value: "номер · дата" },
    ],
  },
  architecture: {
    eyebrow: "Как работи",
    title: "Вашите данни, във вашия офис",
    subtitle:
      "Wolf работи в мрежата на практиката: настолно приложение на всяко работно място, свързано към ваш сървър. Без чужди облаци, без месечни такси към трети страни.",
    layers: [
      {
        name: "Работното място",
        tech: "Windows",
        body: "Настолно приложение на компютъра на всеки служител. Инсталира се за минути и се обновява само, щом излезе нова версия.",
      },
      {
        name: "Вашият сървър",
        tech: "Офис мрежа",
        body: "Всички данни живеят на машина във вашия офис. Екипът се свързва по мрежата — бързо и без абонамент за чужд облак.",
      },
      {
        name: "Паметта на практиката",
        tech: "База данни",
        body: "Една база пази поръчките, имотите, документите и фактурите от първия ден — заедно с дневник кой какво е променил.",
      },
    ],
    bullets: [
      "Вход с потребител и парола, права по роли",
      "Автоматични обновления на всички работни места",
      "Одитен дневник на всяка промяна",
    ],
  },
  pricing: {
    eyebrow: "Внедряване",
    title: "Изградено за вашата практика",
    subtitle:
      "Wolf се внедрява за конкретната практика. Свържете се за оценка спрямо вашия екип, обем данни и работни потоци.",
    cards: [
      {
        name: "Пилот",
        price: "Демо",
        period: "",
        body: "Воден преглед на системата с вашите реални работни потоци.",
        features: [
          "Пълна обиколка на продукта",
          "Оценка на съответствие",
          "Без ангажимент",
        ],
        cta: "Заявете демо",
        featured: false,
      },
      {
        name: "Кантора",
        price: "По заявка",
        period: "",
        body: "Внедряване за един офис: сървър, клиенти и обучение на екипа.",
        features: [
          "Сървър във вашия офис",
          "Инсталация на всички работни места",
          "Миграция на данни и обучение",
          "Реална синхронизация за целия екип",
        ],
        cta: "Свържете се",
        featured: true,
      },
      {
        name: "Предприятие",
        price: "По заявка",
        period: "",
        body: "Множество офиси, разширени отчети и приоритетна поддръжка.",
        features: [
          "Персонализирани справки",
          "Приоритетна поддръжка",
          "Договор за поддръжка",
        ],
        cta: "Свържете се",
        featured: false,
      },
    ],
  },
  cta: {
    eyebrow: "Готови ли сте?",
    title: "Вижте Wolf върху вашите поръчки",
    body: "Половин час е достатъчен, за да преминем от възлагане до фактура и отчет с вашите реални работни потоци.",
    primary: "Заявете демо",
    secondary: "Прочетете документацията",
    emailLabel: "Служебен имейл",
    emailPlaceholder: "вие@praktika.bg",
    send: "Изпрати",
    privacy: "Никога няма да споделим вашите данни.",
  },
  footer: {
    tagline: "Система за управление на геодезическа, кадастрална и правна практика.",
    madeIn: "Проектирано и разработено в България.",
    product: "Продукт",
    resources: "Ресурси",
    company: "Компания",
    links: {
      features: "Възможности",
      architecture: "Как работи",
      pricing: "Цени",
      docs: "Документация",
      gettingStarted: "Първи стъпки",
      model: "Модел на данните",
      reports: "Справки",
      contact: "Контакти",
      demo: "Заявете демо",
    },
    rights: "Всички права запазени.",
    version: "Описана версия 1.0.16",
  },
  docs: {
    title: "Документация",
    subtitle: "Ръководство за Wolf — от първите стъпки до отчетите.",
    searchPlaceholder: "Търсене в документацията…",
    onThisPage: "На тази страница",
    backToSite: "Към сайта",
    prev: "Предишен раздел",
    next: "Следващ раздел",
    nav: {
      gettingStarted: "Първи стъпки",
      model: "Модел: поръчка → дейност → задача",
      filters: "Филтри и търсене",
      reports: "Справки и отчети",
    },
    scaffoldNote:
      "Този раздел е скеле, подготвено за разширяване. Съдържанието е извлечено от PROJECT_OVERVIEW.md.",
  },
};

// English mirrors the Bulgarian structure 1:1.
const en: typeof bg = {
  meta: {
    title: "Wolf — Software for surveying, cadastre & legal documentation",
    description:
      "Wolf is a multi-user management system for surveying, cadastral and legal practices — orders, activities, plots, ownership documents, invoicing and real-time reporting.",
  },
  nav: {
    product: "Product",
    features: "Features",
    architecture: "How it works",
    pricing: "Pricing",
    docs: "Docs",
    cta: "Book a demo",
    menu: "Menu",
  },
  hero: {
    eyebrow: "Surveying practice management system",
    titleA: "Your whole practice",
    titleB: "in one system —",
    titleC: "in real time.",
    lead: "Wolf brings your orders, properties, ownership documents, invoices and tasks into one place — and the whole team sees every change the moment it happens.",
    ctaPrimary: "Book a demo",
    ctaSecondary: "Explore the features",
    note: "Built for surveying, cadastral and legal firms in Bulgaria.",
    floatA: "Order → activities → tasks",
    floatB: "Plot → document → owner",
    docChips: [
      { title: "Project No. 2418", meta: "Plot 68134.905.211" },
      { title: "Project No. 2431", meta: "Plot 68134.902.77" },
    ],
    coord: "42.6977° N · 23.3219° E",
    scroll: "Scroll",
  },
  trust: {
    title: "One system for the whole order lifecycle",
    subtitle:
      "From a client's commission to the invoice and the report — no spreadsheets, no duplication, no waiting.",
    stats: [
      { value: "20+", label: "working screens" },
      { value: "5", label: "ready-made Excel reports" },
      { value: "100%", label: "real-time on every screen" },
      { value: "1", label: "system instead of folders and spreadsheets" },
    ],
  },
  pillars: {
    eyebrow: "Why Wolf",
    title: "A specialized system, not a generic CRM",
    subtitle:
      "The ownership modeling — plot ↔ document ↔ owner ↔ power of attorney with fractional ideal parts — is the core that generic tools never cover.",
    featured: {
      title: "Every person accounts for their own work",
      body: "What sets Wolf apart is that every member of staff reports their work individually. You see not just the firm's overall output but each person's own contribution — the basis for distributing remuneration more fairly against the work done, and for sharper firm-level accountability.",
      points: [
        "Colored stars and tasks per employee",
        "Monthly per-employee report in Excel",
        "Employee leaderboard on the dashboard",
      ],
    },
    items: [
      {
        title: "Everyone sees the same thing",
        body: "A colleague's change appears on your screen the second it's made — no reloading, no \"who has the latest version\".",
      },
      {
        title: "No waiting",
        body: "Search, filters and lists respond instantly — even with thousands of orders, plots and tasks.",
      },
      {
        title: "Takes care of itself",
        body: "A plain Windows application: installs in minutes and updates itself whenever a new version ships.",
      },
      {
        title: "Reports your accountant can open",
        body: "Financial and operational reports come out as ready .xlsx files — they open anywhere, no Office install needed.",
      },
    ],
  },
  features: {
    eyebrow: "Product tour",
    title: "Every screen built for the real work",
    subtitle:
      "Survey, staking-out, partition, cadastral project — the firm's workflows, digitized.",
    zoomHint: "Enlarge",
    items: {
      orders: {
        tag: "Orders",
        title: "Orders — the core screen",
        body: "Every order in the firm in one grid: status, payment, price, advance, plots and creator. Create, edit, archive, real-time search, per-employee colored stars and an auto-calculated payment status.",
        bullets: [
          "Per-employee stars with a palette and color filter",
          "Payment status: paid / advance / unpaid",
          "Detail panel: activities, clients, plots, invoices",
        ],
      },
      titleChain: {
        tag: "Plots & documents",
        title: "The chain of ownership",
        body: "The three-way relationship plot ↔ document ↔ owner ↔ power of attorney records the ideal parts, the way of acquiring and the type of ownership. This is the specialized heart of the cadastral model.",
        bullets: [
          "Full cadastral data: cadastral no., UPI, locality, municipality",
          "Notarial deeds, contracts, testaments, ownership acts",
          "Ideal parts (fractional ownership) and powers of attorney",
        ],
      },
      calendar: {
        tag: "Calendar",
        title: "Calendar & scheduling",
        body: "A monthly grid grouping tasks by due date, flagging overdue work and jumping straight to the order. Admins switch between employees.",
        bullets: [
          "Today highlight and overdue indicators",
          "“Today's tasks” bell with a count badge",
          "Employee switcher for administrators",
        ],
      },
      filters: {
        tag: "Filters",
        title: "Advanced order filters",
        body: "Quick toggles (starred, overdue, personal, for today, for the week), status dropdowns and text searches by number, name, settlement, plot and UPI.",
        bullets: [
          "Multi-select: clients, owners, employees",
          "Filters by archive, task and payment status",
          "Active-filters indicator and reset",
        ],
      },
      reports: {
        tag: "Reports",
        title: "Analytical reports in Excel",
        body: "Built-in reports with rich filtering, exported as styled .xlsx files: all tasks, obligations, payments by task type and monthly per-employee breakdowns.",
        bullets: [
          "Hierarchy employee → order → activity → task",
          "Multi-sheet reports, one sheet per employee",
          "Client statistics export",
        ],
      },
      realtime: {
        tag: "Teamwork",
        title: "The whole team on the same data",
        body: "You and your colleagues work the same orders at the same time. Changes appear for everyone instantly, and if two people edit one record the system warns — instead of losing data.",
        bullets: [
          "The connection recovers by itself after a drop",
          "Protection against overwriting each other's changes",
          "A log of who changed what, and when",
        ],
      },
      clients: {
        tag: "Clients",
        title: "Clients & statistics",
        body: "A searchable client list and an all-time financial summary: paid, unpaid, total, order counts and a per-order breakdown with Excel export.",
        bullets: [
          "Legal type: individual / company / state / municipality",
          "Jump to order from the statistics",
          "Mode-aware (active / archive) statistics",
        ],
      },
      dashboard: {
        tag: "Dashboard",
        title: "Management dashboard",
        body: "Summary cards, a financial overview, status breakdown, top 5 employees and recent orders — with an interactive filter and debounced refresh under bulk changes.",
        bullets: [
          "Revenue, advances, outstanding, total invoiced",
          "Counts of orders, clients, activities, unique plots",
          "Admin-only access",
        ],
      },
    },
  },
  titleChain: {
    eyebrow: "The specialized module",
    title: "The chain of ownership, modeled correctly",
    body: "A plot has many documents. A document links many owners. Each owner holds an ideal part and may be represented by a power of attorney. Wolf records exactly this three-way relationship.",
    steps: [
      { label: "Plot", value: "cad. no. · UPI · locality" },
      { label: "Document", value: "deed · number · issuer" },
      { label: "Owner", value: "ideal part 1/3" },
      { label: "Power of attorney", value: "number · date" },
    ],
  },
  architecture: {
    eyebrow: "How it works",
    title: "Your data, in your office",
    subtitle:
      "Wolf runs on the firm's own network: a desktop app on every workstation, connected to your server. No third-party cloud, no per-month fees to someone else.",
    layers: [
      {
        name: "The workstation",
        tech: "Windows",
        body: "A desktop application on each employee's computer. Installs in minutes and updates itself whenever a new version ships.",
      },
      {
        name: "Your server",
        tech: "Office network",
        body: "All data lives on a machine in your own office. The team connects over the network — fast, and with no cloud subscription.",
      },
      {
        name: "The firm's memory",
        tech: "Database",
        body: "One database holds the orders, plots, documents and invoices from day one — along with a log of who changed what.",
      },
    ],
    bullets: [
      "Sign-in with username and password, role-based access",
      "Automatic updates on every workstation",
      "An audit trail of every change",
    ],
  },
  pricing: {
    eyebrow: "Deployment",
    title: "Built for your firm",
    subtitle:
      "Wolf is deployed for the specific practice. Get in touch for an assessment against your team, data scale and workflows.",
    cards: [
      {
        name: "Pilot",
        price: "Demo",
        period: "",
        body: "A guided walkthrough of the system against your real workflows.",
        features: ["Full product tour", "Fit assessment", "No commitment"],
        cta: "Book a demo",
        featured: false,
      },
      {
        name: "Firm",
        price: "On request",
        period: "",
        body: "A single-office deployment: server, clients and team training.",
        features: [
          "A server in your own office",
          "Installed on every workstation",
          "Data migration and training",
          "Real-time sync for the whole team",
        ],
        cta: "Get in touch",
        featured: true,
      },
      {
        name: "Enterprise",
        price: "On request",
        period: "",
        body: "Multiple offices, custom reporting and priority support.",
        features: ["Custom reports", "Priority support", "Maintenance agreement"],
        cta: "Get in touch",
        featured: false,
      },
    ],
  },
  cta: {
    eyebrow: "Ready?",
    title: "See Wolf on your own orders",
    body: "Half an hour is enough to go from a commission to an invoice and a report using your real workflows.",
    primary: "Book a demo",
    secondary: "Read the docs",
    emailLabel: "Work email",
    emailPlaceholder: "you@firm.bg",
    send: "Send",
    privacy: "We'll never share your details.",
  },
  footer: {
    tagline: "Management system for surveying, cadastral and legal practices.",
    madeIn: "Designed and built in Bulgaria.",
    product: "Product",
    resources: "Resources",
    company: "Company",
    links: {
      features: "Features",
      architecture: "How it works",
      pricing: "Pricing",
      docs: "Documentation",
      gettingStarted: "Getting started",
      model: "Data model",
      reports: "Reports",
      contact: "Contact",
      demo: "Book a demo",
    },
    rights: "All rights reserved.",
    version: "Documented version 1.0.16",
  },
  docs: {
    title: "Documentation",
    subtitle: "The Wolf guide — from getting started to reports.",
    searchPlaceholder: "Search the docs…",
    onThisPage: "On this page",
    backToSite: "Back to site",
    prev: "Previous section",
    next: "Next section",
    nav: {
      gettingStarted: "Getting started",
      model: "Model: order → activity → task",
      filters: "Filters & search",
      reports: "Reports & exports",
    },
    scaffoldNote:
      "This section is a scaffold wired for future expansion. Content is sourced from PROJECT_OVERVIEW.md.",
  },
};

export const dictionaries = { bg, en };
