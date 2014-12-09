# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('meeting', '0008_auto_20141209_1231'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=4096, blank=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('creator', models.ForeignKey(related_name='group_creator_set', to=settings.AUTH_USER_MODEL)),
                ('meetings', models.ManyToManyField(to='meeting.Meeting')),
                ('members', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
