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
            name='Agenda',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('uploaded_at', models.DateTimeField(auto_now=True)),
                ('file_name', models.CharField(max_length=200, null=True)),
                ('file', models.FileField(upload_to=b'meeting/agendas')),
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
                ('file_name', models.CharField(max_length=200, null=True)),
                ('file', models.FileField(upload_to=b'meeting/attachments')),
                ('created_by', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=90)),
                ('description', models.TextField(null=True)),
                ('location', models.CharField(max_length=90, null=True)),
                ('address', models.CharField(max_length=200, null=True)),
                ('date_and_time', models.DateTimeField()),
                ('agendas', models.ManyToManyField(to='meeting.Agenda')),
                ('creator', models.ForeignKey(related_name='creator_user', to=settings.AUTH_USER_MODEL, null=True)),
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
        migrations.CreateModel(
            name='Minute',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('uploaded_at', models.DateTimeField(auto_now=True)),
                ('file_name', models.CharField(max_length=200, null=True)),
                ('file', models.FileField(upload_to=b'meeting/minutes')),
                ('created_by', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='meeting',
            name='minutes',
            field=models.ManyToManyField(to='meeting.Minute'),
            preserve_default=True,
        ),
    ]
