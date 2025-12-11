import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const programs = [
  {
    id: 1,
    title: 'Подготовка к школе',
    icon: '🎓',
    description: 'Комплексная подготовка для будущих первоклассников',
    age: '5-7 лет',
    color: 'from-yellow to-orange',
    features: ['Обучение чтению', 'Математика', 'Развитие речи', 'Логика'],
    link: '/school-prep'
  },
  {
    id: 2,
    title: 'ИЗО',
    icon: '🎨',
    description: 'Творчество, рисование, развитие художественного вкуса',
    age: '4-12 лет',
    color: 'from-purple to-pink',
    features: ['Акварель', 'Гуашь', 'Карандаши', 'Аппликация'],
    link: '/art-gallery'
  },
  {
    id: 3,
    title: 'Логопед',
    icon: '🗣️',
    description: 'Развитие речи и коррекция произношения',
    age: '3-10 лет',
    color: 'from-blue to-green',
    features: ['Постановка звуков', 'Развитие речи', 'Артикуляция', 'Логопедический массаж']
  },
  {
    id: 4,
    title: 'Фортепиано',
    icon: '🎹',
    description: 'Обучение игре на фортепиано',
    age: '5-14 лет',
    color: 'from-pink to-purple',
    features: ['Основы музыки', 'Техника игры', 'Репертуар', 'Выступления']
  },
  {
    id: 5,
    title: 'Гитара',
    icon: '🎸',
    description: 'Игра на гитаре для начинающих и продвинутых',
    age: '7-16 лет',
    color: 'from-green to-blue',
    features: ['Аккорды', 'Бой и перебор', 'Популярные песни', 'Импровизация']
  },
  {
    id: 6,
    title: 'Вокал',
    icon: '🎤',
    description: 'Постановка голоса и сценическое мастерство',
    age: '5-16 лет',
    color: 'from-orange to-pink',
    features: ['Вокальная техника', 'Дыхание', 'Артистизм', 'Концерты']
  }
];

interface ProgramsSectionProps {
  formData: {
    name: string;
    phone: string;
    program: string;
    message: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function ProgramsSection({ formData, setFormData, handleSubmit }: ProgramsSectionProps) {
  return (
    <section id="programs" className="py-20 bg-gradient-to-b from-yellow/20 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-purple mb-4">
          Наши направления 🎯
        </h2>
        <p className="text-center text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Выберите программу для вашего ребёнка
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <Card
              key={program.id}
              className="border-4 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`h-3 bg-gradient-to-r ${program.color}`}></div>
              <CardHeader>
                <div className="text-6xl mb-3 text-center animate-bounce-gentle">{program.icon}</div>
                <CardTitle className="text-2xl text-center text-purple">{program.title}</CardTitle>
                <CardDescription className="text-center text-base">
                  <span className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full mt-2">
                    <Icon name="Users" size={14} />
                    {program.age}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-4 text-muted-foreground">{program.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {program.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                {program.link ? (
                  <Link to={program.link}>
                    <Button className={`w-full bg-gradient-to-r ${program.color} text-white`}>
                      Подробнее
                      <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Button>
                  </Link>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className={`w-full bg-gradient-to-r ${program.color} text-white`}>
                        Записаться
                        <Icon name="CalendarCheck" className="ml-2" size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-purple">Запись: {program.title}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="name-modal">Имя родителя</Label>
                          <Input
                            id="name-modal"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            placeholder="Ваше имя"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone-modal">Телефон</Label>
                          <Input
                            id="phone-modal"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            placeholder="+7 (999) 123-45-67"
                          />
                        </div>
                        <div>
                          <Label htmlFor="message-modal">Комментарий</Label>
                          <Textarea
                            id="message-modal"
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
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}