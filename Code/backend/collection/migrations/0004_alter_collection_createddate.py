# Generated by Django 4.0.3 on 2022-04-29 19:59

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('collection', '0003_collection_createddate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collection',
            name='createdDate',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
