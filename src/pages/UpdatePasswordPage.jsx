
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
        toast({ variant: "destructive", title: "❌ كلمة مرور قصيرة", description: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل." });
        return;
    }
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "❌ كلمة المرور غير متطابقة",
        description: "الرجاء التأكد من تطابق كلمتي المرور.",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "❌ فشل تحديث كلمة المرور",
        description: "انتهت صلاحية الرابط أو أنه غير صالح. يرجى طلب رابط جديد.",
      });
    } else {
      toast({
        title: "✅ تم تحديث كلمة المرور بنجاح",
        description: "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.",
      });
      navigate('/login');
    }
  };

  return (
    <>
      <Helmet>
        <title>منصة مهندز - تحديث كلمة المرور</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-pattern">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8 bg-card/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-border"
        >
          <div>
            <h1 className="text-center text-3xl font-bold text-card-foreground">تحديث كلمة المرور</h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              أدخل كلمة المرور الجديدة الخاصة بك.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                    <label htmlFor="password" className="sr-only">كلمة المرور الجديدة</label>
                    <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Lock className="h-5 w-5 text-muted-foreground" /></span>
                    <Input id="password" name="password" type={showPassword ? 'text' : 'password'} required className="pl-10 pr-10" placeholder="كلمة المرور الجديدة" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    </div>
                    <PasswordStrengthMeter password={password} />
                </div>
                <div>
                    <label htmlFor="confirm-password" className="sr-only">تأكيد كلمة المرور</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><Lock className="h-5 w-5 text-muted-foreground" /></span>
                        <Input id="confirm-password" name="confirmPassword" type={showPassword ? 'text' : 'password'} required className="pl-3 pr-10" placeholder="تأكيد كلمة المرور" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
              </div>
            <div>
              <Button type="submit" disabled={loading || !password || password !== confirmPassword} className="w-full brand-gradient text-primary-foreground hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold">
                {loading ? <><Loader2 className="w-5 h-5 ml-2 animate-spin" /> جارِ التحديث...</> : 'تحديث كلمة المرور'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default UpdatePasswordPage;
