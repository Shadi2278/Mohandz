import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Target, Award, Shield, BrainCircuit, HeartHandshake, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  title: { ar: 'منصة مهندز - من نحن', en: 'Mohandz Platform - About Us' },
  description: { ar: 'تعرف على منصة مهندز، رؤيتنا، رسالتنا، وفريق العمل المتخصص. نحن نصمم المستقبل بدقة وإبداع في المملكة العربية السعودية.', en: 'Learn about Mohandz Platform, our vision, mission, and specialized team. We design the future with precision and creativity in Saudi Arabia.' },
  pageTitle: { ar: 'شركاء النجاح في بناء المستقبل', en: 'Partners in Building the Future' },
  pageSubtitle: { ar: 'في منصة مهندز، نحن أكثر من مجرد مقدمي خدمات هندسية؛ نحن فريق من المبتكرين والخبراء الملتزمين بتحويل رؤاكم إلى واقع ملموس يواكب تطلعات المملكة نحو مستقبل مشرق ومستدام.', en: 'At Mohandz, we are more than just engineering service providers; we are a team of innovators and experts committed to turning your visions into tangible reality that aligns with the Kingdom\'s aspirations for a bright and sustainable future.' },
  ourStoryTitle: { ar: 'قصتنا وفلسفتنا', en: 'Our Story & Philosophy' },
  ourStoryText: { ar: 'انطلقنا من شغف عميق بالهندسة المعمارية والتصميم، وإيمان راسخ بأن البناء يتجاوز كونه مجرد هياكل، بل هو فن تشكيل البيئات التي نعيش ونعمل فيها. تأسست منصتنا على مبدأ أن كل مشروع هو فرصة فريدة لخلق قيمة دائمة، وترك بصمة إيجابية تجمع بين الجمال والوظيفة والاستدامة. فلسفتنا تكمن في التكامل، حيث ندمج بين الخبرة الهندسية العريقة والرؤى التصميمية المعاصرة، مع فهم عميق للثقافة المحلية ومتطلبات السوق السعودي.', en: 'We started from a deep passion for architecture and design, and a firm belief that building goes beyond mere structures; it is the art of shaping the environments in which we live and work. Our platform was founded on the principle that every project is a unique opportunity to create lasting value and leave a positive mark that combines beauty, functionality, and sustainability. Our philosophy lies in integration, where we merge traditional engineering expertise with contemporary design visions, along with a deep understanding of local culture and the demands of the Saudi market.' },
  visionMissionTitle: { ar: 'رؤيتنا ورسالتنا', en: 'Our Vision & Mission' },
  visionTitle: { ar: 'رؤيتنا', en: 'Our Vision' },
  visionText: { ar: 'أن نكون المنصة الهندسية الرائدة في المملكة العربية السعودية، والمساهم الأول في تحقيق النهضة العمرانية لرؤية 2030 من خلال تقديم حلول هندسية مبتكرة ومستدامة تضع معايير جديدة للجودة والتميز.', en: 'To be the leading engineering platform in Saudi Arabia, and the primary contributor to achieving the urban renaissance of Vision 2030 by providing innovative and sustainable engineering solutions that set new standards for quality and excellence.' },
  missionTitle: { ar: 'رسالتنا', en: 'Our Mission' },
  missionText: { ar: 'تمكين عملائنا من تحقيق طموحاتهم عبر تقديم استشارات وخدمات هندسية متكاملة، بالاعتماد على فريق من الكفاءات الوطنية والعالمية، وتوظيف أحدث التقنيات لضمان الدقة والكفاءة والأثر الإيجابي في كل مشروع نتولاه.', en: 'Empowering our clients to achieve their ambitions by providing integrated engineering consultancy and services, relying on a team of national and global talents, and employing the latest technologies to ensure accuracy, efficiency, and a positive impact on every project we undertake.' },
  coreValuesTitle: { ar: 'قيمنا الأساسية', en: 'Our Core Values' },
  values: [
    { icon: Shield, title: { ar: 'الجودة والتميز', en: 'Quality & Excellence' }, description: { ar: 'نلتزم بأعلى معايير الجودة في جميع مشاريعنا ونسعى للتميز في كل تفصيل، مما يضمن تحقيق نتائج تفوق توقعات عملائنا.', en: 'We adhere to the highest quality standards in all our projects and strive for excellence in every detail, ensuring results that exceed our clients\' expectations.' } },
    { icon: BrainCircuit, title: { ar: 'الابتكار والإبداع', en: 'Innovation & Creativity' }, description: { ar: 'نتبنى أحدث التقنيات والحلول المبتكرة لتقديم خدمات هندسية متطورة، ونشجع على التفكير الإبداعي في كل مراحل العمل.', en: 'We adopt the latest technologies and innovative solutions to provide advanced engineering services, and encourage creative thinking at all stages of work.' } },
    { icon: HeartHandshake, title: { ar: 'العميل أولاً', en: 'Client First' }, description: { ar: 'نضع عملائنا في صميم أعمالنا، ونبني علاقات طويلة الأمد على أساس الثقة المتبادلة والشفافية والالتزام بتحقيق أهدافهم.', en: 'We place our clients at the core of our business, building long-term relationships based on mutual trust, transparency, and a commitment to achieving their goals.' } },
    { icon: Users, title: { ar: 'النزاهة والشفافية', en: 'Integrity & Transparency' }, description: { ar: 'نعمل بأعلى مستويات النزاهة، ونؤمن بالتواصل المفتوح والشفاف مع عملائنا وشركائنا في جميع مراحل المشروع.', en: 'We operate with the highest levels of integrity and believe in open and transparent communication with our clients and partners at all project stages.' } },
    { icon: TrendingUp, title: { ar: 'التطوير المستمر', en: 'Continuous Development' }, description: { ar: 'نستثمر في تطوير مهارات فريقنا ومواكبة كل ما هو جديد في عالم الهندسة والتكنولوجيا لضمان تقديم الأفضل دائماً.', en: 'We invest in developing our team\'s skills and keeping up with everything new in the world of engineering and technology to ensure we always deliver the best.' } },
    { icon: CheckCircle, title: { ar: 'الالتزام بالوقت', en: 'Timely Commitment' }, description: { ar: 'نقدر وقت عملائنا ونلتزم بتسليم المشاريع ضمن الجداول الزمنية المحددة دون المساومة على الجودة.', en: 'We value our clients\' time and are committed to delivering projects within the specified timelines without compromising on quality.' } }
  ]
};

