from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone
from datetime import timedelta
import secrets

class Account(models.Model):
    email = models.EmailField(verbose_name="Email", unique=True)
    password = models.CharField(max_length=128, verbose_name="Пароль")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    session_token = models.CharField(max_length=64, blank=True,null=True, unique=True)
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
