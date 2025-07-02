import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, Route as Road, MapPin, Users, Calendar, UserCheck, FolderOpen, ArrowLeft, Zap, Shield, Award, CircuitBoard, Sofa, Activity } from 'lucide-react';

const translations = {
    hero: {
        title: { ar: 'منصة مهندز', en: 'Mohandz Platform' },
        subtitle: { ar: 'منصتك المتكاملة للخدمات الهندسية المتخصصة في المملكة العربية السعودية. نصمم لك المستقبل بدقة وإبداع.', en: 'Your integrated platform for specialized engineering services in Saudi Arabia. We design the future with precision and creativity.' },
        explore: { ar: 'استكشف خدماتنا', en: 'Explore Our Services' },
        contact: { ar: 'تواصل معنا', en: 'Contact Us' }
    },
    stats: {
        engineers: { ar: 'المهندسون', en: 'Engineers' },
        experience: { ar: 'سنوات الخبرة', en: 'Years of Experience' },
        clients: { ar: 'العملاء', en: 'Clients' },
        projects: { ar: 'المشاريع', en: 'Projects' }
    },
    servicesSection: {
        title: { ar: 'خدماتنا الرئيسية', en: 'Our Main Services' },
        description: { ar: 'نقدم مجموعة شاملة من الخدمات الهندسية المتخصصة لتلبية جميع احتياجاتكم', en: 'We offer a comprehensive range of specialized engineering services to meet all your needs' },
        viewDetails: { ar: 'عرض التفاصيل', en: 'View Details' },
        viewAll: { ar: 'عرض جميع الخدمات', en: 'View All Services' }
    },
    services: [
        {
            id: 'الخدمات المعمارية والإنشائية',
            icon: Building2,
            title: { ar: 'الخدمات المعمارية والإنشائية', en: 'Architectural & Structural' },
            description: { ar: 'تصميم وتخطيط المباني السكنية والتجارية والصناعية بأحدث المعايير العالمية.', en: 'Design and planning of residential, commercial, and industrial buildings with the latest international standards.' },
        },
        {
            id: 'خدمات الطرق والبنية التحتية',
            icon: Road,
            title: { ar: 'الطرق والبنية التحتية', en: 'Roads & Infrastructure' },
            description: { ar: 'تصميم وتنفيذ مشاريع الطرق والجسور وشبكات المياه والصرف الصحي.', en: 'Design and implementation of roads, bridges, and water and sewage network projects.' },
        },
        {
            id: 'خدمات الموقع المساحية',
            icon: MapPin,
            title: { ar: 'المساحة والتخطيط', en: 'Surveying & Planning' },
            description: { ar: 'خدمات المساحة الأرضية والتخطيط العمراني وتقسيم الأراضي.', en: 'Land surveying, urban planning, and land subdivision services.' },
        },
        {
            id: 'خدمات الهندسة الكهربائية والميكانيكية',
            icon: CircuitBoard,
            title: { ar: 'خدمات MEP', en: 'MEP Services' },
            description: { ar: 'تصميم وتوريد وتركيب أنظمة MEP للمشاريع المختلفة.', en: 'Design, supply, and installation of MEP systems for various projects.' },
        },
        {
            id: 'خدمات التصميم الداخلي والديكور',
            icon: Sofa,
            title: { ar: 'التصميم الداخلي', en: 'Interior Design' },
            description: { ar: 'إبداع مساحات داخلية تجمع بين الجمال والوظيفة.', en: 'Creating interior spaces that combine beauty and functionality.' },
        },
        {
            id: 'خدمات الاستشارات الهندسية والتقييم',
            icon: Activity,
            title: { ar: 'الاستشارات والتقييم', en: 'Consultancy & Valuation' },
            description: { ar: 'استشارات دقيقة وتقييمات فنية لدعم قراراتك الاستثمارية.', en: 'Accurate consultations and technical evaluations to support your investment decisions.' },
        },
    ],
    whyChooseUs: {
        title: { ar: 'لماذا تختار منصة مهندز؟', en: 'Why Choose Mohandz?' },
        fast: { ar: 'سرعة في التنفيذ', en: 'Fast Execution' },
        fastDesc: { ar: 'نلتزم بالمواعيد المحددة ونضمن تسليم المشاريع في الوقت المناسب', en: 'We adhere to deadlines and ensure timely project delivery.' },
        quality: { ar: 'جودة مضمونة', en: 'Guaranteed Quality' },
        qualityDesc: { ar: 'نطبق أعلى معايير الجودة والسلامة في جميع مشاريعنا', en: 'We apply the highest standards of quality and safety in all our projects.' },
        experience: { ar: 'خبرة متميزة', en: 'Outstanding Experience' },
        experienceDesc: { ar: 'فريق من المهندسين المتخصصين بخبرة تزيد عن 15 عاماً', en: 'A team of specialized engineers with over 15 years of experience.' },
    },
    helmet: {
        title: { ar: 'منصة مهندز - الرئيسية', en: 'Mohandz Platform - Home' },
        description: { ar: 'منصة مهندز هي منصتك المتكاملة للخدمات الهندسية المتخصصة في المملكة العربية السعودية. نصمم لك المستقبل بدقة وإبداع.', en: 'Mohandz is your integrated platform for specialized engineering services in Saudi Arabia. We design the future with precision and creativity.' }
    }
};

