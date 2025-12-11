import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const tests = [
  {
    id: 1,
    title: 'Счёт до 10',
    emoji: '🔢',
    description: 'Проверим, как ребёнок считает',
    questions: [
      {
        question: 'Сколько будет 3 + 2?',
        options: ['4', '5', '6'],
        correct: 1
      },
      {
        question: 'Сколько будет 7 - 3?',
        options: ['3', '4', '5'],
        correct: 1
      },
      {
        question: 'Что больше: 8 или 5?',
        options: ['8', '5', 'Одинаково'],
        correct: 0
      }
    ]
  },
  {
    id: 2,
    title: 'Буквы и звуки',
    emoji: '📝',
    description: 'Проверим знание алфавита',
    questions: [
      {
        question: 'С какой буквы начинается слово "Мама"?',
        options: ['А', 'М', 'П'],
        correct: 1
      },
      {
        question: 'Сколько звуков в слове "Дом"?',
        options: ['2', '3', '4'],
        correct: 1
      },
      {
        question: 'Какая буква последняя в слове "Кот"?',
        options: ['К', 'О', 'Т'],
        correct: 2
      }
    ]
  },
  {
    id: 3,
    title: 'Логика и внимание',
    emoji: '🧩',
    description: 'Развиваем мышление',
    questions: [
      {
        question: 'Что лишнее: яблоко, груша, морковь, банан?',
        options: ['Яблоко', 'Морковь', 'Банан'],
        correct: 1
      },
      {
        question: 'Продолжи ряд: 2, 4, 6, ...',
        options: ['7', '8', '9'],
        correct: 1
      },
      {
        question: 'Какое животное не летает?',
        options: ['Бабочка', 'Собака', 'Птица'],
        correct: 1
      }
    ]
  }
];

export default function SchoolPrep() {
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handleTestSelect = (testId: number) => {
    setSelectedTest(testId);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer('');
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === '') return;

    const newAnswers = [...answers, parseInt(selectedAnswer)];
    setAnswers(newAnswers);

    const test = tests.find(t => t.id === selectedTest);
    if (test && currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    const test = tests.find(t => t.id === selectedTest);
    if (!test) return 0;

    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === test.questions[index].correct) {
        correct++;
      }
    });

    return Math.round((correct / test.questions.length) * 100);
  };

  const resetTest = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer('');
  };

  if (selectedTest === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow via-orange to-pink">
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="outline" className="mb-6 bg-white">
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              Назад на главную
            </Button>
          </Link>

          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Подготовка к школе 🎓
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Веселые тесты и задания для будущих первоклассников
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tests.map((test, index) => (
              <Card
                key={test.id}
                className="cursor-pointer hover:scale-105 transition-all duration-300 border-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleTestSelect(test.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4 animate-bounce-gentle">{test.emoji}</div>
                  <CardTitle className="text-2xl text-purple">{test.title}</CardTitle>
                  <CardDescription className="text-base">{test.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-purple to-pink text-white hover:shadow-lg">
                    Начать тест
                    <Icon name="Play" className="ml-2" size={20} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="border-4 border-blue bg-white/95">
              <CardHeader>
                <CardTitle className="text-3xl text-center text-blue">
                  📚 Дополнительные материалы
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue/10 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2 text-blue">Прописи</h3>
                  <p className="text-sm text-muted-foreground">Учимся писать буквы и цифры</p>
                </div>
                <div className="p-4 bg-green/10 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2 text-green">Раскраски</h3>
                  <p className="text-sm text-muted-foreground">Развиваем мелкую моторику</p>
                </div>
                <div className="p-4 bg-orange/10 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2 text-orange">Математика</h3>
                  <p className="text-sm text-muted-foreground">Считаем и решаем задачки</p>
                </div>
                <div className="p-4 bg-pink/10 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2 text-pink">Чтение</h3>
                  <p className="text-sm text-muted-foreground">Читаем по слогам</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const test = tests.find(t => t.id === selectedTest);
  if (!test) return null;

  if (showResult) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow via-orange to-pink flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-4 animate-fade-in">
          <CardHeader className="text-center">
            <div className="text-8xl mb-4 animate-bounce-gentle">
              {score >= 80 ? '🎉' : score >= 60 ? '😊' : '💪'}
            </div>
            <CardTitle className="text-4xl text-purple mb-4">
              {score >= 80 ? 'Отлично!' : score >= 60 ? 'Хорошо!' : 'Продолжай учиться!'}
            </CardTitle>
            <CardDescription className="text-xl">
              Правильных ответов: {answers.filter((a, i) => a === test.questions[i].correct).length} из {test.questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={score} className="h-4" />
            <div className="text-center text-2xl font-bold text-purple">{score}%</div>
            <div className="flex gap-4">
              <Button onClick={resetTest} variant="outline" className="flex-1">
                <Icon name="Home" className="mr-2" size={20} />
                К тестам
              </Button>
              <Button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setShowResult(false);
                  setSelectedAnswer('');
                }}
                className="flex-1 bg-gradient-to-r from-purple to-pink text-white"
              >
                <Icon name="RotateCcw" className="mr-2" size={20} />
                Пройти ещё раз
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow via-orange to-pink flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-4 animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl text-purple">{test.title}</CardTitle>
            <div className="text-4xl animate-bounce-gentle">{test.emoji}</div>
          </div>
          <Progress value={progress} className="h-3" />
          <CardDescription className="mt-2 text-base">
            Вопрос {currentQuestion + 1} из {test.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">
            {test.questions[currentQuestion].question}
          </h3>

          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            {test.questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-lg">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex gap-4">
            <Button onClick={resetTest} variant="outline" className="flex-1">
              <Icon name="X" className="mr-2" size={20} />
              Выйти
            </Button>
            <Button
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === ''}
              className="flex-1 bg-gradient-to-r from-purple to-pink text-white disabled:opacity-50"
            >
              {currentQuestion < test.questions.length - 1 ? 'Далее' : 'Завершить'}
              <Icon name="ChevronRight" className="ml-2" size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
