from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'email', 'password', 'created_at']
        read_only_fields = ['id', 'created_at']
        password = serializers.CharField(write_only=True, required=True, min_length=6)

    def create(self, validated_data):
        password = validated_data.pop('password')
        account = Account.objects.create(**validated_data)
        account.set_password(password)
        account.save()
        return account