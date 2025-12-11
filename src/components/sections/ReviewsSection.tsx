import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const REVIEWS_API = 'https://functions.poehali.dev/b848e236-e5aa-4cb9-a629-ee13160fbd2a';

interface Review {
  id: number;
  parent_name: string;
  child_name?: string;
  program?: string;
  rating: number;
  review_text: string;
  created_at: string;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    parent_name: '',
    child_name: '',
    program: '',
    rating: 5,
    review_text: ''
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(REVIEWS_API);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(REVIEWS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Спасибо за ваш отзыв! 🎉');
        setFormData({ parent_name: '', child_name: '', program: '', rating: 5, review_text: '' });
        setIsOpen(false);
        fetchReviews();
      } else {
        toast.error('Ошибка при отправке отзыва');
      }
    } catch (error) {
      toast.error('Ошибка при отправке отзыва');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue/20 to-pink/20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-pink mb-4">
          Отзывы родителей 💬
        </h2>
        <p className="text-center text-xl text-muted-foreground mb-8">
          Что говорят о нас
        </p>

        <div className="text-center mb-12">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-gradient-to-r from-pink to-purple text-white">
                <Icon name="MessageSquarePlus" className="mr-2" size={20} />
                Оставить отзыв
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl text-pink">Ваш отзыв</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="parent_name">Ваше имя *</Label>
                  <Input
                    id="parent_name"
                    value={formData.parent_name}
                    onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                    required
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div>
                  <Label htmlFor="child_name">Имя ребёнка</Label>
                  <Input
                    id="child_name"
                    value={formData.child_name}
                    onChange={(e) => setFormData({ ...formData, child_name: e.target.value })}
                    placeholder="Имя вашего ребёнка"
                  />
                </div>
                <div>
                  <Label htmlFor="program">Направление</Label>
                  <Input
                    id="program"
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    placeholder="Например: ИЗО, Логопед"
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Оценка</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className={`text-3xl transition-transform hover:scale-110 ${
                          star <= formData.rating ? 'text-yellow' : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="review_text">Ваш отзыв *</Label>
                  <Textarea
                    id="review_text"
                    value={formData.review_text}
                    onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                    required
                    placeholder="Напишите ваше мнение о студии..."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-pink to-purple text-white">
                  Отправить отзыв
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Пока нет отзывов. Станьте первым! 🌟
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card
                key={review.id}
                className="border-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl text-purple">{review.parent_name}</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow text-xl">⭐</span>
                      ))}
                    </div>
                  </div>
                  {review.child_name && (
                    <CardDescription className="text-sm">
                      Родитель: {review.child_name}
                    </CardDescription>
                  )}
                  {review.program && (
                    <CardDescription className="text-sm font-semibold text-pink">
                      {review.program}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{review.review_text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
