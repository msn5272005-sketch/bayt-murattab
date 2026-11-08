# صور المنتجات: المسار الرسمي والإجراء المتبقي

مراجعة الوثائق العامة: 8 نوفمبر 2026. لم نصل إلى لوحة حساب الشركاء، لذلك لا نؤكد أهلية الحساب أو وجود تطبيق API مفعّل.

## ما تحقق

- مساعدة SiteStripe السعودية تصف إنشاء روابط نصية قصيرة وطويلة؛ رابط نصي أو وجود صورة في صفحة المنتج لا يمنح إذن نسخ الصورة.
  https://affiliate-program.amazon.sa/help/node/topic/GJMMT7G4C8K4Y3AY
- Creators API هو المسار الرسمي الحالي لبيانات الكتالوج؛ عملية GetItems ومورد Images يعيدان روابط الصور. السعودية مدعومة كـ www.amazon.sa ومنطقة EU.
  https://affiliate-program.amazon.com/creatorsapi/docs/en-us/api-reference
  https://affiliate-program.amazon.com/creatorsapi/docs/en-us/concepts/common-request-headers-and-parameters
- التسجيل يتطلب حساب شركاء مقبولًا نهائيًا ومبيعات مؤهلة، والمالك الأساسي وحده يستطيع التسجيل. وثيقة المقدمة تذكر 10 مبيعات مؤهلة في آخر 30 يومًا للوصول إلى PA API عبر Creators API؛ يجب اعتماد حالة الأهلية الفعلية التي يعرضها الحساب.
  https://affiliate-program.amazon.com/creatorsapi/docs/en-us/onboarding/register-for-creators-api
  https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction
- PA-API 5 القديم مهمل؛ لا نبني تكاملًا جديدًا عليه.
  https://affiliate-program.amazon.com/creatorsapi/docs/en-us/paapiv5-deprecation
- استخدام صور API يخضع لترخيص السوق السعودي، وليس إذنًا عامًا لتنزيل الصور من المتجر.
  https://affiliate-program.amazon.com/creatorsapi/docs/en-us/license-agreement
  https://affiliate-program.amazon.sa/help/operating/policies

## الإجراء المطلوب من صاحب الحساب

1. افتح https://affiliate-program.amazon.sa/ بحساب المالك الأساسي، ثم الأدوات (Tools) ← Creators API.
2. أخبرنا فقط هل الأداة متاحة وما حالة الأهلية أو رسالة عدم الأهلية، دون إرسال بيانات دخول أو مفاتيح أو ملفات CSV. إذا لم تظهر، راجع دعم البرنامج: https://affiliate-program.amazon.sa/contact واختر موضوع Creators API إذا ظهر.
3. إذا كان الحساب مؤهلًا، يلزم إعداد تكامل يحفظ أسرار التطبيق خارج مستودع GitHub وخارج JavaScript العام. الموقع الحالي GitHub Pages ثابت ولا يملك مخزن أسرار أو خدمة خلفية. يحدد الإعداد الآمن بعد تأكيد الأهلية ومراجعة شروط تخزين/تحديث الصور الحالية؛ لا تضع المفاتيح في products.js أو ملفات الموقع.

لا يُطلب منك إثبات المقاسات المتعارضة؛ حُذفت الادعاءات غير المؤكدة من العرض. لم تُنسخ صور أمازون ولم تُنشأ صور تحاكي المنتجات. الرموز الحالية موسومة بأنها توضيحية.
