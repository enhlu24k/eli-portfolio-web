import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, Copy, Globe, X } from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4';

enum Language {
  EN = 'en',
  MN = 'mn',
}

enum SpeechFormat {
  FULL = 'full',
  SHORT = 'short',
}

interface TopicItem {
  id: string;
  pillLabel: { en: string; mn: string };
  index: string;
  title: { en: string; mn: string };
  summary: { en: string; mn: string };
  metricsLine: { en: string; mn: string };
  details: { en: string[]; mn: string[] };
  links?: { label: { en: string; mn: string }; url: string }[];
}

const TOPICS: TopicItem[] = [
  {
    id: 'Engineering & LEGO',
    pillLabel: { en: 'Engineering & LEGO', mn: 'Инженерчлэл ба Лего' },
    index: '01',
    title: {
      en: 'Future Mechanical Engineer & 18+ LEGO Builder',
      mn: 'Ирээдүйн Механик Инженер ба 18+ Лего Бүтээгч',
    },
    summary: {
      en: 'Turning 12 this year with a dream of becoming a Mechanical Engineer. Strong in mathematics, passionate about motorcars and motorcycles, and able to assemble complex 18+ LEGO sets in just 1–2 days.',
      mn: 'Би энэ жил 12 нас хүрнэ, ирээдүйд Механик инженер болохыг хүсдэг. Математиктаа сайн, мотортой машин болон мотоцикл сонирхдог ба 18+ насны нарийн Лего загварыг ердөө 1–2 хоногт угсардаг.',
    },
    metricsLine: {
      en: 'Strong in Math · 24–48h 18+ LEGO Builds · Cars & Motorcycles',
      mn: 'Математиктаа сайн · 1–2 хоногт 18+ Лего · Машин ба Мотоцикл',
    },
    details: {
      en: [
        'Completes advanced 18+ mechanical LEGO sets with thousands of gears and pins in 1 to 2 days.',
        'Excels in school mathematics to understand ratios, speed, and mechanical structures.',
        'Deeply curious about how internal combustion engines, gearboxes, motorcars, and motorcycles operate.',
      ],
      mn: [
        'Олон мянган эд анги, араа бүхий 18+ насны том Лего загваруудыг 1–2 хоногийн дотор бүрэн угсардаг.',
        'Тооцоолол, харьцаа болон техникийн бүтцийг ойлгоход тусалдаг Математикийн хичээлдээ маш сайн.',
        'Мотортой машин, мотоцикл болон хөдөлгүүр хэрхэн ажилладгийг судлах дуртай.',
      ],
    },
    links: [
      {
        label: { en: 'What does engineering do?', mn: 'Инженер хүн юу хийдэг вэ?' },
        url: 'https://www.nu.edu/blog/types-of-engineering/',
      },
    ],
  },
  {
    id: 'Karting & F1',
    pillLabel: { en: 'Karting & F1', mn: 'Картинг ба F1' },
    index: '02',
    title: {
      en: 'Competitive Karting Racer & Formula 1 Fan',
      mn: 'Картингийн Тамирчин ба Формула 1 Сонирхогч',
    },
    summary: {
      en: 'Actively training and competing in go-kart racing with a new race coming up soon, while following Formula 1 engineering and cheering for world champion Max Verstappen.',
      mn: 'Картингаар хичээллэн уралдаж байгаа бөгөөд удахгүй шинэ тэмцээнд оролцоно. Мөн Формула 1 уралдааныг шимтэн үзэж, дэлхийн аварга Макс Верстаппеныг дэмждэг.',
    },
    metricsLine: {
      en: 'Active Karting · Upcoming Race · Max Verstappen Supporter',
      mn: 'Картингийн уралдаан · Удахгүй тэмцээнтэй · Макс Верстаппены дэмжигч',
    },
    details: {
      en: [
        'Practices racing lines, braking zones, and cornering grip on the karting track.',
        'Currently preparing for an upcoming competitive karting race.',
        'Dedicated Formula 1 fan inspired by Max Verstappen’s precision and racecraft.',
      ],
      mn: [
        'Картингийн зам дээр эргэлтийн траектор, тоормослолт болон хурдны мэдрэмжээ хөгжүүлдэг.',
        'Удахгүй болох картингийн уралдаандаа идэвхтэй бэлдэж байгаа.',
        'Формула 1-ийн Макс Верстаппены ур чадвар, тууштай байдлаас урам авдаг.',
      ],
    },
    links: [
      {
        label: { en: 'FIA Karting Official', mn: 'FIA Картингийн Холбоо' },
        url: 'https://www.fiakarting.com/',
      },
      {
        label: { en: 'Formula 1 Official', mn: 'Формула 1 Албан ёсны сайт' },
        url: 'https://www.formula1.com/',
      },
      {
        label: { en: 'About Max Verstappen', mn: 'Макс Верстаппены тухай' },
        url: 'https://en.wikipedia.org/wiki/Max_Verstappen',
      },
    ],
  },
  {
    id: 'Morin Khuur',
    pillLabel: { en: 'Morin Khuur', mn: 'Морин хуур' },
    index: '03',
    title: {
      en: 'Traditional Mongolian Morin Khuur Player',
      mn: 'Үндэсний Морин Хуур Хөгжимчин',
    },
    summary: {
      en: 'Plays Mongolia’s traditional two-stringed horsehead fiddle (Morin Khuur), balancing modern engineering curiosity with cultural heritage and musical discipline.',
      mn: 'Монголын уламжлалт хоёр чавхдаст морин хуур хөгжмийг тоглож чаддаг бөгөөд орчин үеийн техник сэтгэлгээгээ үндэсний өв соёлтойгоо хослуулдаг.',
    },
    metricsLine: {
      en: 'Mongolian Heritage · Two-Stringed Fiddle · Focus & Rhythm',
      mn: 'Монгол өв соёл · Морин хуур · Төвлөрөл ба Хэмнэл',
    },
    details: {
      en: [
        'Performs melodies on the traditional Mongolian Morin Khuur.',
        'Builds patience, fine hand coordination, and deep concentration that also help in mechanical assembly.',
        'Proudly represents Mongolian tradition alongside science and motorsport.',
      ],
      mn: [
        'Үндэсний бахархал болсон морин хуур хөгжмөөр аялгуу эгшиглүүлдэг.',
        'Хуур тоглох нь гарын нарийн мэдрэмж, тэвчээр, анхаарал төвлөрлийг хөгжүүлдэг.',
        'Техник, спортын хажуугаар Монгол өв соёлоо өвлөн суралцаж яваа.',
      ],
    },
  },
  {
    id: 'Languages & Gaming',
    pillLabel: { en: 'Languages & Gaming', mn: 'Хэл ба Тоглоом' },
    index: '04',
    title: {
      en: 'B1 English, Multilingual Class & Roblox RIVALS',
      mn: 'B1 Англи Хэл, Манай Гоё Анги ба Roblox RIVALS',
    },
    summary: {
      en: 'Holds a B1 intermediate level in English, studies in an awesome class where students learn Chinese and Korean languages, and enjoys playing RIVALS on Roblox.',
      mn: 'Англи хэлний B1 түвшинтэй, Хятад болон Солонгос хэл судалдаг маш гоё ангид суралцдаг ба чөлөөт цагаараа Roblox дээр RIVALS тоглох дуртай.',
    },
    metricsLine: {
      en: 'B1 English · Chinese & Korean Class · Roblox RIVALS',
      mn: 'B1 Англи хэл · Хятад, Солонгос хэлтэй анги · Roblox RIVALS',
    },
    details: {
      en: [
        'Communicates confidently at a B1 intermediate English proficiency level.',
        'Studies in a supportive, energetic class surrounded by Chinese and Korean language learning.',
        'Relaxes with friends in fast-paced competitive matches of RIVALS on Roblox.',
      ],
      mn: [
        'Англи хэлний B1 дунд шатны мэдлэгтэй, гадаад эх сурвалжаас техникийн мэдээлэл уншдаг.',
        'Хятад, Солонгос хэл үздэг маш эвсэг, гоё анги хамт олонтой.',
        'Чөлөөт цагаараа найзуудтайгаа Roblox дээр RIVALS тоглож хурд, авхаалж самбаагаа сорьдог.',
      ],
    },
  },
];

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      let currentIndex = 0;
      intervalId = window.setInterval(() => {
        currentIndex += 1;
        setDisplayed(text.slice(0, currentIndex));
        if (currentIndex >= text.length) {
          if (intervalId !== undefined) {
            window.clearInterval(intervalId);
          }
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function App() {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<string[]>([
    'Engineering & LEGO',
    'Karting & F1',
  ]);
  const [speechFormat, setSpeechFormat] = useState<SpeechFormat>(
    SpeechFormat.FULL
  );
  const [copied, setCopied] = useState(false);
  const [activeModalTopic, setActiveModalTopic] = useState<TopicItem | null>(
    null
  );
  const [isDreamJobOpen, setIsDreamJobOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  const headlineSource =
    lang === Language.EN
      ? "hi, i'm enkhluun —\nfuture engineer!"
      : 'сайн уу, намайг\nэнхлүүн гэдэг!';

  const { displayed, done } = useTypewriter(headlineSource, 38, 600);

  // 1. Desktop Mouse Scrubbing Hook
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (
        window.innerWidth >= 1024 &&
        Math.abs(video.currentTime - targetTimeRef.current) > 0.02
      ) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      if (!video.duration || Number.isNaN(video.duration)) return;

      if (!video.paused) {
        video.pause();
      }

      const scrubDelta = (delta / window.innerWidth) * 0.8 * video.duration;
      const clampedTime = Math.min(
        Math.max(targetTimeRef.current + scrubDelta, 0),
        video.duration
      );
      targetTimeRef.current = clampedTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = clampedTime;
      }
    };

    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 2. Mobile Autoplay Hook
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncPlaybackMode = () => {
      if (window.innerWidth < 1024) {
        video.autoplay = true;
        video.loop = true;
        video.play().catch(() => {
          // Ignore browser autoplay policy interruptions silently
        });
      } else {
        video.autoplay = false;
        video.pause();
        targetTimeRef.current = video.currentTime || 0;
      }
    };

    syncPlaybackMode();
    window.addEventListener('resize', syncPlaybackMode);
    return () => {
      window.removeEventListener('resize', syncPlaybackMode);
    };
  }, []);

  // Close overlays on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveModalTopic(null);
        setIsDreamJobOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const navItems = [
    {
      label: lang === Language.EN ? 'Intro' : 'Намтар',
      href: '#speech-section',
    },
    {
      label: lang === Language.EN ? 'Passions' : 'Сонирхол',
      href: '#passions-section',
    },
    {
      label: lang === Language.EN ? 'Dream Job' : 'Мөрөөдөл',
      href: '#dream-job',
      onClick: () => setIsDreamJobOpen(true),
    },
    {
      label: lang === Language.EN ? 'Links' : 'Холбоос',
      href: '#links-section',
    },
  ];

  const fullSpeechText =
    lang === Language.EN
      ? `Hello! My name is Enkhluun, and I am turning 12 years old this year. Ever since I was young, I have been fascinated by how machines, motorcars, and motorcycles work, which is why my biggest dream is to become a Mechanical Engineer.\n\nIn my free time, I love challenging myself with advanced 18+ LEGO sets—even the most complex mechanical builds only take me one to two days to complete. Mathematics is one of my strongest subjects at school, helping me think logically about mechanics and design. Outside the classroom, I actively compete in karting and am currently preparing for an upcoming race! I am also a dedicated Formula 1 fan and cheer for Max Verstappen.\n\nAlongside engineering and motorsport, I am proud to play the Morin Khuur, Mongolia’s traditional horsehead fiddle. I hold a B1 intermediate level in English, love my awesome class where students also study Chinese and Korean languages, and enjoy playing RIVALS on Roblox.`
      : `Сайн байна уу! Намайг Энхлүүн гэдэг. Би энэ жил 12 нас хүрнэ. Багаасаа мотортой машин, мотоцикл болон техник хэрэгсэл хэрхэн ажилладгийг сонирхож ирсэн учраас ирээдүйд чадварлаг Механик инженер болохыг хүсдэг.\n\nБи чөлөөт цагаараа 18+ насны нарийн хийцтэй Лего загваруудыг эвлүүлэх дуртай бөгөөд хамгийн том, төвөгтэй загварыг ч 1–2 хоногийн дотор угсарч дуусгадаг. Мөн математикийн хичээлдээ сайн тул техникийн тооцоолол, логик сэтгэлгээгээр бодох дуртай. Спортын хувьд би картингаар хичээллэж уралддаг бөгөөд удахгүй болох шинэ уралдаандаа бэлдэж байна. Түүнчлэн Формула 1 уралдааныг шимтэн үзэж, Макс Верстаппеныг дэмждэг.\n\nТехник, уралдаанаас гадна би Монголын уламжлалт Морин хуур хөгжмийг тоглож чадна. Англи хэлний B1 түвшинтэй бөгөөд Хятад, Солонгос хэл судалдаг маш гоё, эвсэг ангид суралцдагтаа баяртай байдаг. Амралтын цагаараа Roblox дээр RIVALS тоглох дуртай.`;

  const shortSpeechText =
    lang === Language.EN
      ? `Hi everyone! My name is Enkhluun, and I am turning 12 this year. My dream is to become a Mechanical Engineer because I excel in math, love motorcars and motorcycles, and complete complex 18+ LEGO sets in just 1 to 2 days. I also race go-karts with an upcoming race soon, cheer for Max Verstappen in Formula 1, play the traditional Morin Khuur, speak B1 English, study in an awesome class with Chinese and Korean languages, and enjoy playing RIVALS on Roblox!`
      : `Сайн байна уу, намайг Энхлүүн гэдэг, би энэ жил 12 нас хүрнэ. Би математиктаа сайн, машин болон мотоцикл сонирхдог, мөн 18+ насны том Лего загварыг 1–2 хоногт эвлүүлдэг учраас ирээдүйд Механик инженер болохыг мөрөөддөг. Би картингаар уралддаг бөгөөд удахгүй уралдаанд оролцох гэж байгаа, Формула 1-ийн Макс Верстаппеныг дэмждэг. Мөн морин хуур тоглодог, Англи хэлний B1 түвшинтэй, Хятад, Солонгос хэл үздэг гоё ангид сурдаг ба чөлөөт цагаараа Roblox RIVALS тоглох дуртай.`;

  const activeSpeech =
    speechFormat === SpeechFormat.FULL ? fullSpeechText : shortSpeechText;

  const handleCopySpeech = async () => {
    try {
      await navigator.clipboard.writeText(activeSpeech);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const displayedTopics =
    services.length > 0
      ? TOPICS.filter((topic) => services.includes(topic.id))
      : TOPICS;

  const selectedTranslatedList = TOPICS.filter((t) => services.includes(t.id))
    .map((t) => t.pillLabel[lang])
    .join(', ');

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      {/* Interactive Navbar */}
      <header className="fixed top-0 inset-x-0 z-30 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-white/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
        {/* Left Logo */}
        <a
          href="#spade-hero"
          className="flex flex-row items-center gap-3 whitespace-nowrap shrink-0"
        >
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Enkhluun&reg;
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            &#10033;
          </span>
        </a>

        {/* Center Desktop Nav Links */}
        <nav className="hidden md:flex flex-row items-center text-[23px] text-black">
          {navItems.map((item, idx) => (
            <Fragment key={item.label}>
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className="hover:opacity-60 transition-opacity whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
              {idx < navItems.length - 1 && (
                <span className="opacity-40 select-none">,&nbsp;</span>
              )}
            </Fragment>
          ))}
        </nav>

        {/* Right Desktop CTA */}
        <a
          href="#speech-section"
          className="hidden md:inline-block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity whitespace-nowrap shrink-0"
        >
          {lang === Language.EN ? 'Read full bio' : 'Бүтэн намтар'}
        </a>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-20 bg-white/95 backdrop-blur-sm transition-opacity duration-300 flex flex-col justify-center px-8 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
              className="text-3xl font-medium tracking-tight text-black hover:opacity-60 transition-opacity"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#speech-section"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 text-2xl text-black underline underline-offset-4"
          >
            {lang === Language.EN ? 'Read full bio' : 'Бүтэн намтар'}
          </a>
        </nav>
      </div>

      {/* Hero Section Wrapper (Video + Foreground Content) */}
      <div className="relative flex flex-col lg:block lg:min-h-screen">
        {/* Background Video Component (with Native Scrubbing) */}
        <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
          <video
            ref={videoRef}
            src={VIDEO_URL}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-right lg:object-right-bottom"
          />
        </div>

        {/* Content Layout Container */}
        <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
          <main
            id="spade-hero"
            className="w-full max-w-7xl mx-auto px-6 pt-28 pb-12 lg:py-16 flex-1 flex flex-col justify-center"
          >
            {/* Language Switcher Toolbar inside Hero */}
            <div className="mb-6 flex items-center gap-3">
              <div
                role="group"
                aria-label="Language switcher"
                className="inline-flex items-center gap-1 p-1 bg-[#FAFBF9] border border-[#EAECE9] rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => setLang(Language.EN)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    lang === Language.EN
                      ? 'bg-[#1C2E1E] text-white'
                      : 'text-[#5A635A] hover:text-black'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang(Language.MN)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    lang === Language.MN
                      ? 'bg-[#1C2E1E] text-white'
                      : 'text-[#5A635A] hover:text-black'
                  }`}
                >
                  Монгол
                </button>
              </div>
              <span className="text-xs text-[#738273] hidden sm:inline">
                {lang === Language.EN
                  ? 'Turning 12 · Ulaanbaatar · Move cursor horizontally to scrub 3D reel'
                  : '12 нас хүрнэ · Хулганаа зүүн баруун хөдөлгөж дүрсийг эргүүлнэ үү'}
              </span>
            </div>

            {/* Typewriter Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full max-w-3xl whitespace-pre-wrap">
                {displayed}
                {!done && (
                  <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
                )}
              </h1>
            </motion.div>

            {/* Secondary Description Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {lang === Language.EN ? (
                <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
                  Turning 12 this year with a dream of becoming a Mechanical
                  Engineer. <br />
                  Building complex 18+ LEGO sets in 1–2 days, racing go-karts,
                  cheering for Max Verstappen in F1, and playing the Morin Khuur.
                </p>
              ) : (
                <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
                  Би энэ жил 12 нас хүрнэ, ирээдүйд Механик инженер болохыг
                  мөрөөддөг. <br />
                  18+ насны Легог 1–2 хоногт угсарч, картингаар уралдан, Макс
                  Верстаппеныг дэмжиж, үндэсний морин хуур тоглодог.
                </p>
              )}
            </motion.div>

            {/* Interactive Multi-Select Topic Pills */}
            <div className="max-w-2xl">
              <h2 className="text-2xl font-medium tracking-tight mb-2 text-black">
                {lang === Language.EN
                  ? 'What part of my world interests you?'
                  : 'Миний аль талыг сонирхож байна вэ?'}
              </h2>
              <p className="opacity-85 text-[#738273] mb-8">
                {lang === Language.EN
                  ? 'Select all that apply'
                  : 'Олныг зэрэг сонгох боломжтой'}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {TOPICS.map((topic) => {
                  const isActive = services.includes(topic.id);
                  return (
                    <motion.button
                      key={topic.id}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleService(topic.id)}
                      className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-medium inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform'
                          : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="inline-flex items-center"
                        >
                          <Check className="w-4 h-4" />
                        </motion.span>
                      )}
                      <span>{topic.pillLabel[lang]}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Contingent Feedback Status Banner */}
              <AnimatePresence mode="wait">
                {services.length === 0 ? (
                  <motion.p
                    key="empty-banner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="opacity-50 italic text-xs text-[#5A635A] py-2"
                  >
                    {lang === Language.EN
                      ? 'Please click to select topics above.'
                      : 'Дээрх сэдвүүдээс дарж сонгоно уу.'}
                  </motion.p>
                ) : (
                  <motion.div
                    key="active-banner"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#FAFBF9] border border-[#E5EAE4] rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-sm text-[#1C2E1E]">
                        {lang === Language.EN
                          ? `Ready to explore: ${selectedTranslatedList}`
                          : `Сонгосон сэдвүүд: ${selectedTranslatedList}`}
                      </span>
                      <a
                        href="#passions-section"
                        className="text-[#4D6D47] uppercase text-xs font-semibold tracking-wider inline-flex items-center gap-1.5 hover:opacity-75 transition-opacity whitespace-nowrap shrink-0"
                      >
                        <span>
                          {lang === Language.EN ? "Let's Go" : 'Цааш үзэх'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>

      {/* ====================================================================
          PROPER WRITTEN INTRODUCTION & PASSIONS SECTIONS BELOW THE HERO
          ==================================================================== */}
      <div className="relative z-10 bg-white border-t border-[#EAECE9]">
        {/* Key Personal Highlights Strip */}
        <section className="max-w-7xl mx-auto px-6 py-10 border-b border-[#EAECE9]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 tabular-nums">
            <div>
              <div className="text-3xl sm:text-4xl font-medium tracking-tight text-[#1C2E1E]">
                12 yrs
              </div>
              <p className="mt-1 text-sm text-[#5A635A]">
                {lang === Language.EN
                  ? 'Turning 12 years old this year'
                  : 'Энэ жил 12 нас хүрнэ'}
              </p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-medium tracking-tight text-[#1C2E1E]">
                1–2 days
              </div>
              <p className="mt-1 text-sm text-[#5A635A]">
                {lang === Language.EN
                  ? 'Average build time on 18+ LEGO sets'
                  : '18+ насны том Лего угсрах хугацаа'}
              </p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-medium tracking-tight text-[#1C2E1E]">
                B1 Level
              </div>
              <p className="mt-1 text-sm text-[#5A635A]">
                {lang === Language.EN
                  ? 'English + Chinese & Korean class'
                  : 'Англи хэл + Хятад, Солонгос хэлтэй анги'}
              </p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-medium tracking-tight text-[#1C2E1E]">
                #1 Fan
              </div>
              <p className="mt-1 text-sm text-[#5A635A]">
                {lang === Language.EN
                  ? 'Karting racer & Max Verstappen F1'
                  : 'Картингийн тамирчин ба Макс Верстаппен'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 01: Proper Written Self-Introduction */}
        <section
          id="speech-section"
          className="max-w-7xl mx-auto px-6 py-20 border-b border-[#EAECE9] scroll-mt-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm text-[#4D6D47] font-medium mb-2">
                {lang === Language.EN
                  ? '01. Proper Written Introduction'
                  : '01. Миний тухай цэгцтэй танилцуулга'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black">
                {lang === Language.EN
                  ? 'About Enkhluun'
                  : 'Энхлүүний дэлгэрэнгүй танилцуулга'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1 p-1 bg-[#FAFBF9] border border-[#EAECE9] rounded-lg">
                <button
                  type="button"
                  onClick={() => setSpeechFormat(SpeechFormat.FULL)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    speechFormat === SpeechFormat.FULL
                      ? 'bg-[#1C2E1E] text-white'
                      : 'text-[#5A635A] hover:text-black'
                  }`}
                >
                  {lang === Language.EN ? 'Full Essay' : 'Бүтэн эхээр'}
                </button>
                <button
                  type="button"
                  onClick={() => setSpeechFormat(SpeechFormat.SHORT)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    speechFormat === SpeechFormat.SHORT
                      ? 'bg-[#1C2E1E] text-white'
                      : 'text-[#5A635A] hover:text-black'
                  }`}
                >
                  {lang === Language.EN ? '30s Class Speech' : '30 сек илтгэл'}
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopySpeech}
                className="px-4 py-2 text-xs font-medium text-[#1C2E1E] bg-[#FAFBF9] border border-[#EAECE9] rounded-lg hover:bg-[#F1F3F1] transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#4D6D47]" />
                    <span>{lang === Language.EN ? 'Copied!' : 'Хуулагдлаа!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>
                      {lang === Language.EN ? 'Copy Text' : 'Текст хуулах'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#FAFBF9] border border-[#EAECE9] rounded-2xl p-6 sm:p-10 max-w-4xl">
            <div className="space-y-5 text-base sm:text-lg text-neutral-800 leading-relaxed">
              {activeSpeech.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Section 02: Passions & Capabilities Synced with Hero Selection */}
        <section
          id="passions-section"
          className="max-w-7xl mx-auto px-6 py-20 border-b border-[#EAECE9] scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-sm text-[#4D6D47] font-medium mb-2">
                {lang === Language.EN
                  ? '02. Passions & Strengths'
                  : '02. Миний чадвар ба сонирхол'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black">
                {lang === Language.EN
                  ? 'Engineering, Motorsport & Heritage'
                  : 'Инженерчлэл, Уралдаан ба Өв соёл'}
              </h2>
            </div>

            {services.length > 0 && services.length < TOPICS.length && (
              <button
                type="button"
                onClick={() => setServices(TOPICS.map((t) => t.id))}
                className="text-sm text-[#4D6D47] underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                {lang === Language.EN
                  ? `Showing ${services.length} of ${TOPICS.length} · Show all`
                  : `${TOPICS.length}-аас ${services.length} харагдаж байна · Бүгдийг харах`}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedTopics.map((topic) => (
              <article
                key={topic.id}
                onClick={() => setActiveModalTopic(topic)}
                className="group bg-[#FAFBF9] border border-[#EAECE9] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#1C2E1E]/30 transition-colors cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-medium text-[#738273] tabular-nums">
                      {topic.index} · {topic.pillLabel[lang]}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#738273] group-hover:text-[#1C2E1E] transition-colors" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-black mb-3">
                    {topic.title[lang]}
                  </h3>

                  <p className="text-sm sm:text-base text-[#5A635A] leading-relaxed mb-6">
                    {topic.summary[lang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAECE9] text-xs text-[#738273]">
                  {topic.metricsLine[lang]}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 03: Original Bookmarks & Dream Job from minii tuhai.html */}
        <section
          id="links-section"
          className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20"
        >
          <div className="mb-10">
            <p className="text-sm text-[#4D6D47] font-medium mb-2">
              {lang === Language.EN
                ? '03. Favorite Bookmarks & Dream Career'
                : '03. Миний дуртай холбоосууд ба Мөрөөдлийн мэргэжил'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black">
              {lang === Language.EN
                ? 'Explore My Links'
                : 'Миний холбоосуудаар зочлох'}
            </h2>
          </div>

          <div className="divide-y divide-[#EAECE9] border-y border-[#EAECE9]">
            <a
              href="https://www.nu.edu/blog/types-of-engineering/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-5 flex items-center justify-between gap-4 group hover:px-2 transition-all"
            >
              <div>
                <div className="text-lg font-medium text-black group-hover:text-[#4D6D47] transition-colors">
                  {lang === Language.EN
                    ? 'What does engineering do?'
                    : 'Инженер хүн юу хийдэг вэ?'}
                </div>
                <div className="text-xs text-[#738273] mt-0.5">
                  nu.edu · Types of Engineering
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#5A635A] group-hover:text-[#1C2E1E] shrink-0" />
            </a>

            <a
              href="https://www.fiakarting.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-5 flex items-center justify-between gap-4 group hover:px-2 transition-all"
            >
              <div>
                <div className="text-lg font-medium text-black group-hover:text-[#4D6D47] transition-colors">
                  {lang === Language.EN ? 'Karting' : 'Картингийн уралдаан'}
                </div>
                <div className="text-xs text-[#738273] mt-0.5">
                  fiakarting.com · Official FIA Karting Championship
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#5A635A] group-hover:text-[#1C2E1E] shrink-0" />
            </a>

            <a
              href="https://www.formula1.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-5 flex items-center justify-between gap-4 group hover:px-2 transition-all"
            >
              <div>
                <div className="text-lg font-medium text-black group-hover:text-[#4D6D47] transition-colors">
                  {lang === Language.EN ? 'Formula 1' : 'Формула 1'}
                </div>
                <div className="text-xs text-[#738273] mt-0.5">
                  formula1.com · World Championship Motorsport
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#5A635A] group-hover:text-[#1C2E1E] shrink-0" />
            </a>

            <a
              href="https://en.wikipedia.org/wiki/Max_Verstappen"
              target="_blank"
              rel="noopener noreferrer"
              className="py-5 flex items-center justify-between gap-4 group hover:px-2 transition-all"
            >
              <div>
                <div className="text-lg font-medium text-black group-hover:text-[#4D6D47] transition-colors">
                  {lang === Language.EN
                    ? 'About Max Verstappen'
                    : 'Макс Верстаппены тухай'}
                </div>
                <div className="text-xs text-[#738273] mt-0.5">
                  wikipedia.org · Formula 1 World Champion
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#5A635A] group-hover:text-[#1C2E1E] shrink-0" />
            </a>

            <button
              type="button"
              onClick={() => setIsDreamJobOpen(true)}
              className="w-full text-left py-5 flex items-center justify-between gap-4 group hover:px-2 transition-all cursor-pointer"
            >
              <div>
                <div className="text-lg font-medium text-black group-hover:text-[#4D6D47] transition-colors">
                  {lang === Language.EN
                    ? 'My Dream Job — Mechanical Engineer'
                    : 'Миний мөрөөдлийн ажил — Механик инженер'}
                </div>
                <div className="text-xs text-[#738273] mt-0.5">
                  {lang === Language.EN
                    ? 'Click to open Enkhluun’s Dream Career Blueprint'
                    : 'Энд дарж миний мөрөөдлийн мэргэжлийн төлөвлөгөөг уншина уу'}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#5A635A] group-hover:text-[#1C2E1E] shrink-0" />
            </button>
          </div>
        </section>

        {/* Clean Editorial Footer */}
        <footer className="border-t border-[#EAECE9] py-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#738273]">
            <span>
              Enkhluun&reg; ·{' '}
              {lang === Language.EN
                ? 'Future Mechanical Engineer & Karting Racer'
                : 'Ирээдүйн Механик Инженер ба Картингийн Тамирчин'}
            </span>
            <button
              type="button"
              onClick={() =>
                setLang((prev) =>
                  prev === Language.EN ? Language.MN : Language.EN
                )
              }
              className="inline-flex items-center gap-1.5 text-[#1C2E1E] hover:opacity-70 transition-opacity cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>
                {lang === Language.EN
                  ? 'Switch to Монгол хэл'
                  : 'Switch to English'}
              </span>
            </button>
          </div>
        </footer>
      </div>

      {/* Topic Detail Modal */}
      <AnimatePresence>
        {activeModalTopic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalTopic(null)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-[#EAECE9] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-[#4D6D47] font-medium mb-1">
                    {activeModalTopic.index} ·{' '}
                    {activeModalTopic.pillLabel[lang]}
                  </p>
                  <h3 className="text-2xl font-medium tracking-tight text-black">
                    {activeModalTopic.title[lang]}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close modal"
                  onClick={() => setActiveModalTopic(null)}
                  className="p-2 rounded-full hover:bg-[#F1F3F1] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              <p className="text-sm sm:text-base text-[#5A635A] leading-relaxed mb-6">
                {activeModalTopic.summary[lang]}
              </p>

              <ul className="space-y-2.5 text-sm text-neutral-800 mb-6">
                {activeModalTopic.details[lang].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4D6D47] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {activeModalTopic.links && activeModalTopic.links.length > 0 && (
                <div className="pt-4 border-t border-[#EAECE9] flex flex-wrap gap-3">
                  {activeModalTopic.links.map((lnk) => (
                    <a
                      key={lnk.url}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C2E1E] underline underline-offset-4 hover:opacity-70"
                    >
                      <span>{lnk.label[lang]}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* My Dream Job Modal (replaces local my-dream-job.html link) */}
      <AnimatePresence>
        {isDreamJobOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDreamJobOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-[#EAECE9] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-[#4D6D47] font-medium mb-1">
                    {lang === Language.EN
                      ? 'Dream Career'
                      : 'Мөрөөдлийн мэргэжил'}
                  </p>
                  <h3 className="text-2xl font-medium tracking-tight text-black">
                    {lang === Language.EN
                      ? 'Mechanical Engineer'
                      : 'Механик Инженер'}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close modal"
                  onClick={() => setIsDreamJobOpen(false)}
                  className="p-2 rounded-full hover:bg-[#F1F3F1] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#5A635A] leading-relaxed">
                <p>
                  {lang === Language.EN
                    ? 'Why Mechanical Engineering? Because I love understanding how engines, gearboxes, motorcars, motorcycles, and Formula 1 race cars turn mathematical ideas into real speed and motion.'
                    : 'Яагаад Механик инженер гэж? Учир нь би мотортой машин, мотоцикл болон Формула 1-ийн уралдааны машинуудын хөдөлгүүр, араа, эд анги хэрхэн математик тооцооллоор хурд болон хөдөлгөөнд шилждгийг судлах маш дуртай.'}
                </p>
                <p>
                  {lang === Language.EN
                    ? 'Every 18+ LEGO set I finish in 1–2 days and every lap I drive on the karting track brings me one step closer to designing real vehicles and high-performance machines in the future.'
                    : '1–2 хоногт угсардаг 18+ насны Лего бүтээл бүр, мөн картингийн зам дээрх уралдаан бүр намайг ирээдүйд жинхэнэ өндөр хүчин чадалтай машин, техник зохион бүтээх мөрөөдөлд минь ойртуулдаг.'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
