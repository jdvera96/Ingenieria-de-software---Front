# Generated by Django 2.1.5 on 2020-06-20 19:59

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('asistencia', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Compra',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Curso',
            fields=[
                ('id_curso', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('imagen', models.ImageField(upload_to='pic_folder/')),
                ('descripcion', models.CharField(max_length=50)),
                ('titulo_curso', models.CharField(max_length=50)),
                ('num_sesiones', models.IntegerField()),
                ('precio', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Estudiante',
            fields=[
                ('nombres', models.CharField(blank=True, max_length=50, null=True)),
                ('apellidos', models.CharField(blank=True, max_length=50, null=True)),
                ('cedula', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('fecha_nacimiento', models.DateField(blank=True, null=True)),
                ('direccion', models.CharField(blank=True, max_length=255, null=True)),
                ('telefono', models.CharField(blank=True, max_length=10, null=True)),
                ('escolaridad', models.CharField(blank=True, max_length=50, null=True)),
                ('pais', models.CharField(blank=True, max_length=50, null=True)),
                ('ciudad', models.CharField(blank=True, max_length=50, null=True)),
                ('sexo', models.CharField(blank=True, max_length=10, null=True)),
                ('grupo_excluido', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Inscripcion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_curso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiCursos.Curso')),
            ],
        ),
        migrations.CreateModel(
            name='Pago',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_pago', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Profesor',
            fields=[
                ('nombres', models.CharField(blank=True, max_length=50, null=True)),
                ('apellidos', models.CharField(blank=True, max_length=50, null=True)),
                ('cedula', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('fecha_nacimiento', models.DateField(blank=True, null=True)),
                ('direccion', models.CharField(blank=True, max_length=255, null=True)),
                ('telefono', models.CharField(blank=True, max_length=10, null=True)),
                ('escolaridad', models.CharField(blank=True, max_length=50, null=True)),
                ('pais', models.CharField(blank=True, max_length=50, null=True)),
                ('ciudad', models.CharField(blank=True, max_length=50, null=True)),
                ('sexo', models.CharField(blank=True, max_length=10, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Promociones',
            fields=[
                ('id_promocion', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('cod_descuento', models.CharField(max_length=20)),
                ('porc_descuento', models.FloatField()),
                ('descripcion', models.CharField(max_length=50)),
                ('fecha_vencimiento', models.DateField()),
                ('imagen', models.ImageField(upload_to='pic_promo/')),
            ],
        ),
        migrations.CreateModel(
            name='Tarea',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calificacion', models.FloatField()),
                ('nombre_tarea', models.CharField(max_length=30)),
                ('descripcion_tarea', models.CharField(max_length=50)),
                ('id_clase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiCursos.Clase')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(blank=True, max_length=10, null=True)),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='CorporateUserProfile',
            fields=[
                ('estudiante_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='ApiCursos.Estudiante')),
                ('representant_legal', models.CharField(blank=True, max_length=50, null=True)),
                ('statut', models.CharField(blank=True, max_length=50, null=True)),
            ],
            bases=('ApiCursos.estudiante',),
        ),
        migrations.CreateModel(
            name='IndividualUserProfile',
            fields=[
                ('estudiante_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='ApiCursos.Estudiante')),
                ('prenom', models.CharField(blank=True, max_length=50, null=True)),
            ],
            bases=('ApiCursos.estudiante',),
        ),
        migrations.AddField(
            model_name='profesor',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='Profesor', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='inscripcion',
            name='id_estudiante',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiCursos.Estudiante'),
        ),
        migrations.AddField(
            model_name='estudiante',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='curso',
            name='id_admin',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiCursos.Profesor'),
        ),
        migrations.AddField(
            model_name='curso',
            name='id_promocion',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='ApiCursos.Promociones'),
        ),
        migrations.AddField(
            model_name='compra',
            name='id_curso',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiCursos.Curso'),
        ),
        migrations.AddField(
            model_name='compra',
            name='id_estudiante',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiCursos.Estudiante'),
        ),
        migrations.AddField(
            model_name='compra',
            name='id_pago',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiCursos.Pago'),
        ),
        migrations.AddField(
            model_name='clase',
            name='id_curso',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiCursos.Curso'),
        ),
        migrations.AddField(
            model_name='clase',
            name='id_estudiante',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiCursos.Estudiante'),
        ),
        migrations.AddField(
            model_name='clase',
            name='id_profesor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ApiCursos.Profesor'),
        ),
    ]
