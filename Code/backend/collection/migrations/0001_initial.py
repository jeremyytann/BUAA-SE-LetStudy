# Generated by Django 4.0.3 on 2022-04-20 00:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
        ('note', '0002_note_createddate'),
    ]

    operations = [
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collectionUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='collectionUser', to='user.generaluser')),
                ('note', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='note.note')),
                ('noteUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='note_user', to='user.generaluser')),
            ],
        ),
    ]
