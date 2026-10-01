/**
 * AMMAR YASSER - FLUTTER DEVELOPER PORTFOLIO
 * Interactive logic, Dark/Light mode theme switching & Flutter simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initProjectFilters();
  initArchitectureInspector();
  initTechMap();
  initFlutterSimulator();
  initCopyEmail();
  initBackToTop();
});

/* --- Dark / Light Mode Theme Switching --- */
function initThemeToggle() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme ? savedTheme : (prefersDark.matches ? 'dark' : 'light');
  
  setTheme(initialTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });

  // Listen to OS theme changes if user hasn't explicitly set a preference
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  
  themeToggleBtns.forEach(btn => {
    if (theme === 'dark') {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      btn.setAttribute('title', 'Switch to Light Mode');
      btn.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      btn.setAttribute('title', 'Switch to Dark Mode');
      btn.setAttribute('aria-label', 'Switch to Dark Mode');
    }
  });
}

/* --- Header Scroll Effect --- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- Mobile Menu Drawer --- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const links = document.querySelectorAll('.mobile-nav-drawer .nav-link, .mobile-nav-drawer .btn');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = (open) => {
    const isExpanded = open !== undefined ? open : toggleBtn.getAttribute('aria-expanded') !== 'true';
    toggleBtn.setAttribute('aria-expanded', isExpanded);
    if (isExpanded) {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  toggleBtn.addEventListener('click', () => toggleMenu());

  links.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });
}

/* --- Scroll Spy & Active Nav Link --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/* --- Project Filters --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* --- Architecture Inspector --- */
const architectureData = {
  ui: {
    title: 'Presentation Layer (UI)',
    tag: 'Flutter Widgets · Responsive UI',
    body: 'The user-facing layer composed of modular, responsive Stateless and Stateful widgets. Widgets listen to state streams emitted by Cubit/BLoC and remain completely decoupled from business logic and data fetching.',
    responsibilities: [
      'Render responsive layouts across mobile screen sizes and orientations',
      'Handle user interactions and dispatch events/intents to Cubit or BLoC',
      'Listen to UI states (Loading, Success, Failure, Empty) using BlocBuilder and BlocConsumer',
      'Provide smooth micro-interactions and transitions with zero UI blocking'
    ],
    code: `// Presentation: BlocConsumer handling UI States
BlocConsumer<BookingCubit, BookingState>(
  listener: (context, state) => {
    if (state is BookingError) {
      showErrorSnackbar(context, state.message);
    }
  },
  builder: (context, state) => {
    if (state is BookingLoading) return const AppLoader();
    if (state is BookingSuccess) return BookingListView(bookings: state.data);
    return const BookingEmptyState();
  },
);`
  },
  state: {
    title: 'State Management Layer',
    tag: 'Cubit & BLoC · Reactive Streams',
    body: 'Centralized state management orchestrating user intents and converting them into predictable, testable UI states. Ensures unidirectional data flow and clean separation between UI components and application logic.',
    responsibilities: [
      'Encapsulate component state and business rules using Cubit or BLoC',
      'Emit immutable state models generated via Freezed and JSON Serializable',
      'Catch domain errors and map them to meaningful UI failure states',
      'Prevent unnecessary widget rebuilds with buildWhen condition checks'
    ],
    code: `// Cubit emitting immutable Freezed states
class BookingCubit extends Cubit<BookingState> {
  final BookingRepository _repository;
  BookingCubit(this._repository) : super(const BookingState.initial());

  Future<void> fetchBookings() async {
    emit(const BookingState.loading());
    final result = await _repository.getUserBookings();
    result.fold(
      (failure) => emit(BookingState.error(failure.message)),
      (data) => emit(BookingState.success(data)),
    );
  }
}`
  },
  domain: {
    title: 'Business Logic & Domain Layer',
    tag: 'Entities · Use Cases · Contracts',
    body: 'The heart of Clean Architecture containing core business rules, entity models, and abstract contracts. Completely independent of Flutter UI, external packages, and database drivers.',
    responsibilities: [
      'Define pure Dart entity models representing core domain concepts',
      'Specify abstract repository interfaces following SOLID Dependency Inversion',
      'Encapsulate reusable single-responsibility business workflows (Use Cases)',
      'Ensure zero dependencies on external frameworks or UI libraries'
    ],
    code: `// Domain: Abstract Contract & Pure Entity
abstract class BookingRepository {
  Future<Either<Failure, List<BookingEntity>>> getUserBookings();
  Future<Either<Failure, BookingEntity>> createBooking(BookingParams params);
}

class BookingEntity {
  final String id;
  final String serviceName;
  final DateTime scheduledAt;
  const BookingEntity({required this.id, required this.serviceName, required this.scheduledAt});
}`
  },
  repository: {
    title: 'Repository Layer',
    tag: 'Repository Pattern · Single Source of Truth',
    body: 'Implements domain repository contracts to coordinate between local cache and remote network sources. Decides whether to return cached Hive/SQFlite data or make a live Dio/Retrofit network request.',
    responsibilities: [
      'Implement abstract repository interfaces defined by the domain layer',
      'Coordinate between remote REST APIs and local database caches (Offline-first)',
      'Map raw DTO response models into domain-level entity models',
      'Catch raw Dio/HTTP exceptions and transform them into standardized domain Failures'
    ],
    code: `// Repository Implementation: Single Source of Truth
class BookingRepositoryImpl implements BookingRepository {
  final RemoteBookingDataSource remote;
  final LocalBookingDataSource local;
  BookingRepositoryImpl({required this.remote, required this.local});

  @override
  Future<Either<Failure, List<BookingEntity>>> getUserBookings() async {
    try {
      final remoteData = await remote.fetchBookings();
      await local.cacheBookings(remoteData);
      return Right(remoteData.map((e) => e.toEntity()).toList());
    } on ServerException catch (e) {
      final cached = await local.getCachedBookings();
      if (cached.isNotEmpty) return Right(cached.map((e) => e.toEntity()).toList());
      return Left(ServerFailure(e.message));
    }
  }
}`
  },
  datasource: {
    title: 'Data Sources Layer',
    tag: 'Remote & Local Data Source Abstractions',
    body: 'Concrete classes dedicated to communicating directly with endpoints and local storage engines. Handles serialization, HTTP status codes, headers, and local table/box CRUD operations.',
    responsibilities: [
      'RemoteDataSource: Executes HTTP REST calls with Dio / Retrofit client',
      'LocalDataSource: Manages offline persistence with Hive boxes and SQFlite tables',
      'Deserialize JSON payloads using generated JSON Serializable models',
      'Throw low-level ServerException or CacheException on faults'
    ],
    code: `// Remote Data Source using Retrofit / Dio
@RestApi()
abstract class BookingApiClient {
  factory BookingApiClient(Dio dio, {String baseUrl}) = _BookingApiClient;

  @GET('/api/v1/bookings')
  Future<List<BookingModel>> getBookings(@Header('Authorization') String token);
}`
  },
  infrastructure: {
    title: 'Infrastructure & Tooling Layer',
    tag: 'Dio · Retrofit · Hive · SQFlite · GetIt',
    body: 'Foundational services providing dependency injection, networking configuration (interceptors, tokens), code generation, and low-level device storage drivers.',
    responsibilities: [
      'Service Locator setup via GetIt for clean Dependency Injection throughout the app',
      'Dio interceptors for logging, auth token injection, and global error handling',
      'Type-safe adapters for Hive and table schemas for SQFlite',
      'Code generation with Freezed and JSON Serializable for immutable boilerplate reduction'
    ],
    code: `// Dependency Injection Setup with GetIt
final sl = GetIt.instance;

void setupServiceLocator() {
  // External
  sl.registerLazySingleton<Dio>(() => AppDioClient.create());
  // Data Sources
  sl.registerLazySingleton<RemoteBookingDataSource>(() => RemoteBookingDataSourceImpl(sl()));
  // Repository
  sl.registerLazySingleton<BookingRepository>(() => BookingRepositoryImpl(remote: sl(), local: sl()));
  // Cubit / State
  sl.registerFactory<BookingCubit>(() => BookingCubit(sl()));
}`
  }
};

