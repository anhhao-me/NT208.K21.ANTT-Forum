# Generated by Django 3.0.7 on 2020-06-10 14:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0002_userauth'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='categories',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='subcategories',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='subscribers',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='topics',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='topicstatistic',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='userauth',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='users',
            name='updated_at',
        ),
    ]