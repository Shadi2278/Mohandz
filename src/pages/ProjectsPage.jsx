import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { Eye, Calendar, MapPin } from 'lucide-react';

const ProjectsPage = () => {
  const categories = ['الكل', ...new Set(projects.map(p => p.category))];
  const [selectedCategory, setSelectedCategory] = React.useState('الكل');

  const filteredProjects = selectedCategory === 'الكل' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>منصة مهندز - المشاريع</title>
        <meta name="description" content="استعرض معرض مشاريعنا المتنوعة في مختلف المجالات الهندسية من المباني السكنية والتجارية إلى مشاريع البنية التحتية." />
      </Helmet>

      <div className="min-h-screen py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">معرض مشاريعنا</h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              نفخر بتقديم مجموعة من أبرز المشاريع التي أنجزناها، والتي تعكس خبرتنا وتفانينا في تحقيق رؤى عملائنا.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'brand-gradient text-primary-foreground'
                    : 'border-accent text-accent hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden card-hover flex flex-col"
              >
                <div className="relative h-48">
                  <img 
                    className="w-full h-full object-cover" 
                    alt={`مشروع ${project.title}`}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {project.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-2 space-x-reverse mb-3">
                    <project.icon className="w-5 h-5 text-accent" />
                    <h3 className="text-xl font-bold text-card-foreground">{project.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed h-20 overflow-hidden flex-grow">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  <Link to={`/projects/${project.id}`} className="mt-auto">
                    <Button 
                      className="w-full brand-gradient hover:scale-105 transition-all duration-300 text-primary-foreground"
                    >
                      <Eye className="w-4 h-4 ml-2" />
                      عرض التفاصيل
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;