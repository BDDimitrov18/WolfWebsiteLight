/**
 * Docs content (BG / EN) — the full product documentation.
 * Grounded in Wolf.Desktop/PROJECT_OVERVIEW.md (§8, feature by feature).
 *
 * Add a page by appending to DOC_PAGES and creating a matching route in
 * src/app/docs/<slug>/page.tsx; the sidebar reads from this single source.
 */
import type { Locale } from "@/lib/i18n/dictionaries";

export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "ul"; items: string[] }
  | { type: "steps"; items: { t: string; d: string }[] }
  | { type: "callout"; text: string }
  | { type: "code"; text: string }
  | { type: "img"; slot: string; alt: string; title?: string };

export interface DocPage {
  slug: string; // "" = index
  navKey:
    | "gettingStarted"
    | "orders"
    | "archive"
    | "model"
    | "plots"
    | "clients"
    | "calendar"
    | "filters"
    | "reports"
    | "admin";
  title: Record<Locale, string>;
  intro: Record<Locale, string>;
  blocks: Record<Locale, DocBlock[]>;
}

export const DOC_PAGES: DocPage[] = [
  // ================================================================
  // Getting started
  // ================================================================
  {
    slug: "",
    navKey: "gettingStarted",
    title: { bg: "Първи стъпки", en: "Getting started" },
    intro: {
      bg: "Wolf е многопотребителска система за управление на проектантска практика. Това ръководство ви превежда от инсталацията до ежедневната работа.",
      en: "Wolf is a multi-user management system for design practices. This guide takes you from installation to day-to-day work.",
    },
    blocks: {
      bg: [
        { type: "h2", id: "what", text: "Какво прави Wolf" },
        {
          type: "p",
          text: "Wolf управлява пълния жизнен цикъл на клиентските поръчки: дейностите и задачите по тях, служителите, които ги изпълняват, клиентите, които ги възлагат, поземлените имоти и документите за собственост, фактурирането и справките.",
        },
        {
          type: "p",
          text: "Приложението стои на компютъра на всеки служител и се свързва към сървър във вашия офис. Целият екип работи едновременно — промяната на един колега се появява на екрана на всички останали в реално време.",
        },
        { type: "h2", id: "install", text: "Инсталиране и вход" },
        {
          type: "steps",
          items: [
            {
              t: "Инсталация",
              d: "Стартирайте инсталатора на всяко работно място. Отнема минути; занапред приложението се обновява само, щом излезе нова версия.",
            },
            {
              t: "Вход",
              d: "Въведете потребителското име и паролата, дадени от вашия администратор. Профилът определя какво виждате — служител или администратор.",
            },
            {
              t: "Готово",
              d: "Данните на практиката се зареждат при входа, затова после всичко — търсене, филтри, списъци — реагира мигновено.",
            },
          ],
        },
        { type: "h2", id: "layout", text: "Главният прозорец" },
        {
          type: "ul",
          items: [
            "Странична лента с икони и живи броячи (поръчки, имоти, клиенти)",
            "Екраните се отварят като табове — може да държите няколко отворени едновременно",
            "Камбана „задачи за днес“ с брояч и списък за бърз преход",
            "Ctrl+F отваря филтрите за поръчки отвсякъде",
          ],
        },
        { type: "h2", id: "modes", text: "Режими активни / архив" },
        {
          type: "p",
          text: "Превключвателят активни/архив сменя цялото приложение между само активни поръчки (оранжева тема) и всички поръчки, включително архивираните (синя тема). Засяга всеки списък, статистика и брояч — веднага личи в кой режим сте по цвета.",
        },
        {
          type: "callout",
          text: "Следваща стъпка: разгледайте екрана „Поръчки“ — центърът на ежедневната работа.",
        },
      ],
      en: [
        { type: "h2", id: "what", text: "What Wolf does" },
        {
          type: "p",
          text: "Wolf manages the full lifecycle of customer orders: the activities and tasks performed on them, the employees who carry them out, the clients who commission them, the land plots and ownership documents, invoicing and reporting.",
        },
        {
          type: "p",
          text: "The application sits on each employee's computer and connects to a server in your own office. The whole team works simultaneously — one colleague's change appears on everyone else's screen in real time.",
        },
        { type: "h2", id: "install", text: "Installing & signing in" },
        {
          type: "steps",
          items: [
            {
              t: "Install",
              d: "Run the installer on each workstation. It takes minutes; from then on the app updates itself whenever a new version ships.",
            },
            {
              t: "Sign in",
              d: "Enter the username and password provided by your administrator. Your account determines what you see — employee or administrator.",
            },
            {
              t: "Ready",
              d: "The firm's data loads at sign-in, which is why everything afterwards — search, filters, lists — responds instantly.",
            },
          ],
        },
        { type: "h2", id: "layout", text: "The main window" },
        {
          type: "ul",
          items: [
            "Icon sidebar with live count badges (orders, plots, clients)",
            "Screens open as tabs — keep several open at once",
            "A \"today's tasks\" bell with a count and a jump list",
            "Ctrl+F opens the order filters from anywhere",
          ],
        },
        { type: "h2", id: "modes", text: "Active / archive modes" },
        {
          type: "p",
          text: "The active/archive toggle switches the whole app between active orders only (orange theme) and all orders including archived (blue theme). It affects every list, statistic and badge — the colour always tells you which mode you're in.",
        },
        {
          type: "callout",
          text: "Next: explore the Orders screen — the centre of day-to-day work.",
        },
      ],
    },
  },

  // ================================================================
  // Orders — the core screen
  // ================================================================
  {
    slug: "orders",
    navKey: "orders",
    title: { bg: "Поръчки — работният екран", en: "Orders — the core screen" },
    intro: {
      bg: "Всичко в Wolf започва от поръчката: възлагането на клиента, работата по него и плащането. Екранът „Поръчки“ е таблицата, в която живее цялата практика.",
      en: "Everything in Wolf starts from the order: the client's commission, the work on it and the payment. The Orders screen is the grid the whole firm lives in.",
    },
    blocks: {
      bg: [
        { type: "img", slot: "OrdersScreen", alt: "Екранът Поръчки", title: "Wolf — Поръчки" },
        { type: "h2", id: "grid", text: "Таблицата с поръчки" },
        {
          type: "p",
          text: "Всяка поръчка се вижда с номер, име, статус, статус на плащане, цена, аванс, коментари, имоти и създател. Търсенето по име е мигновено, а бърз филтър по статус стеснява списъка с един клик.",
        },
        { type: "h2", id: "create", text: "Създаване и редакция" },
        {
          type: "ul",
          items: [
            "Формата покрива име, цена, аванс, статус, коментари и път до папката на поръчката",
            "„Архивирай и запази“ приключва поръчка с един клик",
            "Бутонът за папката отваря файловете на поръчката директно в Explorer",
            "Архивиране и връщане от архива — с потвърждение",
          ],
        },
        { type: "h2", id: "payment", text: "Статус на плащане — автоматичен" },
        {
          type: "p",
          text: "Не отбелязвате ръчно кой е платил. Системата сравнява аванса с цената и сама показва Платено, Аванс или Неплатено — на реда на поръчката и във всички справки.",
        },
        { type: "h2", id: "stars", text: "Звезди и закачане" },
        {
          type: "p",
          text: "Всеки служител маркира своите поръчки със звезди в избран от него цвят — палитрата е обща за екипа, а филтърът по цвят показва само вашите. Когато преминете към поръчка от календара или камбаната, а филтрите я скриват, тя временно се „закача“ най-отгоре с индикатор.",
        },
        { type: "h2", id: "detail", text: "Панелът с детайли" },
        {
          type: "p",
          text: "Избраната поръчка разгръща табове с всичко по нея:",
        },
        {
          type: "ul",
          items: [
            "Дейности и задачи — работната разбивка с изпълнители, срокове и плащания",
            "Клиенти — кой е възложил поръчката, с роля и бърза връзка към статистиката му",
            "Имоти и документи — имотите по поръчката и документите за собственост",
            "Фактури — фактурите по поръчката с добавяне и редакция",
          ],
        },
        { type: "h2", id: "conflict", text: "Ако двама редактират едно и също" },
        {
          type: "callout",
          text: "Ако колега е записал промяна по същата поръчка преди вас, Wolf ще ви предупреди и ще ви помоли да презаредите записа — никой не изтрива работата на другия, без да разбере.",
        },
      ],
      en: [
        { type: "img", slot: "OrdersScreen", alt: "The Orders screen", title: "Wolf — Orders" },
        { type: "h2", id: "grid", text: "The orders grid" },
        {
          type: "p",
          text: "Each order shows its number, name, status, payment status, price, advance, comments, plots and creator. Search by name is instant, and a quick status filter narrows the list in one click.",
        },
        { type: "h2", id: "create", text: "Creating & editing" },
        {
          type: "ul",
          items: [
            "The form covers name, price, advance, status, comments and the order's folder path",
            "\"Archive & save\" closes out an order in one click",
            "The folder button opens the order's files directly in Explorer",
            "Archive and unarchive — with confirmation",
          ],
        },
        { type: "h2", id: "payment", text: "Payment status — automatic" },
        {
          type: "p",
          text: "You never mark who has paid by hand. The system compares the advance against the price and shows Paid, Advance or Unpaid by itself — on the order row and in every report.",
        },
        { type: "h2", id: "stars", text: "Stars & pinning" },
        {
          type: "p",
          text: "Each employee stars their own orders in a colour of their choosing — the palette is shared across the team, and the colour filter shows just yours. When you jump to an order from the calendar or the bell and the filters would hide it, it is temporarily pinned to the top with an indicator.",
        },
        { type: "h2", id: "detail", text: "The detail panel" },
        {
          type: "p",
          text: "The selected order unfolds into tabs with everything about it:",
        },
        {
          type: "ul",
          items: [
            "Activities & tasks — the work breakdown with executants, deadlines and payments",
            "Clients — who commissioned the order, with their role and a quick link to their statistics",
            "Plots & documents — the order's parcels and their ownership documents",
            "Invoices — the order's invoices with add and edit",
          ],
        },
        { type: "h2", id: "conflict", text: "If two people edit the same thing" },
        {
          type: "callout",
          text: "If a colleague saved a change to the same order before you, Wolf warns you and asks you to reload the record — nobody overwrites anyone's work without knowing.",
        },
      ],
    },
  },

  // ================================================================
  // Active & archive
  // ================================================================
  {
    slug: "archive",
    navKey: "archive",
    title: { bg: "Активни и архив", en: "Active & archive" },
    intro: {
      bg: "Приключените поръчки не се трият — архивират се. Архивът пази пълната история на практиката и остава на един клик разстояние.",
      en: "Finished orders aren't deleted — they're archived. The archive keeps the firm's full history and stays one click away.",
    },
    blocks: {
      bg: [
        {
          type: "img",
          slot: "ArchiveModeOrders",
          alt: "Поръчки в режим „Всички“ — активни и архивирани заедно",
          title: "Wolf — Поръчки · Всички",
        },
        { type: "h2", id: "toggle", text: "Всички / Активни / Архивирани" },
        {
          type: "p",
          text: "На екрана „Поръчки“ трите бутона превключват с един клик кои поръчки виждате: само активните, само архивираните или целия регистър наведнъж. На снимката по-горе е изгледът „Всички“ — активни и приключени поръчки една до друга, всяка със своя статус.",
        },
        { type: "h2", id: "mode", text: "Режимът засяга цялото приложение" },
        {
          type: "p",
          text: "Превключването между „само активни“ и „всички, включително архива“ не е локален филтър — то сменя режима на цялото приложение, заедно с цветовата тема, така че винаги виждате в кой режим работите.",
        },
        {
          type: "ul",
          items: [
            "Списъците и търсенето показват съответния набор от поръчки",
            "Статистиките на клиенти и служители преизчисляват числата си",
            "Броячите в страничната лента и таблото следват режима",
            "Справките в Excel се генерират според активния режим",
          ],
        },
        { type: "h2", id: "archive", text: "Архивиране на поръчка" },
        {
          type: "steps",
          items: [
            {
              t: "От списъка",
              d: "Изберете поръчката и я архивирайте — системата иска потвърждение, преди да я премести.",
            },
            {
              t: "Или с един клик при запис",
              d: "Във формата за редакция бутонът „Архивирай и запази“ приключва поръчката и я архивира едновременно.",
            },
          ],
        },
        {
          type: "p",
          text: "Архивираната поръчка запазва всичко: дейности и задачи, клиенти, имоти, документи за собственост и фактури. Нищо не се губи — само излиза от ежедневния изглед.",
        },
        { type: "h2", id: "restore", text: "Връщане от архива" },
        {
          type: "p",
          text: "Ако по имот се наложи нова работа, поръчката се връща от архива също с потвърждение — с цялата си история непокътната.",
        },
        {
          type: "callout",
          text: "Архивът не е кошче — той е паметта на практиката. Стара поръчка отпреди години се намира за секунди с филтрите: по имот, клиент, собственик или населено място.",
        },
      ],
      en: [
        {
          type: "img",
          slot: "ArchiveModeOrders",
          alt: "Orders in \"All\" view — active and archived side by side",
          title: "Wolf — Orders · All",
        },
        { type: "h2", id: "toggle", text: "All / Active / Archived" },
        {
          type: "p",
          text: "On the Orders screen, three buttons switch what you see in one click: only active orders, only archived ones, or the whole register at once. The shot above shows the \"All\" view — active and finished orders side by side, each with its status.",
        },
        { type: "h2", id: "mode", text: "The mode affects the whole app" },
        {
          type: "p",
          text: "Switching between \"active only\" and \"everything, archive included\" isn't a local filter — it changes the mode of the entire application, colour theme included, so you always see which mode you're working in.",
        },
        {
          type: "ul",
          items: [
            "Lists and search show the corresponding set of orders",
            "Client and employee statistics recalculate their numbers",
            "The sidebar badges and the dashboard follow the mode",
            "Excel reports generate according to the active mode",
          ],
        },
        { type: "h2", id: "archive", text: "Archiving an order" },
        {
          type: "steps",
          items: [
            {
              t: "From the list",
              d: "Select the order and archive it — the system asks for confirmation before moving it.",
            },
            {
              t: "Or in one click while saving",
              d: "In the edit form, the \"Archive & save\" button closes out the order and archives it at the same time.",
            },
          ],
        },
        {
          type: "p",
          text: "An archived order keeps everything: activities and tasks, clients, plots, ownership documents and invoices. Nothing is lost — it just leaves the day-to-day view.",
        },
        { type: "h2", id: "restore", text: "Bringing an order back" },
        {
          type: "p",
          text: "If new work comes up on a plot, the order is unarchived — also with confirmation — with its whole history intact.",
        },
        {
          type: "callout",
          text: "The archive isn't a recycle bin — it's the firm's memory. An order from years ago is found in seconds with the filters: by plot, client, owner or settlement.",
        },
      ],
    },
  },

  // ================================================================
  // Model: order → activity → task
  // ================================================================
  {
    slug: "model",
    navKey: "model",
    title: { bg: "Модел: поръчка → дейност → задача", en: "Model: order → activity → task" },
    intro: {
      bg: "Същината на Wolf е йерархията поръчка → дейности → задачи, свързана с имоти, документи за собственост и собственици.",
      en: "The heart of Wolf is the order → activities → tasks hierarchy, linked to plots, ownership documents and owners.",
    },
    blocks: {
      bg: [
        { type: "h2", id: "order", text: "Поръчка" },
        {
          type: "p",
          text: "Поръчката е централният запис: име, цена, аванс, статус на плащане, статус (активна/архивирана) и създател. Касае един или повече имота и един или повече клиенти.",
        },
        { type: "h2", id: "activity", text: "Дейности и задачи" },
        {
          type: "p",
          text: "Поръчката се разбива на дейности (работни фази, които могат да се влагат една в друга) и конкретни задачи. Всяка задача има изпълнител, по избор и контрольор — втори служител, който проверява работата — плюс начална и крайна дата, продължителност, плащане и данък.",
        },
        {
          type: "ul",
          items: [
            "Дейност в дейност — за вложени работни фази",
            "Задачата сочи към двама души: изпълнител и контрольор (проверка на качеството)",
            "Статуси на задачите: възложена / завършена / котировка — те захранват календара и просрочията",
            "Типовете дейности и задачи са настройваеми и се създават в движение, докато пишете",
          ],
        },
        { type: "h2", id: "title", text: "Веригата на собствеността" },
        {
          type: "p",
          text: "Тройната връзка свързва имот, собственик, документ и пълномощно, като записва идеалните части (дробна собственост), начина на придобиване и типа на собствеността. Това е специализираното сърце на кадастралния модел — нещо, което общите системи не покриват.",
        },
        {
          type: "code",
          text: "Поръчка → Дейности → Задачи\nИмот ↔ Документ ↔ Собственик ↔ Пълномощно (идеална част 1/3)",
        },
        {
          type: "callout",
          text: "Пълното описание на работата с имоти и документи е в раздел „Имоти и документи“.",
        },
      ],
      en: [
        { type: "h2", id: "order", text: "Order" },
        {
          type: "p",
          text: "The order is the central record: name, price, advance, payment status, status (active/archived) and creator. It concerns one or more plots and one or more clients.",
        },
        { type: "h2", id: "activity", text: "Activities & tasks" },
        {
          type: "p",
          text: "An order breaks into activities (work phases, which can nest inside each other) and concrete tasks. Each task has an executant, optionally a controller — a second employee who checks the work — plus start and finish dates, duration, payment and tax.",
        },
        {
          type: "ul",
          items: [
            "Activities inside activities — for nested work phases",
            "A task points at two people: executant and controller (quality check)",
            "Task statuses: assigned / completed / quotation — these feed the calendar and overdue logic",
            "Activity and task types are configurable and can be created on the fly as you type",
          ],
        },
        { type: "h2", id: "title", text: "The chain of ownership" },
        {
          type: "p",
          text: "The three-way relationship ties together plot, owner, document and power of attorney, recording the ideal parts (fractional ownership), the way of acquiring and the type of ownership. This is the specialized heart of the cadastral model — something generic systems never cover.",
        },
        {
          type: "code",
          text: "Order → Activities → Tasks\nPlot ↔ Document ↔ Owner ↔ Power of attorney (ideal part 1/3)",
        },
        {
          type: "callout",
          text: "The full guide to working with plots and documents is in the \"Plots & documents\" section.",
        },
      ],
    },
  },

  // ================================================================
  // Plots & ownership documents
  // ================================================================
  {
    slug: "plots",
    navKey: "plots",
    title: { bg: "Имоти и документи за собственост", en: "Plots & ownership documents" },
    intro: {
      bg: "Специализираният модул на Wolf: пълни кадастрални данни за всеки имот и коректно записана верига на собствеността — документи, собственици, идеални части и пълномощни.",
      en: "Wolf's specialized module: full cadastral data for every plot and a correctly recorded chain of ownership — documents, owners, ideal parts and powers of attorney.",
    },
    blocks: {
      bg: [
        { type: "img", slot: "PlotsTab", alt: "Екранът Имоти", title: "Wolf — Имоти" },
        { type: "h2", id: "plots", text: "Имоти" },
        {
          type: "p",
          text: "Всеки имот носи пълните си кадастрални данни: кадастрален номер, УПИ, квартал, населено място, община, улица, местност и предназначение. Системата пази номерата уникални и не допуска дублирани записи.",
        },
        {
          type: "ul",
          items: [
            "Самостоятелен списък на всички имоти с търсене",
            "Един имот може да участва в няколко поръчки — индикатор показва „споделен с други поръчки“",
            "Добавяне, редакция и изтриване с валидация на полетата",
          ],
        },
        { type: "h2", id: "smart", text: "Умно свързване на имот към поръчка" },
        {
          type: "p",
          text: "Когато добавяте имот към поръчка и започнете да пишете номера му, Wolf разпознава съществуващ имот и го попълва автоматично — данните се въвеждат веднъж и се преизползват. Ако имотът е нов, се създава на място.",
        },
        { type: "h2", id: "docs", text: "Документи за собственост" },
        { type: "img", slot: "DocumentsTab", alt: "Екранът Документи", title: "Wolf — Документи" },
        {
          type: "p",
          text: "Документът записва всичко от правната страна: тип (нотариален акт, договор за делба, покупко-продажба, завещание, общински или държавен акт за собственост…), номер, издател, том, регистър, дело, дата на издаване, дата на вписване и тип собственост.",
        },
        { type: "h2", id: "editor", text: "Редакторът на собственост" },
        {
          type: "p",
          text: "За документ, свързан с имот, редакторът управлява целите връзки собственик по собственик:",
        },
        {
          type: "ul",
          items: [
            "Собственик — пишете име и системата предлага съществуващ или създава нов",
            "Идеална част — дробната собственост на този собственик (например 1/3)",
            "Начин на придобиване и тип на собствеността",
            "Пълномощно по избор — номер, дата и издател",
            "Редовете се добавят и махат свободно; връзките се записват и изтриват коректно",
          ],
        },
        {
          type: "callout",
          text: "Така веригата имот ↔ документ ↔ собственик ↔ пълномощно остава пълна и проследима за всеки имот по всяка поръчка.",
        },
      ],
      en: [
        { type: "img", slot: "PlotsTab", alt: "The Plots screen", title: "Wolf — Plots" },
        { type: "h2", id: "plots", text: "Plots (parcels)" },
        {
          type: "p",
          text: "Every plot carries its full cadastral data: cadastral number, UPI (regulated plot number), neighbourhood, city, municipality, street, locality and designation. The system keeps numbers unique and prevents duplicate records.",
        },
        {
          type: "ul",
          items: [
            "A standalone, searchable list of all plots",
            "One plot can take part in several orders — an indicator shows \"shared with other orders\"",
            "Add, edit and delete with field validation",
          ],
        },
        { type: "h2", id: "smart", text: "Smart plot linking" },
        {
          type: "p",
          text: "When you add a plot to an order and start typing its number, Wolf recognizes an existing plot and fills it in automatically — data is entered once and reused. If the plot is new, it is created on the spot.",
        },
        { type: "h2", id: "docs", text: "Ownership documents" },
        { type: "img", slot: "DocumentsTab", alt: "The Documents screen", title: "Wolf — Documents" },
        {
          type: "p",
          text: "A document records the full legal side: type (notarial deed, split agreement, purchase contract, testament, municipal or state ownership act…), number, issuer, tome, register, case, date of issue, date of registration and type of ownership.",
        },
        { type: "h2", id: "editor", text: "The ownership editor" },
        {
          type: "p",
          text: "For a document linked to a plot, the editor manages the complete relationships owner by owner:",
        },
        {
          type: "ul",
          items: [
            "Owner — start typing a name and the system suggests an existing one or creates a new one",
            "Ideal part — this owner's fractional share (e.g. 1/3)",
            "Way of acquiring and type of ownership",
            "An optional power of attorney — number, date and issuer",
            "Rows are added and removed freely; the relationships are saved and deleted correctly",
          ],
        },
        {
          type: "callout",
          text: "This keeps the plot ↔ document ↔ owner ↔ power-of-attorney chain complete and traceable for every plot on every order.",
        },
      ],
    },
  },

  // ================================================================
  // Clients & invoices
  // ================================================================
  {
    slug: "clients",
    navKey: "clients",
    title: { bg: "Клиенти и фактури", en: "Clients & invoices" },
    intro: {
      bg: "Кой възлага работата, колко е платил и колко дължи — с разбивка по поръчки и експорт за счетоводството.",
      en: "Who commissions the work, what they've paid and what they owe — broken down by order and exportable for accounting.",
    },
    blocks: {
      bg: [
        { type: "img", slot: "ClientsTab", alt: "Екранът Клиенти", title: "Wolf — Клиенти" },
        { type: "h2", id: "list", text: "Списъкът с клиенти" },
        {
          type: "p",
          text: "Търсене по име, телефон или имейл. Картата на клиента пази имена, телефон, имейл, адрес и правен тип — физическо лице, фирма, държава или община.",
        },
        { type: "h2", id: "stats", text: "Статистика на клиента" },
        { type: "img", slot: "ClientStatisticsTab", alt: "Статистика на клиента", title: "Wolf — Статистика на клиент" },
        {
          type: "p",
          text: "За всеки клиент — финансово обобщение за цялото време: платено, неплатено и общо, брой активни, архивирани и общо поръчки, и таблица с разбивка по поръчка с ролята на клиента и плащането.",
        },
        {
          type: "ul",
          items: [
            "Преход към всяка поръчка направо от разбивката",
            "Експорт на цялата статистика в Excel на работния плот",
            "Числата следват режима активни/архив",
          ],
        },
        { type: "h2", id: "invoices", text: "Фактури" },
        { type: "img", slot: "InvoicesTab", alt: "Екранът Фактури", title: "Wolf — Фактури" },
        {
          type: "p",
          text: "Всички фактури на едно място с търсене по номер, сума или поръчка. Добавяне и редакция с номер, сума и избор на поръчка; бутонът за преход отваря поръчката директно на нейния таб „Фактури“.",
        },
      ],
      en: [
        { type: "img", slot: "ClientsTab", alt: "The Clients screen", title: "Wolf — Clients" },
        { type: "h2", id: "list", text: "The client list" },
        {
          type: "p",
          text: "Search by name, phone or email. The client card holds names, phone, email, address and legal type — individual, company, state or municipality.",
        },
        { type: "h2", id: "stats", text: "Client statistics" },
        { type: "img", slot: "ClientStatisticsTab", alt: "Client statistics", title: "Wolf — Client statistics" },
        {
          type: "p",
          text: "For every client — an all-time financial summary: paid, unpaid and total, counts of active, archived and total orders, and a per-order breakdown table with the client's role and the payment.",
        },
        {
          type: "ul",
          items: [
            "Jump to any order straight from the breakdown",
            "Export the whole statistic to Excel on the desktop",
            "The numbers follow the active/archive mode",
          ],
        },
        { type: "h2", id: "invoices", text: "Invoices" },
        { type: "img", slot: "InvoicesTab", alt: "The Invoices screen", title: "Wolf — Invoices" },
        {
          type: "p",
          text: "All invoices in one place, searchable by number, sum or order. Add and edit with number, sum and an order picker; the jump button opens the order directly on its Invoices tab.",
        },
      ],
    },
  },

  // ================================================================
  // Calendar
  // ================================================================
  {
    slug: "calendar",
    navKey: "calendar",
    title: { bg: "Календар и планиране", en: "Calendar & scheduling" },
    intro: {
      bg: "Кой какво трябва да свърши и до кога — месечен изглед на задачите с открояване на днешните и просрочените.",
      en: "Who has to do what, and by when — a monthly view of tasks highlighting today's and the overdue.",
    },
    blocks: {
      bg: [
        { type: "img", slot: "Callendar", alt: "Календарът", title: "Wolf — Календар" },
        { type: "h2", id: "grid", text: "Месечната решетка" },
        {
          type: "p",
          text: "Задачите се групират по краен срок върху месечна решетка с брой задачи на ден. Днешният ден е откроен, а задачи с изтекъл срок, които не са завършени, се показват като просрочени.",
        },
        { type: "h2", id: "nav", text: "Навигация" },
        {
          type: "ul",
          items: [
            "Предишен / следващ месец и бутон „днес“",
            "Клик върху задача отваря нейната поръчка на точното място — с автоматично превъртане и закачане",
            "Администраторите превключват календара между служителите",
          ],
        },
        { type: "h2", id: "bell", text: "Камбаната „задачи за днес“" },
        {
          type: "p",
          text: "В горната лента на приложението камбаната показва броя на вашите незавършени задачи с краен срок днес. Списъкът в нея прави прехода към конкретната задача с един клик — където и да се намирате в приложението.",
        },
      ],
      en: [
        { type: "img", slot: "Callendar", alt: "The calendar", title: "Wolf — Calendar" },
        { type: "h2", id: "grid", text: "The monthly grid" },
        {
          type: "p",
          text: "Tasks are grouped by due date on a monthly grid with per-day counts. Today is highlighted, and tasks past their deadline that aren't completed show as overdue.",
        },
        { type: "h2", id: "nav", text: "Navigation" },
        {
          type: "ul",
          items: [
            "Previous / next month and a \"today\" button",
            "Clicking a task opens its order at exactly the right spot — with auto-scroll and pinning",
            "Administrators can switch the calendar between employees",
          ],
        },
        { type: "h2", id: "bell", text: "The \"today's tasks\" bell" },
        {
          type: "p",
          text: "In the app's top bar, the bell shows the count of your unfinished tasks due today. Its list jumps to the specific task in one click — wherever you are in the application.",
        },
      ],
    },
  },

  // ================================================================
  // Filters & search
  // ================================================================
  {
    slug: "filters",
    navKey: "filters",
    title: { bg: "Филтри и търсене", en: "Filters & search" },
    intro: {
      bg: "Специален раздел с филтри прецизира кои поръчки виждате — чрез бързи превключватели, падащи менюта и текстови търсения. Отваря се отвсякъде с Ctrl+F.",
      en: "A dedicated filters tab narrows which orders you see — via quick toggles, dropdowns and text searches. Opens from anywhere with Ctrl+F.",
    },
    blocks: {
      bg: [
        { type: "img", slot: "FiltersOrders", alt: "Филтрите за поръчки", title: "Wolf — Филтри" },
        { type: "h2", id: "toggles", text: "Бързи превключватели" },
        {
          type: "ul",
          items: [
            "Маркирани (със звезда)",
            "Просрочени",
            "Лични (моите поръчки)",
            "За днес",
            "За тази седмица",
          ],
        },
        { type: "h2", id: "dropdowns", text: "Падащи менюта и текст" },
        {
          type: "p",
          text: "Падащи менюта по статус на архив, статус на задача и статус на плащане. Текстови търсения по номер на поръчка, име, коментар, населено място, номер на имот, УПИ и квартал.",
        },
        { type: "h2", id: "multi", text: "Множествен избор" },
        {
          type: "ul",
          items: [
            "Клиенти и собственици",
            "Служители — по създател, изпълнител или контрольор",
            "Цветове на звездите",
          ],
        },
        {
          type: "callout",
          text: "Превключвателите действат мигновено, текстовите полета — при Enter. Индикатор показва, че има активни филтри; един бутон връща всичко в начално положение.",
        },
      ],
      en: [
        { type: "img", slot: "FiltersOrders", alt: "The order filters", title: "Wolf — Filters" },
        { type: "h2", id: "toggles", text: "Quick toggles" },
        {
          type: "ul",
          items: ["Starred", "Overdue", "Personal (my orders)", "For today", "For this week"],
        },
        { type: "h2", id: "dropdowns", text: "Dropdowns & text" },
        {
          type: "p",
          text: "Dropdowns for archive status, task status and payment status. Text searches by order number, name, comment, settlement, plot number, UPI and neighbourhood.",
        },
        { type: "h2", id: "multi", text: "Multi-select" },
        {
          type: "ul",
          items: [
            "Clients and owners",
            "Employees — by creator, executant or controller",
            "Star colours",
          ],
        },
        {
          type: "callout",
          text: "Toggles apply instantly, text fields on Enter. An indicator shows when filters are active; one button resets everything.",
        },
      ],
    },
  },

  // ================================================================
  // Reports & exports
  // ================================================================
  {
    slug: "reports",
    navKey: "reports",
    title: { bg: "Справки и отчети", en: "Reports & exports" },
    intro: {
      bg: "Wolf генерира готови справки директно в Excel — с богато филтриране, запис на работния плот и автоматично отваряне.",
      en: "Wolf generates ready-made reports directly to Excel — with rich filtering, saved to the desktop and opened automatically.",
    },
    blocks: {
      bg: [
        { type: "img", slot: "InqueriesTab", alt: "Екранът Справки", title: "Wolf — Справки" },
        { type: "h2", id: "reports", text: "Вградени справки" },
        {
          type: "ul",
          items: [
            "Всички задачи — йерархия служител → поръчка → дейност → задача с продължителности и плащания",
            "Задължения — задачи със съответните клиенти, имоти, собственици и плащане",
            "Плащане по тип задача — разходи, групирани по тип, с разбивка по служител",
            "Месечно плащане по служител — по един лист на служител, обобщено по тип задача",
            "Статистика на клиент — експорт от екрана на клиента",
          ],
        },
        { type: "h2", id: "filters", text: "Филтриране на справките" },
        {
          type: "p",
          text: "Всяка справка се стеснява по период, служители, статус на плащане, типове дейности и задачи и статуси на задачи — с „избери всички“ и търсене вътре в списъците. Справките следват режима активни/архив.",
        },
        { type: "h2", id: "format", text: "Формат и експорт" },
        {
          type: "p",
          text: "Файловете са форматирани .xlsx — отварят се във всеки Excel, LibreOffice или Google Sheets, без нужда от инсталиран Office на компютъра. Записват се на работния плот и се отварят автоматично след генериране.",
        },
      ],
      en: [
        { type: "img", slot: "InqueriesTab", alt: "The Reports screen", title: "Wolf — Reports" },
        { type: "h2", id: "reports", text: "Built-in reports" },
        {
          type: "ul",
          items: [
            "All tasks — employee → order → activity → task hierarchy with durations and payments",
            "Obligations — tasks with their clients, plots, owners and payment",
            "Task-type payment — costs grouped by type, with a per-employee breakdown",
            "Monthly per-employee payment — one sheet per employee, aggregated by task type",
            "Client statistics — exported from the client's screen",
          ],
        },
        { type: "h2", id: "filters", text: "Filtering reports" },
        {
          type: "p",
          text: "Every report narrows by date range, employees, payment status, activity and task types and task statuses — with select-all and search inside the filter lists. Reports follow the active/archive mode.",
        },
        { type: "h2", id: "format", text: "Format & export" },
        {
          type: "p",
          text: "The files are styled .xlsx — they open in any Excel, LibreOffice or Google Sheets, with no Office install required on the machine. They are saved to the desktop and opened automatically after generation.",
        },
      ],
    },
  },

  // ================================================================
  // Administration
  // ================================================================
  {
    slug: "admin",
    navKey: "admin",
    title: { bg: "Администрация", en: "Administration" },
    intro: {
      bg: "Прегледът на управителя: табло с финансите на практиката, статистика по служители и контрол на достъпа.",
      en: "The manager's view: a dashboard with the firm's finances, per-employee statistics and access control.",
    },
    blocks: {
      bg: [
        { type: "img", slot: "AdminPanel", alt: "Таблото за управление", title: "Wolf — Табло" },
        { type: "h2", id: "dashboard", text: "Табло за управление" },
        {
          type: "p",
          text: "Обобщение на цялата практика на един екран: брой поръчки (общо, активни, архивирани), клиенти, дейности и уникални имоти; финансов преглед с приходи, аванси, неплатени суми и общо фактурирано; топ 5 служители по обем работа и последните поръчки.",
        },
        {
          type: "ul",
          items: [
            "Интерактивен филтър по статус с преход към всяка поръчка",
            "Числата се обновяват в реално време, докато екипът работи",
          ],
        },
        { type: "h2", id: "employees", text: "Служители и статистика" },
        { type: "img", slot: "Employees", alt: "Екранът Служители", title: "Wolf — Служители" },
        {
          type: "p",
          text: "Списък на екипа с търсене — включително външни изпълнители. За всеки служител: общо дейности и задачи, плащания, завършени и чакащи задачи, брой уникални поръчки, плюс разбивки по дейност и задача с преход към поръчката.",
        },
        { type: "img", slot: "EmployeesStatistics", alt: "Статистика на служител", title: "Wolf — Статистика на служител" },
        { type: "h2", id: "roles", text: "Роли и достъп" },
        {
          type: "ul",
          items: [
            "Администратор — вижда таблото, статистиката на служителите, календара на всеки и създава потребителски профили",
            "Служител — работи с поръчки, имоти, клиенти и календара си, без администраторските екрани",
          ],
        },
        { type: "h2", id: "profile", text: "Личен профил" },
        { type: "img", slot: "PersonalTab", alt: "Личният профил", title: "Wolf — Профил" },
        {
          type: "p",
          text: "Всеки служител има собствен изглед: статистика за периода (този месец, миналия, последните 3, всичко), процент завършени задачи, дневни, седмични и месечни графики на обема работа и списък на последно завършените задачи.",
        },
      ],
      en: [
        { type: "img", slot: "AdminPanel", alt: "The management dashboard", title: "Wolf — Dashboard" },
        { type: "h2", id: "dashboard", text: "Management dashboard" },
        {
          type: "p",
          text: "The whole practice summarized on one screen: order counts (total, active, archived), clients, activities and unique plots; a financial overview with revenue, advances, outstanding sums and total invoiced; the top 5 employees by workload and the most recent orders.",
        },
        {
          type: "ul",
          items: [
            "An interactive status filter with a jump to any order",
            "The numbers update in real time while the team works",
          ],
        },
        { type: "h2", id: "employees", text: "Employees & statistics" },
        { type: "img", slot: "Employees", alt: "The Employees screen", title: "Wolf — Employees" },
        {
          type: "p",
          text: "A searchable list of the team — external contractors included. For every employee: total activities and tasks, payments, completed and pending tasks, count of unique orders, plus activity and task breakdowns with a jump to the order.",
        },
        { type: "img", slot: "EmployeesStatistics", alt: "Employee statistics", title: "Wolf — Employee statistics" },
        { type: "h2", id: "roles", text: "Roles & access" },
        {
          type: "ul",
          items: [
            "Administrator — sees the dashboard, employee statistics, everyone's calendar and creates user accounts",
            "Employee — works with orders, plots, clients and their own calendar, without the admin screens",
          ],
        },
        { type: "h2", id: "profile", text: "Personal profile" },
        { type: "img", slot: "PersonalTab", alt: "The personal profile", title: "Wolf — Profile" },
        {
          type: "p",
          text: "Every employee gets their own view: statistics per period (this month, last month, last 3, all time), task completion percentage, daily, weekly and monthly workload charts and a list of recently completed tasks.",
        },
      ],
    },
  },
];

export function getDocPage(slug: string): DocPage | undefined {
  return DOC_PAGES.find((p) => p.slug === slug);
}
