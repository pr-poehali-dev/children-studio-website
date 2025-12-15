import json
import random
from datetime import datetime
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Генерирует уникальный тест каждый день для подготовки к школе.
    Тесты включают задания по математике (счет) и русскому языку (вставить буквы).
    Каждый день генерируется 10 новых вопросов на основе текущей даты.
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # Получаем текущую дату для сида
    today = datetime.now().strftime('%Y-%m-%d')
    random.seed(today)
    
    # Генерируем вопросы по математике
    math_questions = generate_math_questions()
    
    # Генерируем вопросы по русскому языку
    russian_questions = generate_russian_questions()
    
    # Объединяем и перемешиваем
    all_questions = math_questions + russian_questions
    random.shuffle(all_questions)
    
    test = {
        'id': 1,
        'title': f'Ежедневный тест ({datetime.now().strftime("%d.%m.%Y")})',
        'description': 'Математика и русский язык',
        'questions': all_questions[:10]  # Берем 10 вопросов
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps([test], ensure_ascii=False)
    }

def generate_math_questions() -> List[Dict[str, Any]]:
    '''Генерирует вопросы по математике'''
    questions = []
    
    # Сложение
    for _ in range(3):
        a = random.randint(1, 9)
        b = random.randint(1, 9)
        result = a + b
        wrong1 = result + random.randint(1, 3)
        wrong2 = result - random.randint(1, 3) if result > 3 else result + random.randint(4, 6)
        
        options = [str(result), str(wrong1), str(wrong2)]
        correct_idx = options.index(str(result))
        random.shuffle(options)
        new_correct_idx = options.index(str(result))
        
        questions.append({
            'question': f'Сколько будет {a} + {b}?',
            'options': options,
            'correct': new_correct_idx
        })
    
    # Вычитание
    for _ in range(2):
        a = random.randint(5, 10)
        b = random.randint(1, a - 1)
        result = a - b
        wrong1 = result + random.randint(1, 3)
        wrong2 = result - random.randint(1, 2) if result > 2 else result + random.randint(3, 5)
        
        options = [str(result), str(wrong1), str(wrong2)]
        correct_idx = options.index(str(result))
        random.shuffle(options)
        new_correct_idx = options.index(str(result))
        
        questions.append({
            'question': f'Сколько будет {a} - {b}?',
            'options': options,
            'correct': new_correct_idx
        })
    
    return questions

def generate_russian_questions() -> List[Dict[str, Any]]:
    '''Генерирует вопросы по русскому языку - вставить пропущенные буквы'''
    word_templates = [
        ('К_РОВ_', 'КОРОВА', 'О', ['О', 'А', 'Е']),
        ('С_БАК_', 'СОБАКА', 'О', ['О', 'А', 'У']),
        ('М_ШИН_', 'МАШИНА', 'А', ['А', 'О', 'Е']),
        ('К_ШК_', 'КОШКА', 'О', ['О', 'А', 'У']),
        ('ДОМ_К', 'ДОМИК', 'И', ['И', 'Е', 'О']),
        ('Л_СА', 'ЛИСА', 'И', ['И', 'Е', 'О']),
        ('_ЖИК', 'ЁЖИК', 'Ё', ['Ё', 'Е', 'О']),
        ('ЗА_Ц', 'ЗАЯЦ', 'Я', ['Я', 'Е', 'И']),
        ('М_ЧИК', 'МЯЧИК', 'Я', ['Я', 'Е', 'И']),
        ('Р_БА', 'РЫБА', 'Ы', ['Ы', 'И', 'О']),
    ]
    
    questions = []
    selected_words = random.sample(word_templates, 5)
    
    for template, full_word, correct_letter, options_list in selected_words:
        random.shuffle(options_list)
        correct_idx = options_list.index(correct_letter)
        
        questions.append({
            'question': f'Вставь букву: {template}',
            'options': options_list,
            'correct': correct_idx
        })
    
    return questions