function initArchitectureInspector() {
  const cards = document.querySelectorAll('.arch-layer-card');
  const titleEl = document.querySelector('.inspector-title');
  const tagEl = document.querySelector('.inspector-tag');
  const bodyEl = document.querySelector('.inspector-body');
  const respListEl = document.querySelector('.resp-list');
  const codeEl = document.querySelector('.arch-code-preview code');

  if (!cards.length || !titleEl || !codeEl) return;

  const updateInspector = (layerKey) => {
    const data = architectureData[layerKey];
    if (!data) return;

    cards.forEach(c => {
      if (c.getAttribute('data-layer') === layerKey) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    titleEl.textContent = data.title;
    tagEl.textContent = data.tag;
    bodyEl.textContent = data.body;

    respListEl.innerHTML = '';
    data.responsibilities.forEach(resp => {
      const li = document.createElement('div');
      li.className = 'resp-item';
      li.innerHTML = `<span class="resp-bullet"></span><span>${resp}</span>`;
      respListEl.appendChild(li);
    });

    codeEl.textContent = data.code;
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const layer = card.getAttribute('data-layer');
      updateInspector(layer);
    });
  });

  updateInspector('ui');
}

/* --- Flutter Technology Map --- */
const techMapInfo = {
  flutter: {
    title: 'Flutter Framework',
    role: 'The primary cross-platform UI framework used to build native compiled, responsive mobile applications for iOS and Android from a single codebase.'
  },
  dart: {
    title: 'Dart Language',
    role: 'The strongly-typed, object-oriented language backing Flutter with sound null safety, async/await streams, and optimized AOT/JIT execution.'
  },
  cubit: {
    title: 'BLoC & Cubit',
    role: 'The state management approach used across production and client projects to manage reactive state, decouple UI from business logic, and maintain unidirectional data flow.'
  },
  mvvm: {
    title: 'MVVM Architecture',
    role: 'Model-View-ViewModel architecture applied in production and client apps to cleanly separate UI rendering (View) from state mutation and presentation logic (ViewModel/Cubit).'
  },
  clean: {
    title: 'Clean Architecture',
    role: 'Layered separation of concerns (Presentation, Domain, Data) ensuring high testability, modularity, and independent business rules.'
  },
  solid: {
    title: 'SOLID Principles',
    role: 'Object-oriented design principles applied across codebases for single responsibility, open/closed extension, interface segregation, and dependency inversion.'
  },
  repo: {
    title: 'Repository Pattern',
    role: 'Abstract boundary providing a single source of truth for data access, cleanly mediating between remote REST APIs and local database storage.'
  },
  getit: {
    title: 'GetIt (Dependency Injection)',
    role: 'Service locator enabling clean inversion of control, decoupled component instantiation, and easy swapping of data sources or mocks.'
  },
  dio: {
    title: 'Dio & Retrofit',
    role: 'Robust HTTP client and type-safe REST client generator used to handle API endpoints, token authorization, request interceptors, and error handling.'
  },
  rest: {
    title: 'REST APIs',
    role: 'Integration with backend services and JSON web endpoints to power real-time data synchronization, user bookings, services, and media feeds.'
  },
  storage: {
    title: 'Hive & SQFlite',
    role: 'Local offline persistence engines: Hive for fast key-value/box caching and SQFlite for structured relational storage and offline-first workflows.'
  },
  freezed: {
    title: 'Freezed & JSON Serializable',
    role: 'Code generation utilities used in production to create immutable data classes, union types, and robust JSON serialization with minimal boilerplate.'
  },
  firebase: {
    title: 'Firebase (Auth & Firestore)',
    role: 'Cloud backend services integrated for user authentication flows and real-time cloud document storage.'
  }
};

