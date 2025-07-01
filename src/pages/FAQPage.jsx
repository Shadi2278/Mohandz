
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  title: { ar: 'منصة مهندز - الأسئلة الشائعة', en: 'Mohandz Platform - FAQ' },
  description: { ar: 'إجابات شاملة على الأسئلة الشائعة حول خدمات منصة مهندز الهندسية، من التصميم المعماري إلى إدارة المشاريع.', en: 'Comprehensive answers to frequently asked questions about Mohandz engineering services, from architectural design to project management.' },
  pageTitle: { ar: 'الأسئلة الشائعة', en: 'Frequently Asked Questions' },
  pageSubtitle: { ar: 'إجابات شاملة على الأسئلة الأكثر شيوعاً حول خدماتنا الهندسية ومشاريعنا', en: 'Comprehensive answers to the most common questions about our engineering services and projects.' },
  faqs: [
    {
      question: { ar: 'ما هي الخدمات التي تقدمها منصة مهندز؟', en: 'What services does Mohandz Platform offer?' },
      answer: { ar: 'نقدم مجموعة شاملة من الخدمات الهندسية تشمل التصميم المعماري للمباني السكنية والتجارية والصناعية، تصميم الطرق والبنية التحتية، خدمات المساحة والتخطيط العمراني، الاستشارات الهندسية، وإدارة المشاريع من البداية حتى التسليم.', en: 'We offer a comprehensive range of engineering services including architectural design for residential, commercial, and industrial buildings, road and infrastructure design, surveying and urban planning services, engineering consultancy, and project management from start to finish.' }
    },
    {
      question: { ar: 'كم تستغرق مدة تنفيذ المشاريع؟', en: 'How long do projects take to complete?' },
      answer: { ar: 'تختلف مدة تنفيذ المشاريع حسب نوع وحجم المشروع. المشاريع الصغيرة مثل تصميم الفلل قد تستغرق 2-4 أسابيع، بينما المشاريع الكبيرة مثل المجمعات التجارية قد تستغرق عدة أشهر. نحن نلتزم بالجداول الزمنية المتفق عليها ونقدم تحديثات دورية عن سير العمل.', en: 'The duration of projects varies depending on the type and size of the project. Small projects like villa designs may take 2-4 weeks, while large projects like commercial complexes may take several months. We adhere to the agreed-upon timelines and provide regular progress updates.' }
    },
    {
      question: { ar: 'هل تقدمون خدمات الاستشارة الهندسية فقط أم التنفيذ أيضاً؟', en: 'Do you offer only consultancy services or implementation as well?' },
      answer: { ar: 'نقدم خدمات شاملة تشمل الاستشارة الهندسية، التصميم، إعداد المخططات والمواصفات، والإشراف على التنفيذ. يمكننا العمل كمستشارين فقط أو تقديم خدمة متكاملة تشمل المتابعة والإشراف على التنفيذ مع المقاولين.', en: 'We offer comprehensive services that include engineering consultancy, design, preparation of drawings and specifications, and supervision of implementation. We can act as consultants only or provide an integrated service that includes follow-up and supervision of implementation with contractors.' }
    },
    {
      question: { ar: 'ما هي المناطق التي تغطيها خدماتكم؟', en: 'Which areas do your services cover?' },
      answer: { ar: 'نقدم خدماتنا في جميع أنحاء المملكة العربية السعودية، مع التركيز الأساسي على المناطق الرئيسية مثل الرياض، جدة، الدمام، مكة المكرمة، والمدينة المنورة. كما يمكننا تقديم الاستشارات عن بُعد للمناطق الأخرى.', en: 'We offer our services throughout Saudi Arabia, with a primary focus on major regions such as Riyadh, Jeddah, Dammam, Mecca, and Medina. We can also provide remote consultations for other areas.' }
    },
    {
      question: { ar: 'كيف يمكنني الحصول على عرض سعر لمشروعي؟', en: 'How can I get a price quote for my project?' },
      answer: { ar: 'يمكنك التواصل معنا من خلال صفحة "تواصل معنا" وتقديم تفاصيل مشروعك، أو الاتصال بنا مباشرة. سنقوم بدراسة متطلبات مشروعك وتقديم عرض سعر مفصل خلال 3-5 أيام عمل. الاستشارة الأولية مجانية.', en: 'You can contact us through the "Contact Us" page and provide your project details, or call us directly. We will study your project requirements and provide a detailed price quote within 3-5 business days. The initial consultation is free.' }
    },
  ],
  didNotFindAnswerTitle: { ar: 'لم تجد إجابة لسؤالك؟', en: 'Didn\'t find an answer to your question?' },
  didNotFindAnswerSubtitle: { ar: 'فريقنا جاهز للإجابة على جميع استفساراتك وتقديم المساعدة التي تحتاجها', en: 'Our team is ready to answer all your inquiries and provide the help you need.' },
  contactUsButton: { ar: 'تواصل معنا', en: 'Contact Us' }
};

const FAQPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t(translations.title)}</title>
        <meta name="description" content={t(translations.description)} />
      </Helmet>

      <div className="min-h-screen py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 brand-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">{t(translations.pageTitle)}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t(translations.pageSubtitle)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {translations.faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-border last:border-b-0"
                >
                  <AccordionTrigger className="text-right text-card-foreground hover:text-accent py-6 text-lg font-semibold">
                    {t(faq.question)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                    {t(faq.answer)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16 bg-card/50 border border-border rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t(translations.didNotFindAnswerTitle)}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t(translations.didNotFindAnswerSubtitle)}
            </p>
            <Link to="/contact">
              <Button size="lg" className="brand-gradient text-primary-foreground hover:scale-105 transition-transform">
                {t(translations.contactUsButton)}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
