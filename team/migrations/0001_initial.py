# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_color_usercolor'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('meeting', '0008_auto_20141209_1231'),
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=4096, blank=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('creator', models.ForeignKey(related_name='group_creator_set', to=settings.AUTH_USER_MODEL)),
                ('invitations', models.ManyToManyField(to=settings.AUTH_USER_MODEL, blank=True)),
                ('meetings', models.ManyToManyField(to='meeting.Meeting', blank=True)),
                ('user_color', models.ManyToManyField(to='authentication.UserColor', blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
