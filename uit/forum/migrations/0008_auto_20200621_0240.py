# Generated by Django 3.0.7 on 2020-06-21 02:40

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0007_remove_islikedtopic_is_liked'),
    ]

    operations = [
        migrations.AddField(
            model_name='topics',
            name='title',
            field=models.TextField(default='I have a question.'),
        ),
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sub_cat', to='forum.Categories')),
            ],
            options={
                'db_table': 'categories',
            },
        ),
        migrations.AddField(
            model_name='topics',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='category_topic', to='forum.Categories'),
            preserve_default=False,
        ),
    ]