const HomePage = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const handleServiceClick = (serviceTitle) => {
    navigate('/services', { state: { scrollTo: serviceTitle } });
  };
  
  const stats = [
    { icon: Users, value: '+25', label: t(translations.stats.engineers) },
    { icon: Calendar, value: '+15', label: t(translations.stats.experience) },
    { icon: UserCheck, value: '+180', label: t(translations.stats.clients) },
    { icon: FolderOpen, value: '+250', label: t(translations.stats.projects) },
  ];

  return (
    <>
      <Helmet>
        <title>{t(translations.helmet.title)}</title>
        <meta name="description" content={t(translations.helmet.description)} />
      </Helmet>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img 
          alt="خلفية هندسية حديثة مع عناصر خضراء مستدامة"
          className="absolute z-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1558052643-9a9e9ea8e50a" />
        <div className="absolute inset-0 bg-[hsl(var(--brand-green))]/80 z-10"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-background text-shadow">
              {t(translations.hero.title)}
            </h1>
            
            <p className="text-xl md:text-2xl text-background/90 max-w-4xl mx-auto leading-relaxed">
              {t(translations.hero.subtitle)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/services">
                <Button className="brand-gradient text-primary-foreground hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-full shadow-lg">
                  {t(translations.hero.explore)}
                  <ArrowLeft className="w-5 h-5 mr-2 rtl-flip" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-background text-background bg-transparent hover:bg-background hover:text-primary px-8 py-3 text-lg font-semibold rounded-full">
                  {t(translations.hero.contact)}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t(translations.servicesSection.title)}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t(translations.servicesSection.description)}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {translations.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 card-hover flex flex-col text-center"
              >
                <div className="w-16 h-16 brand-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">{t(service.title)}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">{t(service.description)}</p>
                <Button 
                  onClick={() => handleServiceClick(service.id)}
                  variant="outline" 
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground w-full mt-auto"
                >
                  {t(translations.servicesSection.viewDetails)}
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <Button size="lg" className="brand-gradient text-primary-foreground hover:scale-105 transition-transform">
                {t(translations.servicesSection.viewAll)}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t(translations.whyChooseUs.title)}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 brand-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t(translations.whyChooseUs.fast)}</h3>
              <p className="text-muted-foreground">{t(translations.whyChooseUs.fastDesc)}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 brand-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t(translations.whyChooseUs.quality)}</h3>
              <p className="text-muted-foreground">{t(translations.whyChooseUs.qualityDesc)}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 brand-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t(translations.whyChooseUs.experience)}</h3>
              <p className="text-muted-foreground">{t(translations.whyChooseUs.experienceDesc)}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;