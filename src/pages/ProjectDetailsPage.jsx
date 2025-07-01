import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Tag } from 'lucide-react';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground text-2xl">
        المشروع غير موجود.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>منصة مهندز - {project.title}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="min-h-screen py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link to="/projects">
              <Button variant="ghost" className="text-accent hover:text-accent/80">
                <ArrowLeft className="w-5 h-5 mr-2 rtl-flip" />
                العودة إلى المشاريع
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-card rounded-3xl overflow-hidden shadow-lg border border-border">
              <div className="relative h-96">
                <img 
                  className="w-full h-full object-cover"
                  alt={`صورة رئيسية لمشروع ${project.title}`}
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-8 right-8 text-white">
                  <h1 className="text-4xl md:text-6xl font-bold text-shadow">{project.title}</h1>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold text-card-foreground mb-6">وصف المشروع</h2>
                    <p className="text-muted-foreground leading-relaxed">{project.details}</p>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-card-foreground mb-6">تفاصيل سريعة</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center">
                          <Tag className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">الفئة</p>
                          <p className="text-card-foreground font-semibold">{project.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">الموقع</p>
                          <p className="text-card-foreground font-semibold">{project.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">سنة الإنجاز</p>
                          <p className="text-card-foreground font-semibold">{project.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h2 className="text-3xl font-bold text-card-foreground mb-6">معرض الصور</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="h-64 rounded-2xl overflow-hidden"
                      >
                        <img 
                          className="w-full h-full object-cover"
                          alt={`صورة ${index + 1} لمشروع ${project.title}`}
                         src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;