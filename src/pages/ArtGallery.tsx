import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ART_LESSONS_API = 'https://functions.poehali.dev/39fe6f3d-5307-41de-aa71-3e2c57aec7f6';
const ART_WORKS_API = 'https://functions.poehali.dev/54fa90a2-438b-44e7-ad97-edce352f7d34';

interface ArtWork {
  id: number;
  image_url: string;
  author_name: string;
}

interface ArtLesson {
  id: number;
  date: string;
  topic: string;
  works: ArtWork[];
}

export default function ArtGallery() {
  const [lessons, setLessons] = useState<ArtLesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [newWork, setNewWork] = useState({
    topic: '',
    date: '',
    authorName: '',
    image: null as string | null
  });

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await fetch(ART_LESSONS_API);
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordCheck = () => {
    if (password === 'kinder2024') {
      setIsAuthenticated(true);
      toast.success('Доступ разрешён! 🔓');
    } else {
      toast.error('Неверный пароль');
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewWork({ ...newWork, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitWork = async () => {
    if (!newWork.topic || !newWork.date || !newWork.authorName || !newWork.image) {
      toast.error('Заполните все поля и выберите фото');
      return;
    }

    try {
      // Создаем урок
      const lessonResponse = await fetch(ART_LESSONS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: newWork.date,
          topic: newWork.topic
        })
      });

      if (!lessonResponse.ok) {
        toast.error('Ошибка при создании урока');
        return;
      }

      const lessonData = await lessonResponse.json();

      // Загружаем работу
      const workResponse = await fetch(ART_WORKS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lesson_id: lessonData.id,
          author_name: newWork.authorName,
          image: newWork.image
        })
      });

      if (workResponse.ok) {
        toast.success('Работа добавлена! 🎨');
        setShowAddDialog(false);
        setNewWork({ topic: '', date: '', authorName: '', image: null });
        fetchLessons();
      } else {
        toast.error('Ошибка при загрузке работы');
      }
    } catch (error) {
      toast.error('Ошибка при добавлении работы');
    }
  };

  const selectedArtwork = lessons.find(l => l.id === selectedLesson);

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
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
            Работы наших юных художников после каждого занятия
          </p>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-purple hover:bg-white/90 shadow-xl">
                <Icon name="Plus" className="mr-2" size={20} />
                Добавить работу
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl text-purple">Добавить работу</DialogTitle>
              </DialogHeader>
              
              {!isAuthenticated ? (
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="password">Введите пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Пароль администратора"
                    />
                  </div>
                  <Button onClick={handlePasswordCheck} className="w-full bg-gradient-to-r from-purple to-pink text-white">
                    <Icon name="Lock" className="mr-2" size={20} />
                    Войти
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="topic">Тема занятия</Label>
                    <Input
                      id="topic"
                      value={newWork.topic}
                      onChange={(e) => setNewWork({ ...newWork, topic: e.target.value })}
                      placeholder="Например: Зимний пейзаж"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Дата занятия</Label>
                    <Input
                      id="date"
                      value={newWork.date}
                      onChange={(e) => setNewWork({ ...newWork, date: e.target.value })}
                      placeholder="Например: 15 декабря 2024"
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Имя и фамилия ребёнка</Label>
                    <Input
                      id="author"
                      value={newWork.authorName}
                      onChange={(e) => setNewWork({ ...newWork, authorName: e.target.value })}
                      placeholder="Например: Маша Иванова"
                    />
                  </div>
                  <div>
                    <Label htmlFor="photo">Фото работы</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                    />
                  </div>
                  <Button onClick={handleSubmitWork} className="w-full bg-gradient-to-r from-purple to-pink text-white">
                    <Icon name="Upload" className="mr-2" size={20} />
                    Загрузить работу
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center text-white text-xl">Загрузка...</div>
        ) : lessons.length === 0 ? (
          <div className="text-center text-white text-xl">
            Пока нет уроков. Скоро здесь появятся работы! 🎨
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {lessons.map((lesson, index) => (
              <Card
                key={lesson.id}
                className="cursor-pointer hover:scale-105 transition-all duration-300 border-4 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedLesson(lesson.id)}
              >
                <CardHeader className="bg-gradient-to-r from-purple/20 to-pink/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-purple">{lesson.topic}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        <Icon name="Calendar" className="inline mr-1" size={16} />
                        {lesson.date}
                      </CardDescription>
                    </div>
                    <div className="text-4xl animate-float">🎨</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {lesson.works.length > 0 ? (
                    <>
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {lesson.works.slice(0, 4).map((work) => (
                          <div
                            key={work.id}
                            className="aspect-square rounded-lg overflow-hidden hover:scale-110 transition-transform"
                          >
                            <img
                              src={work.image_url}
                              alt={work.author_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Users" size={16} />
                          {lesson.works.length} работ
                        </span>
                        <span className="text-purple font-semibold">Смотреть →</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      Работы скоро появятся
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
              {selectedArtwork.works.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {selectedArtwork.works.map((work) => (
                    <div key={work.id} className="space-y-2">
                      <div className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-lg">
                        <img
                          src={work.image_url}
                          alt={work.author_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-center font-semibold text-purple">{work.author_name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Работы скоро появятся
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}