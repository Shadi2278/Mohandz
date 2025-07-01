import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Send, Upload, User, Mail, Phone } from 'lucide-react';

const ServiceRequestModal = ({ isOpen, setIsOpen, serviceTitle }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    } else {
      setFullName('');
      setEmail('');
      setPhone('');
    }
    setDescription('');
    setAttachments([]);
  }, [isOpen, user]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const validatePhone = (phone) => {
    const saudiPhoneRegex = /^(05|5)[0-9]{8}$/;
    return saudiPhoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !fullName || !email || !phone) {
      toast({
        variant: "destructive",
        title: "❌ حقول مطلوبة",
        description: "الرجاء تعبئة جميع الحقول المطلوبة.",
      });
      return;
    }
    if (!validatePhone(phone)) {
      toast({
        variant: "destructive",
        title: "❌ رقم جوال غير صالح",
        description: "الرجاء إدخال رقم جوال سعودي صحيح.",
      });
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const requests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
      const newRequest = {
        id: uuidv4(),
        userId: user ? user.id : 'guest',
        fullName: fullName,
        email: email,
        phone: phone,
        serviceTitle: serviceTitle,
        description: description,
        attachments: attachments.map(file => file.name),
        status: 'جديد',
        createdAt: new Date().toISOString(),
      };
      requests.push(newRequest);
      localStorage.setItem('serviceRequests', JSON.stringify(requests));

      toast({
        title: "✅ تم إرسال طلبك بنجاح",
        description: "سنتواصل معك في أقرب وقت ممكن.",
      });
      setLoading(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px] bg-card border-border text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl text-card-foreground">طلب خدمة: {serviceTitle}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            يرجى تقديم تفاصيل مشروعك وسيقوم فريقنا بمراجعته والتواصل معك.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-card-foreground text-sm font-semibold mb-2">الاسم الكامل *</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><User className="h-5 w-5 text-muted-foreground" /></span>
              <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={!!user} required className="pr-10" />
            </div>
          </div>
          <div>
            <label className="block text-card-foreground text-sm font-semibold mb-2">البريد الإلكتروني *</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Mail className="h-5 w-5 text-muted-foreground" /></span>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!!user} required className="pr-10" />
            </div>
          </div>
          <div>
            <label className="block text-card-foreground text-sm font-semibold mb-2">رقم الجوال *</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Phone className="h-5 w-5 text-muted-foreground" /></span>
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!!user} required className="pr-10" />
            </div>
          </div>
          <div>
            <label className="block text-card-foreground text-sm font-semibold mb-2">وصف المشروع *</label>
            <Textarea
              placeholder="صف لنا مشروعك بالتفصيل..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-card-foreground text-sm font-semibold mb-2">رفق المرفقات (اختياري)</label>
            <div className="relative">
              <label htmlFor="file-upload" className="w-full cursor-pointer bg-background text-muted-foreground rounded-md p-2 flex items-center justify-center border-2 border-dashed border-border hover:border-accent transition-colors">
                <Upload className="w-5 h-5 ml-2" />
                <span>{attachments.length > 0 ? `${attachments.length} ملفات مختارة` : 'اختر الملفات'}</span>
              </label>
              <Input id="file-upload" type="file" multiple className="sr-only" onChange={handleFileChange} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">يمكنك رفع ملفات بصيغة PDF, DOC, JPG, PNG.</p>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full brand-gradient text-primary-foreground hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold">
              {loading ? 'جارِ الإرسال...' : (<><Send className="w-5 h-5 ml-2" /> إرسال الطلب</>)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestModal;