from django.contrib import admin
from .models import Account, Cities

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'password', 'created_at']
    list_display_links = ['id']
    search_fields = ['email']
    list_filter = ['created_at']
    ordering = ['-created_at']

@admin.register(Cities)
class CitiesAdmin(admin.ModelAdmin):
    list_display = ['city_name'] 