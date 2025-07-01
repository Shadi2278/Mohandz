import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServiceRequestModal from '@/components/ServiceRequestModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
    Building2, Route as RoadIcon, Map as MapIcon, FileSignature, Edit3, DraftingCompass, HardHat, CircuitBoard, 
    Waypoints, Fuel, TrafficCone, Waves, Router as Bridge, Footprints, Landmark, Ruler, Paintbrush, 
    Plus, Wind, Droplets, Shield, Power, Signal, Sofa, Store, 
    Brush, Lamp, Activity, Building, BarChart, Sun, UserCheck, ShieldCheck, GanttChart, Microscope, ClipboardCheck
} from 'lucide-react';

const translations = {
    helmet: {
        title: { ar: 'منصة مهندز - الخدمات', en: 'Mohandz Platform - Services' },
        description: { ar: 'تعرف على مجموعة شاملة من الخدمات الهندسية المتخصصة التي نقدمها في منصة مهندز، من التصميم المعماري إلى إدارة المشاريع.', en: 'Discover our comprehensive range of specialized engineering services, from architectural design to project management.' }
    },
    title: { ar: 'أقسام وخدمات منصة مهندز', en: 'Services & Departments' },
    description: { ar: 'نقدم مجموعة شاملة من الخدمات الهندسية المتخصصة لتلبية جميع احتياجاتكم في مختلف المجالات الهندسية', en: 'We offer a comprehensive range of specialized engineering services to meet all your needs in various engineering fields' },
    requestService: { ar: 'طلب هذه الخدمة', en: 'Request This Service' },
    serviceData: [
        {
            id: 'الخدمات المعمارية والإنشائية',
            category: { ar: 'الخدمات المعمارية والإنشائية', en: 'Architectural & Construction Services' },
            icon: Building2,
            description: { ar: 'حلول متكاملة للتصميم المعماري والإنشائي وتصميم MEP.', en: 'Integrated solutions for architectural, structural, and MEP design.' },
            services: [
                { title: { ar: 'طلب تصميم معماري', en: 'Architectural Design Request' }, icon: DraftingCompass, description: { ar: 'تصاميم معمارية مبتكرة للمباني السكنية والتجارية.', en: 'Innovative architectural designs for residential and commercial buildings.' } },
                { title: { ar: 'طلب تصميم إنشائي', en: 'Structural Design Request' }, icon: HardHat, description: { ar: 'حلول إنشائية آمنة واقتصادية لمختلف أنواع المباني.', en: 'Safe and economical structural solutions for various building types.' } },
                { title: { ar: 'طلب تصميم MEP', en: 'MEP Design Request' }, icon: CircuitBoard, description: { ar: 'تصميم أنظمة الكهرباء والميكانيكا والصرف الصحي.', en: 'Design of electrical, mechanical, and plumbing systems.' } },
                { title: { ar: 'طلب تصميم شامل', en: 'Comprehensive Design Request' }, icon: FileSignature, description: { ar: 'خدمة متكاملة تشمل جميع مراحل التصميم الهندسي.', en: 'Integrated service covering all stages of engineering design.' } },
                { title: { ar: 'طلب التعديل على مخطط', en: 'Plan Modification Request' }, icon: Edit3, description: { ar: 'تعديل وتحديث المخططات القائمة لتلبية احتياجاتك.', en: 'Modification and updating of existing plans to meet your needs.' } },
            ],
        },
        {
            id: 'خدمات الطرق والبنية التحتية',
            category: { ar: 'خدمات الطرق والبنية التحتية', en: 'Roads & Infrastructure Services' },
            icon: RoadIcon,
            description: { ar: 'تصميم وتنفيذ مشاريع البنية التحتية الحيوية للطرق والشبكات.', en: 'Design and implementation of vital infrastructure projects for roads and networks.' },
            services: [
                { title: { ar: 'طلب تصميم طريق', en: 'Road Design Request' }, icon: RoadIcon, description: { ar: 'تصميم الطرق الحضرية والسريعة بأعلى المعايير.', en: 'Design of urban and express roads to the highest standards.' } },
                { title: { ar: 'طلب تصميم شبكات', en: 'Networks Design Request' }, icon: Waypoints, description: { ar: 'تخطيط وتصميم شبكات الخدمات الأساسية للمدن.', en: 'Planning and design of essential utility networks for cities.' } },
                { title: { ar: 'طلب تصميم مخطط محطة وقود', en: 'Gas Station Plan Request' }, icon: Fuel, description: { ar: 'تصاميم متوافقة مع اشتراطات السلامة والبيئة.', en: 'Designs compliant with safety and environmental regulations.' } },
                { title: { ar: 'طلب تصميم مخطط السلامة المرورية', en: 'Traffic Safety Plan Request' }, icon: TrafficCone, description: { ar: 'حلول لرفع مستوى السلامة على الطرقات.', en: 'Solutions to improve road safety.' } },
                { title: { ar: 'طلب تصميم عبارات السيول', en: 'Culvert Design Request' }, icon: Waves, description: { ar: 'تصميم منشآت تصريف مياه الأمطار والسيول.', en: 'Design of rainwater and flood drainage structures.' } },
                { title: { ar: 'طلب تصميم جسور', en: 'Bridges Design Request' }, icon: Bridge, description: { ar: 'تصاميم إنشائية متقدمة للجسور والتقاطعات.', en: 'Advanced structural designs for bridges and intersections.' } },
                { title: { ar: 'طلب تصميم الأرصفة والأنسنة', en: 'Pavements & Humanization Request' }, icon: Footprints, description: { ar: 'تحسين البيئة الحضرية للمشاة وذوي الإعاقة.', en: 'Improving the urban environment for pedestrians and people with disabilities.' } },
            ],
        },
        {
            id: 'خدمات الموقع المساحية',
            category: { ar: 'خدمات الموقع المساحية', en: 'Surveying Services' },
            icon: MapIcon,
            description: { ar: 'خدمات مساحية دقيقة للأراضي والطرق والخدمات القائمة.', en: 'Accurate surveying services for land, roads, and existing utilities.' },
            services: [
                { title: { ar: 'طلب رفع مساحي لقطعة أرض', en: 'Land Plot Survey Request' }, icon: Landmark, description: { ar: 'تحديد إحداثيات ومساحة قطع الأراضي بدقة.', en: 'Accurate determination of land plot coordinates and area.' } },
                { title: { ar: 'طلب رفع مساحي لطريق غير ممهد', en: 'Unpaved Road Survey Request' }, icon: RoadIcon, description: { ar: 'مسح طبوغرافي للطرق لغايات التصميم.', en: 'Topographical survey of roads for design purposes.' } },
                { title: { ar: 'طلب رفع مساحي لطريق قائم', en: 'Existing Road Survey Request' }, icon: RoadIcon, description: { ar: 'رفع مساحي دقيق للطرق القائمة لغايات الصيانة.', en: 'Accurate survey of existing roads for maintenance purposes.' } },
                { title: { ar: 'طلب رفع مساحي للخدمات', en: 'Services Survey Request' }, icon: Paintbrush, description: { ar: 'مسح وحصر كميات عناصر الطرق المختلفة.', en: 'Survey and quantification of various road elements.' } },
            ],
        },
        {
            id: 'خدمات الهندسة الكهربائية والميكانيكية',
            category: { ar: 'خدمات الهندسة الكهربائية والميكانيكية (MEP)', en: 'MEP Services' },
            icon: CircuitBoard,
            description: { ar: 'تصميم وتوريد وتركيب أنظمة MEP للمشاريع المختلفة.', en: 'Design, supply, and installation of MEP systems for various projects.' },
            services: [
                { title: { ar: 'تصميم أنظمة التكييف والتهوية', en: 'HVAC Design' }, icon: Wind, description: { ar: 'حلول HVAC لتحقيق الراحة الحرارية وكفاءة الطاقة.', en: 'HVAC solutions for thermal comfort and energy efficiency.' } },
                { title: { ar: 'تصميم أنظمة السباكة والصرف', en: 'Plumbing & Drainage Design' }, icon: Droplets, description: { ar: 'تصميم شبكات المياه والصرف الصحي للمباني.', en: 'Design of water and drainage networks for buildings.' } },
                { title: { ar: 'تصميم أنظمة مكافحة الحريق', en: 'Firefighting Systems Design' }, icon: Shield, description: { ar: 'أنظمة إنذار وإطفاء حريق متوافقة مع الأكواد.', en: 'Code-compliant fire alarm and extinguishing systems.' } },
                { title: { ar: 'تصميم أنظمة الكهرباء والإنارة', en: 'Electrical & Lighting Design' }, icon: Power, description: { ar: 'تصميم شبكات القوى والإنارة الداخلية والخارجية.', en: 'Design of power and indoor/outdoor lighting systems.' } },
                { title: { ar: 'تصميم أنظمة التيار الخفيف', en: 'Low Current Systems Design' }, icon: Signal, description: { ar: 'حلول متكاملة لأنظمة البيانات، الصوت، وكاميرات المراقبة.', en: 'Integrated solutions for data, voice, and CCTV systems.' } },
            ]
        },
        {
            id: 'خدمات التصميم الداخلي والديكور',
            category: { ar: 'خدمات التصميم الداخلي والديكور', en: 'Interior Design & Decoration' },
            icon: Sofa,
            description: { ar: 'إبداع مساحات داخلية تجمع بين الجمال والوظيفة.', en: 'Creating interior spaces that combine beauty and function.' },
            services: [
                { title: { ar: 'تصميم داخلي للمساحات السكنية', en: 'Residential Interior Design' }, icon: Sofa, description: { ar: 'تصاميم تعكس ذوقك الشخصي وتوفر أقصى درجات الراحة.', en: 'Designs that reflect your personal taste and provide maximum comfort.' } },
                { title: { ar: 'تصميم داخلي للمساحات التجارية', en: 'Commercial Interior Design' }, icon: Store, description: { ar: 'حلول تصميم مبتكرة تعزز هوية علامتك التجارية.', en: 'Innovative design solutions that enhance your brand identity.' } },
                { title: { ar: 'تصميم الأثاث والمفروشات', en: 'Furniture & Furnishing Design' }, icon: Brush, description: { ar: 'تصميم قطع أثاث فريدة ومخصصة لمساحاتك.', en: 'Design of unique and custom furniture pieces for your spaces.' } },
                { title: { ar: 'اختيار المواد والتشطيبات', en: 'Material & Finishing Selection' }, icon: Paintbrush, description: { ar: 'مساعدة في اختيار أفضل المواد التي تناسب تصميمك.', en: 'Assistance in selecting the best materials for your design.' } },
                { title: { ar: 'تصميم الإضاءة الداخلية', en: 'Interior Lighting Design' }, icon: Lamp, description: { ar: 'تصاميم إضاءة تبرز جمال المساحات وتوفر الراحة البصرية.', en: 'Lighting designs that highlight the beauty of spaces and provide visual comfort.' } },
            ]
        },
        {
            id: 'خدمات الاستشارات الهندسية والتقييم',
            category: { ar: 'خدمات الاستشارات الهندسية والتقييم', en: 'Consultancy & Valuation' },
            icon: Activity,
            description: { ar: 'استشارات دقيقة وتقييمات فنية لدعم قراراتك الاستثمارية.', en: 'Accurate consultations and technical evaluations to support your investment decisions.' },
            services: [
                { title: { ar: 'دراسات الجدوى الفنية والهندسية', en: 'Technical & Engineering Feasibility' }, icon: BarChart, description: { ar: 'تقييم شامل لجدوى المشاريع قبل البدء بها.', en: 'Comprehensive assessment of project feasibility before commencement.' } },
                { title: { ar: 'تقييم الأضرار الإنشائية والمباني', en: 'Structural Damage Valuation' }, icon: Building, description: { ar: 'تقارير فنية مفصلة عن حالة المباني والأضرار.', en: 'Detailed technical reports on building condition and damages.' } },
                { title: { ar: 'تقييم الممتلكات العقارية', en: 'Real Estate Property Valuation' }, icon: Landmark, description: { ar: 'تقييم احترافي للقيمة السوقية للعقارات.', en: 'Professional valuation of the market value of properties.' } },
                { title: { ar: 'استشارات الطاقة وكفاءة المباني', en: 'Energy & Building Efficiency' }, icon: Sun, description: { ar: 'حلول لترشيد استهلاك الطاقة في المباني.', en: 'Solutions for optimizing energy consumption in buildings.' } },
                { title: { ar: 'استشارات السلامة والصحة المهنية', en: 'HSE Consultancy' }, icon: UserCheck, description: { ar: 'تطوير وتطبيق أنظمة السلامة في مواقع العمل.', en: 'Development and implementation of safety systems at work sites.' } },
            ]
        },
        {
            id: 'خدمات إدارة المشاريع الهندسية',
            category: { ar: 'خدمات إدارة المشاريع الهندسية', en: 'Project Management Services' },
            icon: ClipboardCheck,
            description: { ar: 'إدارة احترافية لضمان نجاح مشاريعك من البداية إلى النهاية.', en: 'Professional management to ensure your project’s success from start to finish.' },
            services: [
                { title: { ar: 'إدارة مشاريع البناء والتشييد', en: 'Construction Project Management' }, icon: HardHat, description: { ar: 'قيادة وإدارة المشاريع الإنشائية بكفاءة وفعالية.', en: 'Efficiently and effectively leading and managing construction projects.' } },
                { title: { ar: 'إدارة تكاليف المشروع والجداول الزمنية', en: 'Cost & Schedule Management' }, icon: Ruler, description: { ar: 'تخطيط ومراقبة الميزانيات والجداول الزمنية للمشاريع.', en: 'Planning and monitoring project budgets and schedules.' } },
                { title: { ar: 'إدارة الجودة الهندسية للمشاريع', en: 'Engineering Quality Management' }, icon: ShieldCheck, description: { ar: 'تطبيق معايير الجودة لضمان تميز المخرجات.', en: 'Applying quality standards to ensure outstanding outcomes.' } },
                { title: { ar: 'إدارة المخاطر في المشاريع الهندسية', en: 'Risk Management in Projects' }, icon: GanttChart, description: { ar: 'تحديد وتحليل وإدارة المخاطر المحتملة.', en: 'Identifying, analyzing, and managing potential risks.' } },
                { title: { ar: 'الإشراف الهندسي على التنفيذ', en: 'Engineering Supervision' }, icon: Microscope, description: { ar: 'مراقبة دقيقة لضمان التنفيذ المطابق للمواصفات.', en: 'Close monitoring to ensure execution complies with specifications.' } },
            ]
        }
    ]
};

