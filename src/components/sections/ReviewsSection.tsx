import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function ReviewsSection() {
  return (
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
  );
}
