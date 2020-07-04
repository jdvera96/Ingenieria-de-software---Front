from .views import *
from django.urls import path
from rest_framework.authtoken.views import ObtainAuthToken
from fcm_django.api.rest_framework import FCMDeviceAuthorizedViewSet,FCMDeviceViewSet
urlpatterns = [
    path('auth/register/user',RegisterUserAPI.as_view()),

    path('auth/login/user',CustomAuthToken.as_view()),

    path('auth/register/profesor',RegisterProfesorAPI.as_view()),
    path('auth/register/supervisor',RegisterSupervisorAPI.as_view()),

    path('cursos',CursoGet.as_view()),
    path('createtoken',FCMDeviceAuthorizedViewSet.as_view({'post': 'create'})),
path('curso/<str:pk>',GetCurso.as_view()),path('crearPago',CreatePago.as_view()),
path('getClase/<str:id>',ClaseGet.as_view()),path('getTarea',TareaGet.as_view()),
path('getTarea/estudiante/',TareaFilter.as_view(),name="Filter Tarea"),path('getPromo',PromoGet.as_view())
,path('crearClase',CreateClase.as_view()),
path('crearPromo',PromoSave.as_view()),
path('sendnotificacion', SendNotificacion.as_view(),name='Send Notificacion'),

]