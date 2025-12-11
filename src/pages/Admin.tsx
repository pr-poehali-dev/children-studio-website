import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const ART_LESSONS_API = 'https://functions.poehali.dev/39fe6f3d-5307-41de-aa71-3e2c57aec7f6';
const ART_WORKS_API = 'https://functions.poehali.dev/54fa90a2-438b-44e7-ad97-edce352f7d34';
const TESTS_API = 'https://functions.poehali.dev/3451c345-0cc9-41d4-b512-358c9d548458';

export default function Admin() {
  const [lessonForm, setLessonForm] = useState({ date: '', topic: '' });
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [testForm, setTestForm] = useState({
    title: '',
    description: '',
    questionText: '',
    option1: '',
    option2: '',
    option3: '',
    correctAnswer: '0'
  });
  const [testQuestions, setTestQuestions] = useState<any[]>([]);

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(ART_LESSONS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lessonForm)
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(`Урок создан! ID: ${data.id}`);
        setLessonForm({ date: '', topic: '' });
      } else {
        toast.error('Ошибка при создании урока');
      }
    } catch (error) {
      toast.error('Ошибка при создании урока');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedLessonId) {
      toast.error('Выберите ID урока и файл');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const response = await fetch(ART_WORKS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lesson_id: parseInt(selectedLessonId),
            author_name: authorName || 'Ученик',
            image: reader.result
          })
        });

        if (response.ok) {
          toast.success('Работа загружена! 🎨');
          setAuthorName('');
          e.target.value = '';
        } else {
          toast.error('Ошибка при загрузке работы');
        }
      } catch (error) {
        toast.error('Ошибка при загрузке работы');
      }
    };
    reader.readAsDataURL(file);
  };

  const addQuestion = () => {
    if (!testForm.questionText || !testForm.option1 || !testForm.option2 || !testForm.option3) {
      toast.error('Заполните все поля вопроса');
      return;
    }

    setTestQuestions([
      ...testQuestions,
      {
        question: testForm.questionText,
        options: [testForm.option1, testForm.option2, testForm.option3],
        correct: parseInt(testForm.correctAnswer)
      }
    ]);

    setTestForm({
      ...testForm,
      questionText: '',
      option1: '',
      option2: '',
      option3: '',
      correctAnswer: '0'
    });

    toast.success('Вопрос добавлен!');
  };

  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (testQuestions.length === 0) {
      toast.error('Добавьте хотя бы один вопрос');
      return;
    }

    try {
      const response = await fetch(TESTS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: testForm.title,
          description: testForm.description,
          questions: testQuestions
        })
      });

      if (response.ok) {
        toast.success('Тест создан! 📝');
        setTestForm({
          title: '',
          description: '',
          questionText: '',
          option1: '',
          option2: '',
          option3: '',
          correctAnswer: '0'
        });
        setTestQuestions([]);
      } else {
        toast.error('Ошибка при создании теста');
      }
    } catch (error) {
      toast.error('Ошибка при создании теста');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple/10 via-pink/10 to-orange/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-purple">Админ-панель Kinder Studio</h1>
          <Link to="/">
            <Button variant="outline">
              <Icon name="Home" className="mr-2" size={20} />
              На главную
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="art" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="art">🎨 Галерея ИЗО</TabsTrigger>
            <TabsTrigger value="tests">📝 Тесты</TabsTrigger>
          </TabsList>

          <TabsContent value="art" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Создать новый урок ИЗО</CardTitle>
                <CardDescription>Укажите дату и тему занятия</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateLesson} className="space-y-4">
                  <div>
                    <Label htmlFor="date">Дата урока</Label>
                    <Input
                      id="date"
                      value={lessonForm.date}
                      onChange={(e) => setLessonForm({ ...lessonForm, date: e.target.value })}
                      required
                      placeholder="Например: 15 декабря 2024"
                    />
                  </div>
                  <div>
                    <Label htmlFor="topic">Тема урока</Label>
                    <Input
                      id="topic"
                      value={lessonForm.topic}
                      onChange={(e) => setLessonForm({ ...lessonForm, topic: e.target.value })}
                      required
                      placeholder="Например: Зимний пейзаж"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple to-pink text-white">
                    Создать урок
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Загрузить работы учеников</CardTitle>
                <CardDescription>Добавьте фотографии работ к уроку</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="lesson_id">ID урока</Label>
                  <Input
                    id="lesson_id"
                    type="number"
                    value={selectedLessonId}
                    onChange={(e) => setSelectedLessonId(e.target.value)}
                    placeholder="Введите ID урока"
                  />
                </div>
                <div>
                  <Label htmlFor="author">Имя ученика</Label>
                  <Input
                    id="author"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Например: Маша"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Выберите изображение</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Создать новый тест</CardTitle>
                <CardDescription>Добавьте вопросы для теста</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateTest} className="space-y-4">
                  <div>
                    <Label htmlFor="test_title">Название теста</Label>
                    <Input
                      id="test_title"
                      value={testForm.title}
                      onChange={(e) => setTestForm({ ...testForm, title: e.target.value })}
                      required
                      placeholder="Например: Счёт до 10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="test_description">Описание</Label>
                    <Input
                      id="test_description"
                      value={testForm.description}
                      onChange={(e) => setTestForm({ ...testForm, description: e.target.value })}
                      placeholder="Краткое описание теста"
                    />
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold mb-3">Добавить вопрос</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="question">Текст вопроса</Label>
                        <Input
                          id="question"
                          value={testForm.questionText}
                          onChange={(e) => setTestForm({ ...testForm, questionText: e.target.value })}
                          placeholder="Например: Сколько будет 2+2?"
                        />
                      </div>
                      <div>
                        <Label htmlFor="option1">Вариант 1</Label>
                        <Input
                          id="option1"
                          value={testForm.option1}
                          onChange={(e) => setTestForm({ ...testForm, option1: e.target.value })}
                          placeholder="Первый вариант ответа"
                        />
                      </div>
                      <div>
                        <Label htmlFor="option2">Вариант 2</Label>
                        <Input
                          id="option2"
                          value={testForm.option2}
                          onChange={(e) => setTestForm({ ...testForm, option2: e.target.value })}
                          placeholder="Второй вариант ответа"
                        />
                      </div>
                      <div>
                        <Label htmlFor="option3">Вариант 3</Label>
                        <Input
                          id="option3"
                          value={testForm.option3}
                          onChange={(e) => setTestForm({ ...testForm, option3: e.target.value })}
                          placeholder="Третий вариант ответа"
                        />
                      </div>
                      <div>
                        <Label htmlFor="correct">Правильный ответ</Label>
                        <select
                          id="correct"
                          value={testForm.correctAnswer}
                          onChange={(e) => setTestForm({ ...testForm, correctAnswer: e.target.value })}
                          className="w-full border rounded-md p-2"
                        >
                          <option value="0">Вариант 1</option>
                          <option value="1">Вариант 2</option>
                          <option value="2">Вариант 3</option>
                        </select>
                      </div>
                      <Button type="button" onClick={addQuestion} variant="outline" className="w-full">
                        <Icon name="Plus" className="mr-2" size={16} />
                        Добавить вопрос ({testQuestions.length})
                      </Button>
                    </div>
                  </div>

                  {testQuestions.length > 0 && (
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Добавлено вопросов: {testQuestions.length}</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {testQuestions.map((q, i) => (
                          <li key={i}>{q.question}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue to-green text-white">
                    Создать тест
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
