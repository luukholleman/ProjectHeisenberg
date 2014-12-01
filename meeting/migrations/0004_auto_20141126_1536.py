# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('meeting', '0003_auto_20141126_1447'),
    ]

    operations = [
        migrations.CreateModel(
            name='MeetingInvitation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user_state', models.IntegerField(default=0, max_length=1, choices=[(0, b'Unknown'), (1, b'Present'), (2, b'Maybe'), (3, b'Reject')])),
                ('present_at', models.DateTimeField(null=True)),
                ('meeting', models.ForeignKey(to='meeting.Meeting')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='meetinguser',
            name='meeting',
        ),
        migrations.RemoveField(
            model_name='meetinguser',
            name='user',
        ),
        migrations.RemoveField(
            model_name='meeting',
            name='participants',
        ),
        migrations.DeleteModel(
            name='MeetingUser',
        ),
    ]
