# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    replaces = [(b'meeting', '0001_initial'), (b'meeting', '0002_auto_20141126_1325'), (b'meeting', '0003_auto_20141126_1447'), (b'meeting', '0004_auto_20141126_1536'), (b'meeting', '0005_auto_20141126_1616'), (b'meeting', '0006_auto_20141203_1323'), (b'meeting', '0007_auto_20141204_1001'), (b'meeting', '0008_auto_20141210_1207'), (b'meeting', '0009_auto_20141210_1211'), (b'meeting', '0010_auto_20141210_1420'), (b'meeting', '0011_auto_20141210_1457')]

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0001_initial'),
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
                ('participants', models.ManyToManyField(related_name='participant_user', through='meeting.MeetingUser', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='MeetingInvitation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('state', models.IntegerField(default=0, max_length=1, choices=[(0, b'Unknown'), (1, b'Present'), (2, b'Maybe'), (3, b'Reject')])),
                ('present_at', models.DateTimeField(null=True)),
                ('meeting', models.ForeignKey(to='meeting.Meeting')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='meeting',
            name='participants',
        ),
        migrations.AddField(
            model_name='meeting',
            name='agendas',
            field=models.ManyToManyField(to=b'meeting.Agenda'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='meeting',
            name='minutes',
            field=models.ManyToManyField(to=b'meeting.Minute'),
            preserve_default=True,
        ),
        migrations.CreateModel(
            name='Agenda',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('uploaded_at', models.DateTimeField(auto_now=True)),
                ('file', models.FileField(upload_to=b'agendas')),
                ('file_name', models.CharField(max_length=200, null=True)),
                ('created_by', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Attachment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('uploaded_at', models.DateTimeField(auto_now=True)),
                ('file', models.FileField(upload_to=b'attachments')),
                ('file_name', models.CharField(max_length=200, null=True)),
                ('created_by', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Minute',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('uploaded_at', models.DateTimeField(auto_now=True)),
                ('file', models.FileField(upload_to=b'minutes')),
                ('file_name', models.CharField(max_length=200, null=True)),
                ('created_by', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
    ]
