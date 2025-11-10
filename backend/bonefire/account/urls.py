from django.urls import path
from .views import account_create, login_view, logout_view, get_current_user, cities

urlpatterns = [
    path('account/', account_create, name='account_create'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('current-user/', get_current_user, name='current_user'),
    path('cities', cities, name='cities')
]