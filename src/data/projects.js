import { Building2, Route as Road, Home, Factory, Hotel as Hospital, ParkingSquare as Park } from 'lucide-react';

export const projects = [
    {
      id: 1,
      title: 'مجمع الرياض التجاري',
      category: 'تجاري',
      location: 'الرياض',
      date: '2024',
      description: 'مجمع تجاري ضخم يضم أحدث العلامات التجارية العالمية، مصمم ليكون وجهة تسوق وترفيه رائدة في العاصمة.',
      details: 'تم تصميم المشروع ليكون معلماً معمارياً في الرياض، مع واجهات زجاجية مبتكرة ومساحات داخلية مفتوحة. تم التركيز على استدامة الطاقة واستخدام مواد صديقة للبيئة. يضم المشروع أكثر من 200 متجر، ومجمع سينمات، ومنطقة مطاعم فاخرة.',
      images: [
        'Modern shopping mall with glass facade and contemporary architecture',
        'Interior of a bustling shopping mall with multiple levels',
        'Architectural blueprint of a commercial complex'
      ],
      icon: Building2
    },
    {
      id: 2,
      title: 'توسعة طريق الملك فهد',
      category: 'بنية تحتية',
      location: 'جدة',
      date: '2023',
      description: 'مشروع حيوي لتوسعة وتطوير طريق رئيسي بطول 25 كم، بما في ذلك إنشاء جسور وأنفاق لتسهيل الحركة المرورية.',
      details: 'يهدف المشروع إلى تخفيف الازدحام المروري في مدينة جدة وتحسين الربط بين شمالها وجنوبها. شمل العمل توسعة الطريق إلى 6 مسارات في كل اتجاه، وإنشاء 3 جسور جديدة، ونفق بطول 1.5 كم. تم استخدام أحدث تقنيات رصف الطرق والإنارة الذكية.',
      images: [
        'Modern highway with multiple lanes and bridges in Saudi Arabia',
        'Construction site of a large bridge over a highway',
        'Night view of a well-lit highway interchange'
      ],
      icon: Road
    },
    {
      id: 3,
      title: 'فيلا النخيل الفاخرة',
      category: 'سكني',
      location: 'الدمام',
      date: '2024',
      description: 'تصميم وتنفيذ فيلا سكنية فاخرة تجمع بين الأصالة والمعاصرة، مع حدائق واسعة ومسبح بتصميم فريد.',
      details: 'تم تصميم الفيلا على الطراز النجدي الحديث، مع استخدام عناصر معمارية تراثية مدمجة مع خطوط التصميم النظيفة. تتميز الفيلا بوجود فناء داخلي كبير، ومساحات معيشة مفتوحة، وتشطيبات عالية الجودة من الرخام والخشب الطبيعي.',
      images: [
        'Luxury modern villa with traditional Saudi architectural elements',
        'Swimming pool area of a luxury villa at sunset',
        'Interior living room of a modern villa with high ceilings'
      ],
      icon: Home
    },
    {
      id: 4,
      title: 'مصنع التمور الحديث',
      category: 'صناعي',
      location: 'القصيم',
      date: '2023',
      description: 'إنشاء مصنع متكامل لتعبئة وتغليف التمور بأحدث التقنيات العالمية لزيادة الطاقة الإنتاجية والتصدير.',
      details: 'تم تصميم المصنع ليكون متوافقاً مع أعلى معايير سلامة الغذاء العالمية. يضم خطوط إنتاج آلية بالكامل، ومستودعات تبريد ضخمة، ومختبر جودة متطور. يهدف المشروع إلى رفع القدرة التنافسية للتمور السعودية في الأسواق العالمية.',
      images: [
        'Modern food processing factory with advanced equipment',
        'Automated conveyor belt system in a factory',
        'Exterior of a large industrial warehouse building'
      ],
      icon: Factory
    },
    {
      id: 5,
      title: 'حديقة الملك سلمان',
      category: 'عام',
      location: 'الرياض',
      date: '2024',
      description: 'تصميم وتطوير حديقة عامة كبرى لتكون متنفساً للسكان، مع مسطحات خضراء ومناطق ترفيهية متنوعة.',
      details: 'يعد المشروع جزءاً من مبادرات تحسين جودة الحياة في الرياض. تضم الحديقة مسارات للمشي والدراجات، ومناطق لعب للأطفال، ومسرحاً مفتوحاً، ونافورة تفاعلية. تم زراعة آلاف الأشجار المحلية لإنشاء بيئة طبيعية مستدامة.',
      images: [
        'Beautiful public park with walking paths and recreational facilities',
        'Childrens playground in a modern city park',
        'Large interactive water fountain in a public square'
      ],
      icon: Park
    },
    {
      id: 6,
      title: 'مستشفى الأمل التخصصي',
      category: 'صحي',
      location: 'مكة المكرمة',
      date: '2023',
      description: 'تصميم مستشفى تخصصي بسعة 500 سرير، مجهز بأحدث الأجهزة الطبية لتوفير رعاية صحية متكاملة للحجاج والمعتمرين.',
      details: 'تم تصميم المستشفى لتوفير بيئة علاجية مريحة وهادئة. يضم أقساماً متخصصة في أمراض القلب، والأورام، والأطفال. تم مراعاة سهولة الوصول والحركة لذوي الاحتياجات الخاصة، وتطبيق أحدث أنظمة مكافحة العدوى.',
      images: [
        'Modern hospital building with medical facilities and emergency entrance',
        'Interior of a modern hospital lobby and reception area',
        'High-tech operating room in a hospital'
      ],
      icon: Hospital
    }
  ];