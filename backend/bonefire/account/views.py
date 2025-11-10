from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Account, Cities
from .serializers import AccountSerializer, CitiesSerializer

@api_view(['POST'])
def account_create(request):
    serializer = AccountSerializer(data=request.data)
        
    if serializer.is_valid():
        try:
            account = serializer.save()
        
            session_token = account.generate_session_token()
                
            response_data = {
                'account_id': account.id,
                'email': account.email
            }
                
            response = Response(response_data, status=status.HTTP_201_CREATED)
                
            response.set_cookie(
                'session_token',
                session_token,
                max_age=30*24*60*60, 
                httponly=True,
                secure=False,
                samesite='Lax'
            )
        
            return response
        except Exception as e:
            return Response({'error': 'Ошибка сервера при сохранении аккаунта'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        return Response({
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({
            "error": 'Email и пароль обязательны'
        })
    
    try:
        account = Account.objects.get(email=email)
        if account.check_password(password):
            session_token = account.generate_session_token()
            response = Response({
                'account_id': account.id,
                'email': account.email
            })
            
            response.set_cookie(
                'session_token',
                session_token,
                max_age=30*24*60*60,
                httponly=True,
                secure=False,
                samesite='Lax'
            )
            return response
    
        else:
            print("Неверный Пароль")
            return Response({
                'error': 'Неверный email или пароль'
            })
    except Account.DoesNotExist:
        print("Аккаунт не найден")
        return Response({
            'error': 'Неверный email или пароль'
        })
    
@api_view(['POST'])
def logout_view(request):
    session_token = request.COOKIES.get('session_token')
    if session_token:
        account = Account.objects.get(session_token=session_token)
        account.session_token = None
        account.token_expires = None
        account.save()
    response = Response({
            'message': 'Успешный выход'
        })
    response.delete_cookie('session_token')
    return response
@api_view(['GET'])
def get_current_user(request):


    session_token = request.COOKIES.get('session_token')
    if not session_token:
        return Response({
            'is_authenticated': False
        })
    try:
        account = Account.objects.get(session_token=session_token)
        if account.is_session_valid(session_token):
            return Response({
                'is_authenticated': True,
                'account': {
                    'id': account.id,
                    'email': account.email
                }
            })
        else:
            account.session_token = None
            account.token_expires = None
            account.save()
            return Response({
                'is_authenticated': False
            })
                
    except Account.DoesNotExist:
        return Response({
            'is_authenticated': False
            })
@api_view(['GET'])
def cities(request):
    cities = Cities.objects.all()
    serializer = CitiesSerializer(cities, many=True)
    return Response(serializer.data, content_type='application/json')
    