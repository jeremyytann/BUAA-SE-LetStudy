# Generated by Django 4.0.3 on 2022-04-26 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('report', '0003_alter_report_answer_alter_report_comment_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='title',
            field=models.CharField(default='', max_length=30),
            preserve_default=False,
        ),
    ]
