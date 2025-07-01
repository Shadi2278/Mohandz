
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const subject = `طلب جديد من منصة مهندز: ${formData.serviceType || 'استفسار عام'}`;
    const body = `
      الاسم: ${formData.fullName}
      البريد الإلكتروني: ${formData.email}
      رقم الهاتف: ${formData.phone}
      نوع الخدمة: ${formData.serviceType || 'غير محدد'}
      الرسالة:
      ${formData.message}
    `;
    const mailtoLink = `mailto:admin@mohandz.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // This will open the user's default email client.
    window.location.href = mailtoLink;

    setTimeout(() => {
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        const newMessage = {
            id: uuidv4(),
            ...formData,
            createdAt: new Date().toISOString(),
        };
        messages.push(newMessage);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        toast({
            title: "✅ جاهز للإرسال",
            description: "تم فتح برنامج البريد الإلكتروني الخاص بك. الرجاء إرسال الرسالة.",
        });

        setFormData({ fullName: '', email: '', phone: '', serviceType: '', message: '' });
        setLoading(false);
    }, 1000);
  };

  const serviceTypes = [
    'الخدمات المعمارية',
    'الطرق والبنية التحتية',
    'المساحة والتخطيط',
    'الاستشارات الهندسية',
    'إدارة المشاريع',
    'أخرى'
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'الهاتف',
      value: '+966 50 911 4525',
      link: `https://wa.me/966509114525`
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      value: 'admin@mohandz.com',
      link: 'mailto:admin@mohandz.com'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      value: 'الرياض، المملكة العربية السعودية',
      link: null
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      value: 'الأحد - الخميس: 8:00 - 17:00',
      link: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>منصة مهندز - تواصل معنا</title>
        <meta name="description" content="تواصل مع فريق منصة مهندز للحصول على استشارة مجانية أو لمناقشة مشروعك القادم. نحن هنا لمساعدتك في تحقيق رؤيتك." />
      </Helmet>

      <div className="min-h-screen py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">تواصل معنا</h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              نحن هنا لمساعدتك في تحقيق رؤيتك. تواصل معنا للحصول على استشارة مجانية أو لمناقشة مشروعك القادم
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-card-foreground mb-8">أرسل رسالة</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-card-foreground text-sm font-semibold mb-2">الاسم الكامل *</label>
                  <Input type="text" placeholder="أدخل اسمك الكامل" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-card-foreground text-sm font-semibold mb-2">البريد الإلكتروني *</label>
                  <Input type="email" placeholder="أدخل بريدك الإلكتروني" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-card-foreground text-sm font-semibold mb-2">رقم الهاتف *</label>
                  <Input type="tel" placeholder="أدخل رقم هاتفك" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-card-foreground text-sm font-semibold mb-2">نوع الخدمة</label>
                  <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الخدمة" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-card-foreground text-sm font-semibold mb-2">الرسالة *</label>
                  <Textarea placeholder="اكتب رسالتك هنا..." rows={5} value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} required />
                </div>
                <Button type="submit" disabled={loading} className="w-full brand-gradient text-primary-foreground hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold">
                  {loading ? 'جارِ التحضير...' : (<><Send className="w-5 h-5 ml-2" /> إرسال الرسالة</>)}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
                <h2 className="text-3xl font-bold text-card-foreground mb-8">معلومات الاتصال</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex items-start space-x-4 space-x-reverse">
                      <div className="w-12 h-12 brand-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-card-foreground font-semibold mb-1">{info.title}</h3>
                        {info.link ? (<a href={info.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" style={{direction: info.title === 'الهاتف' ? 'ltr' : 'rtl', display: 'block', textAlign: 'right'}}>{info.value}</a>) : (<p className="text-muted-foreground">{info.value}</p>)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
                <h3 className="text-2xl font-bold text-card-foreground mb-6">موقعنا</h3>
                <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img  className="w-full h-full object-cover rounded-2xl" alt="خريطة موقع منصة مهندز في الرياض" src="https://images.unsplash.com/photo-1469288205312-804b99a8d717" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;