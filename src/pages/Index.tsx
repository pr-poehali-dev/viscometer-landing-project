import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

const SLIDES = [
  {
    img: "https://cdn.poehali.dev/projects/df098c00-2f47-472c-93f2-06308a9553f7/files/04f5016b-34bc-418f-9534-53ecd6bdfec0.jpg",
    title: "Сократите брак на 37% за первый квартал",
    subtitle: "Ротационные · ISO 2555 · от 1 до 1 000 000 мПа·с",
    desc: "Когда ОТК возвращает партию из-за отклонений вязкости — это ваши деньги. Ротационные вискозиметры дают точность ±0.1% и убирают человеческий фактор из замеров",
  },
  {
    img: "https://cdn.poehali.dev/projects/df098c00-2f47-472c-93f2-06308a9553f7/files/b5242cac-1ee2-4bc0-b9d5-fdc3a67d9ade.jpg",
    title: "Проходите аудит с первого раза",
    subtitle: "Капиллярные · ГОСТ Р 53708 · Госреестр СИ",
    desc: "Замечания аудиторов по документации измерений — стоп-фактор для сертификации. Капиллярные вискозиметры в Госреестре СИ закрывают все требования ФСА без доработок",
  },
  {
    img: "https://cdn.poehali.dev/projects/df098c00-2f47-472c-93f2-06308a9553f7/files/da008aec-156f-4534-b23e-5c49a150c14d.jpg",
    title: "Публикуйте в Q1-журналах без пересъёма данных",
    subtitle: "С падающим шариком · ISO 12058 · Метод Хёпплера",
    desc: "Рецензенты отклоняют статью, если погрешность измерения вязкости не задокументирована. Вискозиметры Хёпплера дают прослеживаемость каждого замера до эталона",
  },
];

const advantages = [
  { icon: "Target", title: "±0.1% — не переделываете замеры", desc: "Лаборанты перестают тратить 2–3 часа на повторные измерения. Результат с первого раза попадает в допуск" },
  { icon: "Shield", title: "Аудит без замечаний по СИ", desc: "Приборы в Госреестре + свидетельство о поверке = инспектор ФСА закрывает пункт по вискозиметрии за 10 минут" },
  { icon: "Cpu", title: "Данные сразу в LIMS, без ручного ввода", desc: "USB/Ethernet экспорт в LabWare, STARLIMS или Excel. Исключаете ошибки переноса и экономите 40 минут на протокол" },
  { icon: "Thermometer", title: "Один прибор на весь диапазон температур", desc: "−40…+200 °C в одном устройстве. Не нужно покупать отдельный вискозиметр для низкотемпературных или горячих проб" },
  { icon: "BarChart2", title: "Видите отклонение до отгрузки партии", desc: "Реограмма строится в реальном времени на экране прибора. Оператор замечает аномалию, пока партия ещё на линии" },
  { icon: "Wrench", title: "Поверка за 5 дней без отправки за рубеж", desc: "Сервисные центры в Москве, Новосибирске, Казани. Калибровка и ремонт — не ждёте месяц запчасть из Европы" },
];

const specs = [
  { param: "Диапазон вязкости", value: "0.1 — 1 000 000 мПа·с" },
  { param: "Погрешность измерения", value: "±0.1 — ±1%" },
  { param: "Диапазон температур", value: "−40 до +200 °C" },
  { param: "Скорость ротора", value: "0.3 — 200 об/мин" },
  { param: "Интерфейсы", value: "RS-232, USB, Ethernet, Wi-Fi" },
  { param: "Питание", value: "220 В / 50 Гц или аккумулятор" },
  { param: "Стандарты", value: "ISO 2555, ASTM D2196, ГОСТ Р 53708" },
  { param: "Сертификаты", value: "CE, EAC, ФСА, Госреестр СИ" },
  { param: "Гарантия", value: "24 месяца" },
];

