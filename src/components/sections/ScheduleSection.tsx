import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const schedule = [
  { day: 'Понедельник', lessons: ['Логопед (15:00 - 20:00)'] },
  { day: 'Вторник', lessons: ['Подготовка к школе - 1 группа (18:00 - 18:50)', 'Подготовка к школе - 2 группа (19:00 - 19:50)'] },
  { day: 'Среда', lessons: ['ИЗО - 1 группа (17:30 - 18:25)', 'ИЗО - 2 группа (18:30 - 19:25)'] },
  { day: 'Четверг', lessons: ['Логопед (15:00 - 20:00)'] },
  { day: 'Пятница', lessons: ['Подготовка к школе (19:00 - 20:00)'] },
  { day: 'Суббота', lessons: ['Подготовка к школе (9:00 - 9:50)', 'Подготовка к школе (10:00 - 10:50)', 'ИЗО - 1 группа (11:10 - 12:10)', 'ИЗО - 2 группа (12:15 - 13:15)'] },
  { day: 'Воскресенье', lessons: ['Гитара (12:00 - 12:40)', 'Гитара (12:50 - 13:30)'] }
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
              <TabsList className="w-full grid grid-cols-7 rounded-none bg-gradient-to-r from-blue to-purple text-white h-auto">
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