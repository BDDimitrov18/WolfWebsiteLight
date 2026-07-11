/**
 * Bilingual copy (BG / EN).
 * Every feature claim is grounded in Wolf.Desktop/PROJECT_OVERVIEW.md.
 * BG is the primary market language; EN is for commercial appraisal.
 */

export type Locale = "bg" | "en";

export const FEATURE_KEYS = [
  "orders",
  "titleChain",
  "invoicing",
  "templates",
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
        body: "Финансовите и оперативните справки излизат директно като .xlsx файлове — отварят се навсякъде, без инсталиран Office. Фактурите излизат като готов PDF.",
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
      invoicing: {
        tag: "Фактуриране",
        title: "Фактура в PDF — направо от поръчката",
        body: "Wolf съставя фактурата от данните на поръчката: редовете се предлагат от дейностите, а ДДС, втората валута и сумата словом се изчисляват сами. Живият преглед показва точния документ — каквото виждате, това се генерира.",
        bullets: [
          "Номерът идва от сървъра — двама души никога не получават един и същ",
          "Обща фактура: една фактура, разпределена на дялове по няколко поръчки",
          "PDF се генерира на момента от базата — винаги актуален, без пазени файлове",
        ],
      },
      templates: {
        tag: "Шаблони",
        title: "Вашите бланки, попълнени от системата",
        body: "Качете свой .docx файл с плейсхолдъри като {{order.name}} и {{client.fullname}} — Wolf го попълва с актуалните данни на всяка поръчка и записва готовия документ направо в нейната папка. С вградена проверка на шаблона и преглед върху реална поръчка.",
        bullets: [
          "Договори, протоколи, писма — всяка бланка на практиката",
          "Списъци с {{#each}} — имоти, собственици и дейности в таблици",
          "Шаблоните се споделят в екипа в реално време",
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
    eyebrow: "Цени",
    title: "Ясни цени, два начина на плащане",
    subtitle:
      "Абонамент или еднократен лиценз — изберете модела, който пасва на практиката. Всеки план включва пълната функционалност, реалното време и автоматичните обновления.",
    recommended: "Препоръчан план",
    cards: [
      {
        name: "Solo",
        users: "1–3 потребители",
        price: "€10",
        period: "/мес.",
        year: "€120/год. при годишно фактуриране",
        perpetual: "или еднократен лиценз €360 (+€65/год. поддръжка по избор)",
        cta: "Заявете демо",
        featured: false,
      },
      {
        name: "Standard",
        users: "4–10 потребители",
        price: "€25",
        period: "/мес.",
        year: "€300/год. при годишно фактуриране",
        perpetual: "или еднократен лиценз €900 (+€160/год. поддръжка по избор)",
        cta: "Заявете демо",
        featured: true,
      },
      {
        name: "Pro",
        users: "11–25 потребители",
        price: "€50",
        period: "/мес.",
        year: "€600/год. при годишно фактуриране",
        perpetual: "или еднократен лиценз €1 800 (+€325/год. поддръжка по избор)",
        cta: "Заявете демо",
        featured: false,
      },
      {
        name: "Предприятие",
        users: "25+ потребители",
        price: "По договаряне",
        period: "",
        year: "Индивидуална оферта за обем, внедряване и поддръжка",
        perpetual: "Еднократен лиценз — по договаряне",
        cta: "Свържете се",
        featured: false,
      },
    ],
    notes: [
      "Цените са в евро, без ДДС (20%).",
      "Абонаментът е на практика и се фактурира годишно; при месечно фактуриране цената е с около 20% по-висока.",
      "Еднократният лиценз е за цялата практика. Годишната поддръжка (по избор, ~18% от лиценза) включва обновленията и съпорта.",
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
    talk: "Предпочитате да поговорим?",
  },
  footer: {
    tagline: "Система за управление на проектантска практика.",
    madeIn: "Проектирано и разработено в България.",
    author: "Божидар Димитров",
    product: "Продукт",
    resources: "Ресурси",
    company: "Контакти",
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
      privacy: "Поверителност",
    },
    rights: "Всички права запазени.",
    version: "Описана версия 1.0.24",
  },
  privacyPage: {
    title: "Политика за поверителност",
    updated: "Актуализирана: юли 2026 г.",
    intro:
      "Тази страница описва какви данни събира сайтът на Wolf и как се използват. Администратор на данните е Божидар Дамянов Димитров — bddimitrov18@gmail.com, +359 877 139 712.",
    sections: [
      {
        h: "Какво събира този сайт",
        ps: [
          "Сайтът е статичен и няма собствен сървър за данни. Формата „Заявете демо“ не изпраща нищо към нас автоматично — тя отваря вашата пощенска програма с предварително попълнено писмо, което вие решавате дали да изпратите.",
          "Имейл, който ни изпратите, се използва единствено за да ви отговорим и да уговорим демонстрация. Не го споделяме с трети страни и не изпращаме маркетингови съобщения.",
        ],
      },
      {
        h: "Анализ на посещенията",
        ps: [
          "Сайтът използва Google Analytics, за да разберем кои страници се четат и колко посетители имаме. Данните са обобщени — не ги свързваме с конкретни лица.",
          "Хостингът (GitHub Pages) може да записва стандартни сървърни логове — IP адрес и заявена страница — съгласно политиката за поверителност на GitHub.",
        ],
      },
      {
        h: "Вашите права",
        ps: [
          "Съгласно ОРЗД (GDPR) можете да поискате достъп до данните, които съхраняваме за вас, тяхната корекция или изтриване. Пишете ни на bddimitrov18@gmail.com — отговаряме в разумен срок.",
          "Ако смятате, че правата ви са нарушени, можете да подадете жалба до Комисията за защита на личните данни (cpdp.bg).",
        ],
      },
      {
        h: "Данните в самата система Wolf",
        ps: [
          "Wolf работи върху база данни, която е собственост на вашата практика и се намира на ваш сървър или във ваш облачен акаунт. Ние нямаме достъп до нея — нито сайтът, нито приложението изпращат ваши работни данни към нас.",
        ],
      },
    ],
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
        body: "Financial and operational reports come out as ready .xlsx files — they open anywhere, no Office install needed. Invoices come out as a finished PDF.",
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
      invoicing: {
        tag: "Invoicing",
        title: "A PDF invoice — straight from the order",
        body: "Wolf assembles the invoice from the order's data: line items are suggested from the activities, and VAT, the second currency and the amount in words are computed for you. A live preview shows the exact document — what you see is what gets generated.",
        bullets: [
          "The number comes from the server — two people can never get the same one",
          "Shared invoices: one invoice split into shares across several orders",
          "The PDF is rendered on demand from the database — always current, no stored files",
        ],
      },
      templates: {
        tag: "Templates",
        title: "Your own letterheads, filled in by the system",
        body: "Upload your own .docx file with placeholders like {{order.name}} and {{client.fullname}} — Wolf fills it with the live data of any order and saves the finished document straight into that order's folder. With built-in template validation and a preview against a real order.",
        bullets: [
          "Contracts, protocols, letters — every form your practice uses",
          "Lists via {{#each}} — plots, owners and activities in tables",
          "Templates are shared with the team in real time",
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
    eyebrow: "Pricing",
    title: "Clear pricing, two ways to pay",
    subtitle:
      "A subscription or a one-time license — pick the model that fits your practice. Every plan includes the full feature set, real-time sync and automatic updates.",
    recommended: "Recommended plan",
    cards: [
      {
        name: "Solo",
        users: "1–3 users",
        price: "€10",
        period: "/mo",
        year: "€120/year, billed annually",
        perpetual: "or a one-time license €360 (+€65/yr optional maintenance)",
        cta: "Book a demo",
        featured: false,
      },
      {
        name: "Standard",
        users: "4–10 users",
        price: "€25",
        period: "/mo",
        year: "€300/year, billed annually",
        perpetual: "or a one-time license €900 (+€160/yr optional maintenance)",
        cta: "Book a demo",
        featured: true,
      },
      {
        name: "Pro",
        users: "11–25 users",
        price: "€50",
        period: "/mo",
        year: "€600/year, billed annually",
        perpetual: "or a one-time license €1,800 (+€325/yr optional maintenance)",
        cta: "Book a demo",
        featured: false,
      },
      {
        name: "Enterprise",
        users: "25+ users",
        price: "Custom",
        period: "",
        year: "A tailored quote for volume, rollout and support",
        perpetual: "One-time licensing — on request",
        cta: "Get in touch",
        featured: false,
      },
    ],
    notes: [
      "Prices are in EUR, excluding VAT (20%).",
      "Subscriptions are per firm, billed annually; monthly billing is about 20% higher.",
      "The one-time license covers the whole firm. Optional annual maintenance (~18% of the license) includes updates and support.",
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
    talk: "Prefer to talk?",
  },
  footer: {
    tagline: "Management system for design practices.",
    madeIn: "Designed and built in Bulgaria.",
    author: "Bozhidar Dimitrov",
    product: "Product",
    resources: "Resources",
    company: "Contacts",
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
      privacy: "Privacy",
    },
    rights: "All rights reserved.",
    version: "Documented version 1.0.24",
  },
  privacyPage: {
    title: "Privacy policy",
    updated: "Updated: July 2026",
    intro:
      "This page describes what data the Wolf website collects and how it is used. The data controller is Bozhidar Damyanov Dimitrov — bddimitrov18@gmail.com, +359 877 139 712.",
    sections: [
      {
        h: "What this site collects",
        ps: [
          "The site is static and has no data server of its own. The “Book a demo” form sends nothing to us automatically — it opens your mail client with a pre-filled message that you decide whether to send.",
          "An email you send us is used solely to reply and arrange a demonstration. We do not share it with third parties and we do not send marketing messages.",
        ],
      },
      {
        h: "Visit analytics",
        ps: [
          "The site uses Google Analytics to understand which pages are read and how many visitors we have. The data is aggregate — we do not tie it to individual people.",
          "The hosting provider (GitHub Pages) may record standard server logs — IP address and requested page — under GitHub's own privacy policy.",
        ],
      },
      {
        h: "Your rights",
        ps: [
          "Under the GDPR you may request access to the data we hold about you, its correction or its deletion. Write to bddimitrov18@gmail.com — we reply within a reasonable time.",
          "If you believe your rights have been violated, you may lodge a complaint with the Bulgarian Commission for Personal Data Protection (cpdp.bg).",
        ],
      },
      {
        h: "Data inside the Wolf system itself",
        ps: [
          "Wolf runs on a database owned by your practice, hosted on your server or in your own cloud account. We have no access to it — neither the website nor the application sends your working data to us.",
        ],
      },
    ],
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