const applications = [
  { icon: "FlaskConical", title: "Нефтехимия", desc: "Нужно выпускать масло по ГОСТ, а каждая 5-я партия не попадает в допуск по вязкости → поточный контроль решает" },
  { icon: "Pill", title: "Фармацевтика", desc: "GMP-инспекция через 3 месяца, а вискозиметр без поверки → ставите наш, получаете свидетельство в комплекте" },
  { icon: "Layers", title: "Пищевое производство", desc: "Соус расслаивается на полке, покупатели жалуются → контроль реологии на входе сырья снимает проблему" },
  { icon: "Paintbrush", title: "ЛКМ и клеи", desc: "Клиент вернул партию краски: «не ложится» → паспортизация вязкости каждой варки исключает рекламации" },
  { icon: "Zap", title: "Электроника", desc: "Диспенсер перестаёт дозировать клей-расплав ровно → вискозиметр в линии держит вязкость в окне ±2%" },
  { icon: "Beaker", title: "R&D и университеты", desc: "Рецензент просит «указать метод и погрешность измерения вязкости» → прибор в Госреестре = готовая ссылка в статью" },
];

const cases = [
  { org: "Нефтеперерабатывающий завод", segment: "Нефтехимия", result: "Меньше брака за 3 мес.", value: "37%", desc: "Завод терял 12 млн ₽/год на возвратах. Поставили 3 поточных вискозиметра — брак по вязкости упал с 8% до 5% за первый квартал" },
  { org: "Фармпроизводство, 200+ SKU", segment: "Фармацевтика", result: "Быстрее входной контроль", value: "4×", desc: "Лаборант тратил 45 минут на один замер вручную. После автоматизации — 11 минут включая протокол в LIMS" },
  { org: "Химический НИИ, 30 сотрудников", segment: "Наука", result: "Статей в Q1-Q2 за год", value: "18", desc: "Раньше рецензенты возвращали статьи из-за погрешности измерений. С прибором в Госреестре — ни одного отказа по метрологии" },
];

