import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Target, Award, Shield, BrainCircuit, HeartHandshake as Handshake } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: 'الجودة والتميز',
      description: 'نلتزم بأعلى معايير الجودة في جميع مشاريعنا ونسعى للتميز في كل تفصيل، مما يضمن تحقيق نتائج تفوق توقعات عملائنا.'
    },
    {
      icon: BrainCircuit,
      title: 'الابتكار والإبداع',
      description: 'نتبنى أحدث التقنيات والحلول المبتكرة لتقديم خدمات هندسية متطورة، ونشجع على التفكير الإبداعي في كل مراحل العمل.'
    },
    {
      icon: Handshake,
      title: 'العميل أولاً',
      description: 'نضع عملائنا في صميم أعمالنا، ونبني علاقات طويلة الأمد على أساس الثقة المتبادلة والشفافية والالتزام بتحقيق أهدافهم.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>منصة مهندز - من نحن</title>
        <meta name="description" content="تعرف على منصة مهندز، رؤيتنا، رسالتنا، وفريق العمل المتخصص. نحن نصمم المستقبل بدقة وإبداع في المملكة العربية السعودية." />
      </Helmet>

      <div className="min-h-screen py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">شركاء النجاح في بناء المستقبل</h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              في منصة مهندز، نحن أكثر من مجرد مقدمي خدمات هندسية؛ نحن فريق من المبتكرين والخبراء الملتزمين بتحويل رؤاكم إلى واقع ملموس يواكب تطلعات المملكة نحو مستقبل مشرق ومستدام.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="bg-card rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-8">رؤيتنا ورسالتنا</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center space-x-3 space-x-reverse mb-4">
                        <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center">
                          <Target className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold text-card-foreground">رؤيتنا</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        أن نكون المنصة الهندسية الرائدة في المملكة العربية السعودية، والمساهم الأول في تحقيق النهضة العمرانية لرؤية 2030 من خلال تقديم حلول هندسية مبتكرة ومستدامة تضع معايير جديدة للجودة والتميز.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center space-x-3 space-x-reverse mb-4">
                        <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center">
                          <Award className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold text-card-foreground">رسالتنا</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        تمكين عملائنا من تحقيق طموحاتهم عبر تقديم استشارات وخدمات هندسية متكاملة، بالاعتماد على فريق من الكفاءات الوطنية والعالمية، وتوظيف أحدث التقنيات لضمان الدقة والكفاءة والأثر الإيجابي في كل مشروع نتولاه.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <img  
                    className="w-full h-96 object-cover rounded-2xl shadow-xl" 
                    alt="فريق منصة مهندز يعمل على مشروع هندسي مبتكر"
                   src="https://images.unsplash.com/photo-1581093196867-ca3dba3c721b" />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">قيمنا الأساسية</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                قيمنا هي البوصلة التي توجه كل قرار نتخذه وتحدد هويتنا في سوق العمل.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-card rounded-2xl p-8 text-center card-hover"
                >
                  <div className="w-16 h-16 brand-gradient rounded-xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
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