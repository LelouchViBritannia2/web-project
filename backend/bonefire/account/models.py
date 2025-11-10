from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone
from datetime import timedelta
import secrets

class Account(models.Model):
    name = models.CharField(verbose_name='Имя', max_length=128, blank=True, null=True)
    last_name = models.CharField(verbose_name='Фамилия', max_length=128, blank=True, null=True)
    city = models.CharField(verbose_name='Город', max_length=128,  blank=True, null=True)
    birthday = models.DateField(verbose_name='Дата рождения', blank=True, null=True)
    email = models.EmailField(verbose_name="Email", unique=True)
    phone_number = models.CharField(verbose_name="Номер телефона",unique=True, blank=True, null=True, max_length=11)
    password = models.CharField(max_length=128, verbose_name="Пароль")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    session_token = models.CharField(max_length=64, blank=True, null=True, unique=True)
    token_expires = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = "Аккаунт"
        verbose_name_plural = "Аккаунты"

    def __str__(self):
        return self.email

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    
    def generate_session_token(self):
        self.session_token = secrets.token_urlsafe(32)
        self.token_expires = timezone.now() + timedelta(days=30)
        self.save()
        return self.session_token
    
    def is_session_valid(self, token):
        return(
            self.session_token == token and self.token_expires > timezone.now()
        )
    
class Cities(models.Model):
    city_name = models.CharField(verbose_name='Название города', max_length=128)

    class Meta:
        verbose_name = "Город"
        verbose_name_plural = "Города"
    
    def __str__(self):
        return self.city_name