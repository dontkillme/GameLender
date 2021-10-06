# Generated by Django 3.2.6 on 2021-09-05 19:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GameGenre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='GameTags',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='BoardGame',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('code', models.CharField(blank=True, max_length=255, null=True)),
                ('from_age', models.IntegerField(default=1)),
                ('to_age', models.IntegerField(default=99)),
                ('from_players', models.IntegerField(default=1)),
                ('to_players', models.IntegerField(default=4)),
                ('genre', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='magazine.gamegenre')),
                ('tags', models.ManyToManyField(null=True, to='magazine.GameTags')),
            ],
        ),
    ]