const AboutPage = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Helmet>
        <title>{t(translations.title)}</title>
        <meta name="description" content={t(translations.description)} />
      </Helmet>

      <div className="min-h-screen py-20 bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 brand-text-gradient">{t(translations.pageTitle)}</h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t(translations.pageSubtitle)}
            </p>
          </motion.div>

          <motion.section
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-96 lg:h-auto lg:self-stretch">
                <img 
                  className="w-full h-full object-cover rounded-2xl shadow-xl"
                  alt="فريق منصة مهندز يعمل على مشروع هندسي مبتكر"
                 src="https://images.unsplash.com/photo-1573165231977-3f0e27806045" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">{t(translations.ourStoryTitle)}</h2>
                <p className="text-muted-foreground leading-loose">
                  {t(translations.ourStoryText)}
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-24 bg-card rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-10">
                <h2 className="text-3xl md:text-4xl font-bold text-card-foreground">{t(translations.visionMissionTitle)}</h2>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center space-x-3 space-x-reverse mb-4">
                      <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold text-card-foreground">{t(translations.visionTitle)}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{t(translations.visionText)}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 space-x-reverse mb-4">
                      <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold text-card-foreground">{t(translations.missionTitle)}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{t(translations.missionText)}</p>
                  </div>
                </div>
              </div>
              <div className="relative h-96">
                <img 
                  className="w-full h-full object-cover rounded-2xl shadow-xl"
                  alt="مخطط معماري يظهر رؤية مستقبلية"
                 src="https://images.unsplash.com/photo-1679945002548-de8273f93a72" />
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t(translations.coreValuesTitle)}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {translations.values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card rounded-2xl p-8 text-center card-hover"
                >
                  <div className="w-16 h-16 brand-gradient rounded-xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-4">{t(value.title)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(value.description)}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;