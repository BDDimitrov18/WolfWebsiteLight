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
  "permissions",
] as const;

const bg = {
  meta: {
    title: "Wolf — Софтуер за управление на проектантска практика",
    description:
      "Wolf е многопотребителска система за управление на проектантска практика — поръчки, дейности, имоти, документи за собственост, фактуриране и отчети в реално време.",
  },
  nav: {
    product: "Продукт",
    features: "Функционалности",
    architecture: "Как работи",
    pricing: "Цени",
    docs: "Документация",
    cta: "Заявете демо",
    menu: "Меню",
    close: "Затвори",
  },
  hero: {
    titleAPre: "",
    titleAMark: "Цялата",
    titleAPost: " ви проектантска практика",
    titleBPre: "— в ",
    titleBMark: "единна софтуерна система",
    titleBPost: "",
    leadPre:
      "Wolf събира поръчките, имотите, документите за собственост, фактурите и задачите на практиката на едно място — и ",
    leadMark: "целият екип вижда всяка промяна в мига, в който се случи.",
    ctaPrimary: "Заявете демо",
    ctaSecondary: "Към видеото",
    docChips: [
      { title: "Проект № 2418", meta: "Имот 68134.905.211" },
      { title: "Проект № 2431", meta: "Имот 68134.902.77" },
    ],
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
        title: "Грижи се сам за себе си",
        body: "Обикновено Windows приложение: инсталира се за минути и се обновява автоматично при нова версия.",
      },
      {
        title: "Справки, готови за счетоводителя",
        body: "Финансовите и оперативните справки излизат директно като .xlsx файлове — отварят се навсякъде, без инсталиран Office. Фактурите излизат като готов PDF.",
      },
    ],
  },
  film: {
    eyebrow: "Филмът",
    title: "Възможностите на Wolf — за три минути",
    subtitle:
      "Кратка демонстрация на възможностите на системата. Филмът е анимиран, а интерфейсът в него е опростен за прегледност. Снимки на реалния интерфейс са показани на страница „Функционалности“.",
    play: "Пусни филма",
    caption: "Демонстрация на възможностите · анимирана · 3:26",
  },
  features: {
    eyebrow: "Обиколка на продукта",
    title: "Всеки екран, изграден за реалната работа",
    subtitle:
      "Каквато и да е услугата — заснемане, трасиране, делба, кадастрален проект или нещо съвсем друго — работният ѝ поток минава през едни и същи ясни екрани.",
    zoomHint: "Увеличи",
    shotPrev: "Предишен изглед",
    shotNext: "Следващ изглед",
    boardPages: ["Обобщение", "Финанси", "Екип"],
    adminPages: ["Роли и права", "Одитен журнал", "Фирмени данни"],
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
        body: "Wolf съставя фактурата от данните на поръчката: редовете се предлагат от дейностите, а ДДС, втората валута и сумата словом се изчисляват сами. Въпреки автоматичното попълване потребителите имат свободата да редактират всяко едно поле от фактурата. Реквизитите на доставчика на услугата идват от „Фирмени данни“ и се замразяват върху всяка издадена фактура. Живият преглед показва точния документ — каквото виждате, това се генерира.",
        bullets: [
          "Номерът идва от сървъра — двама души никога не получават един и същ",
          "Обща фактура: една фактура, разпределена на дялове по няколко поръчки",
          "PDF се генерира на момента от базата — винаги актуален, без пазени файлове",
        ],
      },
      templates: {
        tag: "Шаблони",
        title: "Автоматично попълване на Word документи",
        body: "Wolf попълва документите на практиката автоматично с данните от системата. Шаблон се създава по два начина: като изпишете плейсхолдъри директно в Word файл — или по по-удобния път: визуален конструктор с интерактивно сглобяване от блокове, в който полетата се поставят през потребителския интерфейс. Конструкторът е тестван и одобрен от експерти в бранша като лесен за работа.",
        bullets: [
          "Всички типове данни и полета от базата се поставят в шаблона — и по двата начина",
          "Жив преглед: примерни данни или реална поръчка, преди да публикувате",
          "При внедряване екипът на разработчика може да подготви шаблоните ви предварително — готови от първия ден",
        ],
      },
      calendar: {
        tag: "Календар",
        title: "Календар и планиране",
        body: "Месечна решетка с групиране на задачите по краен срок, маркиране на просрочените и бърз преход към поръчката. Потребители с определени роли виждат и календарите на другите служители — за ръководителя това е бърз поглед върху натовареността на всеки от екипа за конкретния ден.",
        bullets: [
          "Подчертаване на днес и просрочени задачи",
          "Камбана „задачи за днес“ с брояч",
          "Преглед на календара на колега — според ролята и правата",
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
          "Справките се персонализират и допълват от екипа на разработчика — по ваша заявка",
          "Възможност за многолистови справки, по един лист на служител",
          "Множество филтри по информацията, която справката обработва",
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
        body: "Просрочени и предстоящи задачи, натовареност на екипа, издадени фактури, най-големи платци и поръчки с нефактуриран остатък — на един поглед, с избираем аналитичен период. Всеки панел показва само данните, до които имате права. Обновява се в реално време.",
        bullets: [
          "Най-големи текущи остатъци по поръчки — с преход към всяка",
          "Натовареност на екипа: поръчки, контрол и просрочени по служител",
          "Финансовите панели изискват отделно право „Виждане на вземания“",
        ],
      },
      permissions: {
        tag: "Достъп",
        title: "Роли и права за всеки в екипа",
        body: "Разделът „Администрация“ държи потребителите, ролите, одитния журнал и фирмените данни. Матрица с отметки казва какво може всяка роля — модул по модул, включително обхват на данните: всички записи или само поръчките, в които служителят участва. Правата се прилагат на сървърно ниво: данни, за които потребителят няма право, изобщо не тръгват по мрежата — и не могат да бъдат прихванати от него.",
        bullets: [
          "Собствени роли — създавате ги и им давате точните права",
          "Финансите са отделен модул права: вземания, маржове, плащания",
          "Одитен журнал: кой какво е променил, с преход към записа",
        ],
      },
    },
  },
  titleChain: {
    eyebrow: "Специализираният модул",
    title: "Имоти, документи, собственици",
    body: "Wolf пази имотите, документите за собственост, собствениците и пълномощните — заедно с връзките помежду им. Един имот има няколко документа, а един документ — няколко собственика, всеки с идеалната си част.",
    graph: {
      caption: "Примерни данни",
      flow: "имот → документ → собственик → пълномощно",
      plot: { label: "Имот", id: "68134.905.211", sub: "УПИ IV-211 · 1 240 м²" },
      docs: [
        { label: "Нотариален акт", ref: "№ 143, том II" },
        { label: "Договор за делба", ref: "№ 27 · 2019 г." },
      ],
      owners: [
        { name: "И. Петров", part: "1/2" },
        { name: "М. Петрова", part: "1/4" },
        { name: "Г. Илиев", part: "1/4" },
      ],
      poa: { label: "Пълномощно", ref: "№ 88 · 2024 г." },
    },
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
    teamPrompt: "Колко души е практиката?",
    matchBadge: "за вашия екип",
    cards: [
      {
        name: "Solo",
        users: "1–3 потребители",
        price: "€10",
        period: "/мес.",
        year: "€120/год. — цена за цялата практика, не на потребител",
        perpetual: "или еднократен лиценз €360 (+€65/год. поддръжка по избор)",
        cta: "Заявете демо",
        featured: false,
      },
      {
        name: "Standard",
        users: "4–10 потребители",
        price: "€25",
        period: "/мес.",
        year: "€300/год. — цена за цялата практика, не на потребител",
        perpetual: "или еднократен лиценз €900 (+€160/год. поддръжка по избор)",
        cta: "Заявете демо",
        featured: true,
      },
      {
        name: "Pro",
        users: "11–25 потребители",
        price: "€50",
        period: "/мес.",
        year: "€600/год. — цена за цялата практика, не на потребител",
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
      "Месечната цена е крайна и важи за цялата практика — не се плаща на потребител.",
      "Еднократният лиценз е за цялата практика. Годишната поддръжка (по избор, ~18% от лиценза) включва обновленията и съпорта.",
    ],
  },
  faq: {
    eyebrow: "Въпроси и отговори",
    title: "Каквото бихте попитали на демонстрацията",
    items: [
      {
        q: "Как да видя системата, преди да реша?",
        a: "Заявете демонстрация — показваме Wolf на живо, с примерни данни, и минаваме през вашите работни процеси. Условията за пробно ползване се уговарят на самата демонстрация.",
      },
      {
        q: "Как се пренасят съществуващите ни данни?",
        a: "При внедряването екипът на разработчика съдейства за пренасянето на съществуващите ви записи — клиенти, поръчки, номенклатури. Работните ви файлове остават в познатите папки: Wolf пази пътя към папката на всяка поръчка и я отваря с един клик.",
      },
      {
        q: "Къде стоят данните и чии са?",
        a: "На сървър, който вие контролирате — машина в офиса или в облака, по ваш избор. Базата данни е ваша от първия ден. Достъпът е с потребител и парола, правата се прилагат на сървърно ниво, а одитният журнал пази следа кой какво е променил.",
      },
      {
        q: "Прави ли системата резервни копия?",
        a: "Да — при внедряването се конфигурират автоматични резервни копия на базата данни на вашия сървър, така че информацията на практиката да е защитена и от техническа повреда.",
      },
      {
        q: "Какво става, ако спра абонамента?",
        a: "Базата данни е при вас и остава ваша — не губите информацията си. При спрян абонамент спират обновленията и поддръжката. Ако предпочитате безсрочно ползване, има и еднократен лиценз.",
      },
      {
        q: "Какви са техническите изисквания?",
        a: "Обикновени офис компютри със съвременен Windows (Windows 10 или по-нов). Приложението е самостоятелно — не изисква инсталиран Office или друг софтуер, инсталира се за минути и се обновява само.",
      },
      {
        q: "Как стои въпросът с ЕГН и GDPR?",
        a: "Личните данни — включително ЕГН на собствениците — стоят във вашата база, на вашия сървър, и не се споделят с никого. Полета като ЕГН и адрес са по избор: запис се създава и само с име. Ролите ограничават кой какво вижда, а одитният журнал записва всяка промяна — практиката остава администратор на данните си.",
      },
      {
        q: "На потребител ли се плаща?",
        a: "Не. Цената е за цялата практика — плановете се различават само по размера на екипа. Колегите ви не струват допълнително.",
      },
    ],
  },
  footer: {
    tagline: "Система за управление на проектантска практика.",
    madeIn: "Проектирано и разработено в България.",
    author: "Божидар Димитров",
    product: "Продукт",
    resources: "Ресурси",
    company: "Контакти",
    links: {
      features: "Функционалности",
      architecture: "Как работи",
      pricing: "Цени",
      faq: "Често задавани въпроси",
      docs: "Документация",
      gettingStarted: "Първи стъпки",
      model: "Модел на данните",
      reports: "Справки",
      contact: "Контакти",
      demo: "Заявете демо",
      privacy: "Поверителност",
    },
    rights: "Всички права запазени.",
    version: "Документацията описва версия 1.0.26",
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
          "Сайтът е статичен и няма собствен сървър за данни. Бутонът „Заявете демо“ не изпраща нищо към нас автоматично — той отваря вашата пощенска програма с предварително попълнено писмо, което вие решавате дали да изпратите.",
          "Имейл, който ни изпратите, се използва единствено за да ви отговорим и да уговорим демонстрация. Не го споделяме с трети страни и не изпращаме маркетингови съобщения.",
          "Сайтът запомня няколко предпочитания в хранилището на вашия браузър: езика на интерфейса, че въвеждащата анимация е показана, последната прочетена глава от документацията и избран размер на екипа в страницата с цените. Те никога не напускат устройството ви, ние нямаме достъп до тях, а изчистването на данните за сайта в браузъра ги премахва.",
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
    continueReading: "Продължете откъдето спряхте",
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
    close: "Close",
  },
  hero: {
    titleAPre: "Your ",
    titleAMark: "whole",
    titleAPost: " design practice",
    titleBPre: "— in one ",
    titleBMark: "unified software system",
    titleBPost: "",
    leadPre:
      "Wolf brings your orders, properties, ownership documents, invoices and tasks into one place — and ",
    leadMark: "the whole team sees every change the moment it happens.",
    ctaPrimary: "Book a demo",
    ctaSecondary: "Watch the video",
    docChips: [
      { title: "Project No. 2418", meta: "Plot 68134.905.211" },
      { title: "Project No. 2431", meta: "Plot 68134.902.77" },
    ],
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
  film: {
    eyebrow: "The film",
    title: "Wolf's capabilities — in three minutes",
    subtitle:
      "A short showcase of what the system can do. The film is motion-designed, with an interface simplified for watchability; on-screen text is in Bulgarian. Screenshots of the real interface are on the Features page.",
    play: "Play the film",
    caption: "A functionality showcase · motion-designed · 3:26",
  },
  features: {
    eyebrow: "Product tour",
    title: "Every screen built for the real work",
    subtitle:
      "Whatever the service — a survey, staking-out, partition, cadastral project or something else entirely — its workflow runs through the same clear screens.",
    zoomHint: "Enlarge",
    shotPrev: "Previous view",
    shotNext: "Next view",
    boardPages: ["Summary", "Finance", "Team"],
    adminPages: ["Roles & rights", "Audit log", "Company data"],
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
        body: "Wolf assembles the invoice from the order's data: line items are suggested from the activities, and VAT, the second currency and the amount in words are computed for you. Despite the automatic filling, users are free to edit every single field of the invoice. The service supplier's details come from “Company data” and are frozen onto every issued invoice. A live preview shows the exact document — what you see is what gets generated.",
        bullets: [
          "The number comes from the server — two people can never get the same one",
          "Shared invoices: one invoice split into shares across several orders",
          "The PDF is rendered on demand from the database — always current, no stored files",
        ],
      },
      templates: {
        tag: "Templates",
        title: "Automatic filling of Word documents",
        body: "Wolf fills your practice's documents automatically with the data in the system. A template is made in two ways: by typing placeholders straight into a Word file — or the friendlier way: a visual builder with interactive block assembly, where the fields are placed through the user interface. The builder has been tested and verified by experts in the field to be easy to work with.",
        bullets: [
          "Every data type and field in the database can go into a template — with either method",
          "Live preview: sample data or a real order, before you publish",
          "At deployment, the developer's team can prepare your templates in advance — ready from day one",
        ],
      },
      calendar: {
        tag: "Calendar",
        title: "Calendar & scheduling",
        body: "A monthly grid grouping tasks by due date, flagging overdue work and jumping straight to the order. Users with the right roles can also view other employees' calendars — a manager's quick read on each person's workload for a given day.",
        bullets: [
          "Today highlight and overdue indicators",
          "“Today's tasks” bell with a count badge",
          "A colleague's calendar at a glance — governed by roles and rights",
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
          "Reports can be customized and extended by the developer's team — on your request",
          "Multi-sheet reports available, one sheet per employee",
          "Multiple filters over the data the report processes",
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
        body: "Overdue and upcoming tasks, team workload, issued invoices, top payers and orders with an unbilled remainder — at a glance, over a selectable analytics period. Every panel shows only the data you have rights to. Updates in real time.",
        bullets: [
          "Largest current balances by order — with a jump to each",
          "Team workload: orders, control duty and overdue per person",
          "The financial panels require the separate “View receivables” right",
        ],
      },
      permissions: {
        tag: "Access",
        title: "Roles and rights for everyone on the team",
        body: "The “Administration” section holds the users, the roles, the audit log and the company data. A checkbox matrix says what each role may do — module by module, including data scope: all records, or only the orders the employee takes part in. Rights are enforced at the server layer: data a user isn't permitted to see never leaves the server — so it can't be intercepted on the network either.",
        bullets: [
          "Your own roles — create them and grant the exact rights",
          "Finance is its own rights module: receivables, margins, payments",
          "Audit log: who changed what, with a jump to the record",
        ],
      },
    },
  },
  titleChain: {
    eyebrow: "The specialized module",
    title: "Plots, documents, owners",
    body: "Wolf keeps the plots, the ownership documents, the owners and the powers of attorney — together with the links between them. One plot has several documents, and one document several owners, each with an ideal part.",
    graph: {
      caption: "Sample data",
      flow: "plot → document → owner → power of attorney",
      plot: { label: "Plot", id: "68134.905.211", sub: "UPI IV-211 · 1,240 m²" },
      docs: [
        { label: "Notarial deed", ref: "No. 143, vol. II" },
        { label: "Partition agreement", ref: "No. 27 · 2019" },
      ],
      owners: [
        { name: "I. Petrov", part: "1/2" },
        { name: "M. Petrova", part: "1/4" },
        { name: "G. Iliev", part: "1/4" },
      ],
      poa: { label: "Power of attorney", ref: "No. 88 · 2024" },
    },
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
    teamPrompt: "How big is your practice?",
    matchBadge: "for your team",
    cards: [
      {
        name: "Solo",
        users: "1–3 users",
        price: "€10",
        period: "/mo",
        year: "€120/year — one price for the whole practice, not per user",
        perpetual: "or a one-time license €360 (+€65/yr optional maintenance)",
        cta: "Book a demo",
        featured: false,
      },
      {
        name: "Standard",
        users: "4–10 users",
        price: "€25",
        period: "/mo",
        year: "€300/year — one price for the whole practice, not per user",
        perpetual: "or a one-time license €900 (+€160/yr optional maintenance)",
        cta: "Book a demo",
        featured: true,
      },
      {
        name: "Pro",
        users: "11–25 users",
        price: "€50",
        period: "/mo",
        year: "€600/year — one price for the whole practice, not per user",
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
      "The monthly price is final and covers the whole practice — you never pay per user.",
      "The one-time license covers the whole firm. Optional annual maintenance (~18% of the license) includes updates and support.",
    ],
  },
  faq: {
    eyebrow: "Questions & answers",
    title: "What you would ask at the demo",
    items: [
      {
        q: "How do I see the system before deciding?",
        a: "Book a demo — we show Wolf live, with sample data, and walk through your own workflows. Trial arrangements are agreed at the demo itself.",
      },
      {
        q: "How does our existing data come across?",
        a: "During rollout the developer's team helps migrate your existing records — clients, orders, nomenclatures. Your working files stay in the folders you know: Wolf keeps each order's folder path and opens it in one click.",
      },
      {
        q: "Where does the data live, and whose is it?",
        a: "On a server you control — a machine in your office or in the cloud, your choice. The database is yours from day one. Access is by username and password, rights are enforced at the server layer, and the audit log keeps a trail of who changed what.",
      },
      {
        q: "Are there backups?",
        a: "Yes — automatic database backups are configured on your server during rollout, so the practice's information is protected against technical failure too.",
      },
      {
        q: "What happens if I stop the subscription?",
        a: "The database is on your server and stays yours — you don't lose your information. A lapsed subscription stops updates and support. If you prefer indefinite use, there is also a one-time license.",
      },
      {
        q: "What are the technical requirements?",
        a: "Ordinary office computers running a modern Windows (Windows 10 or newer). The application is self-contained — no Office or other software required, installs in minutes and updates itself.",
      },
      {
        q: "What about ЕГН and GDPR?",
        a: "Personal data — including owners' ЕГН — lives in your database, on your server, and is shared with no one. Fields like ЕГН and address are optional: a record can be created with just a name. Roles limit who sees what, and the audit log records every change — the practice remains the controller of its data.",
      },
      {
        q: "Is it priced per user?",
        a: "No. The price covers the whole practice — the plans differ only by team size. Your colleagues don't cost extra.",
      },
    ],
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
      faq: "FAQ",
      docs: "Documentation",
      gettingStarted: "Getting started",
      model: "Data model",
      reports: "Reports",
      contact: "Contact",
      demo: "Book a demo",
      privacy: "Privacy",
    },
    rights: "All rights reserved.",
    version: "The documentation describes version 1.0.26",
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
          "The site is static and has no data server of its own. The “Book a demo” button sends nothing to us automatically — it opens your mail client with a pre-filled message that you decide whether to send.",
          "An email you send us is used solely to reply and arrange a demonstration. We do not share it with third parties and we do not send marketing messages.",
          "The site remembers a few preferences in your browser's own storage: the interface language, that the intro animation has been shown, the last documentation chapter you read, and a team size you pick on the pricing page. They never leave your device, we cannot read them, and clearing your browser's site data removes them.",
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
    continueReading: "Continue where you left off",
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
