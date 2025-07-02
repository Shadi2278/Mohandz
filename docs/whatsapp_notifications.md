
# إعداد إشعارات WhatsApp التلقائية عبر Supabase

هذا الدليل يشرح كيفية إرسال إشعار تلقائي عبر WhatsApp في كل مرة يتم فيها إنشاء طلب خدمة جديد في جدول `service_requests`. سنستخدم Supabase Edge Function و Database Trigger لتحقيق ذلك.

## المتطلبات الأساسية

1.  **حساب Twilio:** ستحتاج إلى حساب على [Twilio](https://www.twilio.com/try-twilio).
2.  **تفعيل Twilio Sandbox for WhatsApp:** اتبع إرشادات Twilio لتفعيل الـ Sandbox. ستحصل على رقم هاتف Twilio ورسالة انضمام (مثل `join certain-words`) تحتاج إلى إرسالها من رقم WhatsApp الخاص بك إلى رقم Twilio لتفعيل الخدمة.
3.  **بيانات اعتماد Twilio:** ستحتاج إلى:
    -   `Account SID`
    -   `Auth Token`
    -   رقم هاتف Twilio (`whatsapp:+14155238886` في حالة الـ Sandbox)
    -   رقم هاتفك الذي سترسل إليه الإشعارات (يجب أن يكون بصيغة دولية، مثل `whatsapp:+9665...`).

## الخطوة 1: تخزين بيانات الاعتماد كأسرار (Secrets) في Supabase

لأسباب أمنية، لا تقم أبداً بكتابة بيانات الاعتماد مباشرة في الكود. استخدم Supabase Secrets.

1.  اذهب إلى لوحة تحكم مشروعك في Supabase.
2.  اذهب إلى `Project Settings` -> `Database` -> `Secrets`.
3.  أضف الأسرار التالية:
    -   `TWILIO_ACCOUNT_SID`: قيمة الـ Account SID الخاصة بك.
    -   `TWILIO_AUTH_TOKEN`: قيمة الـ Auth Token الخاصة بك.
    -   `TWILIO_WHATSAPP_FROM`: رقم هاتف Twilio (مثال: `whatsapp:+14155238886`).
    -   `DESTINATION_WHATSAPP`: رقم هاتفك الذي سيستقبل الإشعارات (مثال: `whatsapp:+966512345678`).

## الخطوة 2: إنشاء Supabase Edge Function

سنقوم بإنشاء دالة (Function) تتلقى بيانات الطلب الجديد وترسل رسالة WhatsApp باستخدام Twilio API.

-   **اسم الدالة:** `send-whatsapp-notification`
-   **الكود:**

```typescript
// supabase/functions/send-whatsapp-notification/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

// استيراد بيانات الاعتماد من الأسرار
const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
const TWILIO_WHATSAPP_FROM = Deno.env.get('TWILIO_WHATSAPP_FROM');
const DESTINATION_WHATSAPP = Deno.env.get('DESTINATION_WHATSAPP');

const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

serve(async (req) => {
  // التعامل مع طلبات preflight الخاصة بـ CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // استخراج بيانات الطلب الجديد من جسم الطلب
    const { record } = await req.json();

    // تكوين نص الرسالة
    const messageBody = `
طلب خدمة جديد في منصة مهندز! 🚀

الخدمة: ${record.service_title || 'غير محدد'}
الاسم: ${record.fullName}
البريد الإلكتروني: ${record.email}
رقم الهاتف: ${record.phone}

التفاصيل:
${record.details}
    `;

    // إعداد جسم الطلب لـ Twilio API
    const body = new URLSearchParams();
    body.append('To', DESTINATION_WHATSAPP);
    body.append('From', TWILIO_WHATSAPP_FROM);
    body.append('Body', messageBody);

    // إرسال الطلب إلى Twilio
    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Twilio API Error: ${JSON.stringify(errorData)}`);
    }

    const responseData = await response.json();

    return new Response(JSON.stringify({ success: true, messageSid: responseData.sid }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
```

## الخطوة 3: إنشاء Database Trigger

سنقوم بإنشاء Trigger في قاعدة البيانات يتم تفعيله تلقائياً عند إضافة صف جديد إلى جدول `service_requests`. هذا الـ Trigger سيقوم باستدعاء الـ Edge Function التي أنشأناها.

1.  اذهب إلى `Database` -> `Triggers` في لوحة تحكم Supabase.
2.  انقر على `Create a new trigger`.
3.  املأ الحقول كالتالي:
    -   **Name:** `trigger_send_whatsapp_on_new_request`
    -   **Table:** `service_requests`
    -   **Events:** `INSERT`
    -   **Trigger Type:** `After event`
    -   **Orientation:** `Row`
    -   **Function:** انقر على `Create a new function`

4.  في نافذة إنشاء الدالة، استخدم الإعدادات التالية:
    -   **Function Name:** `notify_whatsapp`
    -   **Return Type:** `trigger`
    -   **Definition (الكود):**

    ```sql
    BEGIN
      PERFORM net.http_post(
          url := 'https://<YOUR-PROJECT-REF>.supabase.co/functions/v1/send-whatsapp-notification',
          headers := '{"Content-Type": "application/json", "Authorization": "Bearer <YOUR-SERVICE-ROLE-KEY>"}'::jsonb,
          body := jsonb_build_object('record', NEW)
      );
      RETURN NEW;
    END;
    ```

    **ملاحظات هامة:**
    -   استبدل `<YOUR-PROJECT-REF>` بالمعرف المرجعي لمشروعك (موجود في إعدادات المشروع).
    -   استبدل `<YOUR-SERVICE-ROLE-KEY>` بمفتاح `service_role` الخاص بمشروعك (موجود في `Project Settings` -> `API`). **تعامل مع هذا المفتاح بسرية تامة.**

5.  احفظ الدالة ثم احفظ الـ Trigger.

## الخطوة 4: الاختبار

1.  اذهب إلى تطبيقك وقم بإنشاء طلب خدمة جديد.
2.  يجب أن يصلك إشعار WhatsApp على الرقم الذي حددته في `DESTINATION_WHATSAPP` خلال ثوانٍ.
3.  يمكنك مراقبة سجلات الـ Function من `Edge Functions` -> `send-whatsapp-notification` -> `Logs` للتحقق من أي أخطاء.
