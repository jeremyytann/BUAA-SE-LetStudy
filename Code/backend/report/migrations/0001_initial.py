# Generated by Django 4.0.3 on 2022-04-23 18:26

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('answer', '0002_alter_answer_question'),
        ('question', '0002_alter_question_createddate'),
        ('comment', '0006_alter_comment_createddate'),
        ('user', '0001_initial'),
        ('note', '0002_note_createddate'),
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.IntegerField(default=0)),
                ('description', models.TextField()),
                ('status', models.IntegerField(default=0)),
                ('createdDate', models.DateTimeField(default=django.utils.timezone.now)),
                ('answer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='answer.answer')),
                ('comment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='comment.comment')),
                ('note', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='note.note')),
                ('question', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='question.question')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.generaluser')),
            ],
        ),
    ]
