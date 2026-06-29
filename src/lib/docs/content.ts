/**
 * Docs content (BG / EN) — a scaffold wired for future expansion
 * (Deliverables §10). Sourced from Wolf.Desktop/PROJECT_OVERVIEW.md.
 *
 * Add a page by appending to DOC_PAGES and the registry below; the
 * sidebar and routing read from this single source.
 */
import type { Locale } from "@/lib/i18n/dictionaries";

export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "ul"; items: string[] }
  | { type: "steps"; items: { t: string; d: string }[] }
  | { type: "callout"; text: string }
  | { type: "code"; text: string };

export interface DocPage {
  slug: string; // "" = index
  navKey: "gettingStarted" | "model" | "filters" | "reports";
  title: Record<Locale, string>;
  intro: Record<Locale, string>;
  blocks: Record<Locale, DocBlock[]>;
}

export const DOC_PAGES: DocPage[] = [
  // ----------------------------------------------------------------
  {
    slug: "",
    navKey: "gettingStarted",
    title: { bg: "Първи стъпки", en: "Getting started" },
    intro: {
      bg: "Wolf е многопотребителска система за управление на геодезическа, кадастрална и правна практика. Това ръководство покрива основните понятия и работни потоци.",
      en: "Wolf is a multi-user management system for surveying, cadastral and legal practices. This guide covers the core concepts and workflows.",
    },
    blocks: {
      bg: [
        { type: "h2", id: "what", text: "Какво представлява Wolf" },
        {
          type: "p",
          text: "Wolf управлява пълния жизнен цикъл на клиентските поръчки: дейностите и задачите по тях, служителите, които ги изпълняват, клиентите, които ги възлагат, поземлените парцели и документите за собственост, фактурирането и отчетите.",
        },
        {
          type: "p",
          text: "Продуктът е родно Windows приложение, което комуникира с централен сървър (REST API + синхронизация в реално време) върху база данни PostgreSQL. Множество служители работят едновременно; промените на един потребител се появяват веднага при всички останали.",
        },
        { type: "h2", id: "install", text: "Инсталиране и вход" },
        {
          type: "steps",
          items: [
            { t: "Стартиране", d: "Приложението проверява за обновления чрез Velopack и зарежда данните на брандиран splash екран." },
            { t: "Вход", d: "Въведете потребителско име и парола. Токенът (JWT) носи вашите роли и идентификатор на служител." },
            { t: "Зареждане на кеша", d: "Целият работен набор се зарежда в паметта чрез 18 паралелни заявки за мигновен интерфейс." },
          ],
        },
        { type: "h2", id: "modes", text: "Режими активни / архив" },
        {
          type: "p",
          text: "Превключвателят активни/архив сменя цялото приложение между само активни поръчки (оранжева тема) и всички поръчки включително архивираните (синя тема). Това засяга всеки списък, статистика и брояч.",
        },
        {
          type: "callout",
          text: "Този раздел е скеле, подготвено за разширяване. Съдържанието е извлечено от PROJECT_OVERVIEW.md.",
        },
      ],
      en: [
        { type: "h2", id: "what", text: "What Wolf is" },
        {
          type: "p",
          text: "Wolf manages the full lifecycle of customer orders: the activities and tasks performed on them, the employees who carry them out, the clients who commission them, the land plots and ownership documents, invoicing and reporting.",
        },
        {
          type: "p",
          text: "The product is a native Windows application that talks to a central server (REST API + real-time push) over a PostgreSQL database. Many staff work simultaneously; one user's changes appear on every other screen in real time.",
        },
        { type: "h2", id: "install", text: "Installing & signing in" },
        {
          type: "steps",
          items: [
            { t: "Startup", d: "The app checks for updates via Velopack and loads data on a branded splash screen." },
            { t: "Login", d: "Enter username and password. The JWT carries your roles and employee id." },
            { t: "Cache load", d: "The entire working dataset loads into memory via 18 parallel calls for an instant UI." },
          ],
        },
        { type: "h2", id: "modes", text: "Active / archive modes" },
        {
          type: "p",
          text: "The active/archive toggle switches the whole app between active orders only (orange theme) and all orders incl. archived (blue theme). It affects every list, statistic and badge.",
        },
        {
          type: "callout",
          text: "This section is a scaffold wired for future expansion. Content is sourced from PROJECT_OVERVIEW.md.",
        },
      ],
    },
  },

  // ----------------------------------------------------------------
  {
    slug: "model",
    navKey: "model",
    title: { bg: "Модел: поръчка → дейност → задача", en: "Model: order → activity → task" },
    intro: {
      bg: "Същината на Wolf е йерархията поръчка → дейности → задачи, свързана с парцели, документи за собственост и собственици.",
      en: "The heart of Wolf is the order → activities → tasks hierarchy, linked to plots, ownership documents and owners.",
    },
    blocks: {
      bg: [
        { type: "h2", id: "order", text: "Поръчка (работна поръчка)" },
        {
          type: "p",
          text: "Поръчката е централният транзакционен запис: име, цена, аванс, статус на плащане, статус (активна/архивирана) и създател. Касае един или повече парцели.",
        },
        { type: "h2", id: "activity", text: "Дейности и задачи" },
        {
          type: "p",
          text: "Поръчката се разбива на дейности (работни фази, които могат да са вложени йерархично) и гранулирани задачи. Всяка задача се възлага на изпълнител, по избор контролирана от служител-контрольор, с начални/крайни дати, продължителност, плащания и данъци.",
        },
        {
          type: "ul",
          items: [
            "Дейност → дейност (самопрепращаща се за вложени фази)",
            "Задачата сочи към двама служители: изпълнител и контрольор (QA)",
            "Статуси на задачите: възложена / завършена / котировка",
          ],
        },
        { type: "h2", id: "title", text: "Веригата на собствеността" },
        {
          type: "p",
          text: "Тройната връзка свързва парцел, собственик, документ и пълномощно, като записва идеалните части (дробна собственост), начина на придобиване и тип на собствеността.",
        },
        {
          type: "code",
          text: "Поръчка → Дейности → Задачи\nПарцел ↔ Документ ↔ Собственик ↔ Пълномощно (идеална част 1/3)",
        },
      ],
      en: [
        { type: "h2", id: "order", text: "Order (request)" },
        {
          type: "p",
          text: "The order is the central transactional record: name, price, advance, payment status, status (active/archived) and creator. It concerns one or more plots.",
        },
        { type: "h2", id: "activity", text: "Activities & tasks" },
        {
          type: "p",
          text: "An order breaks into activities (work phases, which can nest hierarchically) and granular tasks. Each task is assigned to an executant, optionally supervised by a controller employee, with start/finish dates, durations, payments and taxes.",
        },
        {
          type: "ul",
          items: [
            "Activity → activity (self-referencing for nested phases)",
            "A task references two employees: executant and controller (QA)",
            "Task statuses: assigned / completed / quotation",
          ],
        },
        { type: "h2", id: "title", text: "The chain of ownership" },
        {
          type: "p",
          text: "The three-way junction ties together plot, owner, document and power of attorney, recording the ideal parts (fractional ownership), the way of acquiring and the type of ownership.",
        },
        {
          type: "code",
          text: "Order → Activities → Tasks\nPlot ↔ Document ↔ Owner ↔ Power of attorney (ideal part 1/3)",
        },
      ],
    },
  },

  // ----------------------------------------------------------------
  {
    slug: "filters",
    navKey: "filters",
    title: { bg: "Филтри и търсене", en: "Filters & search" },
    intro: {
      bg: "Специален раздел с филтри прецизира кои поръчки виждате — чрез бързи превключватели, падащи менюта и текстови търсения.",
      en: "A dedicated filters tab narrows which orders you see — via quick toggles, dropdowns and text searches.",
    },
    blocks: {
      bg: [
        { type: "h2", id: "toggles", text: "Бързи превключватели" },
        {
          type: "ul",
          items: [
            "Маркирани (със звезда)",
            "Просрочени",
            "Лични",
            "За днес",
            "За тази седмица",
          ],
        },
        { type: "h2", id: "dropdowns", text: "Падащи менюта и текст" },
        {
          type: "p",
          text: "Падащи менюта по статус на архив, статус на задача и статус на плащане. Текстови търсения по номер на поръчка, име, коментар, населено място, номер на парцел, УПИ и квартал.",
        },
        { type: "h2", id: "multi", text: "Множествен избор" },
        {
          type: "ul",
          items: [
            "Клиенти и собственици",
            "Служители (създател / изпълнител / контрольор)",
            "Цветове на звездите",
          ],
        },
        {
          type: "callout",
          text: "Текстовите филтри се прилагат при enter/blur, превключвателите — мигновено. Индикатор показва активните филтри; бутон ги нулира.",
        },
      ],
      en: [
        { type: "h2", id: "toggles", text: "Quick toggles" },
        {
          type: "ul",
          items: ["Starred", "Overdue", "Personal", "For today", "For this week"],
        },
        { type: "h2", id: "dropdowns", text: "Dropdowns & text" },
        {
          type: "p",
          text: "Dropdowns for archive status, task status and payment status. Text searches by order number, name, comment, settlement, plot number, UPI and neighborhood.",
        },
        { type: "h2", id: "multi", text: "Multi-select" },
        {
          type: "ul",
          items: [
            "Clients and owners",
            "Employees (creator / executant / controller)",
            "Star colours",
          ],
        },
        {
          type: "callout",
          text: "Text filters apply on enter/blur, toggles apply live. An indicator shows active filters; a button resets them.",
        },
      ],
    },
  },

  // ----------------------------------------------------------------
  {
    slug: "reports",
    navKey: "reports",
    title: { bg: "Справки и отчети", en: "Reports & exports" },
    intro: {
      bg: "Wolf генерира аналитични справки директно в .xlsx, с богато филтриране и автоматично отваряне след експорт.",
      en: "Wolf generates analytical reports directly to .xlsx, with rich filtering and automatic open after export.",
    },
    blocks: {
      bg: [
        { type: "h2", id: "reports", text: "Вградени справки" },
        {
          type: "ul",
          items: [
            "Всички задачи — йерархия служител → поръчка → дейност → задача с продължителности и плащания",
            "Задължения — задачи с клиенти, парцели, собственици и плащане",
            "Плащане по тип задача — разходи, групирани по тип, с разбивка по служител",
            "Месечно плащане по служител — много листове, по един на служител",
          ],
        },
        { type: "h2", id: "filters", text: "Филтриране на справките" },
        {
          type: "p",
          text: "Всяка справка поддържа период, служители, статус на плащане, типове дейности и задачи, статуси на задачи, избор на всички и търсене в списъците с филтри. Справките са съобразени с режима активни/архив.",
        },
        { type: "h2", id: "format", text: "Формат и експорт" },
        {
          type: "p",
          text: "Файловете .xlsx се генерират чрез DocumentFormat.OpenXml — без нужда от инсталиран Office — записват се на работния плот и се отварят автоматично.",
        },
      ],
      en: [
        { type: "h2", id: "reports", text: "Built-in reports" },
        {
          type: "ul",
          items: [
            "All tasks — employee → order → activity → task hierarchy with durations and payments",
            "Obligations — tasks with clients, plots, owners and payment",
            "Task-type payment — costs grouped by type, with per-employee breakdown",
            "Monthly per-employee payment — multi-sheet, one per employee",
          ],
        },
        { type: "h2", id: "filters", text: "Filtering reports" },
        {
          type: "p",
          text: "Each report supports date range, employees, payment status, activity and task types, task statuses, select-all and search within filter lists. Reports are mode-aware (active/archive).",
        },
        { type: "h2", id: "format", text: "Format & export" },
        {
          type: "p",
          text: "The .xlsx files are generated via DocumentFormat.OpenXml — no Office install required — saved to the desktop and opened automatically.",
        },
      ],
    },
  },
];

export function getDocPage(slug: string): DocPage | undefined {
  return DOC_PAGES.find((p) => p.slug === slug);
}
