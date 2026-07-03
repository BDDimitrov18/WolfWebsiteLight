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
      "Wolf е многопотребителска система за управление на геодезическа, кадастрална и правна практика — поръчки, дейности, парцели, документи за собственост, фактуриране и отчети в реално време.",
  },
  nav: {
    product: "Продукт",
    features: "Възможности",
    architecture: "Архитектура",
    pricing: "Цени",
    docs: "Документация",
    cta: "Заявете демо",
    menu: "Меню",
  },
  hero: {
    eyebrow: "Система за управление на геодезическа практика",
    titleA: "Поръчката,",
    titleB: "проследена до",
    titleC: "идеалната част.",
    lead: "Wolf обединява поръчки, дейности и задачи, парцели и документи за собственост, фактури и отчети в една родна Windows система — с реална синхронизация между всички служители.",
    ctaPrimary: "Заявете демо",
    ctaSecondary: "Разгледайте възможностите",
    note: "Изградено за геодезически, кадастрални и правни кантори в България.",
    floatA: "Поръчка → дейности → задачи",
    floatB: "Парцел → документ → собственик",
    coord: "42.6977° N · 23.3219° E",
    scroll: "Скролирайте",
  },
  trust: {
    title: "Една система за целия жизнен цикъл на поръчката",
    subtitle:
      "От възлагането на клиента до фактурата и отчета — без таблици, без дублиране, без чакане.",
    stats: [
      { value: "20+", label: "работни екрана" },
      { value: "100+", label: "API крайни точки" },
      { value: "0 ms", label: "интерфейс от кеша" },
      { value: "58", label: "автоматизирани теста" },
    ],
  },
  pillars: {
    eyebrow: "Защо Wolf",
    title: "Специализирана, не обща CRM система",
    subtitle:
      "Моделирането на собствеността — парцел ↔ документ ↔ собственик ↔ пълномощно с дробни идеални части — е същината, която общите инструменти не покриват.",
    items: [
      {
        title: "Реално време за всички",
        body: "Промяна, направена от един служител, се появява на екрана на всеки друг — мигновено, чрез SignalR.",
      },
      {
        title: "Мигновен интерфейс",
        body: "Целият работен набор се зарежда в паметта при вход с материализирани индекси за O(1) търсене.",
      },
      {
        title: "Родно за Windows",
        body: "Самостоятелно приложение на Avalonia — без инсталация на .NET, с автоматични обновления.",
      },
      {
        title: "Excel отчети",
        body: "Финансови и оперативни справки, генерирани директно в .xlsx — без нужда от Office.",
      },
    ],
  },
  features: {
    eyebrow: "Обиколка на продукта",
    title: "Всеки екран, изграден за реалната работа",
    subtitle:
      "Заснемане, трасиране, делба, кадастрален проект — работните потоци на кантората, дигитализирани.",
    placeholderNote: "Заместител за екранна снимка",
    items: {
      orders: {
        tag: "Поръчки",
        title: "Поръчки — централният екран",
        body: "Виртуализирана таблица с поръчки: статус, плащане, цена, аванс, парцели и създател. Създаване, редакция, архивиране, търсене в реално време, цветно маркиране със звезди и автоматично изчислен статус на плащане.",
        bullets: [
          "Звезди по служител с палитра и цветови филтър",
          "Статус на плащане: платено / аванс / неплатено",
          "Панел с детайли: дейности, клиенти, имоти, фактури",
        ],
      },
      titleChain: {
        tag: "Имоти и документи",
        title: "Веригата на собствеността",
        body: "Тройната връзка парцел ↔ документ ↔ собственик ↔ пълномощно записва идеалните части, начина на придобиване и типа собственост. Това е специализираното сърце на кадастралния модел.",
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
        body: "Бързи превключватели (маркирани, просрочени, лични, за днес, за седмицата), падащи менюта по статус и текстови търсения по номер, име, населено място, парцел и УПИ.",
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
        tag: "Синхронизация",
        title: "Многопотребителска работа в реално време",
        body: "Всяка промяна на сървъра излъчва събитие до всички останали клиенти. Кешът се обновява, индексите се преизграждат, екраните се актуализират — без презареждане.",
        bullets: [
          "Автоматично преподключване и пълна ресинхронизация",
          "Оптимистично заключване срещу конфликти",
          "Одит лог на всяка промяна",
        ],
      },
      clients: {
        tag: "Клиенти",
        title: "Клиенти и статистика",
        body: "Търсим списък с клиенти и финансово обобщение за цялото време: платено, неплатено, общо, брой поръчки и разбивка по поръчка с експорт в Excel.",
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
          "Брой поръчки, клиенти, дейности, уникални парцели",
          "Достъп само за администратори",
        ],
      },
    },
  },
  titleChain: {
    eyebrow: "Специализираният модул",
    title: "Веригата на собствеността, моделирана коректно",
    body: "Един парцел има множество документи. Един документ свързва множество собственици. Всеки собственик държи идеална част и може да бъде представляван чрез пълномощно. Wolf записва точно тази тройна връзка.",
    steps: [
      { label: "Парцел", value: "КИ · УПИ · местност" },
      { label: "Документ", value: "акт · номер · издател" },
      { label: "Собственик", value: "идеална част 1/3" },
      { label: "Пълномощно", value: "номер · дата" },
    ],
  },
  architecture: {
    eyebrow: "Архитектура",
    title: "Три слоя, един споделен договор",
    subtitle:
      "Роден десктоп клиент ⇄ REST/WebSocket API ⇄ PostgreSQL. C# / .NET 8 навсякъде.",
    layers: [
      {
        name: "Wolf Desktop",
        tech: "Avalonia 11 · MVVM",
        body: "Целият интерфейс, изгледи, кеш в паметта, SignalR клиент и автообновяване чрез Velopack.",
      },
      {
        name: "Wolf API",
        tech: "ASP.NET Core 8",
        body: "REST контролери, JWT удостоверяване, SignalR хъб, одит лог и repository шаблон.",
      },
      {
        name: "PostgreSQL",
        tech: "EF Core 8 · Npgsql",
        body: "22 домейн ентитета, оптимистично заключване чрез xmin, индексирани външни ключове.",
      },
    ],
    bullets: [
      "Ролева авторизация (Admin / стандартен потребител)",
      "JWT със 24-часова валидност, подписан с HMAC-SHA256",
      "Docker сървър + автообновяващи се клиенти в LAN",
    ],
  },
  pricing: {
    eyebrow: "Внедряване",
    title: "Изградено за вашата кантора",
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
          "Сървър в Docker + PostgreSQL",
          "Автообновяващи се клиенти в LAN",
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
    emailPlaceholder: "вие@кантора.bg",
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
      architecture: "Архитектура",
      pricing: "Цени",
      docs: "Документация",
      gettingStarted: "Първи стъпки",
      model: "Модел на данните",
      reports: "Справки",
      contact: "Контакти",
      demo: "Заявете демо",
      privacy: "Поверителност",
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
    architecture: "Architecture",
    pricing: "Pricing",
    docs: "Docs",
    cta: "Book a demo",
    menu: "Menu",
  },
  hero: {
    eyebrow: "Surveying practice management system",
    titleA: "Every order,",
    titleB: "traced down to the",
    titleC: "ideal part.",
    lead: "Wolf unifies orders, activities and tasks, plots and ownership documents, invoices and reports into one native Windows system — with real-time sync across every member of staff.",
    ctaPrimary: "Book a demo",
    ctaSecondary: "Explore the features",
    note: "Built for surveying, cadastral and legal firms in Bulgaria.",
    floatA: "Order → activities → tasks",
    floatB: "Plot → document → owner",
    coord: "42.6977° N · 23.3219° E",
    scroll: "Scroll",
  },
  trust: {
    title: "One system for the whole order lifecycle",
    subtitle:
      "From a client's commission to the invoice and the report — no spreadsheets, no duplication, no waiting.",
    stats: [
      { value: "20+", label: "working screens" },
      { value: "100+", label: "API endpoints" },
      { value: "0 ms", label: "UI served from cache" },
      { value: "58", label: "automated tests" },
    ],
  },
  pillars: {
    eyebrow: "Why Wolf",
    title: "A specialized system, not a generic CRM",
    subtitle:
      "The ownership modeling — plot ↔ document ↔ owner ↔ power of attorney with fractional ideal parts — is the core that generic tools never cover.",
    items: [
      {
        title: "Real-time for everyone",
        body: "A change made by one member of staff appears on every other screen — instantly, over SignalR.",
      },
      {
        title: "Instant interface",
        body: "The entire working dataset loads into memory on login with materialized indexes for O(1) lookups.",
      },
      {
        title: "Native to Windows",
        body: "A self-contained Avalonia app — no .NET install required, with automatic updates.",
      },
      {
        title: "Excel reports",
        body: "Financial and operational reports generated directly to .xlsx — no Office needed.",
      },
    ],
  },
  features: {
    eyebrow: "Product tour",
    title: "Every screen built for the real work",
    subtitle:
      "Survey, staking-out, partition, cadastral project — the firm's workflows, digitized.",
    placeholderNote: "Screenshot placeholder",
    items: {
      orders: {
        tag: "Orders",
        title: "Orders — the core screen",
        body: "A virtualized orders grid: status, payment, price, advance, plots and creator. Create, edit, archive, real-time search, color-coded starring and an auto-calculated payment status.",
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
        tag: "Sync",
        title: "Multi-user, real-time",
        body: "Every server mutation broadcasts an event to all other clients. The cache updates, indexes rebuild, screens refresh — with no reload.",
        bullets: [
          "Auto-reconnect and full resync on drop",
          "Optimistic concurrency against conflicts",
          "Audit log on every mutation",
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
    eyebrow: "Architecture",
    title: "Three tiers, one shared contract",
    subtitle:
      "Native desktop client ⇄ REST/WebSocket API ⇄ PostgreSQL. C# / .NET 8 throughout.",
    layers: [
      {
        name: "Wolf Desktop",
        tech: "Avalonia 11 · MVVM",
        body: "All UI, view-models, the in-memory cache, the SignalR client and auto-update via Velopack.",
      },
      {
        name: "Wolf API",
        tech: "ASP.NET Core 8",
        body: "REST controllers, JWT authentication, a SignalR hub, audit logging and the repository pattern.",
      },
      {
        name: "PostgreSQL",
        tech: "EF Core 8 · Npgsql",
        body: "22 domain entities, optimistic concurrency via xmin, indexed foreign keys.",
      },
    ],
    bullets: [
      "Role-based authorization (Admin / standard user)",
      "JWT with 24-hour expiry, HMAC-SHA256 signed",
      "Dockerized server + auto-updating LAN clients",
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
          "Dockerized server + PostgreSQL",
          "Auto-updating LAN clients",
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
      architecture: "Architecture",
      pricing: "Pricing",
      docs: "Documentation",
      gettingStarted: "Getting started",
      model: "Data model",
      reports: "Reports",
      contact: "Contact",
      demo: "Book a demo",
      privacy: "Privacy",
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
