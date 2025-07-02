
# إدارة صلاحيات الأدمن في Supabase (أفضل الممارسات)

هذا الدليل يشرح كيفية إدارة صلاحيات المستخدمين، وتحديداً دور "الأدمن"، بشكل آمن وفعال في Supabase باستخدام سياسات الأمان على مستوى الصف (Row Level Security - RLS).

## 1. بنية الجداول الأساسية

لإدارة الصلاحيات، نحتاج إلى جدولين رئيسيين:

-   **`auth.users`**: هذا الجدول يُدار بواسطة نظام المصادقة في Supabase ويحتوي على معلومات الدخول الأساسية (بريد إلكتروني، كلمة مرور، إلخ).
-   **`public.profiles`**: هذا جدول عام نقوم بإنشائه لربطه بجدول `auth.users` وتخزين معلومات إضافية، وأهمها **دور المستخدم (role)**.

### جدول `profiles`

يجب أن يحتوي جدول `profiles` على الأقل على الحقول التالية:

-   `id` (uuid): المفتاح الأساسي، وهو نفسه `id` المستخدم في `auth.users`.
-   `role` (text): لتخزين دور المستخدم، مثل `'admin'` أو `'client'`.
-   `full_name` (text): اسم المستخدم الكامل.
-   `phone` (text): رقم هاتف المستخدم.

```sql
-- إنشاء جدول profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'client'
);

-- تفعيل RLS على الجدول
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

## 2. تعيين الأدوار (Roles)

### أ. إنشاء مستخدم جديد (العميل)

عندما يقوم مستخدم جديد بإنشاء حساب عبر واجهة التطبيق، يجب تعيين دوره كـ `'client'` بشكل افتراضي. يمكن تحقيق ذلك عبر Trigger في قاعدة البيانات يتم تفعيله بعد إنشاء مستخدم جديد في `auth.users`.

```sql
-- Trigger function to create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    'client' -- تعيين الدور كعميل بشكل افتراضي
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### ب. تعيين دور الأدمن (Admin)

**تحذير:** لا تقم أبداً بتعيين دور الأدمن من خلال واجهة المستخدم مباشرة. هذا الإجراء يجب أن يتم فقط من بيئة آمنة وموثوقة.

**الطريقة الآمنة لتعيين أدمن:**

1.  **من خلال لوحة تحكم Supabase:**
    -   اذهب إلى `Table Editor` -> جدول `profiles`.
    -   ابحث عن المستخدم الذي تريد ترقيته.
    -   قم بتغيير قيمة حقل `role` الخاص به من `'client'` إلى `'admin'`.

2.  **من خلال SQL:**
    -   يمكنك تشغيل هذا الأمر في `SQL Editor` داخل لوحة تحكم Supabase.
    ```sql
    UPDATE public.profiles
    SET role = 'admin'
    WHERE id = 'user-uuid-to-promote'; -- استبدل بالـ UUID الخاص بالمستخدم
    ```

## 3. سياسات الأمان على مستوى الصف (RLS)

RLS هي قلب نظام الأمان في Supabase. تسمح لك بتحديد أي صفوف يمكن للمستخدمين الوصول إليها (قراءة، كتابة، تحديث، حذف).

### أمثلة على سياسات RLS:

#### سياسات جدول `profiles`:

1.  **السماح للمستخدمين برؤية وتحديث ملفاتهم الشخصية فقط:**
    ```sql
    -- سياسة للسماح بالوصول (SELECT)
    CREATE POLICY "Users can view their own profile."
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

    -- سياسة للسماح بالتحديث (UPDATE)
    CREATE POLICY "Users can update their own profile."
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);
    ```

2.  **السماح للأدمن بالوصول الكامل لجميع الملفات الشخصية:**
    ```sql
    -- دالة مساعدة للتحقق من دور المستخدم
    CREATE OR REPLACE FUNCTION get_my_role()
    RETURNS TEXT AS $$
    BEGIN
      RETURN (SELECT role FROM public.profiles WHERE id = auth.uid());
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- سياسة تسمح للأدمن بالوصول الكامل
    CREATE POLICY "Admins have full access to profiles."
    ON public.profiles FOR ALL
    USING (get_my_role() = 'admin');
    ```

#### سياسات جدول `service_requests`:

1.  **السماح للعملاء بإنشاء طلبات خدمة لأنفسهم:**
    ```sql
    CREATE POLICY "Clients can create service requests."
    ON public.service_requests FOR INSERT
    WITH CHECK (auth.uid() = user_id);
    ```

2.  **السماح للعملاء برؤية طلباتهم فقط:**
    ```sql
    CREATE POLICY "Clients can view their own service requests."
    ON public.service_requests FOR SELECT
    USING (auth.uid() = user_id);
    ```

3.  **السماح للأدمن بالوصول الكامل لجميع طلبات الخدمة:**
    ```sql
    CREATE POLICY "Admins have full access to service requests."
    ON public.service_requests FOR ALL
    USING (get_my_role() = 'admin');
    ```

## 4. قائمة مراجعة للتشخيص والأمان

-   [ ] **تفعيل RLS:** تأكد من أن RLS مفعل على جميع الجداول التي تحتوي على بيانات حساسة.
-   [ ] **سياسات افتراضية (Default Deny):** تذكر أن RLS تمنع الوصول بشكل افتراضي. يجب عليك إنشاء سياسات `PERMISSIVE` للسماح بالوصول.
-   [ ] **اختبار السياسات:** استخدم `SQL Editor` في Supabase لاختبار سياساتك عن طريق محاكاة أدوار مختلفة.
-   [ ] **عدم كشف المفاتيح:** لا تكشف أبداً عن مفتاح `service_role` أو `anon` في كود الواجهة الأمامية. مفتاح `anon` آمن للاستخدام في الواجهة الأمامية طالما أن RLS مطبقة بشكل صحيح.
-   [ ] **التحقق من جانب الخادم:** لا تعتمد فقط على التحقق من جانب العميل (JavaScript). دائماً قم بفرض القواعد الأساسية عبر سياسات RLS.
