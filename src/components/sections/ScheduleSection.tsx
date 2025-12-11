import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const schedule = [
  { day: 'Понедельник', lessons: ['Подготовка к школе (10:00)', 'ИЗО студия (15:00)', 'Английский язык (17:00)'] },
  { day: 'Вторник', lessons: ['Танцы (10:00)', 'Шахматы (15:00)', 'Театр (17:00)'] },
  { day: 'Среда', lessons: ['Подготовка к школе (10:00)', 'ИЗО студия (15:00)', 'Английский язык (17:00)'] },
  { day: 'Четверг', lessons: ['Танцы (10:00)', 'Шахматы (15:00)', 'Театр (17:00)'] },
  { day: 'Пятница', lessons: ['Подготовка к школе (10:00)', 'ИЗО студия (15:00)', 'Концерты (17:00)'] }
];

export default function ScheduleSection() {
  return (
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
  );
}
