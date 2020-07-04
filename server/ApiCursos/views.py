from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework import generics, permissions
from .models import *
from .serializers import *
from rest_framework.response import Response
# Also add these imports
from rest_framework import status
from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
# Create your views here.
from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import *
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from rest_framework.permissions import *
from rest_framework.authtoken.views import ObtainAuthToken



class CustomAuthToken(ObtainAuthToken):
    permission_classes = (AllowAny,)
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'isAdmin': user.is_superuser
            ,

        })



class RegisterUserAPI(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,

        })

class RegisterProfesorAPI(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializerProfesor

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializerProfesor(user, context=self.get_serializer_context()).data,

        })



class CursoGet(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer

class GetCurso(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer


class CreatePago(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer



class ClaseGet(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ClaseSerializer


    def get_queryset(self):
        filtro = self.kwargs['id']
        queryset = Clase.objects.filter(id_estudiante=filtro)
        return  queryset

class TareaGet(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

class TareaFilter(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = TareaSerializer


    def get_queryset(self):


        filtro =self.request.GET.get('id_clase')
        filtro2 =self.request.GET.get('id_estudiante')

        queryset = Tarea.objects.filter(id_clase__id_estudiante=filtro2,id_clase__id_curso=filtro)

        return  queryset

class PromoGet(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Promociones.objects.all()
    serializer_class = PromoSerializer



class CreateClase(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = Clase.objects.all()
    serializer_class = ClaseSerializer2
