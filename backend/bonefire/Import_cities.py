import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bonefire.settings')
django.setup()

from account.models import Cities

def import_cities():
    cities_list = [
       "Ангарск",
    ]

    existing_cities = Cities.objects.values_list('city_name', flat=True)
    existing_cities_set = set(existing_cities)
    
    new_cities = [
        Cities(city_name=city) 
        for city in cities_list 
        if city not in existing_cities_set
    ]
    
    if new_cities:
        Cities.objects.bulk_create(new_cities)
        print(f"Успешно добавлено {len(new_cities)} городов")
    else:
        print("Все города уже существуют в базе данных")

if __name__ == "__main__":
    import_cities()