const faqs = [
  { q: "Как быстро проводится поверка прибора?", a: "Первичная поверка входит в поставку. Периодическая — раз в 1–2 года, срок 3–5 рабочих дней." },
  { q: "Можно ли интегрировать вискозиметр с LIMS?", a: "Да, все приборы поддерживают Modbus, OPC-UA и имеют коннекторы к LabWare, STARLIMS, Labvantage." },
  { q: "Какие условия гарантии?", a: "24 месяца на прибор. При заводском дефекте — замена в течение 10 рабочих дней." },
  { q: "Возможна ли аренда или лизинг?", a: "Да, работаем через Сбербанк Лизинг, ВТБ Лизинг. Аренда на 3–24 месяца." },
  { q: "Есть ли обучение для лаборантов?", a: "Базовый инструктаж включён. Сертификационные курсы — 1–2 дня онлайн или очно." },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `all 0.6s cubic-bezier(.22,.61,.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function useCountUp(target: number, dur = 1800, start = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setV(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, dur, start]);
  return v;
}

function StatBlock({ value, unit, label, delay = 0 }: { value: number; unit: string; label: string; delay?: number }) {
  const { ref, inView } = useInView();
  const c = useCountUp(value, 1600, inView);
  return (
    <div ref={ref} className="text-center" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: `all 0.5s ease ${delay}ms` }}>
      <div className="text-4xl md:text-5xl font-extrabold text-corp-red leading-none">{c}{unit}</div>
      <div className="mt-2 text-corp-text-light text-sm">{label}</div>
    </div>
  );
}

export default function Index() {
  const [slide, setSlide] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", org: "", phone: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
  }, []);

  useEffect(() => { resetTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [resetTimer]);

  const goSlide = (i: number) => { setSlide(i); resetTimer(); };
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileNav(false); };
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setFormSent(true); };

  return (
    <div className="min-h-screen bg-white font-ibm text-corp-text overflow-x-hidden">

      <div className="bg-corp-dark text-white/80 text-xs">
        <div className="max-w-7xl mx-auto px-6 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Icon name="Phone" size={12} className="text-corp-red-light" /> +7 (495) 000-00-00</span>
            <span className="hidden sm:flex items-center gap-1.5"><Icon name="Mail" size={12} className="text-corp-red-light" /> info@viskopro.ru</span>
          </div>
          <span className="flex items-center gap-1.5"><Icon name="Clock" size={12} className="text-corp-red-light" /> Пн–Пт 9:00–18:00</span>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-corp-red rounded-lg flex items-center justify-center">
              <Icon name="Gauge" size={20} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-corp-text text-lg leading-none tracking-tight">ВИСКОПРО</span>
              <div className="text-[10px] text-corp-text-muted leading-none mt-0.5">вискозиметры для лабораторий</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-corp-text-light">
            {[["advantages","Преимущества"],["specs","Характеристики"],["applications","Применение"],["cases","Кейсы"],["faq","FAQ"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-corp-red transition-colors">{label}</button>
            ))}
          </div>

          <button onClick={() => scrollTo("order")} className="hidden lg:flex items-center gap-2 bg-corp-red text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-corp-red-dark transition-colors">
            <Icon name="Send" size={15} /> Запросить демо
          </button>

          <button className="lg:hidden text-corp-text" onClick={() => setMobileNav(!mobileNav)}>
            <Icon name={mobileNav ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {mobileNav && (
          <div className="lg:hidden border-t px-6 py-4 flex flex-col gap-3 bg-white shadow-lg text-sm">
            {[["advantages","Преимущества"],["specs","Характеристики"],["applications","Применение"],["cases","Кейсы"],["faq","FAQ"],["contacts","Контакты"],["order","Запросить демо"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-corp-text-light hover:text-corp-red transition-colors py-1">{label}</button>
            ))}
          </div>
        )}
      </nav>

      <section className="relative bg-corp-gray overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[420px]">
            <div key={slide} style={{ animation: "fade-up 0.5s ease-out forwards" }}>
              <div className="inline-flex items-center gap-2 bg-corp-red/10 text-corp-red text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-corp-red" />
                {SLIDES[slide].subtitle}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-corp-text leading-tight mb-5">
                {SLIDES[slide].title}
              </h1>
              <p className="text-corp-text-light text-lg leading-relaxed mb-8 max-w-lg">
                {SLIDES[slide].desc}
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => scrollTo("order")} className="bg-corp-red text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-corp-red-dark transition-all hover:scale-105 text-sm">
                  Запросить демонстрацию
                </button>
                <button onClick={() => scrollTo("specs")} className="border-2 border-corp-gray-mid text-corp-text-light font-semibold px-7 py-3.5 rounded-lg hover:border-corp-red hover:text-corp-red transition-all text-sm">
                  Подробнее
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center" key={`img-${slide}`} style={{ animation: "fade-in 0.6s ease-out forwards" }}>
              <img src={SLIDES[slide].img} alt={SLIDES[slide].title} className="w-full max-w-md rounded-2xl shadow-2xl object-cover aspect-square" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-10">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => goSlide(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === slide ? "w-10 bg-corp-red" : "w-2.5 bg-corp-gray-mid hover:bg-corp-text-muted"}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-corp-gray-mid">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatBlock value={500} unit="+" label="Лабораторий по России" />
          <StatBlock value={15} unit=" лет" label="На рынке" delay={100} />
          <StatBlock value={99} unit=".9%" label="Uptime приборов" delay={200} />
          <StatBlock value={24} unit="/7" label="Техподдержка" delay={300} />
        </div>
      </section>

      <section id="advantages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <div className="text-corp-red text-sm font-semibold uppercase tracking-wider mb-2">Что вы получаете</div>
            <h2 className="text-3xl md:text-4xl font-bold text-corp-text">6 задач, которые <span className="text-corp-red">закрывает прибор</span></h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a, i) => (
              <FadeUp key={i} delay={i * 70}>
                <div className="group p-6 bg-corp-gray rounded-xl border border-transparent hover:border-corp-red/20 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-corp-red/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-corp-red transition-colors duration-300">
                    <Icon name={a.icon} size={22} className="text-corp-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-corp-text font-bold text-lg mb-2">{a.title}</h3>
                  <p className="text-corp-text-light text-sm leading-relaxed">{a.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="specs" className="py-20 bg-corp-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <FadeUp>
              <div className="text-corp-red text-sm font-semibold uppercase tracking-wider mb-2">Характеристики</div>
              <h2 className="text-3xl md:text-4xl font-bold text-corp-text mb-8">Технические <span className="text-corp-red">параметры</span></h2>
              <div className="bg-white rounded-xl border border-corp-gray-mid overflow-hidden shadow-sm">
                {specs.map((s, i) => (
                  <div key={i} className={`flex items-center justify-between px-5 py-3.5 text-sm ${i % 2 ? "bg-corp-gray/50" : "bg-white"} ${i < specs.length - 1 ? "border-b border-corp-gray-mid" : ""}`}>
                    <span className="text-corp-text-light">{s.param}</span>
                    <span className="font-semibold text-corp-text text-right ml-4">{s.value}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={150}>
              <div className="bg-white rounded-xl p-8 border border-corp-gray-mid shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-corp-red rounded-lg flex items-center justify-center">
                    <Icon name="BadgeCheck" size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-corp-text">Сертификация</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {["ISO 9001:2015", "ISO/IEC 17025", "CE Marking", "EAC / ТР ТС", "ГОСТ Р / ФСА", "Госреестр СИ РФ"].map((cert) => (
                    <div key={cert} className="flex items-center gap-2 bg-corp-gray rounded-lg px-3 py-3">
                      <Icon name="CheckCircle2" size={16} className="text-corp-red flex-shrink-0" />
                      <span className="text-sm font-medium text-corp-text">{cert}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-corp-red/5 rounded-lg border border-corp-red/20">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-semibold text-corp-red uppercase tracking-wider">Все приборы в Госреестре СИ</span>
                  </div>
                  <p className="text-sm text-corp-text-light">Каждый вискозиметр проходит первичную поверку и сопровождается свидетельством государственного образца</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section id="applications" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <div className="text-corp-red text-sm font-semibold uppercase tracking-wider mb-2">Ваша отрасль</div>
            <h2 className="text-3xl md:text-4xl font-bold text-corp-text">Какую проблему <span className="text-corp-red">решаете вы?</span></h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {applications.map((app, i) => (
              <FadeUp key={i} delay={i * 70}>
                <div className="group flex items-start gap-4 p-5 rounded-xl bg-corp-gray hover:bg-white hover:shadow-lg border border-transparent hover:border-corp-gray-mid transition-all duration-300 h-full">
                  <div className="w-11 h-11 bg-corp-red/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-corp-red transition-colors duration-300">
                    <Icon name={app.icon} size={20} className="text-corp-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-corp-text font-bold mb-1">{app.title}</h3>
                    <p className="text-corp-text-light text-sm leading-relaxed">{app.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 bg-corp-dark">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <div className="text-corp-red-light text-sm font-semibold uppercase tracking-wider mb-2">Было → Стало</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Цифры, а не <span className="text-corp-red-light">обещания</span></h2>
          </FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div className="bg-corp-dark-mid rounded-xl p-7 border border-white/10 hover:border-corp-red-light/30 transition-colors h-full flex flex-col">
                  <div className="mb-4">
                    <div className="text-white font-semibold text-sm">{c.org}</div>
                    <div className="inline-block text-corp-red-light text-xs font-semibold bg-corp-red-light/10 px-2 py-0.5 rounded mt-1">{c.segment}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-5xl font-extrabold text-corp-red-light">{c.value}</div>
                    <div className="text-white/80 text-sm font-medium mt-1">{c.result}</div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mt-auto">{c.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="py-20 bg-corp-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <FadeUp>
              <div className="text-corp-red text-sm font-semibold uppercase tracking-wider mb-2">Следующий шаг</div>
              <h2 className="text-3xl md:text-4xl font-bold text-corp-text mb-4">Покажем прибор <span className="text-corp-red">на вашей пробе</span></h2>
              <p className="text-corp-text-light mb-8 leading-relaxed">Пришлите образец — проведём замер и покажем результат онлайн. Вы увидите точность до покупки, а не после. Инженер свяжется в течение рабочего дня.</p>
              <div className="space-y-4">
                {[
                  { icon: "Phone", text: "+7 (495) 000-00-00", sub: "Горячая линия" },
                  { icon: "Mail", text: "info@viskopro.ru", sub: "Email" },
                  { icon: "MapPin", text: "Москва, ул. Промышленная, 12с1", sub: "Офис и шоурум" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-corp-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={18} className="text-corp-red" />
                    </div>
                    <div>
                      <div className="text-corp-text font-semibold text-sm">{item.text}</div>
                      <div className="text-corp-text-muted text-xs">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={150}>
              {formSent ? (
                <div className="flex flex-col items-center justify-center h-full text-center bg-white rounded-xl p-12 shadow-sm border border-corp-gray-mid">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <Icon name="CheckCircle2" size={36} className="text-green-500" />
                  </div>
                  <h3 className="text-corp-text text-xl font-bold mb-2">Заявка отправлена!</h3>
                  <p className="text-corp-text-light text-sm">Инженер свяжется с вами в течение рабочего дня</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm border border-corp-gray-mid space-y-4">
                  {[
                    { name: "name", label: "Имя и фамилия", type: "text", ph: "Иван Петров" },
                    { name: "org", label: "Организация", type: "text", ph: "ООО «Лаборатория»" },
                    { name: "phone", label: "Телефон", type: "tel", ph: "+7 (___) ___-__-__" },
                    { name: "email", label: "Email", type: "email", ph: "ivan@lab.ru" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-corp-text text-xs font-semibold uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.ph}
                        value={formData[f.name as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                        className="w-full border border-corp-gray-mid rounded-lg px-4 py-3 text-sm text-corp-text placeholder-corp-text-muted focus:outline-none focus:border-corp-red focus:ring-1 focus:ring-corp-red/20 transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-corp-text text-xs font-semibold uppercase tracking-wider mb-1.5">Комментарий</label>
                    <textarea
                      placeholder="Опишите задачу или интересующие модели..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-corp-gray-mid rounded-lg px-4 py-3 text-sm text-corp-text placeholder-corp-text-muted focus:outline-none focus:border-corp-red focus:ring-1 focus:ring-corp-red/20 transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full bg-corp-red text-white font-bold py-3.5 rounded-lg hover:bg-corp-red-dark transition-all hover:scale-[1.01] text-sm">
                    Отправить заявку
                  </button>
                  <p className="text-corp-text-muted text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <div className="text-corp-red text-sm font-semibold uppercase tracking-wider mb-2">FAQ</div>
            <h2 className="text-3xl md:text-4xl font-bold text-corp-text">Частые <span className="text-corp-red">вопросы</span></h2>
          </FadeUp>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 50}>
                <div className="border border-corp-gray-mid rounded-xl overflow-hidden bg-white">
                  <button className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-corp-gray/50 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="text-corp-text font-semibold pr-4 text-sm">{faq.q}</span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? "bg-corp-red text-white" : "bg-corp-gray text-corp-text-light"}`}>
                      <Icon name={openFaq === i ? "Minus" : "Plus"} size={14} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-corp-text-light text-sm leading-relaxed border-t border-corp-gray-mid pt-4">{faq.a}</div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-corp-gray">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <div className="text-corp-red text-sm font-semibold uppercase tracking-wider mb-2">Контакты</div>
            <h2 className="text-3xl md:text-4xl font-bold text-corp-text">Ответим за <span className="text-corp-red">2 часа</span></h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "Headphones", title: "Горячая линия", lines: ["+7 (800) 000-00-00", "Бесплатно по России", "Пн–Пт 9:00–20:00"] },
              { icon: "Wrench", title: "Сервисный центр", lines: ["Москва, Новосибирск, Казань", "Выезд инженера на объект", "Ремонт: 3–7 дней"] },
              { icon: "BookOpen", title: "Документация", lines: ["База знаний 24/7", "Видеоинструкции", "Сертификаты и протоколы"] },
            ].map((b, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="bg-white rounded-xl p-6 border border-corp-gray-mid hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-corp-red/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={b.icon} size={22} className="text-corp-red" />
                  </div>
                  <h3 className="text-corp-text font-bold mb-3">{b.title}</h3>
                  {b.lines.map((l, j) => <div key={j} className="text-corp-text-light text-sm mb-1">{l}</div>)}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-corp-dark text-white/60 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-corp-red rounded-lg flex items-center justify-center">
                <Icon name="Gauge" size={16} className="text-white" />
              </div>
              <span className="font-bold text-white text-base">ВИСКОПРО</span>
            </div>
            <div className="text-xs text-center">© 2024 ВискоПро. Все права защищены. ИНН 7700000000</div>
            <div className="flex gap-6 text-xs">
              <a href="#" className="hover:text-corp-red-light transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-corp-red-light transition-colors">Реквизиты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}