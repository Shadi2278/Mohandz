import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const faqs = [
    {
      question: 'ما هي الخدمات التي تقدمها منصة مهندز؟',
      answer: 'نقدم مجموعة شاملة من الخدمات الهندسية تشمل التصميم المعماري للمباني السكنية والتجارية والصناعية، تصميم الطرق والبنية التحتية، خدمات المساحة والتخطيط العمراني، الاستشارات الهندسية، وإدارة المشاريع من البداية حتى التسليم.'
    },
    {
      question: 'كم تستغرق مدة تنفيذ المشاريع؟',
      answer: 'تختلف مدة تنفيذ المشاريع حسب نوع وحجم المشروع. المشاريع الصغيرة مثل تصميم الفلل قد تستغرق 2-4 أسابيع، بينما المشاريع الكبيرة مثل المجمعات التجارية قد تستغرق عدة أشهر. نحن نلتزم بالجداول الزمنية المتفق عليها ونقدم تحديثات دورية عن سير العمل.'
    },
    {
      question: 'هل تقدمون خدمات الاستشارة الهندسية فقط أم التنفيذ أيضاً؟',
      answer: 'نقدم خدمات شاملة تشمل الاستشارة الهندسية، التصميم، إعداد المخططات والمواصفات، والإشراف على التنفيذ. يمكننا العمل كمستشارين فقط أو تقديم خدمة متكاملة تشمل المتابعة والإشراف على التنفيذ مع المقاولين.'
    },
    {
      question: 'ما هي المناطق التي تغطيها خدماتكم؟',
      answer: 'نقدم خدماتنا في جميع أنحاء المملكة العربية السعودية، مع التركيز الأساسي على المناطق الرئيسية مثل الرياض، جدة، الدمام، مكة المكرمة، والمدينة المنورة. كما يمكننا تقديم الاستشارات عن بُعد للمناطق الأخرى.'
    },
    {
      question: 'كيف يمكنني الحصول على عرض سعر لمشروعي؟',
      answer: 'يمكنك التواصل معنا من خلال صفحة "تواصل معنا" وتقديم تفاصيل مشروعك، أو الاتصال بنا مباشرة. سنقوم بدراسة متطلبات مشروعك وتقديم عرض سعر مفصل خلال 3-5 أيام عمل. الاستشارة الأولية مجانية.'
    },
  ];

  return (
    <>
      <Helmet>
        <title>منصة مهندز - الأسئلة الشائعة</title>
        <meta name="description" content="إجابات شاملة على الأسئلة الشائعة حول خدمات منصة مهندز الهندسية، من التصميم المعماري إلى إدارة المشاريع." />
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
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">الأسئلة الشائعة</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              إجابات شاملة على الأسئلة الأكثر شيوعاً حول خدماتنا الهندسية ومشاريعنا
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-border last:border-b-0"
                >
                  <AccordionTrigger className="text-right text-card-foreground hover:text-accent py-6 text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                    {faq.answer}
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
              لم تجد إجابة لسؤالك؟
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              فريقنا جاهز للإجابة على جميع استفساراتك وتقديم المساعدة التي تحتاجها
            </p>
            <Link to="/contact">
              <Button size="lg" className="brand-gradient text-primary-foreground hover:scale-105 transition-transform">
                تواصل معنا
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;