function initTechMap() {
  const nodes = document.querySelectorAll('.tech-node-btn');
  const titleEl = document.querySelector('.node-detail-title');
  const roleEl = document.querySelector('.node-detail-role');

  if (!nodes.length || !titleEl || !roleEl) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const techKey = node.getAttribute('data-tech');
      const data = techMapInfo[techKey];
      if (data) {
        titleEl.textContent = data.title;
        roleEl.textContent = data.role;
      }
    });
  });
}

/* --- Flutter Hot Reload & Interactive Phone Simulator --- */
function initFlutterSimulator() {
  const hotReloadBtn = document.querySelector('.hot-reload-btn');
  const phoneScreen = document.querySelector('.phone-screen');
  const statusSpan = document.querySelector('.demo-service-status');
  const cubitTag = document.querySelector('.demo-cubit-tag');

  if (!hotReloadBtn || !phoneScreen) return;

  let stateCounter = 0;
  const states = [
    { cubit: 'Cubit: Initial', status: '200 OK' },
    { cubit: 'Cubit: Loading...', status: 'Syncing' },
    { cubit: 'Cubit: Success', status: 'Updated' },
    { cubit: 'Cubit: Cached', status: 'Offline Mode' }
  ];

  hotReloadBtn.addEventListener('click', () => {
    // Trigger animation
    phoneScreen.classList.remove('hot-reloading');
    void phoneScreen.offsetWidth; // trigger reflow
    phoneScreen.classList.add('hot-reloading');

    stateCounter = (stateCounter + 1) % states.length;
    if (cubitTag) cubitTag.textContent = states[stateCounter].cubit;
    if (statusSpan) statusSpan.textContent = states[stateCounter].status;

    setTimeout(() => {
      phoneScreen.classList.remove('hot-reloading');
    }, 1200);
  });
}

/* --- Copy Email to Clipboard --- */
function initCopyEmail() {
  const copyBtn = document.querySelector('.copy-email-btn');
  const toast = document.querySelector('.toast-notice');

  if (!copyBtn || !toast) return;

  const email = 'ammar.yasser20175@gmail.com';

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      toast.classList.add('visible');
      setTimeout(() => {
        toast.classList.remove('visible');
      }, 3000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });
}

/* --- Back To Top --- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
