import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  formData: {
    name: string;
    phone: string;
    program: string;
    message: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function HeroSection({ formData, setFormData, handleSubmit }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 text-8xl animate-float">☁️</div>
        <div className="absolute top-20 right-20 text-7xl animate-float" style={{ animationDelay: '0.3s' }}>☁️</div>
        <div className="absolute top-40 left-1/4 text-6xl animate-float" style={{ animationDelay: '0.6s' }}>☁️</div>
        <div className="absolute bottom-32 right-1/3 text-7xl animate-float" style={{ animationDelay: '0.9s' }}>☁️</div>
        <div className="absolute top-24 left-1/3 text-6xl animate-bounce-gentle">🦋</div>
        <div className="absolute top-32 right-1/4 text-7xl animate-float" style={{ animationDelay: '1s' }}>🐦</div>
        <div className="absolute bottom-40 left-20 text-6xl animate-bounce-gentle" style={{ animationDelay: '1.3s' }}>🦉</div>
        <div className="absolute top-1/2 right-10 text-5xl animate-float" style={{ animationDelay: '1.6s' }}>🐝</div>
        <div className="absolute bottom-20 right-1/2 text-6xl animate-bounce-gentle" style={{ animationDelay: '1.9s' }}>🦜</div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            <span className="text-yellow">Kinder Studio</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl mx-auto">
            Развиваем таланты и раскрываем потенциал каждого ребёнка! 🌈
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-white text-purple hover:bg-white/90 text-xl px-8 py-6 rounded-full shadow-2xl hover:scale-105 transition-transform"
                >
                  <Icon name="CalendarCheck" className="mr-2" size={24} />
                  Записаться на занятие
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-purple">Запись на занятие</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name">Имя родителя</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <Label htmlFor="program">Направление</Label>
                    <Input
                      id="program"
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      required
                      placeholder="Какое направление интересует?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Комментарий</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Возраст ребенка, пожелания..."
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple to-pink text-white">
                    Отправить заявку
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/20 text-white border-white hover:bg-white/30 text-xl px-8 py-6 rounded-full backdrop-blur-sm"
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Sparkles" className="mr-2" size={24} />
              Наши направления
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}