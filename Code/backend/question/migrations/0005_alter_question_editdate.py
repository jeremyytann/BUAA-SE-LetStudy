# Generated by Django 4.0.3 on 2022-05-06 12:24

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0004_alter_question_editdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='editDate',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]