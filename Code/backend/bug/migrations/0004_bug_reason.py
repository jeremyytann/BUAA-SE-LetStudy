# Generated by Django 4.0.3 on 2022-04-27 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bug', '0003_bug_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='bug',
            name='reason',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]