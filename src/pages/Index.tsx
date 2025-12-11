import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

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
    title: 'ИЗО студия',
    icon: '🎨',
    description: 'Творчество, рисование, развитие художественного вкуса',
    age: '4-12 лет',
    color: 'from-purple to-pink',
    features: ['Акварель', 'Гуашь', 'Карандаши', 'Аппликация'],
    link: '/art-gallery'
  },
  {
    id: 3,
    title: 'Английский язык',
    icon: '🌍',
    description: 'Изучение английского в игровой форме',
    age: '5-10 лет',
    color: 'from-blue to-green',
    features: ['Разговорная практика', 'Игры', 'Песни', 'Чтение']
  },
  {
    id: 4,
    title: 'Танцы',
    icon: '💃',
    description: 'Хореография для малышей и школьников',
    age: '3-12 лет',
    color: 'from-pink to-purple',
    features: ['Растяжка', 'Ритмика', 'Постановка', 'Выступления']
  },
  {
    id: 5,
    title: 'Шахматы',
    icon: '♟️',
    description: 'Развиваем логику и стратегическое мышление',
    age: '5-14 лет',
    color: 'from-green to-blue',
    features: ['Тактика', 'Стратегия', 'Турниры', 'Разборы партий']
  },
  {
    id: 6,
    title: 'Театральная студия',
    icon: '🎭',
    description: 'Актёрское мастерство и постановка спектаклей',
    age: '6-14 лет',
    color: 'from-orange to-pink',
    features: ['Сценическая речь', 'Пластика', 'Постановки', 'Концерты']
  }
];

const schedule = [
  { day: 'Понедельник', lessons: ['Подготовка к школе (10:00)', 'ИЗО студия (15:00)', 'Английский язык (17:00)'] },
  { day: 'Вторник', lessons: ['Танцы (10:00)', 'Шахматы (15:00)', 'Театр (17:00)'] },
  { day: 'Среда', lessons: ['Подготовка к школе (10:00)', 'ИЗО студия (15:00)', 'Английский язык (17:00)'] },
  { day: 'Четверг', lessons: ['Танцы (10:00)', 'Шахматы (15:00)', 'Театр (17:00)'] },
  { day: 'Пятница', lessons: ['Подготовка к школе (10:00)', 'ИЗО студия (15:00)', 'Концерты (17:00)'] }
];

const reviews = [
  {
    id: 1,
    author: 'Елена Иванова',
    text: 'Прекрасная студия! Дочка ходит на подготовку к школе уже полгода. Очень довольны результатами!',
    rating: 5,
    program: 'Подготовка к школе'
  },
  {
    id: 2,
    author: 'Александр Петров',
    text: 'Сын занимается в ИЗО студии. Педагог профессиональный, подход к детям отличный. Рекомендуем!',
    rating: 5,
    program: 'ИЗО студия'
  },
  {
    id: 3,
    author: 'Мария Сидорова',
    text: 'Спасибо за танцы! Дочка стала более уверенной в себе, осанка улучшилась. Замечательная атмосфера!',
    rating: 5,
    program: 'Танцы'
  }
];

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
      <section className="bg-gradient-to-br from-purple via-pink to-orange min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 text-9xl animate-float">⭐</div>
          <div className="absolute top-40 right-20 text-9xl animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>🎨</div>
          <div className="absolute bottom-20 left-40 text-9xl animate-float" style={{ animationDelay: '1s' }}>🎓</div>
          <div className="absolute bottom-40 right-40 text-9xl animate-bounce-gentle" style={{ animationDelay: '1.5s' }}>✨</div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
              Детская студия
              <br />
              <span className="text-yellow">"Радуга"</span>
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

      <section className="py-20 bg-gradient-to-b from-white to-blue/20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center text-blue mb-12">
            Расписание занятий 📅
          </h2>

          <Card className="max-w-4xl mx-auto border-4">
            <CardContent className="p-0">
              <Tabs defaultValue="Понедельник" className="w-full">
                <TabsList className="w-full grid grid-cols-5 rounded-none bg-gradient-to-r from-blue to-purple text-white h-auto">
                  {schedule.map((day) => (
                    <TabsTrigger
                      key={day.day}
                      value={day.day}
                      className="data-[state=active]:bg-white data-[state=active]:text-purple py-4 text-sm md:text-base"
                    >
                      {day.day.slice(0, 2)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {schedule.map((day) => (
                  <TabsContent key={day.day} value={day.day} className="p-6">
                    <h3 className="text-2xl font-bold text-purple mb-6">{day.day}</h3>
                    <div className="space-y-3">
                      {day.lessons.map((lesson, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue/10 to-purple/10 rounded-xl hover:scale-105 transition-transform"
                        >
                          <Icon name="Clock" size={20} className="text-blue" />
                          <span className="text-lg">{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-blue/20 to-pink/20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center text-pink mb-4">
            Отзывы родителей 💬
          </h2>
          <p className="text-center text-xl text-muted-foreground mb-12">
            Что говорят о нас
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card
                key={review.id}
                className="border-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl text-purple">{review.author}</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow text-xl">⭐</span>
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-sm font-semibold text-pink">
                    {review.program}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple via-pink to-orange">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Готовы начать? 🚀
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Запишитесь на бесплатное пробное занятие и познакомьтесь с нашей студией!
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-white text-purple hover:bg-white/90 text-xl px-12 py-6 rounded-full shadow-2xl hover:scale-105 transition-transform"
              >
                <Icon name="Phone" className="mr-2" size={24} />
                Записаться сейчас
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl text-purple">Запись на занятие</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name-footer">Имя родителя</Label>
                  <Input
                    id="name-footer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <Label htmlFor="phone-footer">Телефон</Label>
                  <Input
                    id="phone-footer"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <Label htmlFor="program-footer">Направление</Label>
                  <Input
                    id="program-footer"
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    required
                    placeholder="Какое направление интересует?"
                  />
                </div>
                <div>
                  <Label htmlFor="message-footer">Комментарий</Label>
                  <Textarea
                    id="message-footer"
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
        </div>
      </section>

      <footer className="bg-purple text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow">Детская студия "Радуга"</h3>
              <p className="text-white/80">Развиваем таланты с 2015 года 🌈</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-lg">Контакты</h4>
              <div className="space-y-2 text-white/80">
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Icon name="Mail" size={16} />
                  info@raduga-studio.ru
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Icon name="MapPin" size={16} />
                  г. Москва, ул. Солнечная, 15
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-lg">Режим работы</h4>
              <div className="text-white/80 space-y-1">
                <p>Пн-Пт: 9:00 - 20:00</p>
                <p>Сб: 10:00 - 18:00</p>
                <p>Вс: выходной</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>© 2024 Детская студия "Радуга". Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
