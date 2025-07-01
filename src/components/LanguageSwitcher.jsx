import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <Button onClick={toggleLanguage} variant="ghost" size="icon" className="text-foreground/80 hover:text-accent">
            <Languages className="h-5 w-5" />
            <span className="sr-only">Change language</span>
        </Button>
    );
};

export default LanguageSwitcher;