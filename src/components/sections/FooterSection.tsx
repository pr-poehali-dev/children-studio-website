import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface FooterSectionProps {
  formData: {
    name: string;
    phone: string;
    program: string;
    message: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function FooterSection({ formData, setFormData, handleSubmit }: FooterSectionProps) {
  return (
    <>
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
          <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow">Kinder Studio</h3>
              <p className="text-white/80">Развиваем таланты и способности каждого ребёнка 🌈</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-lg">Контакты</h4>
              <div className="space-y-2 text-white/80">
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Icon name="Phone" size={16} />
                  8 960 620-44-29
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Icon name="Send" size={16} />
                  @Gaika_Z
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <Icon name="MapPin" size={16} />
                  г. Белгород, с. Стрелецкое, Королева 38а
                </p>
              </div>
            </div>

          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>© 2024 Kinder Studio. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </>
  );
}