import { useState } from 'react';
import { toast } from 'sonner';
import HeroSection from '@/components/sections/HeroSection';
import ProgramsSection from '@/components/sections/ProgramsSection';
import ScheduleSection from '@/components/sections/ScheduleSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FooterSection from '@/components/sections/FooterSection';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    program: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время 🎉');
    setFormData({ name: '', phone: '', program: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <HeroSection 
        formData={formData} 
        setFormData={setFormData} 
        handleSubmit={handleSubmit} 
      />
      <ProgramsSection 
        formData={formData} 
        setFormData={setFormData} 
        handleSubmit={handleSubmit} 
      />
      <ScheduleSection />
      <ReviewsSection />
      <FooterSection 
        formData={formData} 
        setFormData={setFormData} 
        handleSubmit={handleSubmit} 
      />
    </div>
  );
}
