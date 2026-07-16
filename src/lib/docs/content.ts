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
  | { type: "img"; slot: string; alt: string; title?: string }
  | {
      // several screenshots rotating in one frame, with arrows
      type: "imgs";
      slides: { slot: string; label: string }[];
      alt: string;
      title?: string;
    };

export interface DocPage {
  slug: string; // "" = index
  navKey:
    | "gettingStarted"
    | "orders"
    | "archive"
    | "model"
    | "plots"
    | "clients"
    | "invoicing"
    | "templates"
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
          text: "Приложението стои на компютъра на всеки служител и се свързва към общ сървър — машина във вашия офис или в облака, по ваш избор. Целият екип работи едновременно — промяната на един колега се появява на екрана на всички останали в реално време.",
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
              d: "Въведете потребителското име и паролата, дадени от вашия администратор. Ролята на профила определя какво виждате и какво можете да променяте. „Запомни ме на този компютър“ ви спестява входа следващия път — и връща прозорците и разделите, с които сте работили.",
            },
            {
              t: "Готово",
              d: "Данните на практиката се зареждат при входа, затова после всичко — търсене, филтри, списъци — реагира мигновено.",
            },
          ],
        },
        { type: "h2", id: "layout", text: "Главният прозорец" },
        {
          type: "p",
          text: "Страничната лента отваря всеки модул на системата. Екраните се отварят като табове — може да държите няколко отворени едновременно, а живите броячи върху иконите се обновяват в реално време, докато екипът работи.",
        },
        {
          type: "ul",
          items: [
            "Табло — пулсът на практиката: внимание, натовареност, финанси",
            "Поръчки — работният екран, център на ежедневието",
            "Имоти, Документи и Собственици — кадастралният регистър и веригата на собствеността",
            "Клиенти — възложителите, с финансова статистика за всеки",
            "Календар — задачите по крайни срокове",
            "Служители — екипът и личните справки",
            "Фактури — регистърът на фактурите и PDF генераторът",
            "Шаблони — бланките на практиката: в конструктора или като Word файл",
            "Справки — отчетите в Excel",
            "Администрация — потребители, роли и права, одитен журнал и фирмени данни",
            "Помощ — вграденото ръководство на системата (отваря се и с F1)",
          ],
        },
        {
          type: "p",
          text: "Виждате само разделите, за които имате права: списъкът по-горе е пълният. Клик върху собственото ви име отваря „Моят профил“ — личен работен център с просрочените ви задачи, опашката по спешност и поръчките, в които участвате.",
        },
        {
          type: "p",
          text: "Shift + двоен клик върху раздел го отваря в отделен плаващ прозорец — удобно за втори монитор.",
        },
        { type: "h2", id: "search", text: "Търсене отвсякъде" },
        {
          type: "ul",
          items: [
            "Ctrl+K — глобално търсене: поръчки, клиенти, имоти, собственици (включително по ЕГН), документи, фактури, служители, задачи — и самите раздели на приложението, в един списък",
            "Резултатът се отваря направо на мястото си; с Ctrl+Enter се отваря в „Поръчки“",
            "Ctrl+F — разширените филтри за поръчки, от всеки екран",
            "Камбаната „Моите задачи“ показва задачите за днес и просрочените — с преход към всяка с един клик",
          ],
        },
        { type: "h2", id: "help", text: "Вградена помощ" },
        {
          type: "p",
          text: "Разделът „Помощ“ (или F1) е вграденото ръководство на системата: обща фактура и дялове, филтри и лентата със суми, търсенето, звездите и закачените поръчки, статусите на задачите и клавишните комбинации — обяснени със съвети от практиката. Разделите на помощта се намират и през Ctrl+K.",
        },
        { type: "h2", id: "notifications", text: "Известия и обновления" },
        {
          type: "ul",
          items: [
            "Цветни известия потвърждават всяко действие — запис, изтриване, предупреждение или грешка",
            "Когато излезе нова версия, лента съобщава, че е изтеглена и готова — обновяването е с един клик",
            "Изтриванията и архивирането винаги искат потвърждение",
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
          text: "The application sits on each employee's computer and connects to a shared server — a machine in your office or in the cloud, your choice. The whole team works simultaneously — one colleague's change appears on everyone else's screen in real time.",
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
              d: "Enter the username and password provided by your administrator. Your account's role determines what you see and what you may change. \"Remember me on this computer\" saves you the sign-in next time — and restores the windows and tabs you were working in.",
            },
            {
              t: "Ready",
              d: "The firm's data loads at sign-in, which is why everything afterwards — search, filters, lists — responds instantly.",
            },
          ],
        },
        { type: "h2", id: "layout", text: "The main window" },
        {
          type: "p",
          text: "The sidebar opens every module of the system. Screens open as tabs — keep several open at once — and the live badges on the icons update in real time while the team works.",
        },
        {
          type: "ul",
          items: [
            "Dashboard — the practice's pulse: attention, workload, finances",
            "Orders — the working screen, the centre of the day",
            "Plots, Documents and Owners — the cadastral register and the chain of ownership",
            "Clients — the commissioners, with financial statistics for each",
            "Calendar — tasks by due date",
            "Employees — the team and per-person reports",
            "Invoices — the invoice register and the PDF generator",
            "Templates — the practice's forms: in the builder, or as a Word file",
            "Reports — the Excel exports",
            "Administration — users, roles and rights, the audit log and the company data",
            "Help — the system's built-in manual (also opens with F1)",
          ],
        },
        {
          type: "p",
          text: "You only see the sections your rights cover: the list above is the full one. Clicking your own name opens \"My profile\" — a personal work centre with your overdue tasks, your queue by urgency and the orders you take part in.",
        },
        {
          type: "p",
          text: "Shift + double-click on a section opens it in a separate floating window — handy for a second monitor.",
        },
        { type: "h2", id: "search", text: "Search from anywhere" },
        {
          type: "ul",
          items: [
            "Ctrl+K — global search: orders, clients, plots, owners (including by ID number), documents, invoices, employees, tasks — and the app's own sections, in one list",
            "A result opens right where it lives; Ctrl+Enter opens it in Orders",
            "Ctrl+F — the advanced order filters, from any screen",
            "The \"My tasks\" bell shows today's and overdue tasks — each one click away",
          ],
        },
        { type: "h2", id: "help", text: "Built-in help" },
        {
          type: "p",
          text: "The Help section (or F1) is the system's built-in manual: shared invoices and shares, filters and the totals bar, search, stars and pinned orders, task statuses and keyboard shortcuts — explained with practical tips. Help sections are also found via Ctrl+K.",
        },
        { type: "h2", id: "notifications", text: "Notifications & updates" },
        {
          type: "ul",
          items: [
            "Colour-coded toasts confirm every action — save, delete, warning or error",
            "When a new version ships, a banner says it's downloaded and ready — updating is one click",
            "Deletes and archiving always ask for confirmation",
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
        {
          type: "p",
          text: "Под списъка лентата със суми показва „Неразплатено“ и „Нефактурирано“ за текущия изглед — само за хората с правото „Виждане на вземания“ (по подразбиране: администраторите). Двете са и бързи филтри — клик върху „Неразплатено“ оставя само неразплатените поръчки, клик върху „Нефактурирано“ — тези под цената. Броят на филтрираните поръчки се вижда от всички.",
        },
        { type: "h2", id: "create", text: "Създаване и редакция" },
        {
          type: "ul",
          items: [
            "Формата покрива име, цена, аванс, статус, коментари и път до папката на поръчката",
            "След създаване системата предлага да добавите първата дейност веднага",
            "„Архивирай и запази“ приключва поръчка с един клик",
            "Бутонът за папката отваря файловете на поръчката директно в Explorer",
            "Линк в коментарите се разпознава автоматично и се отваря с клик",
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
            "Фактури — нова PDF фактура, въвеждане на съществуваща или свързване на обща фактура от базата; плюс „Генерирай документ“ (от шаблон на практиката)",
            "МАРЖ — цената минус заплащанията и таксите по задачите (изисква правото „Виждане на маржове“)",
          ],
        },
        { type: "h2", id: "colors", text: "Цветове на задачите" },
        {
          type: "p",
          text: "Редовете на задачите се оцветяват по статус — например зададена в синьо, завършена в зелено, оферта в кехлибарено — и се виждат от пръв поглед. Бутонът „⚙ Цветове“ ги настройва по ваш вкус: изборът е личен (на този компютър), прилага се веднага и се връща към стандартните цветове с един клик.",
        },
        {
          type: "callout",
          text: "Генерирането на фактури и на документи от шаблони има собствени раздели — „Фактуриране“ и „Шаблони за документи“.",
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
        {
          type: "p",
          text: "Under the list, the totals bar shows \"Outstanding\" and \"Uninvoiced\" for the current view — only to people holding the \"View receivables\" right (administrators by default). Both double as quick filters — clicking \"Outstanding\" keeps only unpaid orders, clicking \"Uninvoiced\" those billed under their price. The filtered order count is visible to everyone.",
        },
        { type: "h2", id: "create", text: "Creating & editing" },
        {
          type: "ul",
          items: [
            "The form covers name, price, advance, status, comments and the order's folder path",
            "After creating, the system offers to add the first activity right away",
            "\"Archive & save\" closes out an order in one click",
            "The folder button opens the order's files directly in Explorer",
            "A link in the comments is detected automatically and opens on click",
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
            "Invoices — a new PDF invoice, entering an existing one, or linking a shared invoice from the database; plus \"Generate document\" (from a practice template)",
            "MARGIN — the price minus the tasks' payments and fees (requires the \"View margins\" right)",
          ],
        },
        { type: "h2", id: "colors", text: "Task colours" },
        {
          type: "p",
          text: "Task rows are tinted by status — assigned in blue, completed in green, quotation in amber — visible at a glance. The \"⚙ Colours\" button tunes them to your taste: the choice is personal (per computer), applies instantly and resets to the defaults in one click.",
        },
        {
          type: "callout",
          text: "Generating invoices and documents from templates have their own sections — \"Invoicing\" and \"Document templates\".",
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
            "Статуси на задачите: нова, зададена, в процес, отложена, завършена, оферта — те захранват календара, таблото, просрочията и цветовете на редовете",
            "Всяка задача носи плащане и такса (напр. държавна такса) с коментар — те влизат в справките",
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
            "Task statuses: new, assigned, in progress, postponed, completed, quotation — these feed the calendar, the dashboard, the overdue logic and the row colours",
            "Every task carries a payment and a fee (e.g. a state fee) with a comment — both flow into the reports",
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
        { type: "h2", id: "ekatte", text: "ЕКАТТЕ — населеното място се попълва само" },
        {
          type: "p",
          text: "Кадастралният номер започва с ЕКАТТЕ кода на населеното място. Wolf разпознава кода още докато пишете и попълва населеното място автоматично — без да го търсите в класификатора.",
        },
        { type: "h2", id: "earth", text: "Имотът върху картата — Google Earth" },
        {
          type: "p",
          text: "С един клик Wolf изтегля реалните координати на имота от кадастъра и отваря контура му в Google Earth. Виждате точното местоположение и границите на имота, без да напускате системата и без да пренабирате номера в друг сайт.",
        },
        { type: "h2", id: "owners", text: "Собственици" },
        { type: "img", slot: "Owners", alt: "Екранът Собственици", title: "Wolf — Собственици" },
        {
          type: "p",
          text: "Отделен екран „Собственици“ пази регистъра на всички собственици — имена, ЕГН и адрес — с търсене по име, ЕГН или адрес. За всеки се вижда с колко документа, имота и поръчки е свързан, а от записа се минава към всеки от тях.",
        },
        {
          type: "ul",
          items: [
            "Червеният етикет „Дублирано ЕГН“ показва веднага, ако един и същ човек е въведен два пъти",
            "При въвеждане на собственик по документ системата предлага съществуващите записи, за да не се дублират хора",
            "„Покажи поръчките“ отваря филтрирания списък с поръчките на този собственик",
            "Глобалното търсене (Ctrl+K) намира собственик и по ЕГН",
          ],
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
        { type: "h2", id: "ekatte", text: "EKATTE — the settlement fills itself in" },
        {
          type: "p",
          text: "A cadastral number starts with the settlement's EKATTE code. Wolf recognizes the code as you type and fills the settlement in automatically — no looking it up in the classifier.",
        },
        { type: "h2", id: "earth", text: "The plot on the map — Google Earth" },
        {
          type: "p",
          text: "In one click Wolf pulls the plot's real coordinates from the cadastre and opens its outline in Google Earth. You see the exact location and boundaries without leaving the system or retyping the number into another site.",
        },
        { type: "h2", id: "owners", text: "Owners" },
        { type: "img", slot: "Owners", alt: "The Owners screen", title: "Wolf — Owners" },
        {
          type: "p",
          text: "A dedicated Owners screen keeps the register of all owners — names, ID number (ЕГН) and address — searchable by name, ЕГН or address. For each you see how many documents, plots and orders they are tied to, and you can jump to any of them from the record.",
        },
        {
          type: "ul",
          items: [
            "A red \"Duplicate ЕГН\" badge shows at once if the same person was entered twice",
            "When entering an owner on a document, the system suggests existing records so people are never duplicated",
            "\"Show orders\" opens the filtered list of that owner's orders",
            "Global search (Ctrl+K) also finds an owner by ЕГН",
          ],
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
  // Clients
  // ================================================================
  {
    slug: "clients",
    navKey: "clients",
    title: { bg: "Клиенти", en: "Clients" },
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
        {
          type: "ul",
          items: [
            "Филтърът „Моите клиенти“ показва само възложителите по вашите поръчки",
            "Клиентът се свързва към поръчка с роля — кой точно е възложителят по всяка",
          ],
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
            "Филтри по длъжници и по размер на дълга — бърз отговор кой какво дължи",
            "Преход към всяка поръчка направо от разбивката",
            "Експорт на цялата статистика в Excel на работния плот",
            "Числата следват режима активни/архив",
          ],
        },
        {
          type: "callout",
          text: "Фактурите — регистърът и генераторът на PDF фактури — имат собствен раздел: „Фактуриране“, следващата спирка.",
        },
      ],
      en: [
        { type: "img", slot: "ClientsTab", alt: "The Clients screen", title: "Wolf — Clients" },
        { type: "h2", id: "list", text: "The client list" },
        {
          type: "p",
          text: "Search by name, phone or email. The client card holds names, phone, email, address and legal type — individual, company, state or municipality.",
        },
        {
          type: "ul",
          items: [
            "The \"My clients\" filter shows only the commissioners of your own orders",
            "A client links to an order with a role — exactly who commissioned each one",
          ],
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
            "Filters by debtor and by size of the debt — a quick answer to who owes what",
            "Jump to any order straight from the breakdown",
            "Export the whole statistic to Excel on the desktop",
            "The numbers follow the active/archive mode",
          ],
        },
        {
          type: "callout",
          text: "Invoices — the register and the PDF invoice generator — have their own section: \"Invoicing\", the next stop.",
        },
      ],
    },
  },

  // ================================================================
  // Invoicing — register + PDF generator
  // ================================================================
  {
    slug: "invoicing",
    navKey: "invoicing",
    title: { bg: "Фактуриране", en: "Invoicing" },
    intro: {
      bg: "Регистър на фактурите по поръчки, генератор на готови PDF фактури от данните на поръчката — с номер от сървъра, ДДС, две валути и сума словом — и общи фактури, разпределени на дялове по няколко поръчки.",
      en: "A register of invoices per order, a generator of finished PDF invoices from the order's data — with a server-issued number, VAT, dual currency and the amount in words — and shared invoices split into shares across several orders.",
    },
    blocks: {
      bg: [
        { type: "img", slot: "InvoicesTab", alt: "Екранът Фактури", title: "Wolf — Фактури" },
        { type: "h2", id: "register", text: "Регистърът на фактурите" },
        {
          type: "p",
          text: "Всички фактури на едно място — номер, поръчка и сума, с мигновено търсене по всяко от трите. Фактура се добавя както от екрана „Фактури“, така и от таба „Фактури“ на самата поръчка; бутонът „Към поръчката“ отваря поръчката директно на този таб.",
        },
        {
          type: "ul",
          items: [
            "„Отвори PDF“ показва документа, генериран на момента от данните в базата — не се пази файл, който да остарее",
            "Етикетите „обща“ и „свързана“ отличават общите фактури и техните дялове",
            "Добавяне, редакция и изтриване — с потвърждение, което обяснява последиците",
            "Сумите по фактури влизат в статистиките на клиентите и в таблото („Фактурирано“)",
            "Регистърът следва режима активни/архив",
          ],
        },
        { type: "h2", id: "ways", text: "Три начина да запишете фактура" },
        {
          type: "p",
          text: "От таба „Фактури“ на поръчката „+ Създай фактура“ предлага три пътя — според това откъде идва фактурата:",
        },
        {
          type: "ul",
          items: [
            "Генерирай нова (PDF) — пълният генератор с жив преглед, описан по-долу",
            "Въведи съществуваща — фактура, издадена извън системата: номер, сума и по избор връзка към оригиналния файл",
            "Свържи фактура от базата — обща фактура, разпределена на дялове по няколко поръчки",
          ],
        },
        { type: "h2", id: "generator", text: "Генераторът — фактура в PDF" },
        { type: "img", slot: "InvoiceDraft", alt: "Генериране на фактура с жив преглед", title: "Wolf — Генериране на фактура" },
        {
          type: "p",
          text: "От таба „Фактури“ на поръчката бутонът „Генерирай фактура“ отваря композитора: отляво формата, отдясно жив преглед на самия документ. Прегледът се обновява, докато пишете — каквото виждате, точно това се генерира.",
        },
        {
          type: "steps",
          items: [
            {
              t: "Номер и дати",
              d: "Номерът се дава от сървъра — следващият пореден, допълнен до 10 цифри — така двама колеги никога не получават един и същ номер. Остава редактируем. Задавате дата на фактурата, дата на данъчното събитие и ДДС ставка (по подразбиране 20%).",
            },
            {
              t: "Получател",
              d: "Избирате възложителя от клиентите на поръчката — име, адрес и телефон се попълват от системата. ДДС №, идентификационен №, град и МОЛ се дописват на ръка.",
            },
            {
              t: "Редове",
              d: "Редовете се предлагат от дейностите на поръчката — описание от типа на дейността (с номерата на имотите) и единична цена от възнаграждението. Добавяте и махате редове свободно.",
            },
            {
              t: "Доставчик",
              d: "Реквизитите на доставчика и банковата сметка идват от активното основно дружество във „Фирмени данни“ и се показват в прегледа. Ако междувременно колега ги е променил, бутонът „Обнови фирмените данни“ ги дърпа наново — фактура не се издава със стари реквизити.",
            },
            {
              t: "Генериране",
              d: "„Генерирай и отвори PDF“ създава файла и го отваря веднага — готов за печат или изпращане. Валутата и банковата сметка се замразяват при издаването.",
            },
          ],
        },
        { type: "h2", id: "math", text: "Сметките — автоматични" },
        {
          type: "ul",
          items: [
            "Данъчна основа, ДДС и сума за плащане се изчисляват ред по ред и в обобщението",
            "Две валути: фактурата се води в EUR или BGN, а сумата се показва и в другата валута",
            "Сумата словом се съставя автоматично на български — и може да се редактира при нужда",
          ],
        },
        { type: "h2", id: "shared", text: "Обща фактура и дялове" },
        {
          type: "p",
          text: "Една фактура често покрива работа по няколко поръчки. Wolf моделира това директно: свързвате фактурата към всяка от поръчките с неин дял от сумата — и всяка поръчка си знае какво е фактурирано по нея.",
        },
        {
          type: "ul",
          items: [
            "Диалогът „Свързване на фактура от базата“ търси по номер или поръчка и показва неразпределения остатък на всяка фактура",
            "Дялът на всяка поръчка се променя по всяко време („Промени дял“)",
            "На реда на дяла стои сумата „дял по тази поръчка“ — а на общата фактура: общата сума",
            "Ако дяловете надвишат сумата на фактурата, редът се маркира с ⚠ и точното разминаване",
            "При изтриване системата казва какво точно ще се случи — кой дял се освобождава обратно или кои свързани дялове ще бъдат изтрити с фактурата",
          ],
        },
        {
          type: "callout",
          text: "Реквизитите на доставчика — наименование, ЕИК/ДДС №, IBAN, МОЛ — идват от „Фирмени данни“ в раздел „Администрация“ и се попълват автоматично във всяка фактура. Издадената фактура пази снимка на реквизитите такива, каквито са били в момента на издаване: по-късна промяна на фирмените данни не пренаписва старите фактури.",
        },
      ],
      en: [
        { type: "img", slot: "InvoicesTab", alt: "The Invoices screen", title: "Wolf — Invoices" },
        { type: "h2", id: "register", text: "The invoice register" },
        {
          type: "p",
          text: "All invoices in one place — number, order and sum, with instant search by any of the three. An invoice can be added from the Invoices screen or from the order's own Invoices tab; the jump button opens the order directly on that tab.",
        },
        {
          type: "ul",
          items: [
            "\"Open PDF\" shows the document rendered on the spot from the database — no stored file to go stale",
            "\"Shared\" and \"linked\" badges tell shared invoices and their shares apart",
            "Add, edit and delete — with a confirmation that explains the consequences",
            "Invoice sums flow into client statistics and the dashboard (\"Invoiced\")",
            "The register follows the active/archive mode",
          ],
        },
        { type: "h2", id: "ways", text: "Three ways to record an invoice" },
        {
          type: "p",
          text: "On the order's Invoices tab, \"+ Create invoice\" offers three paths — depending on where the invoice comes from:",
        },
        {
          type: "ul",
          items: [
            "Generate a new one (PDF) — the full generator with live preview, described below",
            "Enter an existing one — an invoice issued outside the system: number, sum and an optional link to the original file",
            "Link an invoice from the database — a shared invoice, split into shares across several orders",
          ],
        },
        { type: "h2", id: "generator", text: "The generator — a PDF invoice" },
        { type: "img", slot: "InvoiceDraft", alt: "Generating an invoice with a live preview", title: "Wolf — Generate invoice" },
        {
          type: "p",
          text: "On the order's Invoices tab, \"Generate invoice\" opens the composer: the form on the left, a live preview of the actual document on the right. The preview refreshes as you type — what you see is exactly what gets generated.",
        },
        {
          type: "steps",
          items: [
            {
              t: "Number & dates",
              d: "The number is issued by the server — the next sequential one, zero-padded to 10 digits — so two colleagues can never get the same number. It stays editable. You set the invoice date, the tax event date and the VAT rate (20% by default).",
            },
            {
              t: "Recipient",
              d: "Pick the commissioner from the order's clients — name, address and phone fill in from the system. VAT no., ID no., city and accountable person are typed by hand.",
            },
            {
              t: "Line items",
              d: "Lines are suggested from the order's activities — the description from the activity type (with the plot numbers) and the unit price from the payment. Add and remove lines freely.",
            },
            {
              t: "Supplier",
              d: "The supplier's requisites and bank account come from the active default company under \"Company data\" and show up in the preview. If a colleague changed them meanwhile, the \"Refresh company data\" button pulls them again — an invoice is never issued on stale requisites.",
            },
            {
              t: "Generate",
              d: "\"Generate and open PDF\" creates the file and opens it immediately — ready to print or send. The currency and the bank account are frozen at issue.",
            },
          ],
        },
        { type: "h2", id: "math", text: "The math — automatic" },
        {
          type: "ul",
          items: [
            "Tax base, VAT and total due are computed per line and in the summary",
            "Dual currency: the invoice is kept in EUR or BGN, with the total shown in the other currency too",
            "The amount in words is composed automatically in Bulgarian — and stays editable",
          ],
        },
        { type: "h2", id: "shared", text: "Shared invoices & shares" },
        {
          type: "p",
          text: "One invoice often covers work on several orders. Wolf models this directly: you link the invoice to each of the orders with its share of the sum — and every order knows what has been invoiced against it.",
        },
        {
          type: "ul",
          items: [
            "The \"Link an invoice from the database\" dialog searches by number or order and shows each invoice's unallocated remainder",
            "An order's share can be changed at any time (\"Change share\")",
            "A share's row shows \"share on this order\"; the shared invoice shows the full sum",
            "If the shares exceed the invoice total, the row is flagged with ⚠ and the exact mismatch",
            "On delete, the system says exactly what will happen — which share is released back, or which linked shares go with the invoice",
          ],
        },
        {
          type: "callout",
          text: "The supplier's details — name, company/VAT number, IBAN, accountable person — come from \"Company data\" in the Administration section and fill in automatically on every invoice. An issued invoice keeps a snapshot of those details exactly as they were at the moment of issue: a later change to the company data does not rewrite older invoices.",
        },
      ],
    },
  },

  // ================================================================
  // Document templates
  // ================================================================
  {
    slug: "templates",
    navKey: "templates",
    title: { bg: "Шаблони за документи", en: "Document templates" },
    intro: {
      bg: "Бланките на практиката стават шаблони, които Wolf попълва с данните на всяка поръчка и записва направо в нейната папка. Шаблонът се прави по два начина — визуално в конструктора или като Word файл с плейсхолдъри. Двата вида работят рамо до рамо.",
      en: "Your practice's forms become templates that Wolf fills with any order's data and saves straight into that order's folder. A template is made in one of two ways — visually in the builder, or as a Word file with placeholders. Both kinds work side by side.",
    },
    blocks: {
      bg: [
        { type: "h2", id: "ways", text: "Два начина към една бланка" },
        {
          type: "p",
          text: "Няма правилен и грешен път — изберете този, който ви е удобен. Готовите шаблони от двата вида стоят в един списък, генерират се по един и същи начин и се различават само по етикета си.",
        },
        {
          type: "steps",
          items: [
            {
              t: "Конструкторът",
              d: "Сглобявате документа от блокове и слагате полетата с кликване. Не се пише код, не се помнят имена на плейсхолдъри, а живият преглед показва резултата още докато работите. Това е по-краткият път за повечето хора.",
            },
            {
              t: "Word файл с плейсхолдъри",
              d: "Пишете бланката в Word, както сте свикнали, и оставяте плейсхолдъри като {{order.name}} на местата за данни. Качвате готовия .docx и Wolf го попълва. Удобно, ако бланката вече съществува или ѝ трябва оформление, което Word прави най-добре.",
            },
          ],
        },
        { type: "img", slot: "TemplateBuilder", alt: "Конструкторът на шаблони", title: "Wolf — Конструктор на шаблони" },
        { type: "h2", id: "builder", text: "Конструкторът" },
        {
          type: "p",
          text: "„+ Нов шаблон“ отваря празен лист в „Конструктор на шаблони“: вляво е палитрата с блокове, в средата е самият документ, а вдясно — живият преглед. Договори, протоколи, писма, декларации — всяка бланка на практиката се сглобява тук.",
        },
        {
          type: "steps",
          items: [
            {
              t: "Сглобете листа",
              d: "От „Добави блок“ слагате заглавие, текст, ред с данни, таблица със списък, повтарящ се раздел, подписи или празен ред. Блоковете се подреждат и разместват свободно.",
            },
            {
              t: "Поставете полетата",
              d: "„+ Постави поле“ отваря списъка с полета с търсене — „Номер на поръчката“, „Три имена“, „ЕГН“. Полето влиза в текста като чип. За паричните полета има и вариант с „лв.“",
            },
            {
              t: "Вижте резултата",
              d: "Панелът „Преглед на живо“ показва документа с примерни данни или върху избрана реална поръчка — и брои колко полета остават празни за нея. „Отвори в Word“ дава попълнен пробен документ.",
            },
            {
              t: "Публикувайте",
              d: "Докато е „Чернова“, шаблонът е само ваш и не може да се използва за генериране. „Публикувай“ го прави достъпен за целия екип.",
            },
          ],
        },
        { type: "h2", id: "fields", text: "Полетата" },
        {
          type: "p",
          text: "Полетата се избират от списък на български — не се пишат на ръка. Групирани са по тема; извадка от най-използваните:",
        },
        {
          type: "code",
          text: "Поръчка        Номер · Име · Цена · Аванс · Неразплатено\nВъзложител     Три имена · Адрес · Телефон · ЕГН / ЕИК\nИмоти          КИ · УПИ · Местност · Площ · Община\nСобственици    Три имена · ЕГН · Адрес · Идеална част\nДокументи      Акт · Номер · Издател · Дата\nДата           Днес  →  11.07.2026 · 11 юли 2026 г.",
        },
        { type: "h2", id: "format", text: "Форматиране" },
        {
          type: "p",
          text: "Удебелен, курсив и подчертан текст се прилагат върху избраното — включително в средата на изречение. Избирате шрифт (Times New Roman, Arial, Calibri), размер и подравняване, а „Настройки на документа“ задава основния шрифт и размер за целия лист.",
        },
        { type: "h2", id: "lists", text: "Списъци и повтарящи се раздели" },
        {
          type: "p",
          text: "„Таблица със списък“ изрежда имотите, собствениците, дейностите или задачите на поръчката като редове на таблица. „Повтарящ се раздел“ повтаря цял набор от блокове — заглавие, абзаци, подписи — веднъж за всеки елемент.",
        },
        {
          type: "ul",
          items: [
            "„№ по ред“ номерира елементите в списъка автоматично",
            "Вложени раздели: за всеки имот — неговите собственици; за всеки собственик — неговите имоти. Вложените раздели могат да се вложат и по-надълбоко",
            "Колоните на таблицата се подреждат и настройват поотделно: собствено „Заглавие“ (празното взема името на полето) и „Суфикс след стойността“ — например „лв.“",
            "„Имот (основен)“ и „Собственик (основен)“ вземат първия от поръчката — за документ с един имот не е нужен списък",
            "Ако шаблонът работи само с първия имот, а поръчката има няколко, системата предупреждава при генериране",
          ],
        },
        {
          type: "callout",
          text: "Докато редактирате, „Незапазени промени“ стои над листа. Ако колега е записал същия шаблон преди вас, Wolf отказва записа вместо да презапише неговата версия — презареждате и нанасяте промяната наново.",
        },
        { type: "h2", id: "import", text: "Внасяне на съществуващ .docx" },
        {
          type: "p",
          text: "„Нов шаблон от документ (.docx)“ взема готова бланка и превръща текста и форматирането ѝ в блокове — не започвате от празен лист. Полетата поставяте след това сами.",
        },
        {
          type: "callout",
          text: "Внасянето е механично: таблици, изображения, текстови полета, колонтитули и номерирани списъци не се пренасят. На мястото на всяка таблица остава бележка, за да я сглобите наново с „Таблица със списък“.",
        },
        { type: "h2", id: "word", text: "Word шаблони с плейсхолдъри" },
        {
          type: "p",
          text: "Вторият начин: шаблонът е обикновен Word документ (.docx), в който на мястото на променливите данни стоят плейсхолдъри. „Качи Word файл (.docx)“ го добавя с име, описание и тип данни, а панелът „Налични плейсхолдъри“ показва всички полета, групирани по тема, с копиране с един клик.",
        },
        {
          type: "code",
          text: "{{order.id}}  {{order.name}}  {{order.price}}  {{order.unpaid}}\n{{client.fullname}}  {{client.address}}  {{client.phone}}\n{{today}}  {{today.long}}   →  11.07.2026 · 11 юли 2026 г.\n{{#each plots}} {{plot.number}} {{plot.address}} {{/each}}\n{{#each owners}} {{owner.fullname}} {{owner.egn}} {{/each}}",
        },
        {
          type: "ul",
          items: [
            "Списъците — имоти, собственици, възложители, дейности, задачи, фактури — се разгръщат с {{#each …}} … {{/each}}: като поредица от абзаци или като повтарящ се ред в таблица",
            "„Провери шаблона“ хваща печатни грешки в плейсхолдърите и проблеми в {{#each}} блоковете, преди да са стигнали до реален документ",
            "„Преглед“ върху избрана поръчка отваря попълнен пробен документ — и казва колко плейсхолдъра са останали празни за нея",
            "„Замени файла“ качва нова версия на бланката, без да губите шаблона и настройките му",
          ],
        },
        {
          type: "p",
          text: "Шаблонът, качен като Word файл, се вижда в списъка с етикет „Word файл“ — за да е ясно, че се редактира в Word, а не в конструктора. Ако решите, „Превърни в Word шаблон“ изнася и конструкторски шаблон като обикновен .docx.",
        },
        { type: "h2", id: "generate", text: "Генериране за поръчка" },
        { type: "img", slot: "GenerateDocument", alt: "Генериране на документ от шаблон", title: "Wolf — Генериране на документ" },
        {
          type: "p",
          text: "От екрана на поръчката бутонът „Генерирай документ“ показва публикуваните шаблони като карти. Избирате шаблон, натискате „Генерирай“ — документът се попълва с актуалните данни на поръчката, записва се в нейната папка и се отваря автоматично.",
        },
        {
          type: "ul",
          items: [
            "Файлът се именува шаблон_поръчка_дата — подрежда се сам в папката на поръчката",
            "Ако поле остане без стойност, системата предупреждава кое точно",
            "„Отвори папката“ показва готовия файл в Explorer",
          ],
        },
        { type: "h2", id: "rights", text: "Права и екипна работа" },
        { type: "img", slot: "TemplatesScreen", alt: "Списъкът с шаблони", title: "Wolf — Шаблони" },
        {
          type: "ul",
          items: [
            "Три отделни права: използване на шаблони, управление на собствените, управление на всички",
            "Черновите са лични; публикуваният шаблон се появява при целия екип в реално време",
            "Публикуването е еднопосочно — публикуван шаблон не се връща в чернова",
            "Шаблон на колега променя или изтрива само администратор",
          ],
        },
        {
          type: "p",
          text: "Кой може да качва Word файлове и кой да променя чужди шаблони се задава в „Роли и права“ — вижте раздел „Администрация“.",
        },
        {
          type: "callout",
          text: "Шаблоните спестяват най-досадната част от документооборота: данните се въвеждат веднъж в системата и се попълват безгрешно във всяка бланка — без копиране на ръка.",
        },
      ],
      en: [
        { type: "h2", id: "ways", text: "Two roads to one form" },
        {
          type: "p",
          text: "There is no right and wrong way here — take whichever suits you. Templates of both kinds sit in one list, generate identically, and differ only by their badge.",
        },
        {
          type: "steps",
          items: [
            {
              t: "The builder",
              d: "You assemble the document from blocks and place the fields with a click. No code to write, no placeholder names to remember, and a live preview shows the result as you work. For most people this is the shorter road.",
            },
            {
              t: "A Word file with placeholders",
              d: "You write the form in Word, the way you always have, leaving placeholders like {{order.name}} where the data belongs. Upload the finished .docx and Wolf fills it in. Handy when the form already exists, or needs layout that Word does best.",
            },
          ],
        },
        { type: "img", slot: "TemplateBuilder", alt: "The template builder", title: "Wolf — Template builder" },
        { type: "h2", id: "builder", text: "The builder" },
        {
          type: "p",
          text: "\"+ New template\" opens a blank sheet in the template builder: the block palette on the left, the document itself in the middle, the live preview on the right. Contracts, protocols, letters, declarations — every form your practice uses is assembled here.",
        },
        {
          type: "steps",
          items: [
            {
              t: "Assemble the sheet",
              d: "From \"Add block\" you drop in a heading, text, a data row, a list table, a repeating section, signatures or a blank line. Blocks reorder freely.",
            },
            {
              t: "Insert the fields",
              d: "\"+ Insert field\" opens a searchable list of fields — \"Order number\", \"Full name\", \"ЕГН\". The field lands in the text as a chip. Money fields also come in a variant carrying „лв.“",
            },
            {
              t: "See the result",
              d: "The live preview shows the document against sample data or a chosen real order — and counts how many fields come out empty for it. \"Open in Word\" produces a filled-in trial document.",
            },
            {
              t: "Publish",
              d: "While it is a draft, the template is yours alone and cannot be used to generate anything. \"Publish\" makes it available to the whole team.",
            },
          ],
        },
        { type: "h2", id: "fields", text: "The fields" },
        {
          type: "p",
          text: "Fields are picked from a list, not typed by hand. They are grouped by topic; a sample of the most used:",
        },
        {
          type: "code",
          text: "Order        Number · Name · Price · Advance · Outstanding\nClient       Full name · Address · Phone · ЕГН / ЕИК\nPlots        Cadastral no. · UPI · Locality · Area · Municipality\nOwners       Full name · ЕГН · Address · Ideal part\nDocuments    Deed · Number · Issuer · Date\nDate         Today  →  11.07.2026 · 11 July 2026",
        },
        { type: "h2", id: "format", text: "Formatting" },
        {
          type: "p",
          text: "Bold, italic and underline apply to the selection — mid-sentence included. You pick the font (Times New Roman, Arial, Calibri), the size and the alignment, while \"Document settings\" sets the base font and size for the whole sheet.",
        },
        { type: "h2", id: "lists", text: "Lists & repeating sections" },
        {
          type: "p",
          text: "A \"list table\" lays out the order's plots, owners, activities or tasks as table rows. A \"repeating section\" repeats a whole set of blocks — heading, paragraphs, signatures — once per item.",
        },
        {
          type: "ul",
          items: [
            "A row-number field numbers the items in a list automatically",
            "Nested sections: for each plot, its owners; for each owner, their plots. Nested sections can now nest deeper still",
            "Table columns are reordered and configured one by one: their own \"Heading\" (an empty one falls back to the field's name) and a \"Suffix after the value\" — \"лв.\", for instance",
            "\"Primary plot\" and \"primary owner\" take the first one on the order — a single-plot document needs no list at all",
            "If the template only fills in the first plot but the order has several, the system warns you at generation time",
          ],
        },
        {
          type: "callout",
          text: "While you edit, an \"Unsaved changes\" marker sits above the sheet. If a colleague saved the same template before you, Wolf refuses the write instead of overwriting their version — you reload and re-apply your change.",
        },
        { type: "h2", id: "import", text: "Importing an existing .docx" },
        {
          type: "p",
          text: "\"New template from a document (.docx)\" takes a form you already have and turns its text and formatting into blocks — you do not start from a blank sheet. You then place the fields yourself.",
        },
        {
          type: "callout",
          text: "The import is mechanical: tables, images, text boxes, headers/footers and numbered lists do not come across. A note is left where each table was, so you can rebuild it with a list table.",
        },
        { type: "h2", id: "word", text: "Word templates with placeholders" },
        {
          type: "p",
          text: "The second road: the template is a plain Word document (.docx) with placeholders standing where the variable data goes. \"Upload Word file (.docx)\" adds it with a name, a description and a data type, and the \"Available placeholders\" panel lists every field, grouped by topic, with one-click copy.",
        },
        {
          type: "code",
          text: "{{order.id}}  {{order.name}}  {{order.price}}  {{order.unpaid}}\n{{client.fullname}}  {{client.address}}  {{client.phone}}\n{{today}}  {{today.long}}   →  11.07.2026 · 11 July 2026\n{{#each plots}} {{plot.number}} {{plot.address}} {{/each}}\n{{#each owners}} {{owner.fullname}} {{owner.egn}} {{/each}}",
        },
        {
          type: "ul",
          items: [
            "Lists — plots, owners, commissioners, activities, tasks, invoices — unfold with {{#each …}} … {{/each}}: as a run of paragraphs or as a repeating table row",
            "\"Check template\" catches typos in placeholders and problems in {{#each}} blocks before they reach a real document",
            "\"Preview\" against a chosen order opens a filled-in trial document — and reports how many placeholders came out empty for it",
            "\"Replace file\" uploads a new version of the form without losing the template or its settings",
          ],
        },
        {
          type: "p",
          text: "A template uploaded as a Word file carries a \"Word file\" badge in the list — so it is clear that it is edited in Word, not in the builder. And if you change your mind, \"Convert to a Word template\" exports a builder template as a plain .docx.",
        },
        { type: "h2", id: "generate", text: "Generating for an order" },
        { type: "img", slot: "GenerateDocument", alt: "Generating a document from a template", title: "Wolf — Generate document" },
        {
          type: "p",
          text: "On the order's screen, \"Generate document\" shows the published templates as cards. Pick one, press Generate — the document fills with the order's live data, saves into the order's own folder and opens automatically.",
        },
        {
          type: "ul",
          items: [
            "The file is named template_order_date — it files itself in the order's folder",
            "If a field ends up without a value, the system warns you exactly which one",
            "\"Open folder\" reveals the finished file in Explorer",
          ],
        },
        { type: "h2", id: "rights", text: "Permissions & teamwork" },
        { type: "img", slot: "TemplatesScreen", alt: "The template list", title: "Wolf — Templates" },
        {
          type: "ul",
          items: [
            "Three separate rights: using templates, managing your own, managing everyone's",
            "Drafts are private; a published template reaches the whole team in real time",
            "Publishing is one-way — a published template cannot be returned to draft",
            "Only an administrator may change or delete a colleague's template",
          ],
        },
        {
          type: "p",
          text: "Who may upload Word files, and who may change someone else's template, is set in Roles & rights — see the Administration section.",
        },
        {
          type: "callout",
          text: "Templates remove the dullest part of paperwork: data is entered once in the system and lands flawlessly in every form — no copying by hand.",
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
          text: "Падащи менюта по статус на архив, статус на задача и статус на плащане — включително обобщеното „Неразплатени“ (неплатени и с аванс заедно). Текстови търсения по номер на поръчка, име, коментар, населено място, номер на имот, УПИ, квартал, номер и тип на документ за собственост и номер на фактура.",
        },
        {
          type: "p",
          text: "Лентата „Приложени филтри“ изброява всичко включено в момента — с брояч върху бутона за филтри и „Изчисти всички“ до нея, за да не остане скрит филтър, който тихо крие поръчки.",
        },
        { type: "h2", id: "invoicing", text: "Филтър по фактуриране" },
        {
          type: "p",
          text: "Отделно меню „Фактуриране“ сравнява фактурираното с цената на всяка поръчка: нефактурирани, частично фактурирани, под цената (двете заедно) или напълно фактурирани. Отговорът на „за какво още не сме издали фактура“ е един клик.",
        },
        { type: "h2", id: "money", text: "Лентата със суми" },
        {
          type: "p",
          text: "Под списъка с поръчки „Неразплатено“ и „Нефактурирано“ показват сумите за текущия изглед и са кликаеми: клик включва съответния бърз филтър („Неразплатени“ / „Под цената“) с отметка, докато е активен. Сумите изискват правото „Виждане на вземания“; броят на филтрираните поръчки се вижда от всички.",
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
          text: "Dropdowns for archive status, task status and payment status — including the combined \"Unsettled\" (unpaid and advance together). Text searches by order number, name, comment, settlement, plot number, UPI, neighbourhood, ownership-document number and type, and invoice number.",
        },
        {
          type: "p",
          text: "An \"Applied filters\" bar lists everything currently switched on — with a count badge on the filter button and \"Clear all\" beside it, so no forgotten filter quietly hides orders from you.",
        },
        { type: "h2", id: "invoicing", text: "Invoicing filter" },
        {
          type: "p",
          text: "A dedicated \"Invoicing\" menu compares what's been invoiced against each order's price: uninvoiced, partially invoiced, under the price (both together) or fully invoiced. \"What haven't we billed yet?\" is one click.",
        },
        { type: "h2", id: "money", text: "The totals bar" },
        {
          type: "p",
          text: "Under the order list, \"Outstanding\" and \"Uninvoiced\" show the sums for the current view and are clickable: a click applies the matching quick filter (\"Unsettled\" / \"Under the price\") with a check mark while active. The sums need the \"View receivables\" right; the filtered order count is visible to everyone.",
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
            "Оборот на задачи — йерархия служител → поръчка → дейност → задача с продължителности и плащания",
            "Задължения — задачи със съответните клиенти, имоти, собственици и плащане",
            "Плащания по вид задача — разходи, групирани по тип, с разбивка по служител",
            "Месечна справка — по един лист на служител, обобщено по тип задача",
            "Такси (държавни такси) — таксите по задачите за периода, за отчет пред клиента и счетоводството",
            "Статистика на клиент — експорт от екрана на клиента",
          ],
        },
        { type: "h2", id: "business", text: "Бизнес справки" },
        {
          type: "p",
          text: "Освен оперативните справки, две дават поглед върху цялата практика — без филтри, с един клик:",
        },
        {
          type: "ul",
          items: [
            "Поръчки и приходи по общини — къде географски е концентрирана работата и откъде идват приходите",
            "Клиенти: класация и реактивиране — кои възложители носят най-много работа и кои са неактивни от дълго време — готов списък за едно обаждане",
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
            "Task turnover — employee → order → activity → task hierarchy with durations and payments",
            "Obligations — tasks with their clients, plots, owners and payment",
            "Payments by task type — costs grouped by type, with a per-employee breakdown",
            "Monthly report — one sheet per employee, aggregated by task type",
            "Fees (state fees) — the fees on tasks for the period, for the client and for accounting",
            "Client statistics — exported from the client's screen",
          ],
        },
        { type: "h2", id: "business", text: "Business reports" },
        {
          type: "p",
          text: "Beyond the operational reports, two give a view of the whole practice — no filters, one click:",
        },
        {
          type: "ul",
          items: [
            "Orders and revenue by municipality — where the work is geographically concentrated and where the revenue comes from",
            "Clients: ranking and reactivation — which commissioners bring the most work and which have gone quiet — a ready call list",
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
      bg: "Прегледът на управителя: аналитично табло, статистика по служители, потребители и роли, одитен журнал и фирмените данни, от които се издават фактурите.",
      en: "The manager's view: an analytics dashboard, per-employee statistics, users and roles, the audit log, and the company data invoices are issued from.",
    },
    blocks: {
      bg: [
        {
          type: "imgs",
          slides: [
            { slot: "AdminBoard", label: "Обобщение" },
            { slot: "AdminBoardFinance", label: "Финанси" },
            { slot: "AdminBoardTeam", label: "Екип" },
          ],
          alt: "Таблото за управление",
          title: "Wolf — Табло",
        },
        { type: "h2", id: "dashboard", text: "Табло за управление" },
        {
          type: "p",
          text: "Аналитичен изглед на практиката с избираем период. Горе — „Задачи, изискващи внимание“: просрочените, тези със срок до 7 дни и всички отворени. Отдолу — задачите по статус, натовареността на екипа и финансовите панели: издадени фактури, платци по фактурирана стойност, поръчки с нефактуриран остатък и най-големите текущи остатъци.",
        },
        {
          type: "ul",
          items: [
            "„Натовареност на екипа“ — за всеки служител: поръчки, задачи за контрол, натоварване и просрочени; външните изпълнители са отбелязани",
            "„Най-големи текущи остатъци“ и „Поръчки с нефактуриран остатък“ — с бутон „Към поръчката“ за всяко перо",
            "Всеки панел показва само данните в обхвата на вашите права — таблото се отваря с правото „Табло“, а финансовите панели искат и „Виждане на вземания“",
            "Числата се обновяват в реално време, докато екипът работи, и следват режима активни/архив",
          ],
        },
        { type: "h2", id: "employees", text: "Служители и статистика" },
        { type: "img", slot: "Employees", alt: "Екранът Служители", title: "Wolf — Служители" },
        {
          type: "p",
          text: "Списък на екипа с търсене — включително външни изпълнители. За всеки служител: общо дейности и задачи, плащания, завършени и чакащи задачи, брой уникални поръчки, плюс разбивки по дейност и задача с преход към поръчката.",
        },
        {
          type: "p",
          text: "Служителите се създават и редактират във формуляр с лични данни (име, презиме, фамилия), контакти (телефон, имейл) и отметка „Външен служител“. Правата за служители са отделни — има дори право, което позволява създаване само на външни изпълнители: тогава типът е заключен като „Външен“.",
        },
        { type: "img", slot: "EmployeesStatistics", alt: "Статистика на служител", title: "Wolf — Статистика на служител" },
        { type: "h2", id: "roles", text: "Роли и права" },
        { type: "img", slot: "Administration", alt: "Роли и права", title: "Wolf — Администрация" },
        {
          type: "p",
          text: "Разделът „Администрация“ държи достъпа и данните на практиката в четири таба: „Потребители“, „Роли и права“, „Одитен журнал“ и „Фирмени данни“. Всеки таб се вижда само с прилежащото му право — човек със „Счетоводител“ например може да отваря „Фирмени данни“, без да вижда потребителите.",
        },
        {
          type: "ul",
          items: [
            "Потребители: създаване на профил с потребителско име, имейл, парола, служител и роли",
            "Всеки профил се свързва със служител — така човекът вижда своите задачи и своите поръчки",
            "Смяна на паролата и изключване на профил, без да се губи историята му",
          ],
        },
        {
          type: "p",
          text: "„Роли и права“ е матрица с отметки: за всяка роля се вижда и задава какво може да прави — модул по модул. Правата са групирани по: поръчки, дейности и задачи, клиенти, имоти и собственост, фактури, финанси, справки, шаблони, служители, номенклатури и администрация.",
        },
        {
          type: "ul",
          items: [
            "Готови роли: Админ, Деловодител, Изпълнител, Счетоводител, Потребител",
            "„Създай роля“ — собствена роля с точно тези права, които решите",
            "Ролята „Админ“ е системна и заключена — не може да остане практиката без администратор",
            "Обхват на данните за всеки списък: „всички“ или „само по поръчки, в които участва“ — без нито едно от двете списъкът е празен",
          ],
        },
        {
          type: "callout",
          text: "Финансите са отделен модул права: „Виждане на вземания“ (редовете „Неразплатено“ и „Нефактурирано“ и финансовите панели на таблото) и „Виждане на маржове“ (МАРЖ по поръчка). По подразбиране ги има само ролята „Админ“.",
        },
        { type: "h2", id: "audit", text: "Одитен журнал" },
        { type: "img", slot: "AuditLog", alt: "Одитният журнал", title: "Wolf — Одитен журнал" },
        {
          type: "p",
          text: "Всяка промяна по данните оставя следа: кой, кога, какво и върху кой запис. Журналът се филтрира по текст, потребител, вид запис, действие и период, а всяко събитие показва и записаните данни — точните стойности в момента на промяната.",
        },
        {
          type: "ul",
          items: [
            "Бутон към самия запис и „В Поръчки“ — показва поръчките, свързани със събитието",
            "Панел с подробности: действие, потребител, обект, идентификатор и записаните данни",
            "Отваря се с отделното право „Одитен журнал“ — по подразбиране само за администратори",
          ],
        },
        { type: "h2", id: "company", text: "Фирмени данни" },
        { type: "img", slot: "CompanyProfile", alt: "Фирмените данни", title: "Wolf — Фирмени данни" },
        {
          type: "p",
          text: "Тук живеят дружествата, от които практиката издава документи — с всичко, което излиза върху фактурата: юридическо име, ЕИК/Булстат, регистрация по ДДС и ДДС №, адрес, МОЛ, контакти, банкови сметки и стойности по подразбиране за фактуриране (място на издаване, съставител, ДДС %, валута). Карта „Преглед на доставчика“ показва на живо как ще изглежда доставчикът върху фактурата.",
        },
        {
          type: "ul",
          items: [
            "Дружествата могат да са няколко — активното основно дружество е това, от което се издават новите фактури",
            "Банковите сметки се добавят и деактивират, но никога не се изтриват — деактивирането не променя историческите фактури",
            "Всяка издадена фактура замразява снимка на реквизитите — промяна на фирмените данни не пренаписва издадени фактури",
            "Правата са раздробени: преглед, правни данни, банкови сметки и фактуриране са отделни отметки — правото за редакция не дава автоматично право за преглед",
            "„История“ пази правните, банковите и фактурните промени — с бутон „Отвори одитния журнал“",
          ],
        },
        {
          type: "callout",
          text: "Ако колега запише промяна, докато редактирате, Wolf показва „Има по-нова версия на фирмените данни“ и предлага „Презареди“ — вместо мълчаливо да презапише неговата версия.",
        },
        { type: "h2", id: "profile", text: "Моят профил — работен център" },
        { type: "img", slot: "PersonalTab", alt: "Работният център в личния профил", title: "Wolf — Моят профил" },
        {
          type: "p",
          text: "Клик върху собственото име в главния прозорец отваря „Моят профил“ — личен работен център. Четири карти за внимание сортират опашката: „Просрочени“, „Днес“, „Следващи 7 дни“ и „Всички отворени“, а под тях „Моята работна опашка“ реди незавършените задачи по спешност, с цветна лента (синьо — наближава, жълто — днес, червено — просрочено) и бутон към точната задача в поръчката.",
        },
        {
          type: "ul",
          items: [
            "„Натовареност · 7 дни“ — колко задачи падат на всеки от следващите дни",
            "„Активни поръчки“ — поръчките, в които участвате, с брой отворени задачи и следващ срок",
            "„За мой контрол“ — задачите, на които сте контрольор, отделно от собствените",
            "Бутони „Календар“ и „Моите поръчки“ — календарът ви и списъкът на поръчките ви на едно кликване",
          ],
        },
      ],
      en: [
        {
          type: "imgs",
          slides: [
            { slot: "AdminBoard", label: "Summary" },
            { slot: "AdminBoardFinance", label: "Finance" },
            { slot: "AdminBoardTeam", label: "Team" },
          ],
          alt: "The management dashboard",
          title: "Wolf — Dashboard",
        },
        { type: "h2", id: "dashboard", text: "Management dashboard" },
        {
          type: "p",
          text: "An analytics view of the practice over a period you choose. At the top — \"Tasks needing attention\": overdue, due within 7 days, and all open. Below — tasks by status, the team's workload, and the financial panels: issued invoices, payers by invoiced value, orders with an unbilled remainder, and the largest current balances.",
        },
        {
          type: "ul",
          items: [
            "\"Team workload\" — per employee: orders, tasks to control, load and overdue; external contractors are badged",
            "\"Largest current balances\" and \"Orders with an unbilled remainder\" — each line has a \"To the order\" button",
            "Every panel shows only the data your rights cover — the dashboard itself needs the \"Dashboard\" right, and the financial panels also need \"View receivables\"",
            "The numbers update in real time while the team works, and follow the active/archive mode",
          ],
        },
        { type: "h2", id: "employees", text: "Employees & statistics" },
        { type: "img", slot: "Employees", alt: "The Employees screen", title: "Wolf — Employees" },
        {
          type: "p",
          text: "A searchable list of the team — external contractors included. For every employee: total activities and tasks, payments, completed and pending tasks, count of unique orders, plus activity and task breakdowns with a jump to the order.",
        },
        {
          type: "p",
          text: "Employees are created and edited in a form with personal data (first, middle, last name), contacts (phone, e-mail) and an \"External employee\" checkbox. Employee rights are separate — there is even a right that only allows creating external contractors: the type is then locked to \"External\".",
        },
        { type: "img", slot: "EmployeesStatistics", alt: "Employee statistics", title: "Wolf — Employee statistics" },
        { type: "h2", id: "roles", text: "Roles & rights" },
        { type: "img", slot: "Administration", alt: "Roles & rights", title: "Wolf — Administration" },
        {
          type: "p",
          text: "The Administration section owns the practice's access and data across four tabs: Users, Roles & rights, Audit log, and Company data. Each tab appears only with its own right — an Accountant, for instance, can open Company data without seeing the users.",
        },
        {
          type: "ul",
          items: [
            "Users: create an account with a username, an e-mail, a password, an employee and roles",
            "Each account is linked to an employee — so that person sees their own tasks and their own orders",
            "Reset a password or disable an account without losing its history",
          ],
        },
        {
          type: "p",
          text: "Roles & rights is a checkbox matrix: for each role you see and set exactly what it may do — module by module. The rights are grouped into: orders, activities and tasks, clients, plots and ownership, invoices, finance, reports, templates, employees, nomenclatures and administration.",
        },
        {
          type: "ul",
          items: [
            "Ready-made roles: Admin, Office, Surveyor, Accountant, User",
            "\"Create role\" — your own role with precisely the rights you decide",
            "The Admin role is a system role and is locked — a practice can never be left without an administrator",
            "Data scope per list: \"all\" or \"only the orders they take part in\" — with neither ticked, the list is empty",
          ],
        },
        {
          type: "callout",
          text: "Finance is its own rights module: \"View receivables\" (the \"Outstanding\" and \"Uninvoiced\" totals and the dashboard's financial panels) and \"View margins\" (the per-order margin). By default only the Admin role holds them.",
        },
        { type: "h2", id: "audit", text: "Audit log" },
        { type: "img", slot: "AuditLog", alt: "The audit log", title: "Wolf — Audit log" },
        {
          type: "p",
          text: "Every change to the data leaves a trace: who, when, what and on which record. The log filters by text, user, record type, action and period, and each event also shows the recorded data — the exact values at the moment of the change.",
        },
        {
          type: "ul",
          items: [
            "A button through to the record itself, and \"In Orders\" — showing the orders tied to the event",
            "A detail panel: action, user, object, identifier and the recorded data",
            "Opens with the separate \"Audit log\" right — administrators only by default",
          ],
        },
        { type: "h2", id: "company", text: "Company data" },
        { type: "img", slot: "CompanyProfile", alt: "Company data", title: "Wolf — Company data" },
        {
          type: "p",
          text: "This is where the legal entities the practice issues documents from live — with everything that prints on an invoice: legal name, company number, VAT registration and VAT number, address, responsible person, contacts, bank accounts and invoicing defaults (place of issue, drawer, VAT %, currency). A \"Supplier preview\" card shows live how the supplier will look on the invoice.",
        },
        {
          type: "ul",
          items: [
            "There can be several companies — the active default one is what new invoices are issued from",
            "Bank accounts are added and deactivated, never deleted — deactivating does not change historical invoices",
            "Every issued invoice freezes a snapshot of the requisites — changing the company data does not rewrite invoices already issued",
            "The rights are granular: view, legal data, bank accounts and invoicing are separate checkboxes — an edit right does not grant a view right",
            "\"History\" keeps the legal, banking and invoicing changes — with an \"Open the audit log\" button",
          ],
        },
        {
          type: "callout",
          text: "If a colleague saves a change while you are editing, Wolf shows \"There is a newer version of the company data\" and offers \"Reload\" — instead of silently overwriting their version.",
        },
        { type: "h2", id: "profile", text: "My profile — the work centre" },
        { type: "img", slot: "PersonalTab", alt: "The work centre in the personal profile", title: "Wolf — My profile" },
        {
          type: "p",
          text: "Clicking your own name in the main window opens \"My profile\" — a personal work centre. Four attention cards sort the queue: \"Overdue\", \"Today\", \"Next 7 days\" and \"All open\", and below them \"My work queue\" ranks unfinished tasks by urgency, with a colour bar (blue — due soon, yellow — today, red — overdue) and a button through to the exact task inside its order.",
        },
        {
          type: "ul",
          items: [
            "\"Load · 7 days\" — how many tasks fall on each of the coming days",
            "\"Active orders\" — the orders you take part in, with open-task counts and the next deadline",
            "\"To control\" — the tasks you are the controller on, kept apart from your own",
            "\"Calendar\" and \"My orders\" buttons — your calendar and your order list, one click away",
          ],
        },
      ],
    },
  },
];

export function getDocPage(slug: string): DocPage | undefined {
  return DOC_PAGES.find((p) => p.slug === slug);
}
