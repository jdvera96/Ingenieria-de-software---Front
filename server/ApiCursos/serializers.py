from .models import *

from rest_framework import serializers

from django.contrib.auth import authenticate

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        # model = Estudiante
        model = Estudiante
        fields = ('nombres','apellidos','cedula','fecha_nacimiento','direccion', 'telefono',
                            'escolaridad', 'pais', 'ciudad','sexo','grupo_excluido')

class ProfesorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        # model = Estudiante
        model = Profesor
        fields = ('nombres','apellidos','cedula','fecha_nacimiento','direccion', 'telefono',
                            'escolaridad', 'pais', 'ciudad','sexo')
class UserSerializerProfesor(serializers.ModelSerializer):
    profile = ProfesorProfileSerializer(required=True)
    #url = serializers.HyperlinkedIdentityField(view_name="ApiCursos:user-detail")
    class Meta:
        model = User
        fields = ('email', 'password','profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        Profesor.objects.create(user=user, **profile_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=True)
    #url = serializers.HyperlinkedIdentityField(view_name="ApiCursos:user-detail")
    class Meta:
        model = User
        fields = ('email', 'password','profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        Estudiante.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        instance.email = validated_data.get('email', instance.email)
        instance.save()
        profile.nombres = profile_data.get('nombres', profile.nombres)
        profile.apellidos = profile_data('apellidos',profile.apellidos)
        profile.fecha_nacimiento = profile_data('fecha_nacimiento',profile.fecha_nacimiento)
        #profile.photo = profile_data.get('photo', profile.photo)
        profile.cedula = profile_data('cedula',profile.cedula)
        #profile.dob = profile_data.get('dob', profile.dob)
        profile.direccion = profile_data.get('direccion', profile.direccion)
        profile.telefono = profile_data.get('telefono', profile.telefono)
        profile.escolaridad  = profile_data.get('escolaridad', profile.escolaridad )
        profile.pais = profile_data.get('pais', profile.pais)
        profile.ciudad = profile_data.get('ciudad', profile.ciudad)
        profile.grupo_excluido = profile_data.get('grupo_excluido', profile.grupo_excluido)
        profile.sexo = profile_data.get('sexo', profile.sexo)
        profile.save()

        return instance

class IndividualUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        # model = Estudiante
        model = IndividualUserProfile
        fields = ('nombres','apellidos', 'prenom','dob', 'direccion', 'telefono', 'escolaridad', 'pais', 'ciudad')

class IndividualSerializer(serializers.ModelSerializer):
    profile = IndividualUserProfileSerializer(required=True)
   # url = serializers.HyperlinkedIdentityField(view_name="ApiCursos:user-detail")
    class Meta:
        model = User
        fields = ('email', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        IndividualUserProfile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        instance.email = validated_data.get('email', instance.email)
        instance.save()
        profile.nombres = profile_data.get('nombres', profile.nombres)
        profile.prenom = profile_data.get('nombres', profile.prenom)
        #profile.photo = profile_data.get('photo', profile.photo)
        profile.dob = profile_data.get('dob', profile.dob)
        profile.direccion = profile_data.get('direccion', profile.direccion)
        profile.telefono = profile_data.get('telefono', profile.telefono)
        profile.escolaridad  = profile_data.get('escolaridad', profile.escolaridad )
        profile.pais = profile_data.get('pais', profile.pais)
        profile.ciudad = profile_data.get('ciudad', profile.ciudad)
        profile.save()

        return instance





class CursoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Curso
        fields = "__all__"


class PagoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pago
        fields = "__all__"

class ClaseSerializer(serializers.ModelSerializer):
    id_curso = CursoSerializer(required = True)
    class Meta:
        model = Clase
        fields = ('id','id_estudiante','id_curso','asistencia')

class ClaseSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Clase
        fields = "__all__"



class TareaSerializer(serializers.ModelSerializer):
    id_clase = ClaseSerializer(required = True)
    class Meta:
        model = Tarea
        fields = ('id_clase','calificacion','nombre_tarea','descripcion_tarea')

class PromoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Promociones
        fields = "__all__"




