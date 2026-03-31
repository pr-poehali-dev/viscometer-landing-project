import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/df098c00-2f47-472c-93f2-06308a9553f7/files/ad7520ee-edda-44b6-87a6-960d4795393f.jpg";
const LAB_IMAGE = "https://cdn.poehali.dev/projects/df098c00-2f47-472c-93f2-06308a9553f7/files/7070331c-935a-4c64-85de-c777beaa3e90.jpg";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function StatCard({ value, unit, label, delay = 0 }: { value: number; unit: string; label: string; delay?: number }) {
  const { ref, inView } = useInView();
  const count = useCountUp(value, 1800, inView);
  return (
    <div
      ref={ref}
      className="text-center"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s ease ${delay}ms` }}
    >
      <div className="font-mono text-4xl md:text-5xl font-medium text-lab-amber leading-none">
        {count}{unit}
      </div>
      <div className="mt-2 text-lab-steel text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `all 0.7s ease ${delay}ms` }}
    >
      {children}
    </div>
  );
}

const advantages = [
  { icon: "Target", title: "Точность ±0.1%", desc: "Метрологически аттестованные приборы с государственным свидетельством о поверке" },
  { icon: "Shield", title: "ISO / ASTM / ГОСТ", desc: "Полное соответствие международным стандартам и требованиям российской нормативной базы" },
  { icon: "Cpu", title: "Цифровой интерфейс", desc: "RS-232/USB/Ethernet выходы, экспорт данных в Excel и LIMS-системы" },
  { icon: "Thermometer", title: "Термостатирование", desc: "Диапазон рабочих температур −40…+200 °C с точностью поддержания ±0.01 °C" },
  { icon: "BarChart2", title: "Аналитика в реальном времени", desc: "Автоматическое построение реограмм и вязкостных кривых прямо на экране прибора" },
  { icon: "Wrench", title: "Сервис в России", desc: "Собственный сервисный центр, калибровка и поверка без отправки за рубеж" },
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
  { icon: "FlaskConical", title: "Нефтехимия", desc: "Контроль вязкости нефти, мазута, смазочных масел и нефтепродуктов по ГОСТ и API стандартам" },
  { icon: "Pill", title: "Фармацевтика", desc: "Измерение реологических свойств суспензий, гелей, мазей согласно требованиям GMP и ГФ РФ" },
  { icon: "Layers", title: "Пищевая промышленность", desc: "Контроль качества соусов, сиропов, молочных продуктов, шоколада и кондитерских масс" },
  { icon: "Paintbrush", title: "Лакокрасочная отрасль", desc: "Паспортизация красок, лаков, грунтовок и клеёв. Соответствие ISO 2884 и DIN 53018" },
  { icon: "Zap", title: "Электроника и химия", desc: "Клеи-расплавы, фотополимеры, смолы, гальванические электролиты и полупроводниковые материалы" },
  { icon: "Beaker", title: "Научные исследования", desc: "R&D лаборатории, университеты, испытательные центры, разработка новых материалов" },
];

const cases = [
  { org: "ПАО «Роснефть»", segment: "Нефтехимия", result: "Снижение брака", value: "37%", desc: "Внедрение online-контроля вязкости в поточной линии сократило производственный брак нефтепродуктов" },
  { org: "АО «Фармацевтическая фабрика»", segment: "Фармацевтика", result: "Ускорение контроля", value: "4×", desc: "Замена вискозиметра Брукфилда на автоматизированную систему ускорила входной контроль в 4 раза" },
  { org: "НИИ Химических технологий", segment: "Наука", result: "Публикаций за год", value: "18", desc: "Точные реологические данные позволили опубликовать 18 научных статей в журналах Q1-Q2 за год" },
];

const faqs = [
  { q: "Как быстро проводится поверка прибора?", a: "Первичная поверка входит в поставку. Периодическая — раз в 1–2 года в нашем аккредитованном центре, срок 3–5 рабочих дней." },
  { q: "Можно ли интегрировать вискозиметр с LIMS?", a: "Да. Все приборы поддерживают открытые протоколы (Modbus, OPC-UA) и имеют готовые коннекторы к популярным LIMS: LabWare, STARLIMS, Labvantage." },
  { q: "Какие условия гарантии?", a: "24 месяца на прибор и термостат. При обнаружении заводского дефекта — замена в течение 10 рабочих дней. Сервис осуществляется на территории России." },
  { q: "Возможна ли аренда или лизинг?", a: "Да. Работаем через ведущие лизинговые компании (Сбербанк Лизинг, ВТБ Лизинг). Также доступна операционная аренда на 3–24 месяца." },
  { q: "Есть ли обучение для лаборантов?", a: "Базовый инструктаж включён в поставку. Сертификационные курсы для операторов — 1–2 дня онлайн или очно в Москве." },
];

const [navOpen, setNavOpen] = [false, () => {}];

export default function Index() {
  const [mobileNav, setMobileNav] = useState(false);
  const [formData, setFormData] = useState({ name: "", org: "", phone: "", email: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-lab-navy font-ibm text-lab-steel-light overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-lab-navy/90 backdrop-blur-md border-b border-lab-steel-muted/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-lab-amber rounded-sm flex items-center justify-center">
              <Icon name="Gauge" size={18} className="text-lab-navy" />
            </div>
            <span className="font-mono text-white font-medium tracking-tight text-lg">ВИСКОПРО</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-lab-steel">
            {[["advantages","Преимущества"],["specs","Характеристики"],["applications","Применение"],["cases","Кейсы"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-lab-amber transition-colors duration-200">{label}</button>
            ))}
          </div>
          <button onClick={() => scrollTo("order")} className="hidden md:block bg-lab-amber text-lab-navy text-sm font-semibold px-5 py-2 rounded hover:bg-lab-amber-light transition-colors duration-200">
            Запросить демо
          </button>
          <button className="md:hidden text-lab-steel" onClick={() => setMobileNav(!mobileNav)}>
            <Icon name={mobileNav ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileNav && (
          <div className="md:hidden bg-lab-navy-light border-t border-lab-steel-muted/20 px-6 py-4 flex flex-col gap-4 text-sm">
            {[["advantages","Преимущества"],["specs","Характеристики"],["applications","Применение"],["cases","Кейсы"],["order","Заказать демо"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-lab-steel hover:text-lab-amber transition-colors">{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Вискозиметр" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-lab-navy via-lab-navy/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-lab-navy via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, #8ba3c7 39px, #8ba3c7 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #8ba3c7 39px, #8ba3c7 40px)"}} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 bg-lab-amber/10 border border-lab-amber/30 text-lab-amber text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded mb-8"
              style={{ animation: "fade-up 0.6s ease-out forwards" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-lab-amber animate-pulse" />
              Соответствие ISO · ASTM · ГОСТ
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6"
              style={{ animation: "fade-up 0.7s ease-out 0.1s both" }}
            >
              Измерения,<br />
              <span className="text-lab-amber font-semibold">которым<br />доверяют</span>
            </h1>

            <p
              className="text-lab-steel text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
              style={{ animation: "fade-up 0.7s ease-out 0.2s both" }}
            >
              Профессиональные вискозиметры для аналитических, производственных и исследовательских лабораторий. Точность ±0.1%, полная метрологическая прослеживаемость.
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{ animation: "fade-up 0.7s ease-out 0.3s both" }}
            >
              <button onClick={() => scrollTo("order")} className="bg-lab-amber text-lab-navy font-semibold px-8 py-4 rounded text-base hover:bg-lab-amber-light transition-all duration-200 hover:scale-105">
                Запросить демонстрацию
              </button>
              <button onClick={() => scrollTo("specs")} className="border border-lab-steel-muted text-lab-steel-light px-8 py-4 rounded text-base hover:border-lab-amber hover:text-lab-amber transition-all duration-200">
                Технические характеристики
              </button>
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="absolute bottom-0 left-0 right-0 bg-lab-navy-light/80 backdrop-blur border-t border-lab-steel-muted/20">
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value={500} unit="+" label="Лабораторий по РФ" />
            <StatCard value={15} unit=" лет" label="На рынке" delay={100} />
            <StatCard value={99} unit=".9%" label="Uptime приборов" delay={200} />
            <StatCard value={24} unit=" ч" label="Сервисная поддержка" delay={300} />
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 bg-lab-navy">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="mb-16">
            <div className="font-mono text-lab-amber text-xs uppercase tracking-widest mb-3">// 01 Преимущества</div>
            <h2 className="text-3xl md:text-4xl font-light text-white">Почему выбирают <span className="text-lab-amber">ВискоПро</span></h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="group p-6 bg-lab-navy-light border border-lab-steel-muted/20 rounded-lg hover:border-lab-amber/40 transition-all duration-300 hover:bg-lab-navy-mid/50 h-full">
                  <div className="w-10 h-10 bg-lab-amber/10 rounded flex items-center justify-center mb-4 group-hover:bg-lab-amber/20 transition-colors">
                    <Icon name={adv.icon} size={20} className="text-lab-amber" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{adv.title}</h3>
                  <p className="text-lab-steel text-sm leading-relaxed">{adv.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section id="specs" className="py-24 bg-lab-navy-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="font-mono text-lab-amber text-xs uppercase tracking-widest mb-3">// 02 Технические характеристики</div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-8">Параметры <span className="text-lab-amber">точности</span></h2>

              <div className="space-y-0 border border-lab-steel-muted/20 rounded-lg overflow-hidden">
                {specs.map((s, i) => (
                  <div key={i} className={`flex items-center justify-between px-5 py-3.5 ${i % 2 === 0 ? "bg-lab-navy" : "bg-lab-navy-light"} border-b border-lab-steel-muted/10 last:border-0`}>
                    <span className="text-lab-steel text-sm">{s.param}</span>
                    <span className="font-mono text-white text-sm text-right ml-4">{s.value}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={200}>
              <div className="relative rounded-xl overflow-hidden">
                <img src={LAB_IMAGE} alt="Лаборатория" className="w-full object-cover rounded-xl opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-lab-navy/60 to-transparent rounded-xl" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-lab-navy/80 backdrop-blur border border-lab-amber/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="font-mono text-xs text-lab-amber uppercase tracking-wider">Онлайн мониторинг</span>
                    </div>
                    <div className="font-mono text-white text-sm">η = 156.3 мПа·с @ 25.00 °C</div>
                    <div className="text-lab-steel text-xs mt-1">Отклонение: ±0.08% · Статус: НОРМА</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section id="applications" className="py-24 bg-lab-navy">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="mb-16">
            <div className="font-mono text-lab-amber text-xs uppercase tracking-widest mb-3">// 03 Области применения</div>
            <h2 className="text-3xl md:text-4xl font-light text-white">Где работают <span className="text-lab-amber">наши приборы</span></h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="group relative p-6 bg-lab-navy-light border border-lab-steel-muted/20 rounded-lg hover:border-lab-amber/30 transition-all duration-300 overflow-hidden h-full">
                  <div className="absolute top-0 left-0 w-1 h-full bg-lab-amber opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name={app.icon} size={20} className="text-lab-amber" />
                    <h3 className="text-white font-semibold">{app.title}</h3>
                  </div>
                  <p className="text-lab-steel text-sm leading-relaxed">{app.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 bg-lab-navy-light">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="mb-16">
            <div className="font-mono text-lab-amber text-xs uppercase tracking-widest mb-3">// 04 Кейсы и результаты</div>
            <h2 className="text-3xl md:text-4xl font-light text-white">Измеримые <span className="text-lab-amber">результаты</span></h2>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <FadeUp key={i} delay={i * 120}>
                <div className="p-7 bg-lab-navy border border-lab-steel-muted/20 rounded-xl h-full flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">{c.org}</div>
                      <div className="inline-block text-lab-amber text-xs font-mono bg-lab-amber/10 px-2 py-0.5 rounded">{c.segment}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="font-mono text-5xl font-medium text-lab-amber">{c.value}</div>
                    <div className="text-lab-steel-light text-sm font-medium mt-1">{c.result}</div>
                  </div>
                  <p className="text-lab-steel text-sm leading-relaxed mt-auto">{c.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS BANNER */}
      <section className="py-14 bg-lab-navy border-y border-lab-steel-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              <div className="text-lab-steel text-sm uppercase tracking-widest font-mono">Сертификации:</div>
              {["ISO 9001:2015", "ISO/IEC 17025", "CE Marking", "EAC / ТР ТС", "ГОСТ Р / ФСА", "Госреестр СИ РФ"].map((cert) => (
                <div key={cert} className="flex items-center gap-2 text-white">
                  <Icon name="BadgeCheck" size={16} className="text-lab-amber" />
                  <span className="font-mono text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" className="py-24 bg-lab-navy-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeUp>
              <div className="font-mono text-lab-amber text-xs uppercase tracking-widest mb-3">// 05 Форма заказа</div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Запросить <span className="text-lab-amber">демонстрацию</span></h2>
              <p className="text-lab-steel mb-8 leading-relaxed">Оставьте заявку — наш инженер свяжется с вами в течение одного рабочего дня, проведёт онлайн-демо и подберёт оптимальную конфигурацию.</p>

              <div className="space-y-4">
                {[
                  { icon: "Phone", text: "+7 (495) 000-00-00" },
                  { icon: "Mail", text: "info@viskopro.ru" },
                  { icon: "MapPin", text: "Москва, ул. Промышленная, 12с1" },
                  { icon: "Clock", text: "Пн–Пт, 9:00–18:00 МСК" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-lab-steel">
                    <div className="w-8 h-8 bg-lab-amber/10 rounded flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-lab-amber" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={200}>
              {formSent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="CheckCircle2" size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">Заявка отправлена</h3>
                  <p className="text-lab-steel text-sm">Наш инженер свяжется с вами в течение рабочего дня</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: "name", label: "Имя и фамилия", type: "text", placeholder: "Иван Петров" },
                    { name: "org", label: "Организация", type: "text", placeholder: "ООО «Лаборатория»" },
                    { name: "phone", label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
                    { name: "email", label: "Email", type: "email", placeholder: "ivan@lab.ru" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-lab-steel text-xs uppercase tracking-wider mb-1.5 font-mono">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full bg-lab-navy border border-lab-steel-muted/30 rounded px-4 py-3 text-white text-sm placeholder-lab-steel-muted focus:outline-none focus:border-lab-amber transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-lab-steel text-xs uppercase tracking-wider mb-1.5 font-mono">Комментарий</label>
                    <textarea
                      placeholder="Опишите задачу или укажите интересующие модели..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-lab-navy border border-lab-steel-muted/30 rounded px-4 py-3 text-white text-sm placeholder-lab-steel-muted focus:outline-none focus:border-lab-amber transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full bg-lab-amber text-lab-navy font-semibold py-4 rounded text-base hover:bg-lab-amber-light transition-all duration-200 hover:scale-[1.02]">
                    Отправить заявку
                  </button>
                  <p className="text-lab-steel-muted text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-lab-navy">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp className="mb-16 text-center">
            <div className="font-mono text-lab-amber text-xs uppercase tracking-widest mb-3">// 06 Частые вопросы</div>
            <h2 className="text-3xl md:text-4xl font-light text-white">Вопросы <span className="text-lab-amber">и ответы</span></h2>
          </FadeUp>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div className="border border-lab-steel-muted/20 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-lab-navy-light/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="text-lab-amber flex-shrink-0" />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 text-lab-steel text-sm leading-relaxed border-t border-lab-steel-muted/20 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-lab-navy-light border-t border-lab-steel-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="mb-12">
            <div className="font-mono text-lab-amber text-xs uppercase tracking-widest mb-3">// 07 Контакты и поддержка</div>
            <h2 className="text-3xl md:text-4xl font-light text-white">Техническая <span className="text-lab-amber">поддержка</span></h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "HeadphonesIcon", title: "Горячая линия", lines: ["+7 (800) 000-00-00", "Бесплатно по России", "Пн–Пт 9:00–20:00"] },
              { icon: "Wrench", title: "Сервисный центр", lines: ["Москва, Новосибирск, Казань", "Выезд инженера на объект", "Срок ремонта: 3–7 дней"] },
              { icon: "BookOpen", title: "Документация", lines: ["База знаний онлайн 24/7", "Видеоинструкции", "Сертификаты и протоколы"] },
            ].map((block, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div className="p-6 bg-lab-navy border border-lab-steel-muted/20 rounded-xl h-full">
                  <div className="w-10 h-10 bg-lab-amber/10 rounded flex items-center justify-center mb-4">
                    <Icon name={block.icon} size={20} className="text-lab-amber" fallback="HelpCircle" />
                  </div>
                  <h3 className="text-white font-semibold mb-3">{block.title}</h3>
                  <div className="space-y-1.5">
                    {block.lines.map((l, j) => (
                      <div key={j} className="text-lab-steel text-sm">{l}</div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-lab-navy border-t border-lab-steel-muted/20 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-lab-amber rounded-sm flex items-center justify-center">
              <Icon name="Gauge" size={14} className="text-lab-navy" />
            </div>
            <span className="font-mono text-white text-sm font-medium">ВИСКОПРО</span>
          </div>
          <div className="text-lab-steel-muted text-xs font-mono text-center">
            © 2024 ВискоПро. Все права защищены. ИНН 7700000000
          </div>
          <div className="flex gap-5 text-xs text-lab-steel-muted">
            <a href="#" className="hover:text-lab-amber transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-lab-amber transition-colors">Реквизиты</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
