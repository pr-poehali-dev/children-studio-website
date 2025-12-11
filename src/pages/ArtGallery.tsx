import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const artworks = [
  {
    id: 1,
    date: '15 ноября 2024',
    topic: 'Осенний лес',
    images: [
      { id: 1, author: 'Маша', color: 'bg-orange' },
      { id: 2, author: 'Петя', color: 'bg-yellow' },
      { id: 3, author: 'Аня', color: 'bg-green' },
      { id: 4, author: 'Саша', color: 'bg-pink' }
    ]
  },
  {
    id: 2,
    date: '22 ноября 2024',
    topic: 'Морские жители',
    images: [
      { id: 5, author: 'Лёша', color: 'bg-blue' },
      { id: 6, author: 'Катя', color: 'bg-purple' },
      { id: 7, author: 'Денис', color: 'bg-blue' },
      { id: 8, author: 'Оля', color: 'bg-green' }
    ]
  },
  {
    id: 3,
    date: '29 ноября 2024',
    topic: 'Зимняя сказка',
    images: [
      { id: 9, author: 'Вова', color: 'bg-blue' },
      { id: 10, author: 'Лиза', color: 'bg-purple' },
      { id: 11, author: 'Миша', color: 'bg-pink' },
      { id: 12, author: 'Настя', color: 'bg-yellow' }
    ]
  },
  {
    id: 4,
    date: '6 декабря 2024',
    topic: 'Домашние животные',
    images: [
      { id: 13, author: 'Игорь', color: 'bg-orange' },
      { id: 14, author: 'Вера', color: 'bg-pink' },
      { id: 15, author: 'Коля', color: 'bg-green' },
      { id: 16, author: 'Света', color: 'bg-purple' }
    ]
  }
];

export default function ArtGallery() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const selectedArtwork = artworks.find(a => a.id === selectedLesson);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple via-pink to-orange">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="outline" className="mb-6 bg-white">
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад на главную
          </Button>
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Галерея ИЗО 🎨
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Работы наших юных художников после каждого занятия
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {artworks.map((artwork, index) => (
            <Card
              key={artwork.id}
              className="cursor-pointer hover:scale-105 transition-all duration-300 border-4 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedLesson(artwork.id)}
            >
              <CardHeader className="bg-gradient-to-r from-purple/20 to-pink/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-purple">{artwork.topic}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      <Icon name="Calendar" className="inline mr-1" size={16} />
                      {artwork.date}
                    </CardDescription>
                  </div>
                  <div className="text-4xl animate-float">🎨</div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {artwork.images.slice(0, 4).map((img) => (
                    <div
                      key={img.id}
                      className={`aspect-square ${img.color} rounded-lg flex items-center justify-center text-white text-xl font-bold hover:scale-110 transition-transform`}
                    >
                      🖼️
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Users" size={16} />
                    {artwork.images.length} работ
                  </span>
                  <span className="text-purple font-semibold">Смотреть →</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border-4 border-yellow bg-white/95">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-purple mb-2">
                <span className="text-4xl">✨</span> О занятиях ИЗО
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🎨</div>
                    <div>
                      <h4 className="font-semibold text-purple mb-1">Разные техники</h4>
                      <p className="text-sm text-muted-foreground">
                        Акварель, гуашь, карандаши, мелки, аппликация
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">👨‍🎨</div>
                    <div>
                      <h4 className="font-semibold text-blue mb-1">Опытный педагог</h4>
                      <p className="text-sm text-muted-foreground">
                        Индивидуальный подход к каждому ребёнку
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🌈</div>
                    <div>
                      <h4 className="font-semibold text-green mb-1">Творческая атмосфера</h4>
                      <p className="text-sm text-muted-foreground">
                        Развиваем воображение и фантазию
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <h4 className="font-semibold text-orange mb-1">Участие в конкурсах</h4>
                      <p className="text-sm text-muted-foreground">
                        Выставки и городские конкурсы
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={selectedLesson !== null} onOpenChange={() => setSelectedLesson(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedArtwork && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl text-purple flex items-center gap-3">
                  <span className="text-4xl">🎨</span>
                  {selectedArtwork.topic}
                </DialogTitle>
                <p className="text-muted-foreground flex items-center gap-2 mt-2">
                  <Icon name="Calendar" size={16} />
                  {selectedArtwork.date}
                </p>
              </DialogHeader>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {selectedArtwork.images.map((img) => (
                  <div key={img.id} className="space-y-2">
                    <div
                      className={`aspect-square ${img.color} rounded-xl flex items-center justify-center text-white text-5xl hover:scale-105 transition-transform cursor-pointer shadow-lg`}
                    >
                      🖼️
                    </div>
                    <p className="text-center font-semibold text-purple">{img.author}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
