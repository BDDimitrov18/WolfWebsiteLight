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
          type: "p",
          text: "Страничната лента отваря всеки модул на системата. Екраните се отварят като табове — може да държите няколко отворени едновременно, а живите броячи върху иконите се обновяват в реално време, докато екипът работи.",
        },
        {
          type: "ul",
          items: [
            "Табло — финансовият пулс на практиката (за администратори)",
            "Поръчки — работният екран, център на ежедневието",
            "Имоти, Документи и Собственици — кадастралният регистър и веригата на собствеността",
            "Клиенти — възложителите, с финансова статистика за всеки",
            "Календар — задачите по крайни срокове",
            "Служители — екипът и личните справки (за администратори)",
            "Фактури — регистърът на фактурите и PDF генераторът",
            "Шаблони — бланките на практиката, попълвани автоматично",
            "Справки — отчетите в Excel",
            "Помощ — вграденото ръководство на системата (отваря се и с F1)",
          ],
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
          type: "p",
          text: "The sidebar opens every module of the system. Screens open as tabs — keep several open at once — and the live badges on the icons update in real time while the team works.",
        },
        {
          type: "ul",
          items: [
            "Dashboard — the practice's financial pulse (administrators)",
            "Orders — the working screen, the centre of the day",
            "Plots, Documents and Owners — the cadastral register and the chain of ownership",
            "Clients — the commissioners, with financial statistics for each",
            "Calendar — tasks by due date",
            "Employees — the team and per-person reports (administrators)",
            "Invoices — the invoice register and the PDF generator",
            "Templates — the practice's letterheads, filled in automatically",
            "Reports — the Excel exports",
            "Help — the system's built-in manual (also opens with F1)",
          ],
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
          text: "Под списъка лентата със суми показва „Неразплатено“ и „Нефактурирано“ за текущия изглед. Двете са и бързи филтри — клик върху „Неразплатено“ оставя само неразплатените поръчки, клик върху „Нефактурирано“ — тези под цената.",
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
          text: "Under the list, the totals bar shows \"Outstanding\" and \"Uninvoiced\" for the current view. Both double as quick filters — clicking \"Outstanding\" keeps only unpaid orders, clicking \"Uninvoiced\" those billed under their price.",
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
        {
          type: "p",
          text: "Отделен екран „Собственици“ пази регистъра на всички собственици — имена, ЕГН и адрес — с търсене и редакция. При въвеждане на собственик по документ системата предлага съществуващите записи, за да не се дублират хора. Глобалното търсене (Ctrl+K) намира собственик и по ЕГН.",
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
        {
          type: "p",
          text: "A dedicated Owners screen keeps the register of all owners — names, ID number (ЕГН) and address — with search and editing. When entering an owner on a document, the system suggests existing records so people are never duplicated. Global search (Ctrl+K) also finds an owner by ЕГН.",
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
              t: "Генериране",
              d: "„Генерирай и отвори PDF“ създава файла и го отваря веднага — готов за печат или изпращане.",
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
          text: "Реквизитите на практиката — наименование, ЕИК/ДДС №, IBAN, МОЛ — се настройват при внедряването и се попълват автоматично във всяка фактура.",
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
              t: "Generate",
              d: "\"Generate and open PDF\" creates the file and opens it immediately — ready to print or send.",
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
          text: "The practice's own details — name, company/VAT number, IBAN, accountable person — are configured at rollout and fill in automatically on every invoice.",
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
      bg: "Качете бланките на практиката като .docx шаблони с плейсхолдъри — Wolf ги попълва с данните на всяка поръчка и записва готовия документ направо в нейната папка.",
      en: "Upload your practice's forms as .docx templates with placeholders — Wolf fills them with any order's data and saves the finished document straight into that order's folder.",
    },
    blocks: {
      bg: [
        { type: "img", slot: "TemplatesScreen", alt: "Екранът Шаблони", title: "Wolf — Шаблони" },
        { type: "h2", id: "idea", text: "Как работи" },
        {
          type: "p",
          text: "Шаблонът е обикновен Word документ (.docx), в който на мястото на променливите данни стоят плейсхолдъри като {{order.name}} или {{client.fullname}}. Качвате го веднъж в раздел „Шаблони“ — и всеки от екипа генерира попълнен документ за всяка поръчка: договори, протоколи, писма, декларации.",
        },
        {
          type: "steps",
          items: [
            {
              t: "Създайте бланката",
              d: "Тръгнете от „Изтегли начален шаблон (.docx)“ — готово скеле с най-често използваните плейсхолдъри — или добавете плейсхолдъри в свой съществуващ документ.",
            },
            {
              t: "Качете я",
              d: "„+ Качи шаблон (.docx)“ с име, описание и тип данни. Шаблонът се появява при целия екип в реално време.",
            },
            {
              t: "Проверете я",
              d: "„Провери шаблона“ хваща печатни грешки в плейсхолдърите и проблеми в {{#each}} блоковете, преди да са стигнали до реален документ.",
            },
            {
              t: "Преглед с реални данни",
              d: "Изберете произволна поръчка и „Преглед“ отваря попълнен пробен документ — включително колко плейсхолдъра са останали празни за нея.",
            },
          ],
        },
        { type: "h2", id: "tokens", text: "Плейсхолдърите" },
        {
          type: "p",
          text: "Панелът „Налични плейсхолдъри“ показва всички полета, групирани по тема, с копиране в клипборда с един клик. Извадка от най-използваните:",
        },
        {
          type: "code",
          text: "{{order.id}}  {{order.name}}  {{order.price}}  {{order.unpaid}}\n{{client.fullname}}  {{client.address}}  {{client.phone}}\n{{today}}  {{today.long}}   →  07.07.2026 · 7 юли 2026 г.\n{{#each plots}} {{plot.number}} {{plot.address}} {{/each}}\n{{#each owners}} {{owner.fullname}} {{owner.egn}} {{/each}}",
        },
        {
          type: "p",
          text: "Списъците — имоти, собственици, възложители, дейности, задачи, фактури — се разгръщат с {{#each …}} … {{/each}}: като поредица от абзаци или като повтарящ се ред в таблица.",
        },
        { type: "h2", id: "generate", text: "Генериране за поръчка" },
        { type: "img", slot: "GenerateDocument", alt: "Генериране на документ от шаблон", title: "Wolf — Генериране на документ" },
        {
          type: "p",
          text: "От екрана на поръчката бутонът „Генерирай документ“ показва наличните шаблони като карти. Избирате шаблон, натискате „Генерирай“ — документът се попълва с актуалните данни на поръчката, записва се в нейната папка и се отваря автоматично.",
        },
        {
          type: "ul",
          items: [
            "Файлът се именува шаблон_поръчка_дата — подрежда се сам в папката на поръчката",
            "Ако плейсхолдър остане без стойност, системата предупреждава кой точно — обикновено печатна грешка",
            "„Отвори папката“ показва готовия файл в Explorer",
          ],
        },
        { type: "h2", id: "rights", text: "Права и екипна работа" },
        {
          type: "ul",
          items: [
            "Всеки в екипа вижда и използва всички шаблони",
            "Променя или изтрива шаблон само създателят му или администратор",
            "Промяна по шаблон се появява при целия екип в реално време",
          ],
        },
        {
          type: "callout",
          text: "Шаблоните спестяват най-досадната част от документооборота: данните се въвеждат веднъж в системата и се попълват безгрешно във всяка бланка — без копиране на ръка.",
        },
      ],
      en: [
        { type: "img", slot: "TemplatesScreen", alt: "The Templates screen", title: "Wolf — Templates" },
        { type: "h2", id: "idea", text: "How it works" },
        {
          type: "p",
          text: "A template is a plain Word document (.docx) where the variable data is replaced by placeholders like {{order.name}} or {{client.fullname}}. Upload it once in the Templates section — and anyone on the team generates a filled-in document for any order: contracts, protocols, letters, declarations.",
        },
        {
          type: "steps",
          items: [
            {
              t: "Create the form",
              d: "Start from \"Download starter template (.docx)\" — a ready scaffold with the most-used placeholders — or add placeholders to an existing document of yours.",
            },
            {
              t: "Upload it",
              d: "\"+ Upload template (.docx)\" with a name, description and data type. The template appears for the whole team in real time.",
            },
            {
              t: "Validate it",
              d: "\"Check template\" catches typos in placeholders and problems in {{#each}} blocks before they reach a real document.",
            },
            {
              t: "Preview with real data",
              d: "Pick any order and \"Preview\" opens a filled-in trial document — including how many placeholders came out empty for it.",
            },
          ],
        },
        { type: "h2", id: "tokens", text: "The placeholders" },
        {
          type: "p",
          text: "The \"Available placeholders\" panel lists every field, grouped by topic, with one-click copy to clipboard. A sample of the most used:",
        },
        {
          type: "code",
          text: "{{order.id}}  {{order.name}}  {{order.price}}  {{order.unpaid}}\n{{client.fullname}}  {{client.address}}  {{client.phone}}\n{{today}}  {{today.long}}   →  07.07.2026 · 7 July 2026\n{{#each plots}} {{plot.number}} {{plot.address}} {{/each}}\n{{#each owners}} {{owner.fullname}} {{owner.egn}} {{/each}}",
        },
        {
          type: "p",
          text: "Lists — plots, owners, commissioners, activities, tasks, invoices — unfold with {{#each …}} … {{/each}}: as a run of paragraphs or as a repeating table row.",
        },
        { type: "h2", id: "generate", text: "Generating for an order" },
        { type: "img", slot: "GenerateDocument", alt: "Generating a document from a template", title: "Wolf — Generate document" },
        {
          type: "p",
          text: "On the order's screen, \"Generate document\" shows the available templates as cards. Pick one, press Generate — the document fills with the order's live data, saves into the order's own folder and opens automatically.",
        },
        {
          type: "ul",
          items: [
            "The file is named template_order_date — it files itself in the order's folder",
            "If a placeholder ends up without a value, the system warns you exactly which one — usually a typo",
            "\"Open folder\" reveals the finished file in Explorer",
          ],
        },
        { type: "h2", id: "rights", text: "Permissions & teamwork" },
        {
          type: "ul",
          items: [
            "Everyone on the team sees and uses all templates",
            "Only its creator or an administrator can modify or delete a template",
            "A change to a template reaches the whole team in real time",
          ],
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
          text: "Падащи менюта по статус на архив, статус на задача и статус на плащане — включително обобщеното „Неразплатени“ (неплатени и с аванс заедно). Текстови търсения по номер на поръчка, име, коментар, населено място, номер на имот, УПИ, квартал и номер на фактура.",
        },
        { type: "h2", id: "invoicing", text: "Филтър по фактуриране" },
        {
          type: "p",
          text: "Отделно меню „Фактуриране“ сравнява фактурираното с цената на всяка поръчка: нефактурирани, частично фактурирани, под цената (двете заедно) или напълно фактурирани. Отговорът на „за какво още не сме издали фактура“ е един клик.",
        },
        { type: "h2", id: "money", text: "Лентата със суми" },
        {
          type: "p",
          text: "Под списъка с поръчки „Неразплатено“ и „Нефактурирано“ показват сумите за текущия изглед — и са кликаеми: клик включва съответния бърз филтър („Неразплатени“ / „Под цената“) с отметка, докато е активен.",
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
          text: "Dropdowns for archive status, task status and payment status — including the combined \"Unsettled\" (unpaid and advance together). Text searches by order number, name, comment, settlement, plot number, UPI, neighbourhood and invoice number.",
        },
        { type: "h2", id: "invoicing", text: "Invoicing filter" },
        {
          type: "p",
          text: "A dedicated \"Invoicing\" menu compares what's been invoiced against each order's price: uninvoiced, partially invoiced, under the price (both together) or fully invoiced. \"What haven't we billed yet?\" is one click.",
        },
        { type: "h2", id: "money", text: "The totals bar" },
        {
          type: "p",
          text: "Under the order list, \"Outstanding\" and \"Uninvoiced\" show the sums for the current view — and they're clickable: a click applies the matching quick filter (\"Unsettled\" / \"Under the price\") with a check mark while active.",
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
      bg: "Прегледът на управителя: табло с финансите на практиката, статистика по служители и контрол на достъпа.",
      en: "The manager's view: a dashboard with the firm's finances, per-employee statistics and access control.",
    },
    blocks: {
      bg: [
        { type: "img", slot: "AdminBoard", alt: "Таблото за управление", title: "Wolf — Табло" },
        { type: "h2", id: "dashboard", text: "Табло за управление" },
        {
          type: "p",
          text: "Ключовите числа на практиката на един екран: неразплатени суми, общо фактурирано, активни поръчки и просрочени задачи. Отдолу — дейностите по месеци, задачите по статус, вземанията и натовареността на екипа.",
        },
        {
          type: "ul",
          items: [
            "Картите „Неразплатено“ и „Просрочени задачи“ са кликаеми — отварят списъка на съответните поръчки",
            "Графики: дейностите по месеци срещу завършените задачи и задачите по статус за последните 12 месеца",
            "Вземания — кой дължи, колко и от преди колко дни, групирани по давност; всяко вземане води към поръчката си",
            "Натовареност на екипа — активните и завършените този месец задачи на всеки, с преход към справката му",
            "Числата се обновяват в реално време, докато екипът работи, и следват режима активни/архив",
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
        { type: "img", slot: "AdminBoard", alt: "The management dashboard", title: "Wolf — Dashboard" },
        { type: "h2", id: "dashboard", text: "Management dashboard" },
        {
          type: "p",
          text: "The practice's key numbers on one screen: outstanding sums, total invoiced, active orders and overdue tasks. Below — monthly activity, tasks by status, receivables and the team's workload.",
        },
        {
          type: "ul",
          items: [
            "The \"Outstanding\" and \"Overdue tasks\" cards are clickable — they open the matching order lists",
            "Charts: monthly activity against completed tasks, and tasks by status over the last 12 months",
            "Receivables — who owes, how much and since when, grouped by age; each jumps straight to its order",
            "Team workload — each person's active and this-month-completed tasks, with a jump to their report",
            "The numbers update in real time while the team works, and follow the active/archive mode",
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
