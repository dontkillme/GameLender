# Generated by Django 3.2.6 on 2021-09-09 18:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lend_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gamelend',
            name='person',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lender', to='lend_app.person'),
        ),
    ]