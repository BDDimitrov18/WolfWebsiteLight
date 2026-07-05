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
    title: "Wolf — Софтуер за управление на проектантска практика",
    description:
      "Wolf е многопотребителска система за управление на проектантска практика — поръчки, дейности, имоти, документи за собственост, фактуриране и отчети в реално време.",
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
    eyebrow: "Система за управление на проектантска практика",
    titleA: "Цялата ви практика",
    titleB: "в една система —",
    titleC: "в реално време.",
    lead: "Wolf събира поръчките, имотите, документите за собственост, фактурите и задачите на практиката на едно място — и целият екип вижда всяка промяна в мига, в който се случи.",
    ctaPrimary: "Заявете демо",
    ctaSecondary: "Разгледайте възможностите",
    note: "Изградено за проектантски практики в България.",
    floatA: "Поръчка → дейности → задачи",
    floatB: "Имот → документ → собственик",
    docChips: [
      { title: "Проект № 2418", meta: "Имот 68134.905.211" },
      { title: "Проект № 2431", meta: "Имот 68134.902.77" },
    ],
    shotCaption:
      "Екранът „Поръчки“ в Wolf — всяка поръчка на практиката със статус, плащане и срокове (данните са примерни). Кликнете, за да го разгледате отблизо.",
  },
  story: {
    eyebrow: "Историята",
    title: "Създадена в една реална практика",
    body: "Wolf започна в семейната ни проектантска практика — със задача всеки в екипа да отчита работата си и всяка поръчка да се вижда, от възлагането до плащането. Две години системата работи всеки ден и се усъвършенства по заявките на хората, които я ползват — докато всяко действие стане бързо и естествено. За това време направи приноса на всеки видим и неведнъж откри неразплатени суми, които иначе щяха да се изгубят.",
    closer: "Wolf не е построена по спецификация, а по нуждите на едно работещо бюро.",
  },
  pillars: {
    eyebrow: "Защо Wolf",
    title: "Специализирана, не обща CRM система",
    subtitle:
      "Wolf покрива основата, която всяка система дава — клиенти, поръчки, фактури и справки — и добавя специфичното за проектантската практика: имоти и документи за собственост, свързани с работата така, както са свързани в действителност.",
    featured: {
      title: "Всеки отчита своята работа",
      body: "Wolf съчетава безпроблемно екипната работа с личната отчетност: целият екип работи по общи поръчки, без приносът на отделния човек да се губи в общото. Структурата поръчка → дейност → задача с изпълнител го прави естествено — работата е обща, задачите са лични, а разпределението на ресурсите стъпва на обективна основа.",
      points: [
        "Всеки служител отбелязва личния си приоритет по поръчките",
        "Месечна справка по служител в Excel",
        "Дневник кой какво е променил и кога",
      ],
    },
    items: [
      {
        title: "Целият екип, по една поръчка",
        body: "Няколко души работят едновременно по един проект — дори по една и съща дейност. Промяната на колегата се появява на вашия екран в мига, в който е направена, а системата пази от взаимно презаписване.",
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
      "Каквато и да е услугата — заснемане, трасиране, делба, кадастрален проект или нещо съвсем друго — работният ѝ поток минава през едни и същи ясни екрани.",
    zoomHint: "Увеличи",
    items: {
      orders: {
        tag: "Поръчки",
        title: "Поръчки — централният екран",
        body: "Всички поръчки на практиката в една таблица: статус, плащане, цена, аванс, имоти и създател. Създаване, редакция, архивиране, търсене в реално време, личен приоритет за всеки служител и автоматично изчислен статус на плащане.",
        bullets: [
          "Личен приоритет по поръчка — с цвят и филтър за всеки служител",
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
        body: "Неразплатено, фактурирано, активни поръчки и просрочени задачи — на един поглед. Отдолу: дейностите по месеци, задачите по статус, вземанията с преход към всяка поръчка и натовареността на екипа. Обновява се в реално време.",
        bullets: [
          "Вземания — кой дължи, колко и от преди колко дни",
          "Натовареност на екипа: активни и завършени задачи по служител",
          "Достъп само за администратори",
        ],
      },
    },
  },
  titleChain: {
    eyebrow: "Специализираният модул",
    chainLabel: "имот ↔ документ ↔ собственик ↔ пълномощно",
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
    title: "Вашите данни, при вашите условия",
    subtitle:
      "Настолно приложение на всяко работно място, свързано към общ сървър. Къде живее той, решавате вие — машина във вашия офис или в облака. И в двата случая базата данни е ваша.",
    layers: [
      {
        name: "Работното място",
        tech: "Windows",
        body: "Настолно приложение на компютъра на всеки служител. Инсталира се за минути и се обновява само, щом излезе нова версия.",
      },
      {
        name: "Вашият сървър",
        tech: "Офис или облак",
        body: "Данните живеят на сървър, който вие контролирате — машина в офиса или в облака, по ваш избор. Екипът се свързва по мрежата, без обвързване с чужда платформа.",
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
        name: "Практика",
        price: "По заявка",
        period: "",
        body: "Внедряване за един офис: сървър, клиенти и обучение на екипа.",
        features: [
          "Сървър във вашия офис или в облака",
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
    tagline: "Система за управление на проектантска практика.",
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
    title: "Wolf — Design practice management software",
    description:
      "Wolf is a multi-user management system for design practices — orders, activities, plots, ownership documents, invoicing and real-time reporting.",
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
    eyebrow: "Design practice management system",
    titleA: "Your whole practice",
    titleB: "in one system —",
    titleC: "in real time.",
    lead: "Wolf brings your orders, properties, ownership documents, invoices and tasks into one place — and the whole team sees every change the moment it happens.",
    ctaPrimary: "Book a demo",
    ctaSecondary: "Explore the features",
    note: "Built for design practices in Bulgaria.",
    floatA: "Order → activities → tasks",
    floatB: "Plot → document → owner",
    docChips: [
      { title: "Project No. 2418", meta: "Plot 68134.905.211" },
      { title: "Project No. 2431", meta: "Plot 68134.902.77" },
    ],
    shotCaption:
      "The Orders screen in Wolf — every order in the practice with its status, payment and deadlines (sample data). Click to take a closer look.",
  },
  story: {
    eyebrow: "The story",
    title: "Built inside a working practice",
    body: "Wolf began in our family's design practice — with one task: every person accounts for their own work, and every order is visible from commission to payment. For two years the system has run daily, refined at the request of the people who use it — until every action became quick and natural. In that time it made each person's contribution measurable and more than once caught unpaid sums that would otherwise have slipped away.",
    closer: "Wolf wasn't built to a specification — it was built around the needs of a working office.",
  },
  pillars: {
    eyebrow: "Why Wolf",
    title: "A specialized system, not a generic CRM",
    subtitle:
      "Wolf covers the base every system gives you — clients, orders, invoices and reports — and adds what is specific to a design practice: properties and ownership documents, linked to the work the way they are linked in reality.",
    featured: {
      title: "Every person accounts for their own work",
      body: "Wolf seamlessly combines teamwork with individual accountability: the whole team works on shared orders, without anyone's contribution getting lost in the whole. The order → activity → task structure, each task with its owner, makes it natural — the work is shared, the tasks are personal, and resource allocation rests on an objective basis.",
      points: [
        "Each person marks their own priority on orders",
        "Monthly per-employee report in Excel",
        "A log of who changed what, and when",
      ],
    },
    items: [
      {
        title: "The whole team, on one order",
        body: "Several people work on the same project at once — even on the same activity. A colleague's change appears on your screen the moment it's made, and the system protects you from overwriting each other.",
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
      "Whatever the service — a survey, staking-out, partition, cadastral project or something else entirely — its workflow runs through the same clear screens.",
    zoomHint: "Enlarge",
    items: {
      orders: {
        tag: "Orders",
        title: "Orders — the core screen",
        body: "Every order in the firm in one grid: status, payment, price, advance, plots and creator. Create, edit, archive, real-time search, a personal priority marker for each employee and an auto-calculated payment status.",
        bullets: [
          "Personal priority per order — with a color and filter for each employee",
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
        body: "Outstanding, invoiced, active orders and overdue tasks — at a glance. Below: monthly activity, tasks by status, receivables with a jump to any order, and the team's workload. Updates in real time.",
        bullets: [
          "Receivables — who owes, how much and since when",
          "Team workload: active and completed tasks per person",
          "Admin-only access",
        ],
      },
    },
  },
  titleChain: {
    eyebrow: "The specialized module",
    chainLabel: "plot ↔ document ↔ owner ↔ PoA",
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
    title: "Your data, on your terms",
    subtitle:
      "A desktop app on every workstation, connected to a shared server. Where it lives is your call — a machine in your office or in the cloud. Either way, the database is yours.",
    layers: [
      {
        name: "The workstation",
        tech: "Windows",
        body: "A desktop application on each employee's computer. Installs in minutes and updates itself whenever a new version ships.",
      },
      {
        name: "Your server",
        tech: "Office or cloud",
        body: "The data lives on a server you control — a machine in the office or in the cloud, your choice. The team connects over the network, with no platform lock-in.",
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
          "A server in your office or in the cloud",
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
    tagline: "Management system for design practices.",
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
