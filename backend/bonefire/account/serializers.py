from rest_framework import serializers
from .models import Account, Cities

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
            'id',
            'name',
            'last_name',
            'city', 
            'birthday',
            'email', 
            'phone_number', 
            'password', 
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        raw_password = validated_data.pop('password')
        account = Account.objects.create(**validated_data)
        account.set_password(raw_password)
        account.save()
        return account

class CitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model= Cities
        fields = [
            'city_name'
        ]