const ServicesPage = () => {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const location = useLocation();
    const serviceRefs = useRef({});

    useEffect(() => {
        if (location.state?.scrollTo) {
            const element = serviceRefs.current[location.state.scrollTo];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [location.state]);

    const handleServiceRequestClick = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    return (
        <>
            <Helmet>
                <title>{t(translations.helmet.title)}</title>
                <meta name="description" content={t(translations.helmet.description)} />
            </Helmet>

            <ServiceRequestModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                serviceTitle={selectedService ? t(selectedService.title) : ''}
            />

            <div className="min-h-screen py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">{t(translations.title)}</h1>
                        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                            {t(translations.description)}
                        </p>
                    </motion.div>

                    <div className="space-y-16">
                        {translations.serviceData.map((category, categoryIndex) => (
                            <motion.div
                                key={categoryIndex}
                                ref={el => serviceRefs.current[category.id] = el}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                                className="bg-card rounded-3xl p-8 md:p-12 shadow-md border border-border"
                            >
                                <div className="flex items-center space-x-4 space-x-reverse mb-8">
                                    <div className="w-16 h-16 brand-gradient rounded-xl flex items-center justify-center">
                                        <category.icon className="w-8 h-8 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-card-foreground">{t(category.category)}</h2>
                                        <p className="text-muted-foreground text-lg mt-2">{t(category.description)}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {category.services.map((service, serviceIndex) => (
                                        <motion.div
                                            key={serviceIndex}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
                                            className="bg-background rounded-2xl p-6 card-hover flex flex-col text-center"
                                        >
                                            <div className="w-12 h-12 brand-gradient rounded-lg flex items-center justify-center mb-4 mx-auto">
                                                <service.icon className="w-6 h-6 text-primary-foreground" />
                                            </div>
                                            <h3 className="text-xl font-bold text-foreground mb-2">{t(service.title)}</h3>
                                            <p className="text-muted-foreground text-sm mb-4 flex-grow">{t(service.description)}</p>
                                            <Button
                                                onClick={() => handleServiceRequestClick(service)}
                                                className="w-full brand-gradient text-primary-foreground hover:scale-105 transition-all duration-300 mt-auto"
                                            >
                                                <Plus className="w-4 h-4 ml-2" />
                                                {t(translations.requestService)}
                                            </Button>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesPage;