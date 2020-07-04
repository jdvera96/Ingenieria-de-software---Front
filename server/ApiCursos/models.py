from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import PermissionsMixin

from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager
# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from fcm_django.models import FCMDevice


class User(AbstractUser):
    username = models.CharField(blank=True, null=True, max_length=10)
    email = models.EmailField(_('email address'), unique=True)
    rol = models.CharField(blank=True, null=True, max_length=20)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return "{}".format(self.email)

class Pago(models.Model):
    tipo_pago = models.CharField(max_length=50)


class Estudiante(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                 on_delete=models.CASCADE, related_name='profile')
    nombres = models.CharField(blank=True, null=True, max_length=50)
    apellidos = models.CharField(blank=True, null=True, max_length=50)
    cedula = models.CharField(max_length=10,primary_key=True,unique=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    #photo = models.ImageField(upload_to='uploads', blank=True)
    #dob = models.DateTimeField(auto_now_add=True)
    direccion = models.CharField(blank=True, null=True, max_length=255)
    telefono = models.CharField(blank=True, null=True, max_length=10)
    escolaridad = models.CharField(blank=True, null=True, max_length=50)
    pais = models.CharField(blank=True, null=True, max_length=50)
    ciudad = models.CharField(blank=True, null=True, max_length=50)
    sexo = models.CharField(blank=True, null=True, max_length=10)
    grupo_excluido = models.CharField(blank=True, null=True, max_length=50)

    def __str__(self):
        return self.nombres + " " + self.apellidos

class Profesor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                 on_delete=models.CASCADE, related_name='Profesor')
    nombres = models.CharField(blank=True, null=True, max_length=50)
    apellidos = models.CharField(blank=True, null=True, max_length=50)
    cedula = models.CharField(max_length=10,primary_key=True,unique=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    #photo = models.ImageField(upload_to='uploads', blank=True)
    #dob = models.DateTimeField(auto_now_add=True)
    direccion = models.CharField(blank=True, null=True, max_length=255)
    telefono = models.CharField(blank=True, null=True, max_length=10)
    escolaridad = models.CharField(blank=True, null=True, max_length=50)
    pais = models.CharField(blank=True, null=True, max_length=50)
    ciudad = models.CharField(blank=True, null=True, max_length=50)
    sexo = models.CharField(blank=True, null=True, max_length=10)

    def __str__(self):
        return self.nombres + " " + self.apellidos


class Supervisor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                 on_delete=models.CASCADE, related_name='Supervisor')
    nombres = models.CharField(blank=True, null=True, max_length=50)
    apellidos = models.CharField(blank=True, null=True, max_length=50)
    cedula = models.CharField(max_length=10,primary_key=True,unique=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    #photo = models.ImageField(upload_to='uploads', blank=True)
    #dob = models.DateTimeField(auto_now_add=True)
    direccion = models.CharField(blank=True, null=True, max_length=255)
    telefono = models.CharField(blank=True, null=True, max_length=10)
    escolaridad = models.CharField(blank=True, null=True, max_length=50)
    pais = models.CharField(blank=True, null=True, max_length=50)
    ciudad = models.CharField(blank=True, null=True, max_length=50)
    sexo = models.CharField(blank=True, null=True, max_length=10)

    def __str__(self):
        return self.nombres + " " + self.apellidos


class CorporateUserProfile(Estudiante):
    # profile = models.ForeignKey(Estudiante)
    representant_legal = models.CharField(blank=True, null=True,
               max_length=50)
    statut = models.CharField(blank=True, null=True, max_length=50)

class Promociones(models.Model):
    id_promocion = models.CharField(max_length=10,primary_key=True)
    cod_descuento = models.CharField(max_length=20)
    porc_descuento = models.FloatField()
    descripcion = models.CharField(max_length=50)
    fecha_vencimiento = models.DateField(auto_now=False, auto_now_add=False)
    imagen = models.ImageField(upload_to='pic_promo/', height_field=None, width_field=None, max_length=None)


class Curso(models.Model):
    id_curso = models.CharField(primary_key = True, max_length=50)
    imagen = models.ImageField(upload_to='pic_folder/', height_field=None, width_field=None, max_length=None)
    descripcion = models.CharField(max_length=50)
    titulo_curso = models.CharField(max_length=50)
    num_sesiones = models.IntegerField()
    precio = models.FloatField()
    id_admin = models.ForeignKey(Profesor, on_delete=models.CASCADE)
    id_promocion = models.ForeignKey(Promociones, blank=True, null=True,on_delete=models.DO_NOTHING)

class Inscripcion(models.Model):
    id_estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    id_curso = models.ForeignKey(Curso, on_delete=models.CASCADE)

class Clase(models.Model):
    asistencia = models.BooleanField()
    id_profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE)
    id_estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    id_curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    #id_supervisor = models.ForeignKey(Profesor, on_delete=models.CASCADE)

class Compra(models.Model):
    id_pago = models.ForeignKey(Pago, on_delete=models.CASCADE)
    id_estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    id_curso = models.ForeignKey(Curso, on_delete=models.CASCADE)


class Tarea(models.Model):
    """Modelo Tarea"""
    calificacion = models.FloatField()
    nombre_tarea = models.CharField(max_length=30)
    descripcion_tarea = models.CharField(max_length=50)
    id_clase = models.ForeignKey(Clase, null=False, blank=False, on_delete=models.CASCADE)

class IndividualUserProfile(Estudiante):
    prenom = models.CharField(blank=True, null=True, max_length=50)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

@receiver(post_save, sender=Promociones)
def update_stock(sender, instance, **kwargs):

    devices = FCMDevice.objects.all()

    devices.send_message(title="Nueva Promocion", body="Se agrego una nueva Promo, No te la pierdas")
    #devices.send_message(title="Title", body="Message", data={"test": "test"})

    #print("se ejecuto el token")


