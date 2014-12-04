# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0006_auto_20141203_1323'),
    ]

    operations = [
        migrations.CreateModel(
            name='Agenda',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('upload_at', models.DateTimeField(auto_now=True)),
                ('file', models.FileField(upload_to=b'agendas')),
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
                ('upload_at', models.DateTimeField(auto_now=True)),
                ('file', models.FileField(upload_to=b'attachments')),
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
                ('upload_at', models.DateTimeField(auto_now=True)),
                ('file', models.FileField(upload_to=b'minutes')),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.AlterField(
            model_name='meeting',
            name='agendas',
            field=models.ManyToManyField(to='meeting.Agenda'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='meeting',
            name='minutes',
            field=models.ManyToManyField(to='meeting.Minute'),
            preserve_default=True,
        ),
    ]
