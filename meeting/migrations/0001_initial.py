# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=90)),
                ('description', models.TextField(null=True)),
                ('location', models.CharField(max_length=90, null=True)),
                ('address', models.CharField(max_length=200, null=True)),
                ('date_and_time', models.DateTimeField()),
                ('creator', models.ForeignKey(related_name='creator_user', to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='MeetingUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_state', models.CharField(default=False, max_length=20, choices=[(0, b'Unknown'), (1, b'Present'), (2, b'Maybe'), (3, b'Reject')])),
                ('present_at', models.DateTimeField()),
                ('meeting', models.ForeignKey(to='meeting.Meeting')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='meeting',
            name='participants',
            field=models.ManyToManyField(related_name='participant_user', through='meeting.MeetingUser', to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
