# Generated by Django 3.2.7 on 2021-09-28 18:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lend_app', '0002_alter_gamelend_person'),
    ]

    operations = [
        migrations.CreateModel(
            name='LendInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.IntegerField(choices=[(0, 'Lended'), (1, 'Returned')], default=0)),
                ('lend', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='lend_app.gamelend')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
